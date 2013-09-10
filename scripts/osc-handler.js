
var g_osc;

function Osc()
{
	this.ip = '127.0.0.1';
	this.port = 8000;
	this.osc = require('omgosc');
	
	this.connect = function( a_ip, a_port )
	{
		// TODO: make sure valid ip/port!
		
		this.ip = a_ip;
		this.port = a_port;
		this.sender = new this.osc.UdpSender(this.ip, this.port);
	}

	this.send = function( a_address, a_types, a_data_array )
	{
		this.sender.send(a_address, a_types, a_data_array);
	}
}

g_osc = new Osc();
g_osc.connect('127.0.0.1', 8000);
g_osc.send( "/ROBYN", "sfff", ["hello", 1000.0,1.0,1.0] );