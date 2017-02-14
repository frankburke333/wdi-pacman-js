// Setup initial game stats
var score = 0;
var lives = 3;
var powerPellets = 4;
var ghostCount = 0
var dotsRemaining = 240
var level = 0
var cherry = 1
var strawberry = 1
var orange = 1
var apple = 1
var pineapple = 1
var galaxian = 1
var bell = 1
var key = 1


// Define your ghosts here

var inky = {
  menu_option: '1',
  name: 'Inky',
  colour: 'Red',
  character: 'Shadow',
  edible: 'Inedible'
};

var blinky = {
  menu_option: '2',
  name: 'Blinky',
  colour: 'Cyan',
  character: 'Speedy',
  edible: 'Inedible'
};

var pinky = {
  menu_option: '3',
  name: 'Pinky',
  colour: 'Pink',
  character: 'Bashful',
  edible: 'Inedible'
};

var clyde = {
  menu_option: '4',
  name: 'Clyde',
  colour: 'Orange',
  character: 'Shadow',
  edible: 'Inedible'
};


// replace this comment with your four ghosts setup as objects

var ghosts = [inky, "Blinky", "Pinky", "Clyde"];


// Draw the screen functionality
function drawScreen() {
  clearScreen();
  setTimeout(function() {
    displayStats();
    displayMenu();
    displayPrompt();
  }, 10);
}

function clearScreen() {
  console.log('\x1Bc');
}

function displayStats() {
  console.log('Score: ' + score + '     Lives: ' + lives);
  console.log('Power Pellets: ' + powerPellets  );
  console.log('Dots Remaining: ' + dotsRemaining  );
  console.log('Level: ' + level  );

}

function displayMenu() {
  console.log('\n\nSelect Option:\n');  // each \n creates a new line
  if (dotsRemaining >= 10) {console.log('(d) Eat 10 Dots');}
  if (dotsRemaining >= 100) {console.log('(e) Eat 100 Dots');}
  console.log('(f) Eat ALL Dots');
  if (powerPellets > 0){ console.log('(p) Eat Power Pellet');}
  if (level === 1 && cherry === 1){console.log('(c) CHERRY BONUS!');}
  if (level === 2 && strawberry === 1){console.log('(s) STRAWBERRY BONUS!');}
  if (level === 3 && orange === 1){console.log('(o) ORANGE BONUS!');}
  if (level === 5 && apple  === 1){console.log('(a) APPLE BONUS!');}
  if (level === 7 && pineapple === 1){console.log('(p) PINEAPPLE BONUS!');}
  if (level === 9 && galaxian === 1){console.log('(s) GALAXIAN SPACESHIP BONUS!');}
  if (level === 11 && bell === 1){console.log('(o) BELL BONUS!');}
  if (level === 13 && key  === 1){console.log('(a) KEY BONUS!');}
  console.log("(1) Eat " + inky.name + " Status: " + inky.edible + '');
  console.log("(2) Eat " + blinky.name + " Status: " + blinky.edible + '');
  console.log("(3) Eat " + pinky.name + " Status: " + pinky.edible + '');
  console.log("(4) Eat " + clyde.name + " Status: " + clyde.edible + '');
  console.log('(q) Quit');
}

function displayPrompt() {
  // process.stdout.write is similar to console.log except it doesn't add a new line after the text
  process.stdout.write('\nWaka Waka :v '); // :v is the Pac-Man emoji.
}

function eatPowerPellet() {
  if (powerPellets > 0){
  console.log('\nPower Pellet! You guys are like SO DEAD');
  inky.edible = 'Edible', blinky.edible = 'Edible', pinky.edible = 'Edible', clyde.edible = 'Edible';
  score += 50;
  powerPellets -= 1
  }
  else
  console.log("\nNo Pellets left! RUN!");
}

function levelChecker() {
  if (dotsRemaining === 0 && powerPellets === 0);{
    dotsRemaining = 240;
    powerPellets = 4
    level ++
  }
}

// Menu Options
function eatDot10() {
  console.log('\nChomp!');
  score += 10;
  dotsRemaining -= 10;
  levelChecker()
}

function eatDot100() {
  if (dotsRemaining < 100){
  console.log('\nOnly ' + dotsRemaining + ' remaning');
  }
  else {
  console.log('\nChomp!');
  score += 100;
  dotsRemaining -= 100;
  levelChecker()
  }
}

function eatDotAll() {
  console.log('\nChomp!');
  score = score + dotsRemaining;
  levelChecker()
}

function eatGhost(ghost) {
  if (ghost.edible === false) {
  console.log("\nPacman got got by " + ghost.name +"!");
  lives -= 1;
  checkLives()
  }
  else {
    ghostCount ++
    console.log(" You just ate " + ghost.name + "!");
    ghost.edible = 'Inedible';
    scoreCounter()
    ghostReset()
  }
}

function scoreCounter() {
  score = score + (Math.pow(2, ghostCount)*100);
}

function eatCherry() {
  score += 100
  cherry --
}

function eatStrawberry() {
  score += 300
  strawberry --
}

function eatOrange() {
  score += 500
  orange --
}

function eatApple() {
  score += 700
  apple --
}

function eatPineapple() {
  score += 1000
  pineapple --
}

function eatGalaxian() {
  score += 2000
  galaxian --
}

function eatBell() {
  score += 3000
  bell --
}

function eatKey() {
  score += 5000
  key --
}

function ghostReset() {
  if (ghostCount === 4){
    ghostCount = 0
  }

}
function checkLives() {
  if (lives === 0) {
    process.exit()
  }
}



// Process Player's Input
function processInput(key) {
  switch(key) {
    case '\u0003': // This makes it so CTRL-C will quit the program
    case 'q':
      process.exit();
      break;
    case 'd':
      eatDot10();
      break;
    case 'e':
      eatDot100();
      break;
    case 'f':
      eatDotAll();
      break;
    case '1':
      eatGhost(inky);
      break;
    case '2':
      eatGhost(blinky);
      break;
    case '3':
      eatGhost(pinky);
      break;
    case '4':
      eatGhost(clyde);
      break;
    case 'p':
      eatPowerPellet();
      break;
      case 'c':
        eatCherry();
        break;
      case 's':
        eatStrawberry();
        break;
      case 'o':
        eatOrange();
        break;
      case 'a':
        eatApple();
      break;
      case 'p':
        eatPineapple();
        break;
      case 'g':
        eatGalaxian();
        break;
      case 'b':
        eatBell();
        break;
      case 'k':
        eatKey();
      break;
    default:
      console.log('\nInvalid Command!');
  }
}


//
// YOU PROBABLY DON'T WANT TO CHANGE CODE BELOW THIS LINE
//

// Setup Input and Output to work nicely in our Terminal
var stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

// Draw screen when game first starts
drawScreen();

// Process input and draw screen each time player enters a key
stdin.on('data', function(key) {
  process.stdout.write(key);
  processInput(key);
  setTimeout(drawScreen, 300); // The command prompt will flash a message for 300 milliseoncds before it re-draws the screen. You can adjust the 300 number to increase this.
});

// Player Quits
process.on('exit', function() {
  console.log('\n\nGame Over!\n');
});
