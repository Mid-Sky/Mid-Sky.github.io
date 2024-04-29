
function saveProgress() {
    localStorage.setItem("stage", stage)

    ////Stage 1
    localStorage.setItem("playerLife", playerLife)
    localStorage.setItem("coinValue", coinValue)
    ////Stage 2
    localStorage.setItem("playerLife2", playerLife2)
    localStorage.setItem("coinValue2", coinValue2)

}
var enemyAliveList = [localStorage.getItem("enemy1Alive"), localStorage.getItem("enemy2Alive"), localStorage.getItem("enemy3Alive"), localStorage.getItem("enemy4Alive"), localStorage.getItem("enemy5Alive"), localStorage.getItem("enemy6Alive")]

var coinValueList = [localStorage.getItem("coinValue"), localStorage.getItem("coinValue2")]

var stageList = localStorage.getItem("stage")

var winStatus = localStorage.getItem('winStatus')


// GLOBAL VARIABLES
let max_width = window.innerWidth
let max_height = window.innerHeight
let infoDisplayX = max_width / 2
let infoDisplayY = max_height / 2

//save progress



// Game Control
stage = localStorage.getItem("stage")  // keep track of functions to run
let restartStage1
let restartStage2
let mode

//Story 
let storyIntro = [
    "As you journey back to your parents after a decade away,\n the hum of your rocketship's engines fills you with excitement",
    "But just when you're almost home, chaos erupts! \nAlarms blare, lights flash, and your ship jerks violently as space pirates launch a surprise attack. \n It's terrifying, and you know you're in trouble",
    "With your heart pounding, you glance at the dashboard, \nwhere red icons flash ominously. It's clear, your ship won't hold out for long",
    "Frantically, you search for a solution. That's when you spot 'Soul', a planet shimmering in the distance.",
    "Legends say it's filled with treasures and scrap—exactly what you need to fix your ship",
    "Despite the danger, you make a split-second decision: \nyou'll make an emergency landing on 'Soul' and salvage what you can",
    "But as you descend towards the planet's surface, a sinking feeling settles in your stomach",
    "You know these pirates, \n they thrive on chaos and revel in destruction. They've caught sight of you, and it's not just treasure they're after",
    "They relish the chance for a kill, and you're their prime target",
    "With nerves of steel, you brace yourself for the challenge ahead",
    "Your journey home has taken an unexpected turn, \n plunging you into a thrilling adventure filled with danger, discovery, and the promise of redemption",
    "And so, with determination burning bright in your heart, \n you steel yourself for whatever lies ahead as you embark on your daring quest to save your ship, \n and reach your long-awaited destination — home."
]
let backButtonIntro
let hasActived = sessionStorage.getItem("hasActived")
let storyEnd = [
    "TRUEEEEEEEEEEEEEEEEEEEEEEEEEEEE,\n the hum of your rocketship's engines fills you with excitement",
    "But just when you're almost home, chaos erupts! \nAlarms blare, lights flash, and your ship jerks violently as space pirates launch a surprise attack. \n It's terrifying, and you know you're in trouble",
    "With your heart pounding, you glance at the dashboard, \nwhere red icons flash ominously. It's clear, your ship won't hold out for long",
    "Frantically, you search for a solution. That's when you spot 'Soul', a planet shimmering in the distance.",
    "Legends say it's filled with treasures and scrap—exactly what you need to fix your ship",
    "Despite the danger, you make a split-second decision: \nyou'll make an emergency landing on 'Soul' and salvage what you can",
    "But as you descend towards the planet's surface, a sinking feeling settles in your stomach",
    "You know these pirates, \n they thrive on chaos and revel in destruction. They've caught sight of you, and it's not just treasure they're after",
    "They relish the chance for a kill, and you're their prime target",
    "With nerves of steel, you brace yourself for the challenge ahead",
    "Your journey home has taken an unexpected turn, \n plunging you into a thrilling adventure filled with danger, discovery, and the promise of redemption",
    "YESSSSSS, \n you steel yourself for whatever lies ahead as you embark on your daring quest to save your ship, \n and reach your long-awaited destination — home."
]

// Player
let playerX = max_width / 2 //postions of player
let playerH = 140
let playerY = max_height - playerH / 2 - max_height / 3   //the player + the grass
let playerW = 100           // Sizes of player
//LIFE POINT --- stage 1
let playerLife = 3

//boxes (platforms) --- stage 1
let boxX = max_width / 3
let boxY = max_height / 1.5
let box2X = 0 + 220
let box2Y = max_height / 3
let box3X = max_width / 2 + 200
let box3Y = max_height / 2
let box4X = max_width - 220
let box4Y = max_height / 3
let boxW = 400
let boxH = 100

//boxes (platforms) --- stage 2
let box5X = max_width / 3
let box5Y = max_height / 1.5
let box6X = max_width / 7
let box6Y = max_height / 3.5
let box7X = max_width - boxW / 2
let box7Y = max_height / 3.5
let box8X = max_width - boxW / 2
let box8Y = max_height / 1.5

// GRAVITY
let jump = false // if its jumping
let direction = 1 // the force of gravity in y direction
let velocity = 10 // speed of player
let jumpPower = 20 // strength of player
let fallingSpeed = 20 // equal to velocity
let minHeight = max_height - playerH / 2 - 50 // height of ground
let maxHeight = 0 + playerH / 2 // height of the sky + the size of player
let jumpCounter = 0 // keep track of how much jumping

//Pictures
let playerR
let playerIcon
let playerL
let platform
let background_pic
let coin
let enemy_1

