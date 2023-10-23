import React, {Component} from 'react';
import CardList from '../components/CardList';
import SearchBox from'../components/SearchBox';
import '../containers/App.css';
import Scroll from '../components/Scroll.js';


class App extends Component {
	constructor() {
		super() // calls constructor of Component
		this.state = {
			robots: [],
			searchfield: ''
		}
	}

	componentDidMount() {
		fetch('https://jsonplaceholder.typicode.com/users')//http request, fetch recives a response
			.then(response => response.json())
			.then(users => {this.setState({robots: users})})
	}

	onSearchChange = (event) => {
		this.setState({searchfield: event.target.value}) // a method that comes with react to change state

	}
	render() {
		const {robots, searchfield} = this.state;
		const filteredRobots = robots.filter(robot => {
			return robot.name.toLowerCase().includes(searchfield.toLowerCase());
		});
		if(!robots.length) {
			return <h1> Loading </h1>
		} else  {
			return (
				<div className='tc'>
					<h1 className='f1'> RoboFriends </h1>
					<SearchBox searchChange={this.onSearchChange}/>
					<Scroll>
						<CardList robots={filteredRobots}/>
					</Scroll>
				</div>
			);
		}
	}
}

export default App;