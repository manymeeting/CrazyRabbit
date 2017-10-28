# Diablo Team Project
- Team Name: cmpe202-diablo

- Team Member Names: Mutian Wang, Zihan Ke, Weiyu Jin, Ruifeng Sheng, Xiaoran Lin


## Progress Overview:
- Link to Task Board (Stories + Defn. of Done):     
<https://github.com/nguyensjsu/cmpe202-diablo/projects/1>

- Link to Cumulative Flow Diagram (Team's Google Sheet):
<https://docs.google.com/spreadsheets/d/1WfpNNYRP3rYvUrdJ_wghL1T1OJrEb-SbJs0QuJBMSXY/edit#gid=2>

- Agile Practices Team is Adopting: Kanban -> Scrum

## Weekly Meeting Minutes
### Date: 10/28/2017
### Time: 6pm - 8pm
#### 1. What did we do last week?
    - Added elements for main character
    - Designed the stage2 map
 
## Weekly Meeting Minutes
### Date: 10/21/2017
### Time: 6pm - 8pm
#### 1. What did we do last week?
    - Added different character appearances for main character
    - Designed more items to be added to stage1 map
#### 2. What is the team going to do next week?
    - Combine all elements to stage 1 and make it playable
    - Continue Refactoring code to enhance extensibility
#### 3. What are the current blockers/challenges our team is facing?
    - Team members are getting busy
    - Adopt Scrum practices
    
### Date: 10/14/2017
### Time: 6pm - 8pm
#### 1. What did we do last week?
    - Dicided all the actions and movements of main character
    - Designed the weapon of main character
#### 2. What is the team going to do next week?
    - Develop more map elements for stage 1
    - Refactor code to enhance extensibility
#### 3. What are the current blockers/challenges our team is facing?
    - We are short of designers
    - Get ready to switch from Kanban to Scrum
    
### Date: 10/07/2017
### Time: 6pm - 8pm
#### 1. What did we do last week?
    - Defined the alignment of stage1 map
    - Finished all collision settings of map of stage 1.
    - Redesigned the main character: a rabbit
    - Designed character's action: using carrot as weapons
#### 2. What is the team going to do next week?
    - Discuss out all the actions and movements of main character
    - Design the first complete map in the game.
#### 3. What are the current blockers/challenges our team is facing?
    - How to deal with resolution (full-screen if possible, or use original).
    - A blue print of the game story
    - Which design pattern(s) should be implemented in this project.

### Date: 09/23/2017
### Time: 3pm - 5pm
#### 1. What did we do last week?
    - Decided how many levels of map will be in the game.
    - Designed the first version of players in this game.
    - Added enemies and other game items to the demo.
#### 2. What is the team going to do next week?
    - Experiments on adding enemies and other game items to the demo (e.g., coins, boxes)
    - Design the first version of maps in the game.
#### 3. What are the current blockers/challenges our team is facing?
    - How to deal with resolution (full-screen if possible, or use original).
    - How to make the maps "crazy".
    - Which design pattern(s) should be implemented in this project.

### Date: 09/17/2017
### Time: 3pm - 4pm
#### 1. What did we do last week?
    - Selection of programming language and framework: JavaScript, using MelonJS
    - Selection of game to design: CrazyMario
    - Learning of Github basic operations
    - A demo that contains basic character movement operations and map elements as an experiment (on "platformer" branch)
    - Installation of development environment on every team member's machine
    - Testing on the latest branch.
#### 2. What is the team going to do next week?
    - Experiments on adding enemies and other game items to the demo (e.g., coins, boxes)
    - Decide how many levels of map should be included in the game.
    - Design the first version of characters in the game.
#### 3. What are the current blockers/challenges our team is facing?
    - How to deal with player parameters, e.g., speed
    - How to deal with resolution (full-screen if possible, or use original).
    - How many levels of map should be included in the game.
    - Which design pattern(s) should be implemented in this project.

## Documentation of Crazy Mario
### Features
- video autoscaling
- mobile optimized HTML/CSS
- swiping disabled on iOS devices
- debug Panel (if #debug)
- default icons
- distribution build
- standalone build for desktop operating systems

### Installation

To build, be sure you have [node](http://nodejs.org) installed. Clone the project:

    git clone https://github.com/nguyensjsu/cmpe202-diablo.git

Switch to your operating branch:

    git checkout [branch name]

Then in the cloned directory, simply run:

    npm install

You must have `grunt-cli` installed globally:

    npm install -g grunt-cli

In the cloned directory, run the game:

    grunt serve

And you will have the boilerplate example running on http://localhost:8000

### Building Release Versions

To build:

    grunt

This will create a `build` directory containing the files that can be uploaded to a server, or packaged into a mobile app.

Building a standalone desktop release:

    grunt dist

Running the desktop release on Windows:

    .\bin\electron.exe

Running the desktop release on macOS:

    open ./bin/Electron.app

Running the desktop release on Linux:

    ./bin/electron

Note that you may have to edit the file `Gruntfile.js` if you need to better dictate the order your files load in. Note how by default the game.js and resources.js are specified in a specific order.

------------------------------------------------------------------------------
Copyright (C) 2011 - 2015 Olivier Biot, Jason Oster, Aaron McLeod,
Modified work Copyright 2017 Team Diablo.
melonJS is licensed under the [MIT License](http://www.opensource.org/licenses/mit-license.php)
