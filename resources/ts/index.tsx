import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Echo from 'laravel-echo';
import { store } from './module';
import App from './components/App';
window.Pusher = require('pusher-js');

declare global {
	interface Window {
		Echo: Echo;
	}
}

window.Echo = new Echo({
	broadcaster: 'pusher',
	key: process.env.MIX_PUSHER_APP_KEY,
	cluster: process.env.MIX_PUSHER_APP_CLUSTER,
	encrypted: true,
});

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root'),
);

// interface Data {
// 	message: {
// 		id: number;
// 		content: string;
// 	}
// }

// window.Echo.channel('message-received-channel').listen('MessageReceived', (data: Data) => {
// 	console.log(data.message.content);
// });