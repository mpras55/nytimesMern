import React from "react";

const Jumbotron = ({ children }) => (
	<div
		style={{ height: 300, clear: "both", paddingTop: 80, textAlign: "center" }}
		className="jumbotron"
	>
		{children}
	</div>
);

export default Jumbotron;
