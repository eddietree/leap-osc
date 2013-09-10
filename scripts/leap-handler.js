
var g_leap;

function LeapHandler()
{
	this.controller = new Leap.Controller();
	this.console_prefix = "[Leap] ";
	
	
	this.connect = function () 
	{
		this.controller.connect();
		Log("\nWaiting for Leap device to connect...");

		this.controller.on("frame", function(frame) {
		  	//Log( g_leap.console_prefix + "Frame: " + frame.id + " @ " + frame.timestamp);
		});

		this.controller.on('ready', function()
		{
		    Log( g_leap.console_prefix + "ready");
		});

		this.controller.on('connect', function()
		{
		    Log( g_leap.console_prefix + "connect");
		});

		this.controller.on('disconnect', function()
		{
		    Log( g_leap.console_prefix + "disconnect");
		});

		this.controller.on('focus', function()
		{
		    Log( g_leap.console_prefix + "focus");
		});

		this.controller.on('blur', function()
		{
		    Log( g_leap.console_prefix + "blur");
		});

		this.controller.on('deviceConnected', function()
		{
		    Log( g_leap.console_prefix + "deviceConnected");
		});

		this.controller.on('deviceDisconnected', function()
		{
		    Log( g_leap.console_prefix + "deviceDisconnected");
		});


	}
}

g_leap = new LeapHandler();
g_leap.connect();