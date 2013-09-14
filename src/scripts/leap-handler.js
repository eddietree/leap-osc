
var g_leap;

function LeapHandler()
{
	this.controller = new Leap.Controller({enableGestures: true});
	this.console_prefix = "[Leap] ";
	this.scale = 0.05;
	this.connected = false;

	$('#num-hands').html( 0 );
	$('#num-fingers').html( 0 );
	
	this.outputFrame = function( a_frame )
	{
		var num_hands = a_frame.hands.length;
		var num_fingers = a_frame.fingers.length;
		var leap_prefix = "/leap";
		var scale = this.scale;

		g_osc.send( leap_prefix+"/num_hands", "i", [num_hands] );
		g_osc.send( leap_prefix+"/num_fingers", "i", [num_fingers] );

		$('#num-hands').html( num_hands );
		$('#num-fingers').html( num_fingers );

		// output hands
		for (var hand_id = 0; hand_id < num_hands; hand_id++) 
		{
        	var hand = a_frame.hands[hand_id];
        	var hand_prefix = leap_prefix+"/"+hand_id;
        	var num_fingers_in_hand = hand.fingers.length;

        	g_osc.send(hand_prefix+"/palm_pos", "fff", [hand.palmPosition[0]*scale, hand.palmPosition[1]*scale,hand.palmPosition[2]*scale] );
        	g_osc.send(hand_prefix+"/palm_normal", "fff", [hand.palmNormal[0], hand.palmNormal[1],hand.palmNormal[2]] );
        	g_osc.send(hand_prefix+"/palm_vel", "fff", [hand.palmVelocity[0]*scale, hand.palmVelocity[1]*scale,hand.palmVelocity[2]*scale] );
        	g_osc.send(hand_prefix+"/sphere_center", "fff", [hand.sphereCenter[0]*scale, hand.sphereCenter[1]*scale,hand.sphereCenter[2]*scale] );
        	g_osc.send(hand_prefix+"/sphere_radius", "f", [hand.sphereRadius*scale] );
        	g_osc.send(hand_prefix+"/num_fingers", "i", [num_fingers_in_hand] );
        
        	// output fingers
        	for (var finger_id = 0; finger_id < num_fingers_in_hand; finger_id++) 
			{
				var finger = hand.fingers[finger_id];
				var finger_prefix = hand_prefix+"/"+finger_id;

				g_osc.send(finger_prefix+"/tip_pos", "fff", [finger.tipPosition[0]*scale, finger.tipPosition[1]*scale,finger.tipPosition[2]*scale] );
				g_osc.send(finger_prefix+"/tip_vel", "fff", [finger.tipVelocity[0]*scale, finger.tipVelocity[1]*scale,finger.tipVelocity[2]*scale] )
				g_osc.send(finger_prefix+"/dir", "fff", [finger.direction[0], finger.direction[1],finger.direction[2]] );
				g_osc.send(finger_prefix+"/touch_dist", "f", [finger.touchDistance] );
			}
        }
	}

	this.connect = function () 
	{
		this.controller.connect();
		Log( g_leap.console_prefix + "Waiting for Leap device to connect...");

		this.controller.on('frame', function(frame) 
		{
			if ( this.connected )
			{
				g_leap.outputFrame(frame);
			}
		});

		this.controller.on('ready', function()
		{
			this.connected = true;
		    Log( g_leap.console_prefix + "ready");
		});

		this.controller.on('connect', function()
		{
		    Log( g_leap.console_prefix + "connect");
		});

		this.controller.on('disconnect', function()
		{
			this.connected = false;
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
			this.connected = true;
		    Log( g_leap.console_prefix + "deviceConnected");
		});

		this.controller.on('deviceDisconnected', function()
		{
			this.connected = false;
		    Log( g_leap.console_prefix + "deviceDisconnected");
		});
	}
}

g_leap = new LeapHandler();
g_leap.connect();