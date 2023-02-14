import { Helmet } from 'react-helmet';
import { Button, Text } from 'common/components';
import { ReactComponent as Logo } from '../../assets/images/logo.svg';
import { ReactComponent as Waves } from '../../assets/images/wave.svg';
import { ReactComponent as Headphones } from '../../assets/images/headphones.svg';
import Footer from './Footer';
import './_home.scss';

export default function Home({ onConnect }) {
	return (
		<div className="home">
			<Helmet><meta name="theme-color" content="#00BA89" /></Helmet>
			<div className="home__intro">
				<Logo className="home__intro__logo" />
				<Text inverse heading className="mt-20">Match your favorite music with friends that love it too!</Text>
				<Text subHeading inverse className="mb-60">Find friends who listen to your favorite artists</Text>
				<div className="home__intro__connect">
					<Button icon="fa-spotify" brandIcon onClick={onConnect}>Connect To Spotify</Button>
					<a onClick={() => {
						document.querySelector('.home__getting-started').scrollIntoView({ behavior: 'smooth' });
					}}>Learn More</a>
				</div>
				<Headphones className="home__intro__headphones" />
			</div>
			<div className="home__learn-more">
				<div className="home__getting-started ml-auto mr-auto">
					<Text inverse heading className="home__getting-started__title ml-auto mr-auto" centered>How It Works</Text>
					<Text inverse className="home__getting-started__subtitle ml-auto mr-auto" centered><strong>Connect your Spotify account</strong> and find friends with similar tastes.</Text>
					<div className="home__getting-started__container ml-auto mr-auto">
						<div className="home__getting-started__block">
							<div className="home__getting-started__block__header">
								<div className="home__getting-started__block__number">1</div>
								<Text inverse subHeading bold>Choose an artist or song</Text>
							</div>
							<Text inverse>
								Enter an artist or song to search with across your friends' playlists.
							</Text>
						</div>
						<div className="home__getting-started__block">
							<div className="home__getting-started__block__header">
								<div className="home__getting-started__block__number">2</div>
								<Text inverse subHeading bold>Connect to Spotify</Text>
							</div>
							<Text inverse>We automatically search through your friends' public playlists for the artist/song.</Text>
						</div>
						<div className="home__getting-started__block">
							<div className="home__getting-started__block__header">
								<div className="home__getting-started__block__number">3</div>
								<Text inverse subHeading bold>Sort through your friends</Text>
							</div>
							<Text inverse>Look through a sorted list of your friends who match your music taste the most!</Text>
						</div>
					</div>
				</div>
			</div>
			<Footer />
			<Waves className="home__learn-more__waves" />
		</div>
	);
}