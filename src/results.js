import React from 'react';
var FontAwesome = require('react-fontawesome');

export default function Results(props) {
	return (
		<li className="results-data" onClick={() => props.getResults(props.data.key)}>
			<div className="resultsTextCode">{props.data.code}</div><div className="resultsTextInput">{props.data.text}</div>
			<button onClick={() => props.remove(props.data.key)}>
				<FontAwesome name="trash" />
				</button>
		</li>
	)	
} 



