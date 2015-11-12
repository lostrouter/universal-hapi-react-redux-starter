import React from 'react';
import { render } from 'react-dom';
import App from '../app';

export default {
	start() {
		console.log('starting');
		render(<App />,
		document.getElementById('mainContainer'));
	}
};
