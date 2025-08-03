# 3D D10 DICE ROLLER

A simplified 3D dice roller focused specifically on d10 dice. This library animates a d10 polyhedron with numbers on each face that are visible while rolling, and includes a sound effect. Perfect for games that primarily use d10 dice or as a starting point for a custom dice roller.

# Usage

Clone this repo and open index.html in a web browser. The app will display a single d10 die that you can roll by swiping or clicking.

## dice.js

Create a new dice_box and pass it the dom element you want to contain it. (The dice box canvas will fill to the size of the container element.)

```javascript
    var box = new DICE.dice_box(elem);
```

The dice box defaults to rolling 1d10. You can change this by calling setDice():

```javascript
    box.setDice("1d10");  // Single d10
    box.setDice("3d10");  // Three d10 dice
```

Call start_throw() to roll the current set of dice.

```javascript
    box.start_throw();
```

Or bind throw to a swipe event on the element passed into bind_swipe()

```javascript
    box.bind_swipe(elem);
```

Optional callback functions can be passed into both start_throw() and bind_swipe().

```javascript
    box.start_throw(before_roll, after_roll);
    box.bind_swipe(elem, before_roll, after_roll);

    // @brief callback function called when dice roll event starts
    // @param notation indicates which dice are going to roll
    // @return null for random result || array of desired results
    function before_roll(notation) {
        console.log('before_roll notation: ' + JSON.stringify(notation));
        //do some stuff before roll starts        
        return null;
    }

    // @brief callback function called once dice stop moving
    // @param notation now includes results
    function after_roll(notation) {
        console.log('after_roll notation: ' + JSON.stringify(notation));
        //do something with the results
    }
```

Dice notation object structured as follows:

```javascript
    {
        "set":["d10","d10","d10"],
        "constant":0,
        "result":[7,3,9],
        "resultTotal":19,
        "resultString":"7 3 9 = 19",
        "error":false
    }
```

# Features

- 3D d10 dice with realistic physics
- Sound effects during rolling
- Swipe or click to roll
- Responsive design
- Simple, clean interface

# CREDITS

This project is derived from the work of Anton Natarov (aka Teal) found at http://www.teall.info/2014/01/online-3d-dice-roller.html and uses [three.js](https://github.com/mrdoob/three.js/) and [canon.js](https://github.com/schteppe/cannon.js) for the geometry and physics.

Sound Effect courtesy of http://commons.nicovideo.jp/material/nc93322 and https://github.com/chukwumaijem/roll-a-die.


