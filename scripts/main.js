$(function() 
{

    var controller = new Leap.Controller()
controller.on("frame", function(frame) {
  console.log("Frame: " + frame.id + " @ " + frame.timestamp);
});

controller.connect();
Log("\nWaiting for Leap device to connect...");

  });

