
var g_leap;

function LeapHandler()
{
	this.controller = new Leap.Controller({enableGestures: true});
	this.console_prefix = "[Leap] ";
	
	this.outputFrame = function( a_frame )
	{
		var num_hands = a_frame.hands.length;
		var num_fingers = a_frame.pointables.length;
		var leap_prefix = "/leap";
		var scale = 1.0;

		g_osc.send( leap_prefix+"/numhands", "i", [num_hands] );
		g_osc.send( leap_prefix+"/numfingers", "i", [num_fingers] );

		$('#num-hands').html( num_hands );
		$('#num-fingers').html( num_fingers );

		
		for (var hand_id = 0; hand_id < num_hands; hand_id++) 
		{
        	var hand = a_frame.hands[hand_id];
        	var hand_prefix = leap_prefix+"/"+hand_id;

        	g_osc.send(hand_prefix+"/palm_pos", "fff", [hand.palmPosition[0]*scale, hand.palmPosition[1]*scale,hand.palmPosition[2]*scale] );
        	g_osc.send(hand_prefix+"/palm_normal", "fff", [hand.palmNormal[0], hand.palmNormal[1],hand.palmNormal[2]] );
        	g_osc.send(hand_prefix+"/palm_vel", "fff", [hand.palmVelocity[0]*scale, hand.palmVelocity[1]*scale,hand.palmVelocity[2]*scale] );
        	g_osc.send(hand_prefix+"/sphere_center", "fff", [hand.sphereCenter[0]*scale, hand.sphereCenter[1]*scale,hand.sphereCenter[2]*scale] );
        	g_osc.send(hand_prefix+"/sphere_radius", "f", [hand.sphereRadius*scale] );
        }
	}

	this.connect = function () 
	{
		this.controller.connect();
		Log("\nWaiting for Leap device to connect...");

		this.controller.on('frame', function(frame) 
		{
			

			g_leap.outputFrame(frame);
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