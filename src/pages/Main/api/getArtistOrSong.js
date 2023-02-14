import axios from 'axios';
import withApiErrorHandling from 'common/utils/withApiErrorHandling';

async function searchForArtistOrSong(token, query) {
	if (query.length > 2) {

		const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=artist,track&limit=5`
		const result = await axios.get(url,
			{headers: {Authorization: `Bearer ${token}`}}
		);

		let artists = result.data.artists.items
		let tracks = result.data.tracks.items
		let combined = artists.concat(tracks)

		combined.sort((a, b) => b.popularity - a.popularity)

		return combined
	}
}


export default token => (

	withApiErrorHandling(async (search) => {
		if (!token) { return; }

		return await searchForArtistOrSong(token, search)
	})
);
