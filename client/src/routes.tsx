import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { Login } from './pages/login';

export const Routes: React.FC = () => {
	return (
		<BrowserRouter>
			<div>
				<Switch>
					<Route exact path="/" component={Login} />
				</Switch>
			</div>
		</BrowserRouter>
	);
};
