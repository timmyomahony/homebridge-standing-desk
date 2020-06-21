# Homebridge Standing Desk Plugin

A homebridge plugin to allow control of my Conset 501-49 standing desk via [my Raspberry Pi standing desk controller](https://github.com/timmyomahony/standing-desk/). 

<img src="https://raw.githubusercontent.com/timmyomahony/homebridge-standing-desk/master/resources/Screenshot%202020-06-21%20at%2014.33.20.jpg" width=300>

This plugin provides a switch Accessory with an on (i.e. "up") and off (i.e. "down") position that allows the raising and lowering of my desk via Home.app. The plugin doesn't handle any of the Raspberry Pi logic. Instead it simply sends a message to Redis which is picked up by the scripts in [`standing-desk`](https://github.com/timmyomahony/standing-desk/). 

## Installation 

This repo is based off of the [homebridge plugin template](https://github.com/homebridge/homebridge-plugin-template).

[Here is the homebridge installation guide for Raspberry Pi](https://github.com/homebridge/homebridge/wiki/Install-Homebridge-on-Raspbian)

To build the plugin:

```sh
npm run build && sudo npm link && sudo systemctl restart homebridge
```

Homebridge should detect and install the plugin.

## Todo:

- The homebridge plugin can't read the status of the table. It can only give commands. This means the table and the homebridge switch can get out of sync if I use the built-in display to raise/lower the table