//Enemy --- stage 1
let enemy1X = 200      // 1st enemy 
let enemy1Y = max_height - 50 - 70
//on platform 3
let enemy2X = max_width - 220 + 50
let enemy2Y = max_height / 3 - boxH / 2 - 150 / 2
let enemyW = 120
let enemyH = 150
//moving enemies
let enemy1Position = 200    //Center point
let enemy2Position = max_width - 220 + 50
let enemySpeed = 3      //speed of enemies
let enemy1Direction = -1  // 1 = right , -1 = left
let enemy1Distance = 200 //maximum of far enemies go
let enemy2Direction = 1  // 1 = right , -1 = left
let enemy2Distance = 50 //maximum of far enemies go

//Enemy --- stage 2
let enemy3X = max_width - 220 + 50
let enemy3Y = max_height - boxH / 2 - 150 / 2
let enemy3Position = max_width - 220 + 50
let enemy3Direction = 1  // 1 = right , -1 = left
let enemy3Distance = 100 //maximum of far enemies go
let enemy3Speed = 5
let enemy4X = box5X
let enemy4Y = box5Y - 50 - 30 - 40
let enemy4Position = box5X
let enemy4Direction = -1
let enemy4Distance = 100
let enemy4Speed = 2
let enemy5X = 200
let enemy5Y = max_height - 50 - 70
let enemy5Position = 200
let enemy5Direction = 1
let enemy5Distance = 200
let enemy5Speed = 7
let enemy6X = box6X
let enemy6Y = box6Y - 50 - 30 - 40
let enemy6Position = box6X
let enemy6Direction = -1
let enemy6Distance = 200
let enemy6Speed = 10


//Coin --- stage 1
let coinValue = 0
let coin1X = max_width - 500    //The 1st coin
let coin1Y = max_height - 120
let coin2X = box2X    //The 2nd coin
let coin2Y = box2Y - 50 - 30
let coin3X = box3X    //The 3rd coin
let coin3Y = box3Y - 50 - 30
let coin4X = box4X    //The 4th coin
let coin4Y = box4Y - 50 - 30
let coinW = 50
let coinH = 60

//Coin --- stage 2
let coin5X = box5X    //The 1st coin
let coin5Y = box5Y - 50 - 30
let coin6X = box6X   //The 2nd coin
let coin6Y = box6Y - 50 - 30
let coin7X = box7X - 50   //The 3rd & 4th coin
let coin7Y = box7Y - 50 - 30
let coin9X = box7X + 50
let coin9Y = box7Y - 50 - 30
let coin8X = box8X - 50   //The 5th & 6th coin
let coin8Y = box8Y - 50 - 30
let coin10X = box8X + 50
let coin10Y = box8Y - 50 - 30


//Time --- level 1
let totalTime
let introTime //Amount of time on intro
let gameTime  //Amount of time in game
let timeLimit = 15 // How many time you have

//Audio 
let audioDisplayX = 1000
let audioDisplayY = 750
let audioMute = false
let audioSlider

//Music and sound effects
let jumpSound
let coinSound
let hitSound
let winSound
let loseSound

//background music
let background_music
//font
let gameFont

//--------------------------- Stage 2 
let playerLife2 = 1
let coinValue2 = 0
let gameTime2 //amount of time in stage 2

//preload pictures and sounds  
function preload() {
    //pictures
    playerR = loadImage("playerR.png")
    playerIcon = loadImage("playerHeadR.png")
    playerL = loadImage("playerL.png")
    platform = loadImage("platform.jpg")
    background_pic = loadImage("background.jpg")
    enemy_1 = loadImage("Enemy_1_wizard.png")
    coin = loadImage("coin.png")

    //sounds or music
    background_music = loadSound("Peaceful.mp3")
    jumpSound = loadSound("jump.wav")
    coinSound = loadSound("coinCollect.mp3")
    hitSound = loadSound("hit.mp3")
    winSound = loadSound("win.mp3")
    loseSound = loadSound("lose.mp3")

    //fonts
    gameFont = loadFont("font.ttf")


}//close preload

// SET UP
function setup() {
    createCanvas(max_width, max_height)
    rectMode(CENTER)
    textAlign(CENTER)
    imageMode(CENTER)
    textFont(gameFont)

    //Backgroud Music
    background_music.play()

    //Audio Setting 
    muteButton = createButton('Mute')
    muteButton.position(0, max_height - 20)
    muteButton.size(150, 20)
    muteButton.style("backgroundColor", "grey")
    muteButton.style("color", "white")
    muteButton.mousePressed(toggleMute)
    audioSlider = createSlider(0, 1, 1, 0.01) // Values from 0 to 1, starting at 1, increase of 0.01
    audioSlider.position(10, max_height - 50)

    ///////////////Story
    ////////Intro
    //keep track where the story line the player is on
    currentstoryIntro = parseInt(sessionStorage.getItem('currentstoryIntro')) || 0
    displayStory()
    //if backspace is pressed -- Go back
    ////////////STILL WORK ON BACK BUTTONNNNNNNNNNNNNNNNNNNNNNNNNN
    if (keyCode === 8) {
        goBackIntro()
    }

    //Mode selection
    mode = sessionStorage.getItem('mode') // Retrieve mode from session storage
    if (!mode) {
        selectMode()
    } else {
        if (mode === "normal") {
            displayStory() // Display the story for the normal mode
        } else {
            // Start the game for challenge mode
            startChallenge()
        }
    }
} //close setup

//Select Mode
function selectMode() {
    mode = prompt("Select mode: Enter 'normal' or 'challenge'")
    if (mode !== "normal" && mode !== "challenge") {
        alert("Invalid mode! Please enter 'normal' or 'challenge'.")
        selectMode() // Prompt again if the input is invalid
    } else {
        sessionStorage.setItem('mode', mode) // Save mode to session storage
        if (mode === "normal") {
            displayStory() // Display the story for the normal mode
        } else {
            // Start the game for challenge mode
            startChallenge()
        }
    }
}//close select mode

//Challenge Mode
function startChallenge() {
    window.location.replace("indexChallenge.html")
}


