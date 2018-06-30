import React from "react";

const Minitron = ({ children }) => (
	<div
		style={{ height: 150, clear: "both", paddingTop: 40, textAlign: "center" }}
		className="jumbotron"
	>
		{children}
	</div>
);

export default Minitron;
