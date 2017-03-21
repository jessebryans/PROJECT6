import React from 'react';
var FontAwesome = require('react-fontawesome');

export default function Results(props) {
	return (
		<li className="results-data">
			{props.data.code} - {props.data.text}
			<button onClick={() => props.remove(props.data.key)}>
				<FontAwesome name="trash" />
				</button>
		</li>
	)	
} 



