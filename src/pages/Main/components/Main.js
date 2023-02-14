import { useState } from 'react';
import Search from './Search';
import Header from './Header';
import { ReactComponent as Waves } from '../../../assets/images/wave.svg';
import findFriendsWhoHaveListenedTo from '../api/getFriendsSort';
import Success from './Success';
import '../styles/_main.scss';
import { Helmet } from 'react-helmet';
import getUser from '../api/getUser'


const STAGES = [
	'Enter an Artist or Song',
	'Sort through your friends!'
];

export default function Main({ token, profile, signOut }) {
	const [stage, setStage] = useState(1);
	const [currentItem, setItem] = useState(null);
	const [matches, setMatches] = useState([]);

	const onReset = () => {
		setItem(null);
		setStage(1);
	};
	
	const onSearch = async () => {
		const retrievedMatches = await findFriendsWhoHaveListenedTo({ token, currentItem });

		const withUserNames = []

		for (let match of retrievedMatches) {
			if (match.user !== "") {
				let user = await getUser(token, match.user)
				withUserNames.push({userName: user.userName, userUrl: user.url, ...match})
			}
			else withUserNames.push({ ...match})
		}

		setMatches(withUserNames);

		setStage(2);
	};

		return (
			<div className="main">
				<Helmet><meta name="theme-color" content="#ffffff" /></Helmet>
				<Header
					stage={stage}
					title={STAGES[stage - 1]}
					profile={profile}
					signOut={signOut}
				/>
				{
					stage === 1
						? (
							<Search
								token={token}
								onSelectItem={setItem}
								onSearch={onSearch}
								selectedItem={currentItem}
							/>
						)
						: <Success friends={matches} onReset={onReset} />
				}
				<Waves className="mt-auto" />
			</div>
		);
	}
