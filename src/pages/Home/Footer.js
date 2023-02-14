import { Icon, Text } from 'common/components';
import './_footer.scss';

export default function Footer() {
	return (
		<div className="footer">
			<div className="footer__content">
				<div className="footer__content__links">
					<div className="footer__content__list" >
					</div>
					<div className="footer__content__list" >
						<a href="https://www.privacypolicies.com/generic/" target="_blank" rel="noreferrer">Privacy</a>

						<a href="https://github.com/colin4554/spotify-match" target="_blank" rel="noreferrer">
							<Icon colour="white" name="fa-github" brand />
							<span className="footer__content__list__accessible">github</span>
						</a>

					</div>
				</div>
				<Text inverse className="footer__copyright mt-40">
					<Icon colour="#F4C51B" name="fa-lightbulb" size={15} className="mr-10" />Inspiration from <a target="_blank" rel="noreferrer" href="https://github.com/alexgurr/mixmello">mixmello</a>
				</Text>
				<Text inverse className="footer__copyright mt-20">
					©2023 Spotify Match. All rights reserved. Various trademarks held by their respective owners.
				</Text>
			</div>
		</div>
	);
}
