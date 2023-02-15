import {Button, Icon, OpenOnSpotifyButton, Text} from 'common/components';
import '../styles/_success.scss';
import Accordion from "./Accordion";

export default function Success({ friends, onReset }) {
	return (
		<div>
		<div className="success">
			<div>
				<Text subHeading className="mt-0">{friends.length} of your spotify friends also listen to this song/artist 🎉</Text>
			</div>
			<div className="success__actions">
				<Button onClick={onReset} type="secondary">Search again</Button>
			</div>
		</div>
			<div className="playlist">
				<div className="playlist__inner">
					{!friends.length && <Text className="mt-0">We couldn't find any matches among your friends :(</Text>}
					{friends.map(friend => (
						<div>
							<h2 className="playlist__songs-header">
								<a href={friend.userUrl}>{friend.userName ?? "Your Liked Songs"}</a>
							</h2>

							<Accordion title={friend.matches.length + " songs matched"}>
								{friend.matches.map(match => (
									<TrackRow key={match.user} track={match} />
									))}
							</Accordion>
						</div>
					))}

				</div>
			</div>
		</div>
	);
}

function TrackRow({ track }) {
	return (
		<div
			className='playlist__row'
			key={track.track}
		>
			<Track
				id={track.id}
				name={track.track}
				albumName={track.album?.name}
				albumUrl={track.album?.images?.[0]?.url}
			/>
		</div>
	);
}

function Track({ id, name, albumName, albumUrl }) {
	return (
		<div className='playlist__row__track'>
			<AlbumArt url={albumUrl} />
			<div className="playlist__row__track__content">
				<div className="playlist__row__track__content__name">
					<Text bold>{name}</Text>
				</div>
				{albumName && <Text>{albumName}</Text>}
				<div className="no-fade mt-15">
					<OpenOnSpotifyButton id={id} type="track" buttonType="secondary" small action="Play" />
				</div>
			</div>
		</div>
	);
}

function AlbumArt({ url }) {
	return (
		<div className="playlist__row__track__art">
			{!url ? <Icon size={20} name="fa-music" /> : null}
			{url ? <img src={url} alt="album-art" /> : null}
		</div>
	);
}