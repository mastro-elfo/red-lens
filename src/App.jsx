import React, { Component } from 'react';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';

import Main from './Main';
import Test from './Test';

export default class App extends Component {
	render() {
		return (
			<BrowserRouter basename="/redlens">
				<Switch>
					<Route path="/" exact component={Main}/>
					<Route path="/test" component={Test}/>
					<Redirect to="/"/>
				</Switch>
			</BrowserRouter>
		);
	}
}
