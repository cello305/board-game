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
    
    // Card data
    var unfairAdvantageCards = [
        "Steal a turn from another player",
        "Force another player to skip their next turn",
        "Take control of another player's piece for one turn",
        "Double your next dice roll",
        "Reroll any dice that show 1 or 2",
        "Force another player to roll with disadvantage",
        "Swap positions with another player",
        "Skip the next penalty space",
        "Gain immunity from the next negative card",
        "Steal a card from another player's hand",
        "Force another player to give you their best card",
        "Take an extra turn after this one",
        "Negate the next negative effect",
        "Force another player to roll for you",
        "Gain control of the board for one round",
        "Steal half of another player's points"
    ];
    
    var fortuneCards = [
        "Gain 100 bonus points",
        "Advance to the nearest safe space",
        "Collect 50 points from each player",
        "Skip the next three penalty spaces",
        "Gain immunity for the next three turns",
        "Double your current score",
        "Get a free pass on the next challenge",
        "Advance to the finish line",
        "Gain an extra life",
        "Collect all bonus cards on the board",
        "Skip directly to the final round",
        "Gain control of all special spaces",
        "Get a second chance if you lose",
        "Advance 5 spaces forward",
        "Gain the power to move other players",
        "Win the game immediately"
    ];

    that.init = function() {
        elem.container = $t.id('diceRoller');
        elem.result = $t.id('result');
        elem.instructions = $t.id('instructions');
        elem.center_div = $t.id('center_div');
        elem.cardDisplay = $t.id('cardDisplay');
        elem.cardHeader = $t.id('cardHeader');
        elem.cardText = $t.id('cardText');
        elem.cardClose = $t.id('cardClose');
        elem.unfairAdvantageCount = $t.id('unfairAdvantageCount');
        elem.fortuneCount = $t.id('fortuneCount');

        box = new DICE.dice_box(elem.container);
        box.bind_swipe(elem.center_div, before_roll, after_roll);

        // Add click handler for easier rolling
        $t.bind(elem.center_div, 'click', function(ev) {
            if (!box.rolling) {
                main.rollDice();
            }
        });
        
        // Add click handler for card close button
        $t.bind(elem.cardClose, 'click', function() {
            hideCard();
        });

        // Set default to 1d10
        box.setDice('1d10');

        show_instructions(true);
    }

    that.rollDice = function() {
        // Simple roll function - always rolls 1d10
        box.start_throw(before_roll, after_roll);
    }
    
    function showCard(cardType, cardText) {
        elem.cardHeader.innerHTML = cardType;
        elem.cardText.innerHTML = cardText;
        elem.cardDisplay.style.display = 'flex';
    }
    
    function hideCard() {
        elem.cardDisplay.style.display = 'none';
    }
    
    function drawCard(cardType) {
        var cards, countElement;
        
        if (cardType === 'Unfair Advantage') {
            cards = unfairAdvantageCards;
            countElement = elem.unfairAdvantageCount;
        } else {
            cards = fortuneCards;
            countElement = elem.fortuneCount;
        }
        
        // Get random card
        var randomIndex = Math.floor(Math.random() * cards.length);
        var cardText = cards[randomIndex];
        
        // Update count
        var currentCount = parseInt(countElement.innerHTML);
        countElement.innerHTML = currentCount - 1;
        
        // Show card
        showCard(cardType, cardText);
        
        return cardText;
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
            var rollResult = notation.result[0];
            elem.result.innerHTML = notation.resultString;
            
            // Determine card type based on roll result
            if (rollResult >= 1 && rollResult <= 4) {
                // Unfair Advantage card
                setTimeout(function() {
                    drawCard('Unfair Advantage');
                }, 1000);
            } else if (rollResult >= 5 && rollResult <= 10) {
                // Fortune card
                setTimeout(function() {
                    drawCard('Fortune');
                }, 1000);
            }
        }
    }

    return that;
}());
