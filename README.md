Diablo Team Peoject
-------------------------------------------------------------------------------

features :
- video autoscaling
- mobile optimized HTML/CSS
- swiping disabled on iOS devices
- debug Panel (if #debug)
- default icons
- distribution build
- standalone build for desktop operating systems

## To run distribution

To build, be sure you have [node](http://nodejs.org) installed. Clone the project:

    git clone https://github.com/nguyensjsu/cmpe202-diablo.git

You must have `grunt-cli` installed globally:

    npm install -g grunt-cli

In the cloned directory, run the game:

	grunt serve

And you will have the boilerplate example running on http://localhost:8000

## Building Release Versions

To build:

    grunt

This will create a `build` directory containing the files that can be uploaded to a server, or packaged into a mobile app.

----

Building a standalone desktop release:

    grunt dist

Running the desktop release on Windows:

    .\bin\electron.exe

Running the desktop release on macOS:

    open ./bin/Electron.app

Running the desktop release on Linux:

    ./bin/electron

Note that you may have to edit the file `Gruntfile.js` if you need to better dictate the order your files load in. Note how by default the game.js and resources.js are specified in a specific order.

-------------------------------------------------------------------------------
Copyright (C) 2011 - 2015 Olivier Biot, Jason Oster, Aaron McLeod,
Modified work Copyright 2017 Team Diablo.
melonJS is licensed under the [MIT License](http://www.opensource.org/licenses/mit-license.php)
