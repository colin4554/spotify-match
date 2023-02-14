import axios from 'axios';
import withApiErrorHandling from 'common/utils/withApiErrorHandling';

export default withApiErrorHandling(async ({ token, currentItem }) => {
	let name = currentItem.name
	const friendPlaylists = await getFriendPlaylists(token);
	const tracks = [];
	for (const playlistId of friendPlaylists) {
		const playlistTracks = await getPlaylistTracks(token, playlistId);
		tracks.push(...playlistTracks);
	}

	const counts = tracks.reduce((counts, song) => {
		const nameMatch = song.name.includes(name);
		const artistMatch = song.artists.some((artist) => artist.includes(name));
		if (nameMatch || artistMatch) {
			if (!counts[song.user]) {
				counts[song.user] = {count: 0, user: song.user, matches: [] };
			}
			counts[song.user].matches.push({track: song.name, artists: song.artists, album: song.album, id: song.id});
			counts[song.user].count++;
		}
		return counts;
	}, {});

	const friendsWhoHaveListened = Object.values(counts)
		.sort((a, b) => b.count - a.count)
		.map((value) => ({ user: value.user, matches: value.matches }));

	return friendsWhoHaveListened;
});

async function getFriendPlaylists(accessToken) {
	const response = await axios.get("https://api.spotify.com/v1/me/playlists", {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});
	return response.data.items.map((item) => item.id);
}

async function getPlaylistTracks(accessToken, playlistId) {
	const response = await axios.get(
		`https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
		{
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		}
	);
	return response.data.items.map((item) => ({
		user: item?.added_by?.id ?? "Your account",
		name: item.track?.name ?? "",
		id: item.track?.id ?? "",
		album: item.track?.album ?? {},
		artists: item.track?.artists?.map((artist) => artist?.name) ?? [],
	}));
}

