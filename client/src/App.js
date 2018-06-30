import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Search from "./pages/Search";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import Jumbotron from "./components/Jumbotron";

const App = () => (
	<Router>
		<div>
			<Nav />
			<Jumbotron> 
				<h1> New York Times Article Scrubber </h1>
				<h2> Search for and annotate articles of interest!</h2>
			</Jumbotron>
			<Switch>
				<Route exact path="/" component={Search} />
				<Route exact path="/news" component={Search} />
				<Route component={NoMatch} />
			</Switch>
		</div>
	</Router>
);

export default App;
