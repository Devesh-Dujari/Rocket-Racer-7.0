  //Declaring variables.
var backgroundImg;

var rocket, rocketImg;
var space, spaceImg;
var comet, cometImg, cometGroup;
var bronzeCoin, bronzeCoinImg, bronzeCoinGroup;
var silverCoin, silverCoinImg, silverCoinGroup;
var goldCoin, goldCoinImg, goldCoinGroup;
var weapon, weaponImg, weaponGroup;
var fuel, fuelImg, fuelGroup;

var gameOver, gameOverImg;
var restart, restartImg;
var play, playImg;
var line1, line2, line3, line4;
var home, homeImg;
var win, winImg;

var gameState = "0";
var distance = 0;
var coinCount = 0;
var deaths = 0;
var weaponCount = 25;
var fuelCount = 100;
var highScoreDist = 0;
var highScoreCoin = 0;

var backgroundSound, coinCollectSound, gameOverSound, checkPointSound;

function preload() {
  //Loading images in variables.
  backgroundImg = loadImage("images/rocketRacer.jpg");

  rocketImg = loadImage("images/rocket.png");
  spaceImg = loadImage("images/space.jpg");

  cometImg = loadImage("images/comet.png");
  bronzeCoinImg = loadImage("images/bronzeCoin.png");
  silverCoinImg = loadImage("images/silverCoin.png");
  goldCoinImg = loadImage("images/goldCoin.png");
  weaponImg = loadImage("images/fireball.png");
  fuelImg = loadImage("images/fuel.png");

  gameOverImg = loadImage("images/gameOver.png");
  restartImg = loadImage("images/restart.png");
  playImg = loadImage("images/play.png");
  homeImg = loadImage("images/home.png");
  winImg = loadImage("images/win.png");

  backgroundSound = loadSound("sound/backgroundSound.mp3");
  coinCollectSound = loadSound("sound/coinCollect.mp3");
  gameOverSound = loadSound("sound/gameOver.wav");
  checkPointSound = loadSound("sound/checkpoint.mp3");
}

function setup() {
  //Creating a screen.
  createCanvas(400, 500);

  //Creating space.
  space = createSprite(200, 150, 20, 20);
  space.addImage(spaceImg);
  space.scale = 0.86;
  space.velocityY = 8;

  //Creating rocket.
  rocket = createSprite(200, 380, 20, 20);
  rocket.addImage(rocketImg);
  rocket.scale = 0.125;
  //rocket.debug=true;
  rocket.setCollider("rectangle", 0, -200, 400, 600);

  //Creating the lines which show all the parametres of the gameOver.
  line1 = createSprite(10, 55, 2, 20);
  line1.visible = false;

  line2 = createSprite(390, 55, 2, 20);
  line2.visible = false;

  line3 = createSprite(200, 64, 380, 2);
  line3.visible = false;

  line4 = createSprite(200, 70, 2, 10);
  line4.visible = false;

  //Creating the play botton for Instructions gameState.
  play = createSprite(200, 400, 10, 10);
  play.addImage(playImg);
  play.scale = 0.3;
  play.visible = false;

  //Creating gameOver sprite.
  gameOver = createSprite(200, 180, 10, 10);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.35;
  gameOver.visible = false;

  //Creating restart button..
  restart = createSprite(150, 260, 10, 10);
  restart.addImage(restartImg);
  restart.scale = 0.15;
  restart.visible = false;

  //Creating the home button..
  home = createSprite(250, 260, 10, 10);
  home.addImage(homeImg);
  home.scale = 0.175;
  home.visible = false;

  //Creating the win sprite.
  win = createSprite(200, 180, 10, 10);
  win.addImage(winImg);
  win.scale = 0.3;
  win.visible = false;

  //Declaring groups.
  cometGroup = new Group();
  bronzeCoinGroup = new Group();
  silverCoinGroup = new Group();
  goldCoinGroup = new Group();
  weaponGroup = new Group();
  fuelGroup = new Group();
}

