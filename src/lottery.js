import web3 from './web3';

const address = '0x4356125bAF179A4EA51d54f8A2639124F0547838';

const abi = [
	{
		constant        : true,
		inputs          : [],
		name            : 'manager',
		outputs         : [ { name: '', type: 'address' } ],
		payable         : false,
		stateMutability : 'view',
		type            : 'function'
	},
	{
		constant        : false,
		inputs          : [],
		name            : 'pickWinner',
		outputs         : [],
		payable         : false,
		stateMutability : 'nonpayable',
		type            : 'function'
	},
	{
		constant        : true,
		inputs          : [],
		name            : 'getPlayers',
		outputs         : [ { name: '', type: 'address[]' } ],
		payable         : false,
		stateMutability : 'view',
		type            : 'function'
	},
	{
		constant        : false,
		inputs          : [],
		name            : 'enter',
		outputs         : [],
		payable         : true,
		stateMutability : 'payable',
		type            : 'function'
	},
	{
		constant        : true,
		inputs          : [ { name: '', type: 'uint256' } ],
		name            : 'players',
		outputs         : [ { name: '', type: 'address' } ],
		payable         : false,
		stateMutability : 'view',
		type            : 'function'
	},
	{
		inputs          : [],
		payable         : false,
		stateMutability : 'nonpayable',
		type            : 'constructor'
	}
];
//creating a local copy of contract in our browser
export default new web3.eth.Contract(abi, address);
