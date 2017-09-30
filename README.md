Diablo Team Project
-------------------------------------------------------------------------------

<<<<<<< HEAD
=======

------------This part is for Adam Ke -----------


<blockquote class="twitter-tweet" data-lang="zh-cn"><p lang="en" dir="ltr">Google: 90% of our engineers use the software you wrote (Homebrew), but you can’t invert a binary tree on a whiteboard so fuck off.</p>&mdash; Max Howell (@mxcl) <a href="https://twitter.com/mxcl/status/608682016205344768?ref_src=twsrc%5Etfw">2015年6月10日</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
<<<<<<< HEAD

=======
>>>>>>> parent of fa655c2... Update README.md

>>>>>>> parent of fa655c2... Update README.md
features :
- video autoscaling
- mobile optimized HTML/CSS
- swiping disabled on iOS devices
- debug Panel (if #debug)
- default icons
- distribution build
- standalone build for desktop operating systems

## To build the development environment

To build, be sure you have [node](http://nodejs.org) installed. Clone the project:

    git clone https://github.com/nguyensjsu/cmpe202-diablo.git

Then in the cloned directory, simply run:

    npm install

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
<<<<<<< HEAD
<<<<<<< HEAD


<<<<<<< HEAD
=======
>>>>>>> parent of 453ebc5... Adam's WorkSpace
=======
>>>>>>> parent of 453ebc5... Adam's WorkSpace
=======

This part is for Adam Ke -----------
>>>>>>> parent of d8f69e6... Update README.md