function draw() {
  //Giving a solid background to the game.
  background(0);

  //backgroundSound.play();

  //Game State START.
  if (gameState === "0") {
    //Giving background for gameState START.
    background(backgroundImg);

    //Visibility rules for gameState START.
    space.visible = false;
    rocket.visible = false;
    gameOver.visible = false;
    restart.visible = false;
    home.visible = false;
    win.visible = false;

    //Displaying some text to transformf to the next gameState.
    fill(255);
    textSize(30);
    text("Press Space to continue", 40, 470);

    //Transforming to the next gameState.
    if (keyDown("space")) {
      gameState = "1";
    }
  }

  //Game State INSTRUCTIONS.
  if (gameState === "1") {
    //Visibility rules for gameState INSTRUCTIONS.
    play.visible = true;
    line1.visible = true;
    line2.visible = true;
    line3.visible = true;
    line4.visible = true;
    space.visible = false;
    rocket.visible = false;
    home.visible = false;

    //Displaying text to give some basic instructions, rules and parametres of the game
    fill(255);
    textSize(30);
    text("INSTRUCTIONS", 90, 130);

    textSize(15);
    text("These are the different parametres of the game", 40, 90);

    text("1. Use right and left arrow keys for moving your rocket.", 10, 150);
    text("2. Hit coins to collect them, dont touch comets or else", 10, 170);
    text("game will be over.", 27, 185);
    text(
      "3. Use the up arrow key to fire fire-balls, anything that will ",
      10,
      205
    );
    text("touch these will get destroyed.", 27, 220);
    text(
      "5. Hit the fuel tanker to get it, every tanker will increse your ",
      10,
      240
    );
    text("fuel level by 10%. You are loading fuel for the future ", 27, 255);
    text("when fuel levels are more that 100%.", 27, 270);
    text("6. Reach the distance of 100000m and collect 10000 coins ", 10, 290);
    text("along with it to win the game.", 27, 305);

    //Transforming into the next gameState.
    if (mousePressedOver(play)) {
      gameState = "2";
    }
  }

  //Game State PLAY.
  if (gameState === "2") {
    //Incrementing the distance while the game is going on.
    distance = distance + Math.round(getFrameRate() / 50);

    space.velocityY = 8;

    //Visibility rules for gameState PLAY.
    rocket.visible = true;
    space.visible = true;
    play.visible = false;
    line1.visible = false;
    line2.visible = false;
    line3.visible = false;
    line4.visible = false;
    gameOver.visible = false;
    home.visible = false;
    win.visible = false;

    //Regenerating the space.
    if (space.y > 350) {
      space.y = height / 2;
    }

    //Making rocket move with arrow keys are pressed.
    if (keyDown("right_arrow")) {
      rocket.x = rocket.x + 5;
    }

    if (keyDown("left_arrow")) {
      rocket.x = rocket.x - 5;
    }

    //Making rocket come back from the other side if it goes out from one.
    if (rocket.x > 415) {
      rocket.x = -15;
    }

    if (rocket.x < -15) {
      rocket.x = 415;
    }

    //Function call.
    spawnComets();
    spawnBronzeCoins();
    spawnSilverCoins();
    spawnGoldCoins();
    spawnFuel();

    //Incresing coinCount if rocket Touches coins.
    if (bronzeCoinGroup.isTouching(rocket)) {
      coinCount += 1;
      //to destroy only one touched coin
      bronzeCoinGroup.get(0).destroy();
      coinCollectSound.play();
    }

    if (silverCoinGroup.isTouching(rocket)) {
      coinCount += 5;
      //to destroy only one touched coin
      silverCoinGroup.get(0).destroy();
      coinCollectSound.play();
    }

    if (goldCoinGroup.isTouching(rocket)) {
      coinCount += 10;
      //to destroy only one touched coin
      goldCoinGroup.get(0).destroy();
      coinCollectSound.play();
    }

    //Deploying fire balls when up-arow key key pressed.
    if (keyDown("up_arrow") && weaponCount > 0) {
      spawnWeapons();
      weaponCount -= 1;
    }

    //Destroying everything when fire ball is touching it.
    if (weaponGroup.isTouching(cometGroup)) {
      //To destroy that single coin touched.
      cometGroup.get(0).destroy();
    }

    if (weaponGroup.isTouching(bronzeCoinGroup)) {
      //To destroy that single coin touched.
      bronzeCoinGroup.get(0).destroy();
    }

    if (weaponGroup.isTouching(silverCoinGroup)) {
      //To destroy that single coin touched.
      silverCoinGroup.get(0).destroy();
    }

    if (weaponGroup.isTouching(goldCoinGroup)) {
      //To destroy that single coin touched.
      goldCoinGroup.get(0).destroy();
    }

    //Reducing fuel with incresing distance.
    if (distance % 500 === 0) {
      fuelCount -= 1;
    }

    if (distance % 10000 === 0) {
      checkPointSound.play();
    }

    //Making rocket get fuel amd incresing it when it is touching a fuel tanker.
    if (rocket.isTouching(fuelGroup)) {
      fuelCount += 10;
      //To destroy only the fuel tank touched.
      fuelGroup.get(0).destroy();
    }

    if(distance > 25000)
    {
      comet.velocityY = 13;
      bronzeCoin.velocityY = 10;
      silverCoin.velocityY = 17;
      goldCoin.velocityY = 22;
      weapon.velocityY = -10;
      fuel.velocityY = 10;
    }

    if(distance > 70000)
    {
      comet.velocityY = 17;
      bronzeCoin.velocityY = 15;
      silverCoin.velocityY = 20;
      goldCoin.velocityY = 25;
      weapon.velocityY = -15;
      fuel.velocity = 15;
      console.log(comet.velocityY);
    }

    //Trnaforming into the next gameState.
    if (cometGroup.isTouching(rocket)) {
      gameState = "3";
      space.velocityY = 0;
      deaths += 1;
      gameOverSound.play();
    }

    if (distance > 100000 && coinCount > 10000) {
      gameState = "4";
    }
  }

  //Game State END.
  if (gameState === "3") {
    //Visibility rules for gameState END.
    gameOver.visible = true;
    restart.visible = true;
    home.visible = true;
    rocket.visible = false;

    //Making the rocket go back in its original position in this gameState.
    rocket.x = 200;
    rocket.y = 380;

    //Stoping the space
    space.velocityY = 0;

    //Destroying all elements of each Group.
    cometGroup.destroyEach();
    bronzeCoinGroup.destroyEach();
    silverCoinGroup.destroyEach();
    goldCoinGroup.destroyEach();
    weaponGroup.destroyEach();
    fuelGroup.destroyEach();

    //Generating high score.
    if(distance > highScoreDist)
    {
      highScoreDist = distance;
    }

    if(coinCount > highScoreCoin)
    {
      highScoreCoin = coinCount;
    }

    //Restarting the game when restart button is pressed.
    if (mousePressedOver(restart)) {
      distance = 0;
      coinCount = 0;
      fuelCount = 100;
      weaponCount = 25;
      gameState = "2";
      restart.visible = false;
    }

    //Going back to gameState START when home button is pressed.
    if (mousePressedOver(home)) {
      distance = 0;
      coinCount = 0;
      fuelCount = 100;
      weaponCount = 25;
      deaths = 0;
      gameState = "0";
      highScoreDist = 0;
      highScoreCoin = 0;
    }
  }

  //Game State WIN.
  if (gameState === "4") {
    //Visiblity rules for gameState WIN.
    win.visible = true;
    restart.visible = true;
    home.visible = true;
    rocket.visible = false;

    //Making rocket go back to its original position.
    rocket.x = 200;
    rocket.y = 380;
    //Changing the positions of restart and home button according to the win sprite.
    restart.y = 350;
    home.y = 350;

    //Stoping the space.
    space.velocityY = 0;
    cometGroup.destroyEach();
    bronzeCoinGroup.destroyEach();
    goldCoinGroup.destroyEach();
    weaponGroup.destroyEach();
    fuelGroup.destroyEach();

    //Restarting the game when restart button is pressed.
    if (mousePressedOver(restart)) {
      distance = 0;
      coinCount = 0;
      fuelCount = 100;
      weaponCount = 25;
      gameState = "2";
      restart.visible = false;
      home.visible = false;
    }

    //Transforming to gameState START when home button is pressed.
    if (mousePressedOver(home)) {
      distance = 0;
      coinCount = 0;
      fuelCount = 100;
      weaponCount = 25;
      deaths = 0;
      gameState = "0";
    }
  }

  //Displaying sprites to the screen.
  drawSprites();

  //Showing some text to display the parametres of the game.
  fill(255);
  textSize(15);
  text("Distance: " + distance, 10, 20);
  text("Coins: " + coinCount, 125, 20);
  text("Deaths: " + deaths, 210, 20);
  text("Fireballs left: " + weaponCount, 290, 20);
  text("Fuel left: " + fuelCount + "%", 10, 40);
  text("High Score: " + highScoreDist + "," + highScoreCoin, 125, 40);
}

