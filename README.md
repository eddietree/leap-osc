leap-osc
========

> Minimalistic native client that sends [Leap Motion](https://www.leapmotion.com/) data as [OSC 1.1](http://opensoundcontrol.org/).


![Screenshot](http://i.imgur.com/h02EPqQ.png)

Built with [node-webkit](https://github.com/rogerwang/node-webkit) and uses the [omgosc](https://github.com/deanm/omgosc) and [leapjs](https://github.com/leapmotion/leapjs) modules.

## OSC Packet Format

All OSC packets sent will have an address that starts with `/leap`. For example `/leap/num_hands` or `/leap/0/1/tip_pos`

The value after the address (ex. `fff`) denotes the data type that is emitted from this address. For example `fff` mean that three floats will be emitted or `i` means only one integer is emitted.

### Frame

* `/leap/num_hands` - `i`  - number of hands in this frame
* `/leap/num_finger` - `i`  - number of fingers in this frame

### Hand

The index of the hand will be the first number after `/leap`. For example, `/leap/0` refers to the hand at index `0` and `/leap/1` refers to the hand at index `1`.

* `/leap/[HAND_INDEX]/num_fingers` - `i` - number of fingers this hand contains
* `/leap/[HAND_INDEX]/palm_pos` - `fff` - position of the palm
* `/leap/[HAND_INDEX]/palm_normal` - `fff` - normal direction of the palm
* `/leap/[HAND_INDEX]/palm_vel` - `fff` - velocity of the palm
* `/leap/[HAND_INDEX]/sphere_center` - `fff` - center position of the of the sphere that the palm holds
* `/leap/[HAND_INDEX]/sphere_radius` - `f` - radius of the sphere that the palm holds

### Finger

The finger of the hand will be the second number after `/leap`. For example, `/leap/1/2` refers to the hand at index `1` and finger at index `2`.

* `/leap/[HAND_INDEX]/[FINGER_INDEX]/tip_pos` - `fff` - position of the finger tip
* `/leap/[HAND_INDEX]/[FINGER_INDEX]/tip_vel` - `fff` - velocity of the finger tip
* `/leap/[HAND_INDEX]/[FINGER_INDEX]/dir` - `fff` - direction that the finger tip is pointing
* `/leap/[HAND_INDEX]/[FINGER_INDEX]/touch_dist` - `f` - 2D touch distance


## Settings

![Settings](http://i.imgur.com/oHCOS52.png)

In the settings drop-down menu, you can change the values for:

* **Refresh Delay** - Controls to how long leap-osc should wait until sending another frame of data. For example, a delay of `50` would cause leap-osc to wait `50 milliseconds` until it sends another package of data.
* **Scale** - Controls how much to scale the postion and velocities of the hand/finger data. For example, a scale of `0.5` will cause all positions to be scaled down by one-half.


## How to Run

You can download the [prebuilt-binary here](https://github.com/eddietree/leap-osc/releases/tag/0.1).

Or you can manually build it yourself using [node-webkit](https://github.com/rogerwang/node-webkit). Please refer to [this guide](https://github.com/rogerwang/node-webkit/wiki/How-to-run-apps) on how to run apps from source code. A hint if you go this direction is to use the leap-osc `src` folder when running it from the nw binary.

