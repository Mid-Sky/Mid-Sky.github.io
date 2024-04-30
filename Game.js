function warnOnRefresh(event) {
    // Display a confirmation dialog
    var confirmationMessage = 'Are you sure you want to refresh?';
    event.returnValue = confirmationMessage; 
    return confirmationMessage; 
  }
  window.addEventListener('beforeunload', warnOnRefresh);

let w = window.innerWidth
let h = window.innerHeight
let bullet_enemy_size = 25
let medic_size = 50

let bullets = []
let enemies = []
let healthPatches = []
let score = 0
let health = 3
let healthColor = "rgba(0,255,0,0.2)"
let winGoal_load = localStorage.getItem("win_goal")
let win_goal = winGoal_load
let win_goal_show = winGoal_load

let spawnInterval = 60; 
let spawnRateIncrease = 0.95; 

function preload() {
    bullet_img = loadImage("fire.png")
    enemy_img = loadImage("Enemy_1_wizard.png")
    medic_kit = loadImage("Medic_kit.png")
    player = loadImage("rocketShip.png")
    background_pic = loadImage("gameBG.jpg")
}
function setup() {
    createCanvas(w, h)
    rectMode(CENTER)
    textAlign(CENTER)
    imageMode(CENTER)

    //spawn enemies
    for (i = 0; i < 10; i++) {
        let enemy = {
            x: random(0, width),
            y: random(0, -2 * h)
        }
        enemies.push(enemy)
    }
    //spawn health patch
    for (z = 0; z < 2; z++) {
        let healthPatch = {
            x: random(0, width),
            y: random(0, -7 * h)
        }
        healthPatches.push(healthPatch)
    }
}

function draw() {
    clear()
    background(50)
    image(background_pic, w / 2, h / 2, w, h)
    rectMode(CENTER)
    //player to move on x axis
    fill(255)
    image(player, mouseX, h - 75 / 2, 75, 150)

    if (frameCount % spawnInterval === 0) {
        spawnEnemy();
        spawnInterval *= spawnRateIncrease; // Decrease spawn interval
    }
    function spawnEnemy() {
        let enemy = {
            x: random(0, width),
            y: random(0, -2 * height) // Adjusted to use height instead of h
        };
        enemies.push(enemy);
    }
    

    //For every bullet inside the array bullet (updates and draws the bullet)
    for (let bullet of bullets) {
        if (bullet.y > 0) {
            bullet.y -= 20
            imageMode(CENTER);
            image(bullet_img, bullet.x, bullet.y, 100, 200)
        }
    }
    //For every enemy inside the array enemies (updates and draws the enemy
    for (let enemy of enemies) {
        enemy.y += 5
        imageMode(CENTER);
        image(enemy_img, enemy.x, enemy.y, 100, 100)
        //loose game
        if (enemy.y > h) {
            enemy.y = 0
            health -= 1
            if (health == 0) {
                localStorage.setItem('winStatus', 'lose');
                noLoop()
                textSize(40)
                textStyle(BOLD)
                textAlign(CENTER)
                text("You Lose ", w / 2, h / 2)
                setTimeout(() => {
                    // When player loses
                    location.href = "index.html"
                        ;
                }
                    , 1000);
            }
        }
    }

    //collisions with bullets and enemies
    for (let i = enemies.length - 1; i >= 0; i--) {
        let enemy = enemies[i];
        // Check if enemy is within the canvas bounds
        if (enemy.y > 0 && enemy.y < height) {
            for (let j = bullets.length - 1; j >= 0; j--) {
                let bullet = bullets[j];
                if (dist(enemy.x, enemy.y, bullet.x, bullet.y) < bullet_enemy_size) {
                    enemies.splice(i, 1);
                    bullets.splice(j, 1);
                    let newEnemy = {
                        x: random(0, width),
                        y: random(0, -2 * h)
                    };
                    enemies.push(newEnemy);
                    score++;
                    win_goal_show--;
                    //Exit the page (Win)
                    if (score == win_goal) {
                        localStorage.setItem('winStatus', 'win');
                        noLoop();
                        textSize(40);
                        textStyle(BOLD);
                        textAlign(CENTER);
                        text("You Win ", w / 2, h / 2);
                        text("Teleporting...", w / 2, h / 1.5);
                        setTimeout(() => {
                            // When player wins
                            location.href = "index.html";
                        }, 3000);
                    }
                }
            }
        }
    }


    // For every health patch in the array 
    for (let healthPatch of healthPatches) {
        healthPatch.y += 7
        image(medic_kit, healthPatch.x, healthPatch.y, medic_size, medic_size)
    }

    //collisions with bullets and health patch   (When Health is less than 3 )
    if (health < 3) {
        for (let healthPatch of healthPatches) {
            for (let bullet of bullets) {
                if (dist(healthPatch.x, healthPatch.y, bullet.x, bullet.y) < bullet_enemy_size) {
                    healthPatches.splice(healthPatches.indexOf(healthPatch), 1)
                    bullets.splice(bullets.indexOf(bullet), 1)
                    let newHealth = {
                        x: random(0, width),
                        y: random(0, -7 * h)
                    }
                    healthPatches.push(newHealth)
                    health++
                }
            }
        }
    }


    //score
    fill("aqua")
    textSize(20)
    textStyle(BOLD)
    textAlign(CENTER)
    text("Your Score: " + score, w / 15, h / 15)

    //Obejective
    fill("rgba(160,32,240,0.5)")
    textSize(30)
    textStyle(BOLD)
    textAlign(CENTER)
    text("Objective: " + win_goal_show, w / 2, h / 15)

    //Health system
    //Color green 
    if (health == 3) {
        healthColor = "rgba(0,255,0,0.2)"
    }
    // Color yellow
    if (health == 2) {
        healthColor = "rgba(255,255,0,0.2)"
    }
    // Color red
    if (health == 1) {
        healthColor = "rgba(255,0,0,0.2)"
    }
    // Color black 
    if (health == 0) {
        healthColor = "rgba(0,0,1,0.2)"
    }
    fill(healthColor)
    rect(w / 10, h / 1.1, w / 5, h / 5)
    textSize(50)
    fill("white")
    textStyle(BOLD)
    textAlign(CENTER)
    text(health, w / 10, h / 1.1)
}


//bullets spawn on click
function mousePressed() {
    let bullet = {
        x: mouseX,
        y: h - 25
    }
    bullets.push(bullet)
}