//Creating comets.
function spawnComets() {
  if (frameCount % 75 === 0) {
    comet = createSprite(200, -20, 10, 10);
    comet.addImage(cometImg);
    comet.x = Math.round(random(-10, 410));
    comet.velocityY = 10;
    comet.lifetime = 90;
    comet.scale = random(0.07, 0.15);

    console.log(comet.velocityY);

    //comet.debug = true;
    comet.setCollider("rectangle", 0, 0, 300, 800);

    cometGroup.add(comet);
    rocket.depth = comet.depth;
    rocket.depth += 1;
  }
}

//Creating bronzeCoins.
function spawnBronzeCoins() {
  if (frameCount % 200 === 0) {
    bronzeCoin = createSprite(200, -20, 10, 10);
    bronzeCoin.addImage(bronzeCoinImg);
    bronzeCoin.x = Math.round(random(-10, 410));
    bronzeCoin.velocityY = 7;
    bronzeCoin.lifetime = 80;
    bronzeCoin.scale = 0.04;
    bronzeCoin.rotationSpeed = 3;

    //bronzeCoin.debug = true;
    bronzeCoin.setCollider("circle", 0, 0, 500);

    bronzeCoinGroup.add(bronzeCoin);
    rocket.depth = bronzeCoin.depth;
    rocket.depth += 1;
  }
}

