## Slot-Machine
### Deploy: https://golden-dieffenbachia-31d830.netlify.app/
### UML: https://docs.google.com/drawings/d/1IGjMHLpTIRtL_8_W04ZJwZQOyaKUX7m0vmzH-PeIiRA/edit

Learning and developing programming skills is an integral part of a good specialist. In my opinion, game development is the best learning tool. It is in gamedev that one can meet the most complex algorithms, high performance requirements and non-standard tasks.

The following technologies will be required during development: html, css, javascript, strategy and state design patterns, SPA application methodology, PIXI library.

The algorithm should be as flexible as possible. To do this, divide the task into parts. Each part should be as independent as possible from the other.

#### Rendering - working with the page (creating a canvas, setting its size, subscribing to events, inserting buttons, managing their presence, loading images, etc.)

#### SlotMashine is the game logic that contains the basic calculations. Encapsulates the various states a device can be in and the transitions between them. The interface, accessible from the outside, presents ways to open slots, start and stop the game, and balance parameters.

#### PIXY - display on canvas. It is important to separate drawing from game logic. Scene drawing methods may vary depending on conditions. If you make changes to the game logic module, you can inadvertently damage someone else's well-debugged code.

The configuration file should also be placed in a separate module. In large games, the configuration consists of hundreds of parameters. Requirements may change at any time.

preload
Access to the start of the game is possible only after pre-loading all the images of the lots.


There are several reels, elements are randomly located in them, which in turn are described by coordinates. At each iteration of the game, an offset is added to the "y" coordinate of all elements. that go beyond the visible playing field are moved to the beginning. After each recalculation, the elements are displayed in the visible part of the field. And so on until the stop event from the ticker arrives. But the calculations don't end there. it is necessary to check whether the winning combination has fallen out. If all the symbols in one of the lines are the same, then the player wins.

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
