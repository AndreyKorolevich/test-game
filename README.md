# Mahi Gaming: Game Dev Skills Assessment

## 1. Overview

This is the Mahi Gaming game developer skills assessment. This project includes the boilerplate necessary to run your game so you can focus on the task at hand (programming) rather than wiring up a node/typescript project.

This project serves only as a skeleton. How you structure and organize your project is up to you. You are free to modify anything.

The pixi.js renderer has been included. You are free to use it or use your own rendering solution.

It's recommended to use Visual Studio Code for your editing.

## 2. Project Setup

### Prerequisites

You should have Node.js 12+ (and npm) installed.

### Install Dependencies

From a terminal within this project's root directory, run:

```sh
npm install
```

This will install all necessary dependencies. This only needs to be run once. Disregard any warnings, as they will not impact your project.

### Running The Project

To run the project, within your project's root directory, run:

```sh
npm start
```

This will launch a webpack development server. Once started, your browser window will auto-refresh when code changes are made.
The base skeleton will render a black box and nothing more. Build upon this blank canvas as you please.
## Answer:

Answer: I created a scheme in google doc and opened access to files, but if there are any difficulties with opening the link, please let me know
https://docs.google.com/drawings/d/1tTVRAVaZH9d_BKcOghv8ROe0MnYUL-XS9bAakD-XLvU/edit

### Slot-Machine
Learning and developing programming skills is an integral part of a good specialist. In my opinion, game development is the best learning tool. It is in gamedev that one can meet the most complex algorithms, high performance requirements and non-standard tasks.

The following technologies will be required during development: html, css, javascript, PIXI, strategy and design patterns state, SPA application methodology, PIXI library.

The algorithm should be as flexible as possible. To do this, divide the task into parts. Each part should be as independent as possible from the other.

#### Rendering - working with the page (creating a canvas, setting its size, subscribing to events, inserting buttons, managing their presence, loading images, etc.)

#### SlotMashine is the game logic that contains the basic calculations. Encapsulates the various states a device can be in and the transitions between them. The interface, accessible from the outside, presents ways to open slots, start and stop the game, and balance parameters.

#### PIXY - display on canvas. It is important to separate drawing from game logic. Scene drawing methods may vary depending on conditions. If you make changes to the game logic module, you can inadvertently damage someone else's well-debugged code.

The configuration file should also be placed in a separate module. In large games, the configuration consists of hundreds of parameters. Requirements may change at any time.

preload
Access to the start of the game is possible only after pre-loading all the images of the lots.


There are several reels, elements are randomly located in them, which in turn are described by coordinates. At each iteration of the game, an offset is added to the "y" coordinate of all elements. that go beyond the visible playing field are moved to the beginning. After each recalculation, the elements are displayed in the visible part of the field. And so on until the stop event from the ticker arrives. But the calculations don't end there. it is necessary to check whether the winning combination has fallen out. If all the symbols in one of the lines are the same, then the Ugrian icon wins.

So, let's sum up.

The task is based on:

Thoughtful configuration. \
Preloading resources into RAM.\
game scene.\
Scene Initialization and Time Reset.\
game loop.\
Scene recalculation on each iteration of the game loop.\
Scene display after each recalculation.\
Saving resources.
## 3. Tasks

### a. Slot Machine UML/Class Diagram/Flow Chart

You are required to create a UML or equivalent Class Diagram with an accompanying Flow Chart for a slot game.

### b. Slot Machine Implementation

You are required to develop a slot game using programmatic motion for the spinning reels. There should be 5 reels, with 3 symbols visible on each reel.

From a test perspective, you must provide a mechanism that allows reel targets to be set. When the reels are spun, it must stop at this predefined target.

This must support responsive browsing. Your game canvas should fit to the screen at any resolution.

## 4. Bonuses

1. Add unit tests. Unit testing support has already been added to this project via jest.

2. Support dynamic number of reels/rows.

3. Support multiple directions of spinning reels.

4. Any other clever ideas you may have to demonstrate your abilities.