//IntroStory
function displayStory() {
    background(0)
    textSize(25)
    text("Click to continue...", max_width / 2, max_height - 10)
    text(storyIntro[currentstoryIntro], max_width / 2, max_height / 2)
}//close IntroStory

//IntroStory mouseClicked
function mouseClicked() {
    if (mode === "normal") {
        // If there are more story parts to show
        if (currentstoryIntro < storyIntro.length - 1) {
            currentstoryIntro++

            // Save the current part index to sessionStorage
            sessionStorage.setItem('currentstoryIntro', currentstoryIntro)

            // Update the display
            displayStory()
        }// close If there are more story parts to show
        else {
            if (!hasActived) {
                // If the user is at the last part of the story, go to intro()
                stage = 0.5
                sessionStorage.setItem("hasActived", true)
                hasActived = sessionStorage.getItem("hasActived")
            }

        }
    }
}//close IntroStory mouseClicked

//IntroStory goBackIntro
function goBackIntro() {
    // Ensure we are not at the beginning of the story
    if (currentstoryIntro > 0) {
        currentstoryIntro--

        // Save the current part index to sessionStorage
        sessionStorage.setItem('currentstoryIntro', currentstoryIntro)

        // Update the display
        displayStory()
    }
}

//mute or unmute
function toggleMute() {
    //change to not audioMute 
    audioMute = !audioMute
    if (audioMute) {
        muteButton.html('Unmute')
        activeSound.setVolume(0.5)
        activeSound.play()
    } else {
        muteButton.html('Mute')
        deactiveSound.setVolume(0.5)
        deactiveSound.play()
    }
}//close mute or unmute

function restart() {
    window.location.replace("index.html")
}


//DRAW  
function draw() {
    //Call functions
    keyPressed()
    keyTyped()
    gravity()
    totalTime = millis() //Start the timer

    //audio slider
    let volume = audioMute ? 0 : audioSlider.value()
    background_music.setVolume(volume)
    jumpSound.setVolume(volume)
    coinSound.setVolume(volume)
    hitSound.setVolume(volume)
    winSound.setVolume(volume)
    loseSound.setVolume(volume)

    //Different Stages 
    if (stage == 0.5) {
        intro()

    } // close stage == 0

    if ((stage == 1)) {
        stage1()

    } // close stage == 1

    if (stage == 2) {
        stage2()
    }

    if (stage == 100) {
        winScreen()
    }//close if stage == 100 (win)

    if (stage == -100) {
        loseScreen1()
    }//close if stage == -100 (lose of stage 1)

    if (stage == -101) {
        loseScreen2()
    }//close if stage == -100 (lose of stage 2)

    if ((keyCode === 13) && (stage == 0.5)) {
        location.href = "stage1Story.html"

    }//press ENTER to start game

} // close draw

//intro
function intro() {
    //timer of intro
    introTime = totalTime //begin intro timer

    //appearance of game 
    background(150, 230, 240) //sky blue
    image(background_pic, max_width / 2, max_height / 2, max_width, max_height)

    //title
    textFont(gameFont)
    fill("rgba(255,255,255,1)") // white
    stroke(0)
    strokeWeight(10)
    textSize(100)
    text("Rookie Adventure", max_width / 2, 150)
    textSize(40)
    text("The story of a rookie ", max_width / 2, 150 + 50)

    //Instructions 
    fill("purple")
    text("How to play: ", max_width / 2, max_height - 150)
    text("Press A and D or arrow keys to move left or right", max_width / 2, max_height - 100)
    text("Space bar or up arrow to jump", max_width / 2, max_height - 50)
    strokeWeight(1)
    fill('rgba(3,40,252,0.5)')
    text("Press ENTER to start", max_width / 2, max_height / 2)

}//close intro

