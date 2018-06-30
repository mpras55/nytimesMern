import React from "react";
import "./List2.css";

export const List2 = ({ children }) => {
	return (
		<div className="list-overflow-container">
			<ul className="list-group">
				{children}
			</ul>
		</div>
	);
};
