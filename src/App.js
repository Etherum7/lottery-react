import React, { Component } from 'react';

import lottery from './lottery';
import './App.css';
import web3 from './web3';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			manager : '',
			balance : '',
			value   : '',
			message : '',
			players : []
		};
	}
	async componentDidMount() {
		//automatically from metamask address
		const manager = await lottery.methods.manager().call();
		const players = await lottery.methods.getPlayers().call();
		const balance = await web3.eth.getBalance(lottery.options.address);
		this.setState({ manager, balance, players });
	}
	handleSubmit = async (event) => {
		event.preventDefault();
		let accounts = await web3.eth.getAccounts();
		this.setState({ message: 'Waiting for transaction success ' });
		await lottery.methods.enter().send({
			from  : accounts[0],
			value : web3.utils.toWei(this.state.value, 'ether')
		});
		this.setState({ message: 'Transaction Succeeded ' });
	};
	handleClick = async () => {
		let accounts = await web3.eth.getAccounts();
		this.setState({ message: 'Waiting for transaction success ' });
		await lottery.methods.pickWinner().send({ from: accounts[0] });
		this.setState({
			message :
				'A winner has been picked check your luck in ethereum wallet'
		});
	};
	render() {
		return (
			<div className="App">
				<h2>Lottery Contract</h2>
				<p style={{ fontSize: '1.4rem' }}>
					This Contract is managed by{' '}
					<span style={{ color: '#ff0000' }}>
						{this.state.manager}
					</span>. <br />There are currently{' '}
					<span style={{ color: '#8945ef' }}>
						{this.state.players.length}
					</span>{' '}
					people competing to win{' '}
					<span style={{ color: '#0000ff' }}>
						{web3.utils.fromWei(this.state.balance, 'ether')}
					</span>{' '}
					ether!
				</p>
				<form onSubmit={this.handleSubmit}>
					<h4> Wanna try your luck ?</h4>
					<div>
						<label>
							Amount of ether to enter{' '}
							<span role="img" aria-label="ethereum">
								💎
							</span>
						</label>
						<input
							style={{ margin: '1rem' }}
							onChange={(event) =>
								this.setState({ value: event.target.value })}
						/>
						<br />
						<button
							style={{
								padding         : '0.5rem',
								backgroundColor : '#345fef'
							}}>
							Enter
						</button>
					</div>
				</form>
				<h3>Time to pick a winner (Only if you are manager)</h3>
				<button onClick={this.handleClick}>Pick a winner</button>
				<h2>{this.state.message}</h2>
			</div>
		);
	}
}

export default App;