//GAME 
function stage1() {
    //appearance of game 
    background(150, 230, 240) //sky blue
    image(background_pic, max_width / 2, max_height / 2, max_width, max_height)

    //window frame
    noFill()
    stroke(0)
    strokeWeight(15)
    rect(max_width / 2, max_height / 2, max_width, max_height)

    //draw box/platform
    stroke(0)
    strokeWeight(5)
    fill(255, 120, 0) //Dark orange
    // rect(boxX, boxY, boxW, boxH)
    //Platform 1 
    image(platform, boxX, boxY, boxW, boxH)
    let value_mouse_plat1 = dist(boxX, boxY, mouseX, mouseY)
    //Platform 2 
    image(platform, box2X, box2Y, boxW, boxH)
    let value_mouse_plat2 = dist(box2X, box2Y, mouseX, mouseY)
    //Platform 3 
    image(platform, box3X, box3Y, boxW, boxH)
    let value_mouse_plat3 = dist(box3X, box3Y, mouseX, mouseY)
    //Platform 4
    image(platform, box4X, box4Y, boxW, boxH)
    let value_mouse_plat4 = dist(box4X, box4Y, mouseX, mouseY)

    //collisions
    //platform 1 
    if ((playerX >= boxX - boxW / 2) && (playerX <= boxX + boxW / 2) && (playerY + playerH / 2 >= boxY - boxH / 2) && (playerY + playerH / 2 <= boxY + boxH / 2) && (jump == false)) {
        playerY = boxY - 120 //rest at the top of the platform (don't fall)
        velocity = 0 //no speed
        jumpCounter = 0 //allows to jump again
    }// close on colision platform 1
    //platform 2
    if ((playerX >= box2X - boxW / 2) && (playerX <= box2X + boxW / 2) && (playerY + playerH / 2 >= box2Y - boxH / 2) && (playerY + playerH / 2 <= box2Y + boxH / 2) && (jump == false)) {
        playerY = box2Y - 120 //rest at the top of the platform (don't fall)
        velocity = 0 //no speed
        jumpCounter = 0 //allows to jump again
    }// close on colision platform 2
    //platform 3 
    if ((playerX >= box3X - boxW / 2) && (playerX <= box3X + boxW / 2) && (playerY + playerH / 2 >= box3Y - boxH / 2) && (playerY + playerH / 2 <= box3Y + boxH / 2) && (jump == false)) {
        playerY = box3Y - 120 //rest at the top of the platform (don't fall)
        velocity = 0 //no speed
        jumpCounter = 0 //allows to jump again
    }// close on colision platform 3
    //platform 4 
    if ((playerX >= box4X - boxW / 2) && (playerX <= box4X + boxW / 2) && (playerY + playerH / 2 >= box4Y - boxH / 2) && (playerY + playerH / 2 <= box4Y + boxH / 2) && (jump == false)) {
        playerY = box4Y - 120 //rest at the top of the platform (don't fall)
        velocity = 0 //no speed
        jumpCounter = 0 //allows to jump again
    }// close on colision platform 4

    //coins (obtainable)
    //Coin 1
    image(coin, coin1X, coin1Y, coinW, coinH)
    coinCollect = collideRectRect(coin1X, coin1Y, coinW, coinH, playerX, playerY, playerW, playerH)
    //if hits coin
    if (coinCollect == true) {
        coinValue = coinValue + 1
        coin1X = -1000000
        coinSound.play()
    }//close hit coin 1
    //Coin 2
    image(coin, coin2X, coin2Y, coinW, coinH)
    coinCollect = collideRectRect(coin2X, coin2Y, coinW, coinH, playerX, playerY, playerW, playerH)
    //if hits coin 2
    if (coinCollect == true) {
        coinValue = coinValue + 1
        coin2X = -1000000
        coinSound.play()
    }//close hit coin 2
    //Coin 3
    image(coin, coin3X, coin3Y, coinW, coinH)
    coinCollect = collideRectRect(coin3X, coin3Y, coinW, coinH, playerX, playerY, playerW, playerH)
    //if hits coin 3
    if (coinCollect == true) {
        coinValue = coinValue + 1
        coin3X = -1000000
        coinSound.play()
    }//close hit coin 3
    //Coin 4
    image(coin, coin4X, coin4Y, coinW, coinH)
    coinCollect = collideRectRect(coin4X, coin4Y, coinW, coinH, playerX, playerY, playerW, playerH)
    //if hits coin 4
    if (coinCollect == true) {
        coinValue = coinValue + 1
        coin4X = -1000000
        coinSound.play()
    }//close hit coin 4

    //Show Coin(display) 
    fill('rgba(255,255,255,0.1)')
    rectMode(CENTER)
    rect(max_width - 150, 0 + 50, 300, 100)
    textSize(40)
    textStyle(BOLD)
    textAlign(CENTER)
    image(coin, max_width / 1.25, 0 + 100 / 2, 75, 75)
    //amount of coin
    strokeWeight(2)
    fill("maroon")
    text(coinValue, max_width - 150, 50)
    let value_mouse_coin = dist(max_width / 1.25, 0 + 100 / 2, mouseX, mouseY)

    //Enemies 
    //1st enemy
    image(enemy_1, enemy1X, enemy1Y, enemyW, enemyH)
    //if hits 1st enemy 
    if ((playerX >= enemy1X - enemyW / 2) && (playerX <= enemy1X + enemyW / 2) && (playerY >= enemy1Y - enemyH / 2) && (playerY <= enemy1Y + enemyH / 2)) {
        playerLife = playerLife - 1
        hitSound.play()
        playerX = max_width / 2     //put player back original position
        playerY = max_height - playerH / 2 - max_height / 3
    }//close hit 1st enemy

    //2nd enemy
    image(enemy_1, enemy2X, enemy2Y, enemyW, enemyH)
    //if hits 2nd enemy 
    if ((playerX >= enemy2X - enemyW / 2) && (playerX <= enemy2X + enemyW / 2) && (playerY >= enemy2Y - enemyH / 2) && (playerY <= enemy2Y + enemyH / 2)) {
        playerLife = playerLife - 1
        hitSound.play()
        playerX = max_width / 2     //put player back original position
        playerY = max_height - playerH / 2 - max_height / 3
    }//close hit 2nd enemy

    //moving enemies
    //1st enemy
    enemy1X = enemy1X + (enemySpeed * enemy1Direction)
    //if exceed the maxium it can go
    if ((enemy1X >= enemy1Distance + enemy1Position) || (enemy1X <= enemy1Distance - enemy1Position)) {
        //change to left
        enemy1Direction = enemy1Direction * -1
    }//close if enemy 1 exceed the maxium it can go
    //2nd enemy
    enemy2X = enemy2X + (enemySpeed * enemy2Direction)
    //if exceed the maxium it can go
    if ((enemy2X >= enemy2Distance + enemy2Position) || (enemy2X <= 0 + enemy2Position - max_width / 8)) {
        //change to left
        enemy2Direction = enemy2Direction * -1
    }//close if enemy 2 exceed the maxium it can go

    //draw player
    stroke(0)
    fill(150, 0, 170) //purple
    image(playerR, playerX, playerY, playerW, playerH)
    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
        image(playerR, playerX, playerY, playerW, playerH)    //change direction of player
    }
    if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
        image(playerL, playerX, playerY, playerW, playerH)   //change direction of player
    }

    //Player ID and Player lives
    //ID
    stroke(20)
    strokeWeight(5)
    fill('rgba(0,0,255,0.25)')
    rect(20, 20, 200, 200)
    image(playerIcon, 60, 65, 100, 100)
    //Lives
    textSize(30)
    stroke(20)
    strokeWeight(5)
    fill('rgba(0,0,255,0.25)')
    rect(220, 20, 200, 200)
    fill('maroon')
    text("Lives:", 220, 50)
    text(playerLife, 220, 100)

    //Timer
    introTime = introTime //stop introTimer
    gameTime = int((totalTime - 0) / 1000) //convert into seconds
    textSize(30)
    stroke(20)
    strokeWeight(5)
    fill('rgba(0,0,255,0.25)')
    rect(220, 20, 200, 200)
    fill('maroon')
    text("Time until explosion:", max_width / 2, 50)
    text(timeLimit - gameTime, max_width / 2, 100) //Display countdown

    // Info of the player 
    let value_mouse_ID = dist(20, 20, mouseX, mouseY)
    if ((value_mouse_ID <= 100)) {
        //background color of box
        fill("rgba(255,255,255,0.5)")
        rect(0 + 20 + max_width / 5, 0 + 20 + max_height / 5, max_width / 5, max_height / 5)
        textSize(20)
        textStyle(NORMAL)
        strokeWeight(1)
        textAlign(CENTER)
        //background color of text
        fill("rgba(128,0,128,0.5)")
        text("A wizard \nwho is on their journey... ", 0 + 20 + max_width / 5, 0 + 20 + max_height / 5)
    }//close info of the player  
    // Info of the playerLife
    let value_mouse_playerLife = dist(220, 100, mouseX, mouseY)
    if ((value_mouse_playerLife <= 100)) {
        //background color of box
        fill("rgba(255,255,255,0.5)")
        rect(0 + 20 + max_width / 5 + 200, 0 + 20 + max_height / 5, max_width / 5, max_height / 5)
        textSize(20)
        textStyle(NORMAL)
        strokeWeight(1)
        textAlign(CENTER)
        //background color of text
        fill("rgba(128,0,128,0.5)")
        text("Remaining Life point:", 0 + 20 + max_width / 5 + 200, 0 + 20 + max_height / 5 - 25)
        text("You only live up to thrice", 0 + 20 + max_width / 5 + 200, 0 + 20 + max_height / 5 + 55)
        fill('red')
        textStyle(BOLD)
        text(playerLife, 0 + 20 + max_width / 5 + 200, 0 + 20 + max_height / 5 + 25)
    }//close info of the playerLife
    // Info of the platform 1 
    if (value_mouse_plat1 <= 100) {
        fill("rgba(255,255,255,0.5)")
        rect(50 + boxX + max_width / 5, 0 + boxY + max_height / 5, max_width / 5, max_height / 5)
        textSize(20)
        textStyle(NORMAL)
        strokeWeight(1)
        textAlign(CENTER)
        //background color of text
        fill("rgba(255, 120,0,0.5)")
        text("A platform for player to step on", 50 + boxX + max_width / 5, 0 + boxY + max_height / 5, 200)
    }//Close info of platform 1
    // Info of the platform 2
    if (value_mouse_plat2 <= 100) {
        fill("rgba(255,255,255,0.5)")
        rect(50 + box2X + max_width / 5, 0 + box2Y + max_height / 5, max_width / 5, max_height / 5)
        textSize(20)
        textStyle(NORMAL)
        strokeWeight(1)
        textAlign(CENTER)
        //background color of text
        fill("rgba(255, 120,0,0.5)")
        text("A platform for player to step on", 50 + box2X + max_width / 5, 0 + box2Y + max_height / 5, 200)
    }//Close info of platform 2
    // Info of the platform 3
    if (value_mouse_plat3 <= 100) {
        fill("rgba(255,255,255,0.5)")
        rect(50 + box3X + max_width / 5, 0 + box3Y + max_height / 5, max_width / 5, max_height / 5)
        textSize(20)
        textStyle(NORMAL)
        strokeWeight(1)
        textAlign(CENTER)
        //background color of text
        fill("rgba(255, 120,0,0.5)")
        text("A platform for player to step on", 50 + box3X + max_width / 5, 0 + box3Y + max_height / 5, 200)
    }//Close info of platform 3
    // Info of the platform 4
    if (value_mouse_plat4 <= 100) {
        fill("rgba(255,255,255,0.5)")
        rect(box4X, 0 + box4Y + max_height / 5, max_width / 5, max_height / 5)
        textSize(20)
        textStyle(NORMAL)
        strokeWeight(1)
        textAlign(CENTER)
        //background color of text
        fill("rgba(255, 120,0,0.5)")
        text("A platform for player to step on", box4X, 0 + box4Y + max_height / 5, 200)
    }//Close info of platform 4

    // collision of coin info 
    if ((value_mouse_coin <= 70)) {
        rectMode(CENTER)
        fill("rgba(255, 255, 255,0.5)")
        //box of the coin
        strokeWeight(5)
        rect(max_width - 150, 0 + 50 + 250, 300, 300)
        textSize(20)
        textStyle(NORMAL)
        strokeWeight(1)
        textAlign(CENTER)
        fill("maroon")
        text("Current Amount: " + coinValue, max_width - 150, 0 + 250)
        text("Shining component(s),\n perhaps you can do \nsomething with it. \n(Not Pickupable)", max_width - 150, 0 + 50 + 250)
    }// close collision of coin info
    //Triggers win or lose
    if (coinValue >= 4) {
        winSound.play()
        //Entering Story to stage 2 
        location.href = "stage1StoryEnd.html"
    }//close win trigger

    if (playerLife <= 0) {
        loseSound.play()
        localStorage.setItem("stage", -100)
        stage = localStorage.getItem("stage")
    }//close lose trigger

    if (gameTime >= timeLimit) {
        loseSound.play()
        localStorage.setItem("stage", -100)
        stage = localStorage.getItem("stage")
    }//close lose trigger
}//close stage1
////////////////////////stage 2
function stage2() {
    image(background_pic, max_width / 2, max_height / 2, max_width, max_height)

    ///////////Player ID and Player lives
    //ID
    stroke(20)
    strokeWeight(5)
    fill('rgba(0,0,255,0.25)')
    rect(20, 20, 200, 200)
    image(playerIcon, 60, 65, 100, 100)
    //Lives
    textSize(30)
    stroke(20)
    strokeWeight(5)
    fill('rgba(0,0,255,0.25)')
    rect(220, 20, 200, 200)
    fill('maroon')
    text("Lives:", 220, 50)
    text(playerLife2, 220, 100)

    ///////////Show Coin(display) 
    fill('rgba(255,255,255,0.1)')
    rectMode(CENTER)
    rect(max_width - 150, 0 + 50, 300, 100)
    textSize(40)
    textStyle(BOLD)
    textAlign(CENTER)
    image(coin, max_width / 1.25, 0 + 100 / 2, 75, 75)
    //amount of coin
    strokeWeight(2)
    fill("maroon")
    text(coinValue2, max_width - 150, 50)
    let value_mouse_coin = dist(max_width / 1.25, 0 + 100 / 2, mouseX, mouseY)
    // collision of coin info 
    if ((value_mouse_coin <= 70)) {
        rectMode(CENTER)
        fill("rgba(255, 255, 255,0.5)")
        //box of the coin
        strokeWeight(5)
        rect(max_width - 500 - 150, 0 + 50 + 250, 300, 300)
        textSize(20)
        textStyle(NORMAL)
        strokeWeight(1)
        textAlign(CENTER)
        fill("maroon")
        text("Current Amount: " + coinValue2, max_width - 500 - 150, 0 + 250)
        text("Shining component(s),\n perhaps you can do \nsomething with it. \n(Not Pickupable)", max_width - 500 - 150, 0 + 50 + 250)
    }// close collision of coin info

    ///////////Timer
    gameTime = gameTime //stop gameTimer
    gameTime2 = int((totalTime - 0 - (0 * 1000)) / 1000) //convert into seconds
    textSize(30)
    stroke(20)
    strokeWeight(5)
    fill('rgba(0,0,255,0.25)')
    rect(220, 20, 200, 200)
    fill('maroon')
    text("Time until explosion:", max_width / 2, 50)
    text(timeLimit - gameTime2, max_width / 2, 100) //Display countdown

    ///////////platforms and collisions
    //platform 5
    image(platform, box5X, box5Y, boxW, boxH)
    let value_mouse_plat5 = dist(box5X, box5Y, mouseX, mouseY)
    if ((playerX >= box5X - boxW / 2) && (playerX <= box5X + boxW / 2) && (playerY + playerH / 2 >= box5Y - boxH / 2) && (playerY + playerH / 2 <= box5Y + boxH / 2) && (jump == false)) {
        playerY = boxY - 120 //rest at the top of the platform (don't fall)
        velocity = 0 //no speed
        jumpCounter = 0 //allows to jump again
    }// close on colision platform 5
    // Info of the platform 5 
    if (value_mouse_plat5 <= 100) {
        fill("rgba(255,255,255,0.5)")
        rect(50 + box5X + max_width / 5, 0 + boxY + max_height / 5, max_width / 5, max_height / 5)
        textSize(20)
        textStyle(NORMAL)
        strokeWeight(1)
        textAlign(CENTER)
        //background color of text
        fill("rgba(255, 120,0,0.5)")
        text("A platform for player to step on", 50 + box5X + max_width / 5, 0 + box5Y + max_height / 5, 200)
    }//Close info of platform 5

    //platform 6
    image(platform, box6X, box6Y, boxW, boxH)
    let value_mouse_plat6 = dist(box6X, box6Y, mouseX, mouseY)
    if ((playerX >= box6X - boxW / 2) && (playerX <= box6X + boxW / 2) && (playerY + playerH / 2 >= box6Y - boxH / 2) && (playerY + playerH / 2 <= box6Y + boxH / 2) && (jump == false)) {
        playerY = box6Y - 120 //rest at the top of the platform (don't fall)
        velocity = 0 //no speed
        jumpCounter = 0 //allows to jump again
    }// close on colision platform 6
    // Info of the platform 6 
    if (value_mouse_plat6 <= 100) {
        fill("rgba(255,255,255,0.5)")
        rect(50 + box6X + max_width / 5, 0 + box6Y + max_height / 5, max_width / 5, max_height / 5)
        textSize(20)
        textStyle(NORMAL)
        strokeWeight(1)
        textAlign(CENTER)
        //background color of text
        fill("rgba(255, 120,0,0.5)")
        text("A platform for player to step on", 50 + box6X + max_width / 5, 0 + box6Y + max_height / 5, 200)
    }//Close info of platform 6

    //platform 7
    image(platform, box7X, box7Y, boxW, boxH)
    let value_mouse_plat7 = dist(box7X, box7Y, mouseX, mouseY)
    if ((playerX >= box7X - boxW / 2) && (playerX <= box7X + boxW / 2) && (playerY + playerH / 2 >= box7Y - boxH / 2) && (playerY + playerH / 2 <= box7Y + boxH / 2) && (jump == false)) {
        playerY = box7Y - 120 //rest at the top of the platform (don't fall)
        velocity = 0 //no speed
        jumpCounter = 0 //allows to jump again
    }// close on colision platform 7
    // Info of the platform 7
    if (value_mouse_plat7 <= 100) {
        fill("rgba(255,255,255,0.5)")
        rect(box7X - max_width / 5 - 50, box7Y + max_height / 5, max_width / 5, max_height / 5)
        textSize(20)
        textStyle(NORMAL)
        strokeWeight(1)
        textAlign(CENTER)
        //background color of text
        fill("rgba(255, 120,0,0.5)")
        text("A platform for player to step on", box7X - max_width / 5 - 50, box7Y + max_height / 5, 200)
    }//Close info of platform 7

    //platform 8
    image(platform, box8X, box8Y, boxW, boxH)
    let value_mouse_plat8 = dist(box8X, box8Y, mouseX, mouseY)
    if ((playerX >= box8X - boxW / 2) && (playerX <= box8X + boxW / 2) && (playerY + playerH / 2 >= box8Y - boxH / 2) && (playerY + playerH / 2 <= box8Y + boxH / 2) && (jump == false)) {
        playerY = box8Y - 120 //rest at the top of the platform (don't fall)
        velocity = 0 //no speed
        jumpCounter = 0 //allows to jump again
    }// close on colision platform 8
    // Info of the platform 8
    if (value_mouse_plat8 <= 100) {
        fill("rgba(255,255,255,0.5)")
        rect(box8X - max_width / 5 - 50, box8Y + max_height / 5, max_width / 5, max_height / 5)
        textSize(20)
        textStyle(NORMAL)
        strokeWeight(1)
        textAlign(CENTER)
        //background color of text
        fill("rgba(255, 120,0,0.5)")
        text("A platform for player to step on", box8X - max_width / 5 - 50, box8Y + max_height / 5, 200)
    }//Close info of platform 8



    ///////////enemies and collisions
    //3rd enemy
    image(enemy_1, enemy3X, enemy3Y, enemyW, enemyH)
    //if hits 3rd enemy 
    if ((playerX >= enemy3X - enemyW / 2) && (playerX <= enemy3X + enemyW / 2) && (playerY >= enemy3Y - enemyH / 2) && (playerY <= enemy3Y + enemyH / 2)) {
        playerLife2 = playerLife2 - 1
        hitSound.play()
        playerX = max_width / 2     //put player back original position
        playerY = max_height - playerH / 2 - max_height / 3
    }//close hit 3rd enemy
    enemy3X = enemy3X + (enemy3Speed * enemy3Direction)
    //if exceed the maxium it can go
    if ((enemy3X >= enemy3Distance + enemy3Position) || (enemy3X <= enemy3Position - enemy3Distance - max_width / 5)) {
        //change to left
        enemy3Direction = enemy3Direction * -1
    }//close if enemy 3 exceed the maxium it can go

    //4th enemy
    image(enemy_1, enemy4X, enemy4Y, enemyW, enemyH)
    //if hits 4th enemy 
    if ((playerX >= enemy4X - enemyW / 2) && (playerX <= enemy4X + enemyW / 2) && (playerY >= enemy4Y - enemyH / 2) && (playerY <= enemy4Y + enemyH / 2)) {
        playerLife2 = playerLife2 - 1
        hitSound.play()
        playerX = max_width / 2     //put player back original position
        playerY = max_height - playerH / 2 - max_height / 3
    }//close hit 4th enemy
    enemy4X = enemy4X + (enemy4Speed * enemy4Direction)
    //if exceed the maxium it can go
    if ((enemy4X >= enemy4Distance + enemy4Position) || (enemy4X <= max_width / 5)) {
        //change to left
        enemy4Direction = enemy4Direction * -1
    }//close if enemy 4 exceed the maxium it can go

    //5th enemy
    image(enemy_1, enemy5X, enemy5Y, enemyW, enemyH)
    //if hits 5th enemy 
    if ((playerX >= enemy5X - enemyW / 2) && (playerX <= enemy5X + enemyW / 2) && (playerY >= enemy5Y - enemyH / 2) && (playerY <= enemy5Y + enemyH / 2)) {
        playerLife2 = playerLife2 - 1
        hitSound.play()
        playerX = max_width / 2     //put player back original position
        playerY = max_height - playerH / 2 - max_height / 3
    }//close hit 5th enemy
    enemy5X = enemy5X + (enemy5Speed * enemy5Direction)
    //if exceed the maxium it can go
    if ((enemy5X >= enemy5Distance + enemy5Position + 200) || (enemy5X <= enemy5Position - enemy5Distance + 100)) {
        //change to left
        enemy5Direction = enemy5Direction * -1
    }//close if enemy 5 exceed the maxium it can go

    //6th enemy
    image(enemy_1, enemy6X, enemy6Y, enemyW, enemyH)
    //if hits 6th enemy 
    if ((playerX >= enemy6X - enemyW / 2) && (playerX <= enemy6X + enemyW / 2) && (playerY >= enemy6Y - enemyH / 2) && (playerY <= enemy6Y + enemyH / 2)) {
        playerLife2 = playerLife2 - 1
        hitSound.play()
        playerX = max_width / 2     //put player back original position
        playerY = max_height - playerH / 2 - max_height / 3
    }//close hit 6th enemy
    enemy6X = enemy6X + (enemy6Speed * enemy6Direction)
    //if exceed the maxium it can go
    if ((enemy6X >= enemy6Distance + enemy6Position) || (enemy6X <= enemy6Position - enemy6Distance + 100)) {
        //change to left
        enemy6Direction = enemy6Direction * -1
    }//close if enemy 6 exceed the maxium it can go

    ///////////coins and collisions
    //coin 5 (1st)
    image(coin, coin5X, coin5Y, coinW, coinH)
    coinCollect5 = collideRectRect(coin5X, coin5Y, coinW, coinH, playerX, playerY, playerW, playerH)
    //if hits coin 5
    if (coinCollect5 == true) {
        coinValue2 = coinValue2 + 1
        coin5X = -1000000
        coinSound.play()
    }//close hit coin 5

    //coin 6 (2nd)
    image(coin, coin6X, coin6Y, coinW, coinH)
    coinCollect6 = collideRectRect(coin6X, coin6Y, coinW, coinH, playerX, playerY, playerW, playerH)
    //if hits coin 6
    if (coinCollect6 == true) {
        coinValue2 = coinValue2 + 1
        coin6X = -1000000
        coinSound.play()
    }//close hit coin 6

    //coin 7 (3rd)

    image(coin, coin7X, coin7Y, coinW, coinH)
    coinCollect7 = collideRectRect(coin7X, coin7Y, coinW, coinH, playerX, playerY, playerW, playerH)
    //if hits coin 7 (3rd)
    if (coinCollect7 == true) {
        coinValue2 = coinValue2 + 1
        coin7X = -1000000
        coinSound.play()
    }//close hit coin 7

    //coin 8 (4th)
    image(coin, coin8X, coin8Y, coinW, coinH)
    coinCollect8 = collideRectRect(coin8X, coin8Y, coinW, coinH, playerX, playerY, playerW, playerH)
    //if hits coin 8 (5th)
    if (coinCollect8 == true) {
        coinValue2 = coinValue2 + 1
        coin8X = -1000000
        coinSound.play()
    }//close hit coin 8

    //coin 9 (5th)
    image(coin, coin9X, coin9Y, coinW, coinH)
    coinCollect9 = collideRectRect(coin9X, coin9Y, coinW, coinH, playerX, playerY, playerW, playerH)
    //if hits coin 9 (5th)
    if (coinCollect9 == true) {
        coinValue2 = coinValue2 + 1
        coin9X = -1000000
        coinSound.play()
    }//close hit coin 9


    //coin 10 (6th)
    image(coin, coin10X, coin10Y, coinW, coinH)
    coinCollect10 = collideRectRect(coin10X, coin10Y, coinW, coinH, playerX, playerY, playerW, playerH)
    //if hits coin 10 (6th)
    if (coinCollect10 == true) {
        coinValue2 = coinValue2 + 1
        coin10X = -1000000
        coinSound.play()
    }//close hit coin 10

    //draw player
    playerW = 100
    playerH = 140
    image(playerR, playerX, playerY, playerW, playerH)
    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
        image(playerR, playerX, playerY, playerW, playerH)    //change direction of player
    }
    if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
        image(playerL, playerX, playerY, playerW, playerH)   //change direction of player
    }

    //Triggers win or lose
    if (coinValue2 >= 6) {
        winSound.play()
        location.href = "stage2StoryEnd.html"
        // localStorage.setItem("stage", 100)
        // stage = localStorage.getItem("stage")
    }//close win trigger

    if (playerLife2 <= 0) {
        localStorage.setItem("stage", -101)
        stage = localStorage.getItem("stage")
    }//close lose trigger

    if (gameTime2 >= timeLimit) {
        localStorage.setItem("stage", -101)
        stage = localStorage.getItem("stage")
    }//close lose trigger

}//close stage2


