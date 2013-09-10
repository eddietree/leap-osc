
var g_osc;


function isValidIPAddress( a_ip )
 {
    var CheckIP = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
    return CheckIP.test(a_ip);
}

function isValidPort( a_port )
 {
    return !isNaN(a_port);
}

function Osc()
{
	this.ip = '127.0.0.1';
	this.port = 8000;
	this.osc = require('omgosc');
	this.connected = false;
	this.console_prefix = "[osc] ";

	this.connect = function( a_ip, a_port )
	{
		// close previous udp sender
		if ( this.sender )
		{
			this.sender.close();
			this.connected = false;

			var console_msg = this.console_prefix + 'Disconnected from ' + this.ip + ':' + this.port;
			Log(console_msg);
		}

		var valid = true;

		// test port
		if ( !isValidPort(a_port) )
		{
			//alert(false);
			ShowErrorMsg( "Error!", "Invalid port '" + a_port + "'" );
			valid = false;
		}

		// invalid port
		if ( !isValidIPAddress(a_ip) )
		{
			//alert(a_ip);
			ShowErrorMsg( "Error!", "Invalid IP address '" + a_ip + "'" );
			valid = false;
		}

		if ( valid )
		{
			this.ip = a_ip;
			this.port = a_port;
			this.sender = new this.osc.UdpSender(this.ip, this.port);
			this.connected = true;

			$('#input-ip').val(this.ip);
			$('#input-port').val(this.port);
			$(".alert").alert('close'); // close all alerts

			Log( this.console_prefix + "Connected to " + this.ip + ':' + this.port );
		}
	}

	this.send = function( a_address, a_types, a_data_array )
	{
		if ( !this.connected ) return;

		this.sender.send(a_address, a_types, a_data_array);

		var total = a_data_array.reduce(function(a, b) {
		    return a + ' ' + b;
		});

		var console_msg = this.console_prefix + 'Sent ' + a_address + ' ' + total;
		Log(console_msg);
	}
}

g_osc = new Osc();
g_osc.connect('127.0.0.1', 8000);
//g_osc.send( "/leap_osc", "s", ["hello", 1000.0,1.0,1.0] );