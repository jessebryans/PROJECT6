import React from 'react';

export default class Signin extends React.Component{
	constructor() {
		super();
		this.state = {
			formToShow: '',
			email: '',
			password: '',
			confirm: '',
			loggedIn: false
		}
		this.formToShow = this.formToShow.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.signup = this.signup.bind(this);
		this.login = this.login.bind(this);
		this.signout = this.signout.bind(this);


	}
	formToShow(e) {
		e.preventDefault();
		this.setState({
			formToShow: e.target.className, 
		}); 
	} 
	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});console.log(e)
	}
	signup(e) {
		e.preventDefault();
		if(this.state.password === this.state.confirm)
		firebase.auth().createUserWithEmailAndPassword(this.state.email,this.state.password)
		.then((data)=> {
			console.log(data)
		}) 
	}
	login(e) {
		e.preventDefault();
		firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.password)
		.then((data)=> {
			console.log(data)
			this.setState({
				loggedIn: true
			})
		});
	}
	componentDidMount() {
		firebase.auth().onAuthStateChanged((user)=> {
			if (user) {
				this.setState({
					loggedIn: true
				})

			}
		})
	}
		// firebase.auth().onAuthStageChange
		// if there is a user
		// set hte state of logged in to be equal to true
	signout(e) {
		firebase.auth().signOut().then(function(success) {
			console.log('signed out')
		});
	}
	render() {
		let formToDisplay = '';
		if(this.state.formToShow === 'signup') {
			formToDisplay = (
				<form onSubmit={this.signup} className='user-form'>
					<label htmlFor="email">Email: </label>
					<input type="email" name="email" onChange=
						{this.handleChange} />
					<label htmlFor="password"> Password: </label>
					<input type="password" name="password" onChange={this.handleChange} />
					<label htmlFor="confirm">Confirm Password: </label>
					<input type="password" name="confirm" onChange={this.handleChange} />
					<button>Sign In</button>
				</form>
			)
		}
		else if(this.state.formToShow === "login") {
			let greeting = ( <h3>Hello User {this.state.email}</h3> )
			formToDisplay = (
				<div>
					<form onSubmit={this.login} className="user-form">
						<label htmlFor="email">Email: </label>
						<input type="email" name="email" onChange={this.handleChange}/>
						<label htmlFor="password">Password: </label>
						<input type="password" name="password" onChange={this.handleChange}/>
						<button>Log In</button>
					</form>
					{this.state.loggedIn === true ? greeting : null }
				</div>
			);
		}
		
		let loginMessage = (
				<h2>you are logged in</h2>
			)
	return (
		<div>
			<header>
				<h1>Dev Dream Journal</h1>
				<nav>
					<ul className='signin-login-form'>
						<li><a href="" className="signup" onClick={this.formToShow}>Sign Up</a></li>
						<li><a href="" className="login" onClick={this.formToShow}>Log In</a></li>
						<li><a href="" className="logout" onClick={this.signout}>Log Out</a></li>
					</ul>
				</nav>
			</header>
			{this.state.loggedIn === true ? loginMessage : null}
			{formToDisplay}
		</div>
		)
	}
}