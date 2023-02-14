import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { register as registerServiceWorker } from './serviceWorkerRegistration';
import { Offline } from 'common/components';
import App from './App';
import 'what-input';
import './styles/_index.scss';

ReactDOM.render(
  <React.StrictMode>
	<BrowserRouter>
		<Offline>
			<App />
		</Offline>
	</BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

registerServiceWorker();