////////////////////////Win screen
function winScreen() {
    image(background_pic, max_width / 2, max_height / 2, max_width, max_height)
    textSize(200)
    stroke(20)
    strokeWeight(5)
    fill('rgba(0,0,255,0.25)')
    rect(220, 20, 200, 200)
    fill(255)
    text("YOU WIN", max_width / 2, max_height / 2)

}//if you win function

////////////////////////Lose screen
function loseScreen1() {
    image(background_pic, max_width / 2, max_height / 2, max_width, max_height)
    textSize(200)
    stroke(20)
    strokeWeight(5)
    fill('rgba(0,0,255,0.25)')
    fill(255)
    text("YOU LOSE", max_width / 2, max_height / 2)
    ///////////// Restart if player died
    restartStage1 = createButton('Restart')
    restartStage1.position(max_width / 2 - 400, max_height / 2 + 100)
    restartStage1.size(800, 100)
    restartStage1.style("backgroundColor", "darkred")
    restartStage1.style("color", "white")
    restartStage1.style("font-size", "3vh")
    localStorage.setItem("stage", 1)
    stage = localStorage.getItem("stage")
    restartStage1.mousePressed(restart)
}//if you lose function
function loseScreen2() {
    image(background_pic, max_width / 2, max_height / 2, max_width, max_height)
    textSize(200)
    stroke(20)
    strokeWeight(5)
    fill('rgba(0,0,255,0.25)')
    fill(255)
    text("YOU LOSE", max_width / 2, max_height / 2)
    ///////////// Restart if player died
    restartStage2 = createButton('Restart')
    restartStage2.position(width / 2 - 400, height / 2 + 100)
    restartStage2.size(800, 100)
    restartStage2.style("backgroundColor", "darkred")
    restartStage2.style("color", "white")
    restartStage2.style("font-size", "3vh")
    localStorage.setItem("stage", 2)
    stage = localStorage.getItem("stage")
    restartStage2.mousePressed(restart)
}//if you lose function

