"use strict";

/** @brief 3d d10 dice roller web app
 *  @author Sarah Rosanna Busch
 *  @date 10 Aug 2023
 *  @version 0.1
 */

window.onkeydown = function(e) {
    if(e.code === "Enter" || e.code === "Escape") {
        main.rollDice(); //simple roll function
    }
}

 var main = (function() {
    var that = {}; 
    var elem = {}; 
    var box = null;

    that.init = function() {
        elem.container = $t.id('diceRoller');
        elem.result = $t.id('result');
        elem.instructions = $t.id('instructions');
        elem.center_div = $t.id('center_div');

        box = new DICE.dice_box(elem.container);
        box.bind_swipe(elem.center_div, before_roll, after_roll);

        // Add click handler for easier rolling
        $t.bind(elem.center_div, 'click', function(ev) {
            if (!box.rolling) {
                main.rollDice();
            }
        });

        // Set default to 1d10
        box.setDice('1d10');

        show_instructions(true);
    }

    that.rollDice = function() {
        // Simple roll function - always rolls 1d10
        box.start_throw(before_roll, after_roll);
    }

    // show 'Roll Dice' swipe instructions
    // param show = bool
    function show_instructions(show) {
        if(show) {
            elem.instructions.style.display = 'inline-block';
        } else {
            elem.instructions.style.display = 'none';
        }
    }

    // @brief callback function called when dice roll event starts
    // @param notation indicates which dice are going to roll
    // @return null for random result || array of desired results
    function before_roll(notation) {
        show_instructions(false);
        elem.result.innerHTML = '';       
        return null;
    }

    // @brief callback function called once dice stop moving
    // @param notation now includes results
    function after_roll(notation) {
        if(notation.result[0] < 0) {
            elem.result.innerHTML = "Oops, your dice fell off the table. <br> Refresh and roll again."
        } else {
            elem.result.innerHTML = notation.resultString;
        }
    }

    return that;
}());