//Creating silverCoins.
function spawnSilverCoins() {
  if (frameCount % 777 === 0) {
    silverCoin = createSprite(200, -20, 10, 10);
    silverCoin.addImage(silverCoinImg);
    silverCoin.x = Math.round(random(-50, 450));
    silverCoin.velocityY = 15;
    silverCoin.lifetime = 40;
    silverCoin.scale = 0.04;
    silverCoin.rotationSpeed = 3;

    //silverCoin.debug = true;
    silverCoin.setCollider("circle", 0, 0, 300);

    silverCoinGroup.add(silverCoin);
    rocket.depth = silverCoin.depth;
    rocket.depth += 1;
  }
}

//Creating goldCoins.
function spawnGoldCoins() {
  if (frameCount % 2222 === 0) {
    goldCoin = createSprite(200, -20, 10, 10);
    goldCoin.addImage(goldCoinImg);
    goldCoin.x = Math.round(random(-100, 500));
    goldCoin.velocityY = 20;
    goldCoin.lifetime = 30;
    goldCoin.scale = 0.04;
    goldCoin.rotationSpeed = -3;

    //goldCoin.debug = true;
    goldCoin.setCollider("circle", 0, 0, 300);

    goldCoinGroup.add(goldCoin);
    rocket.depth = goldCoin.depth;
    rocket.depth += 1;
  }
}

//Creating fire balls.
function spawnWeapons() {
  weapon = createSprite(200, 310, 10, 10);
  weapon.addImage(weaponImg);
  weapon.velocityY = -5;
  weapon.lifetime = 100000;
  weaponGroup.add(weapon);
  weapon.x = rocket.x;
  weapon.scale = 0.1;
  //weapon.debug = true;
  weapon.setCollider("circle", 0, 2, 1100);
  weapon.depth = rocket.depth;
  weapon.depth += 1;
}

//Creating fuel tanks.
function spawnFuel() {
  if (distance % 10000 === 0) {
    fuel = createSprite(200, -20, 10, 10);
    fuel.addImage(fuelImg);
    fuel.scale = 0.1;
    fuel.x = Math.round(random(-50, 450));
    fuel.velocityY = 5;
    fuel.lifetime = 180;
    fuelGroup.add(fuel);
  }
}