//GRAVITY
function gravity() {

    if ((playerY >= minHeight) && (jump == false)) {
        //Stop fallinng on the ground
        playerY = playerY + 0 //to not fall
        jumpCounter = 0 //reset jump counter when at ground
    }// close ground
    else {
        playerY = playerY + (direction * velocity) // falling
    }// else fall


    if (jump == true) {
        if ((playerY <= maxHeight) || (jumpCounter >= jumpPower)) {
            if (playerY >= minHeight) {
                playerY = minHeight

            }// close at min 
            else {
                velocity = fallingSpeed // fall at maximum 
            }//close else when not at min
        }//close maximum 
        else {
            if (!jumpSound.isPlaying()) {
                jumpSound.play()
            }
            velocity = -jumpPower //jumping 
            jumpCounter = jumpCounter + 1 //adding 1 to the jump counter
        }// close else not at maximum
    }//close jump 
    else {
        velocity = fallingSpeed
    }//close not jumping
}// close gravity

function keyPressed() {
    if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
        if (playerX >= 0 + playerW / 2 + 20) {
            playerX = playerX - 30 //moves left
        }
    }// close left

    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
        if (playerX <= max_width - playerW / 2 - 20)
            playerX = playerX + 30 //moves right
    }// close right


}//close keyPressed

function keyTyped() {
    if (keyIsDown(32) || keyIsDown(UP_ARROW)) {
        jump = true
    }// close spacebar or down key pressed
    else {
        jump = false
    }// close not spacebar or down key pressed

}//close keyTyped

