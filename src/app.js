import React from 'react';
import ReactDOM from 'react-dom';
import CodeMirror from 'react-codemirror'
import Results from './results.js'
import Footer from './footer.js'
import Signin from './Signin.js'
var FontAwesome = require('react-fontawesome');
require('codemirror/mode/htmlmixed/htmlmixed');

const config = {
    apiKey: "AIzaSyCUsQu53Jp5JW9vrOUFOjlwyB_CVmfgdio",
    authDomain: "code-dream-journal-7d56e.firebaseapp.com",
    databaseURL: "https://code-dream-journal-7d56e.firebaseio.com",
    storageBucket: "code-dream-journal-7d56e.appspot.com",
    messagingSenderId: "455754832731"
  };
  firebase.initializeApp(config);


class App extends React.Component {
	constructor() {
		super();
		this.state = {
			results: [],
			code: "",
			text: ""
			
		}
		this.userInput = this.userInput.bind(this);
		this.handleCode = this.handleCode.bind(this);
		this.handleText = this.handleText.bind(this);
		this.getResults = this.getResults.bind(this);
	}
	componentDidMount() {
		const dbRef = firebase.database().ref();
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				dbRef.on('value', (response) => {
					const newState = []
					const data = response.val()
					
					for (let key in data) {
						data[key].key = key
						newState.push(data[key])
					}
					this.setState({
						results: newState
						
					}); console.log(newState)
				})
			}
		})
	}
	handleCode(writtencode) {
		this.setState({
			code: writtencode
		});
	}
	handleText(e) {
		this.setState ({
			text: e.target.value
		});
		console.log(e.target.value)
		
	} 

	userInput(e) {
		e.preventDefault();
		const userdata = {
			code: this.state.code,
			text: this.state.text
		}
		this.setState({
			code: "",
			text: ""
		})
		const dbRef = firebase.database().ref();
		dbRef.push(userdata)
			
		console.log(userdata)
	}
	removeUserInput(itemToRemove) {
		console.log(itemToRemove)
		console.log('removing')
		const dbRef = firebase.database().ref(itemToRemove)
		dbRef.remove();
	}
	getResults(key) {
		const dbRef = firebase.database().ref(key);
			dbRef.on('value', (res) => {
			const result = res.val();
			console.log(result);
			console.log(result.code)
			this.setState({
				code: result.code,
				text: result.text
			})
		});
	}

	render() {
		var options = {
            lineNumbers: true,
            theme: "cobalt",
            mode:'htmlmixed'

        };
		return (

			<div>
				<Signin />
				<form onSubmit={this.userInput} className='userDataInput'>
					<CodeMirror value={this.state.code} options={options} name='code' onChange={this.handleCode} className='codeMirror' />
					<input value={this.state.text} type="text" name="text" onChange={this.handleText}/>
					<button className="submitButton">SUBMIT</button>
					<ul className='results'>
						{this.state.results.map((code,i) => {
							return <Results getResults={this.getResults} data={code} key={i} remove={this.removeUserInput}/>
						})}
					</ul>
				</form>
					<Footer />
			</div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('app'))
