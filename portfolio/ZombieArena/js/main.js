
"use strict";

var app = app || {};

app.main = {
	//constants
    WIDTH : 850, 
    HEIGHT: 500,
	FIRE_RATE: 20,
	ENEMY_PROBABILITY_PER_SECOND: 0.5,
    canvas: undefined,
    ctx: undefined,
    player: undefined,
	titleScreen: undefined,
	playerImage: undefined,
	zombieImage: undefined,
	deadZombie: undefined,
	shotgunImage: undefined,
	pistolImage: undefined,
	rifleImage: undefined,
	drawLib: undefined,
	dt: 1/60.0,
	app: undefined,
	utils: undefined,
	bullets: [],
	zombies: [],
	bloods: [],
	deadZombies: [],
	bloodImage: undefined,
	playerShoot: undefined,
	bloodSplat: undefined,
	cooldown: 0,
	kills: 0,
	//highScore: 0,
	upgrade: 50,
	health: 100,
	soundtrack: undefined,
	isRunning: false,
	
    // methods
	init : function(player) {
			console.log("app.main.init() called");
			// declare properties
			this.canvas = document.querySelector('canvas');
			this.canvas.width = this.WIDTH;
			this.canvas.height = this.HEIGHT;
			this.ctx = this.canvas.getContext('2d');
			
			//title screen
			var image = new Image();
			image.src = this.app.IMAGE_SOURCES['intructionsScreen'];
			this.titleScreen = image;
			this.ctx.drawImage(this.titleScreen, 0, 0, this.WIDTH, this.HEIGHT);
			
			// set up player
			this.player = player;
			
			var image = new Image();
			image.src = this.app.IMAGE_SOURCES['playerImage'];
			this.playerImage = image;
			this.player.image = this.playerImage;
			
			this.player.init();
			
			var image = new Image();
			image.src = this.app.IMAGE_SOURCES['playerShoot'];
			this.playerShoot = image;
			
			//zombie image
			var image = new Image();
			image.src = this.app.IMAGE_SOURCES['zombieImage'];
			this.zombieImage = image;
			
			var image = new Image();
			image.src = this.app.IMAGE_SOURCES['deadZombie'];
			this.deadZombie = image;
			
			//blood image
			var image = new Image();
			image.src = this.app.IMAGE_SOURCES['bloodImage'];
			this.bloodImage = image;
			
			var image = new Image();
			image.src = this.app.IMAGE_SOURCES['bloodSplat'];
			this.bloodSplat = image;
			
			//weapon image
			var image = new Image();
			image.src = this.app.IMAGE_SOURCES['shotgunImage'];
			this.shotgunImage = image;
			
			var image = new Image();
			image.src = this.app.IMAGE_SOURCES['pistolImage'];
			this.pistolImage = image;
			
			var image = new Image();
			image.src = this.app.IMAGE_SOURCES['rifleImage'];
			this.rifleImage = image;
			
			//music
			this.soundtrack = createjs.Sound.play("soundtrack",{loop:-1,volume:0.5});
			
			this.update();
			
	},
	moveSprites: function(){
		//keyboard
		if(this.app.keydown[this.app.KEYBOARD.KEY_LEFT]){
			this.player.moveLeft(this.dt);
		}
		
		if(this.app.keydown[this.app.KEYBOARD.KEY_RIGHT]){
			this.player.moveRight(this.dt);
		}
		
		if(this.app.keydown[this.app.KEYBOARD.KEY_UP]){
			this.player.moveUp(this.dt);
		}
		
		if(this.app.keydown[this.app.KEYBOARD.KEY_DOWN]){
			this.player.moveDown(this.dt);
		}
	
		this.player.update(this.app.mouse.x, this.app.mouse.y);

		//clamp player
		var paddingX = this.player.width/2+55;
		var paddingY = this.player.height/2+60;
		this.player.x = this.utils.clamp(this.player.x, paddingX, this.WIDTH-paddingX);
		this.player.y = this.utils.clamp(this.player.y, paddingY, this.HEIGHT-paddingY);
		
		//clamp bullets
		for(var i=0; i < this.bullets.length; i++){
				//var paddingX = this.bullets[i].width/2+55;
				//var paddingY = this.bullets[i].height/2+60;
				//this.bullets[i].x = this.utils.clamp(this.bullets[i].x, paddingX, this.WIDTH-paddingX);
				//this.bullets[i].y = this.utils.clamp(this.bullets[i].y, paddingY, this.HEIGHT-paddingY);
				if(this.bullets[i].x >= 785 || this.bullets[i].y >= 435){
					this.bullets[i].active = false;
				}
		}
		
		//clamp zombies
		for(var i=0; i < this.zombies.length; i++){
			if(this.zombies[i].y >= 80 && this.zombies[i].y >= 90 && this.zombies[i].x >= 80 && this.zombies[i].x <= 90){
				var paddingX = this.zombies[i].width/2+55;
				var paddingY = this.zombies[i].height/2+60;
				this.zombies[i].x = this.utils.clamp(this.zombies[i].x, paddingX, this.WIDTH-paddingX);
				this.zombies[i].y = this.utils.clamp(this.zombies[i].y, paddingY, this.HEIGHT-paddingY);
			}
		}
		
		//fire bullets
		this.cooldown --;
		
		if(this.cooldown <= 0 && app.mouse.clicked == true){
			if(this.kills >= 100){
				createjs.Sound.play("rifle");
				this.rifle(this.player.x, this.player.y);
			}
			if(this.kills >= 50 && this.kills < 100){
				createjs.Sound.play("shotgun",{volume:0.5});
				this.shotgun(this.player.x, this.player.y);
			} else if(this.kills >= 0 && this.kills < 50){
				createjs.Sound.play("bullet",{volume:0.5});
				this.shoot(this.player.x, this.player.y);
			}
			this.cooldown = 60/this.FIRE_RATE;
			app.mouse.clicked = false;
		}
		
		//move bullets
		if(this.kills >= 100){
			for(var i=0; i < this.bullets.length; i++){
				this.bullets[i].update(this.dt*2);
			}
		} else{
			for(var i=0; i < this.bullets.length; i++){
				this.bullets[i].update(this.dt);
			}
		}
		
		this.bullets = this.bullets.filter(function(bullet){
			return bullet.active;
		});
		
		//Zombies
		if(this.kills >= 200){
			for (var i=0; i < this.zombies.length; i++){
				this.zombies[i].update(this.ctx, this.dt, 105, this.player.x, this.player.y);
			}
		}else if(this.kills >= 100){
			for (var i=0; i < this.zombies.length; i++){
				this.zombies[i].update(this.ctx, this.dt, 95, this.player.x, this.player.y);
			}
		}else if(this.kills >= 50){
			for (var i=0; i < this.zombies.length; i++){
				this.zombies[i].update(this.ctx, this.dt, 85, this.player.x, this.player.y);
			}
		} else {
			for (var i=0; i < this.zombies.length; i++){
				this.zombies[i].update(this.ctx, this.dt, 75, this.player.x, this.player.y);
			}
		}
		
		this.zombies = this.zombies.filter(function(zombie){
			return zombie.active;
		});
		
		if(this.kills >= 200){
			if(Math.random() < this.ENEMY_PROBABILITY_PER_SECOND/30){
				this.zombies.push(new app.Zombie(425,0,this.zombieImage,this.WIDTH,this.HEIGHT));
			} else if(Math.random() < this.ENEMY_PROBABILITY_PER_SECOND/25){
				this.zombies.push(new app.Zombie(0,250,this.zombieImage,this.WIDTH,this.HEIGHT));
			} else if(Math.random() < this.ENEMY_PROBABILITY_PER_SECOND/20){
				this.zombies.push(new app.Zombie(850,250,this.zombieImage,this.WIDTH,this.HEIGHT));
			} else if(Math.random() < this.ENEMY_PROBABILITY_PER_SECOND/35){
				this.zombies.push(new app.Zombie(425,500,this.zombieImage,this.WIDTH,this.HEIGHT));
			}
		}else if(this.kills >= 100){
			if(Math.random() < this.ENEMY_PROBABILITY_PER_SECOND/40){
				this.zombies.push(new app.Zombie(425,0,this.zombieImage,this.WIDTH,this.HEIGHT));
			} else if(Math.random() < this.ENEMY_PROBABILITY_PER_SECOND/35){
				this.zombies.push(new app.Zombie(0,250,this.zombieImage,this.WIDTH,this.HEIGHT));
			} else if(Math.random() < this.ENEMY_PROBABILITY_PER_SECOND/30){
				this.zombies.push(new app.Zombie(850,250,this.zombieImage,this.WIDTH,this.HEIGHT));
			} else if(Math.random() < this.ENEMY_PROBABILITY_PER_SECOND/45){
				this.zombies.push(new app.Zombie(425,500,this.zombieImage,this.WIDTH,this.HEIGHT));
			}
		}else if(this.kills >= 50){
			if(Math.random() < this.ENEMY_PROBABILITY_PER_SECOND/55){
				this.zombies.push(new app.Zombie(425,0,this.zombieImage,this.WIDTH,this.HEIGHT));
			} else if(Math.random() < this.ENEMY_PROBABILITY_PER_SECOND/60){
				this.zombies.push(new app.Zombie(0,250,this.zombieImage,this.WIDTH,this.HEIGHT));
			} else if(Math.random() < this.ENEMY_PROBABILITY_PER_SECOND/50){
				this.zombies.push(new app.Zombie(850,250,this.zombieImage,this.WIDTH,this.HEIGHT));
			} else if(Math.random() < this.ENEMY_PROBABILITY_PER_SECOND/45){
				this.zombies.push(new app.Zombie(425,500,this.zombieImage,this.WIDTH,this.HEIGHT));
			}
		} else {
			if(Math.random() < this.ENEMY_PROBABILITY_PER_SECOND/100){
				this.zombies.push(new app.Zombie(425,0,this.zombieImage,this.WIDTH,this.HEIGHT));
			} else if(Math.random() < this.ENEMY_PROBABILITY_PER_SECOND/110){
				this.zombies.push(new app.Zombie(0,250,this.zombieImage,this.WIDTH,this.HEIGHT));
			} else if(Math.random() < this.ENEMY_PROBABILITY_PER_SECOND/120){
				this.zombies.push(new app.Zombie(850,250,this.zombieImage,this.WIDTH,this.HEIGHT));
			} else if(Math.random() < this.ENEMY_PROBABILITY_PER_SECOND/90){
				this.zombies.push(new app.Zombie(425,500,this.zombieImage,this.WIDTH,this.HEIGHT));
			}
		}
		
		//move blood
		this.bloods.forEach(function(blood){
			blood.update(this.dt);
		}, this);
		
		this.bloods = this.bloods.filter(function(blood){
			return blood.active;
		});
	},
	drawSprites: function(){
		//clear screen
		this.drawLib.clear(this.ctx,0,0,this.WIDTH,this.HEIGHT);
		
		//DRAW
		//i) draw background
		this.drawLib.background(this.ctx, this.WIDTH, this.HEIGHT);
		
		//kills and health
		this.drawLib.text(this.ctx, "Kills: " + this.kills, 30, 25, 15, "#990000");
		this.drawLib.text(this.ctx, "Kills Until Weapon Upgrade: " + this.upgrade, 30, 45, 15, "#990000");
		this.drawLib.text(this.ctx, "Health: " + this.health, 720, 35, 15, "#005500");
		this.drawLib.text(this.ctx, "High Score: " + this.highScore(), 710, 475, 15, "white");
		
		//weapon box
		this.ctx.save();
		this.ctx.fillStyle = "white";
		this.ctx.fillRect(500, 10, 175, 40);
		this.ctx.restore();
		
		//draw weapons
		if(this.kills >= 100){
			this.ctx.drawImage(this.rifleImage, 515, 10, 150, 40);
		}else if(this.kills >= 50){
			this.ctx.drawImage(this.shotgunImage, 515, 10, 150, 40);
		} else {
			this.ctx.drawImage(this.pistolImage, 555, 10, 55, 40);
		}
		
		//draw bullets
		for(var i=0; i < this.bullets.length; i++){
			this.bullets[i].draw(this.ctx);
		}
		
		//ii) draw sprites
		this.player.draw(this.ctx);
		
		//draw zombies
		for(var i=0; i < this.zombies.length; i++){
			this.zombies[i].draw(this.ctx);
		}
		
		//draw blood
		this.bloods.forEach(function(blood){
			blood.draw(this.ctx);
		},this);
		
	},
	shoot: function(x,y){
		//console.log("bang");
		this.bullets.push(new app.Bullet(x, y, 500, 0));
	},
	shotgun: function(x,y){
		//console.log("bang");
		this.bullets.push(new app.Bullet(x, y, 500, 30));
		this.bullets.push(new app.Bullet(x, y, 500, 0));
		this.bullets.push(new app.Bullet(x, y, 500, -30));
	},
	rifle: function(x,y){
		//console.log("bang");
		this.bullets.push(new app.Bullet(x, y, 500, 0));
		this.bullets.push(new app.Bullet(x, y, 500, 0));
		this.bullets.push(new app.Bullet(x, y, 500, 0));
	},
	collides: function(a,b){
		var ax = a.x - a.width/2;
		var ay = a.y - a.height/2;
		var bx = b.x - b.width/2;
		var by = b.y - b.height/2;
		
		return ax < bx + b.width &&
				ax + a.width > bx &&
				ay < by + b.height &&
				ay + a.height > by;
	},
	checkCollisions: function(){
		var self = this;
		
		//bullets v. zombies
		this.bullets.forEach(function(bullet) {
			self.zombies.forEach(function(zombie) {
				if (self.collides(bullet, zombie)) {
					zombie.health --;
					if(zombie.health == 0){
						self.kills ++;
						//self.highScore ++;
						self.upgrade --;
						if(self.kills == 50){
							self.upgrade = 50;
						}
						if(self.kills >= 100){
							self.upgrade = 0;
						}
						zombie.death();
					}
					bullet.active = false;
					self.createZombieBlood(zombie.x-17, zombie.y-14, -zombie.xVelocity/4, -zombie.yVelocity/4);
				} 
			}); 
		});
		
		//zombies v. player
		this.zombies.forEach(function(zombie) {
			if (self.collides(zombie, self.player)) {
				zombie.death();
				self.createPlayerBlood(self.player.x-25, self.player.y-14, -zombie.xVelocity/4, -zombie.yVelocity/4);
				self.health -=10;
				//end game
				if(self.health == 0){
					createjs.Sound.stop("soundtrack");
					createjs.Sound.play("bite",{volume:1.5});
					createjs.Sound.play("zombie1");
					createjs.Sound.play("zombie2");
					createjs.Sound.play("zombie3");
					createjs.Sound.play("playerDeath");
				}
			}
		});
		//console.log("kills:" + this.kills);
		//console.log("health:" + this.health);
	},
	update: function(){
		if(this.isRunning == true){
			//UPDATE
			//move sprites
			this.moveSprites();
		
			//check collisions
			this.checkCollisions();
			
			//DRAW
			this.drawSprites();
		}
			//LOOP
			requestAnimationFrame(this.update.bind(this));
		
		//end game
		if(this.health <= 0){
			this.isRunning = false;
			this.gameOver();
		}
	},
	createZombieBlood: function(x,y,xVelocity,yVelocity){
		createjs.Sound.play("zombieDeath");
		var blood = new app.BloodSprite(this.bloodImage,100,100,84,84,1/14);
		blood.x = x;
		blood.y = y;
		blood.xVelocity = xVelocity;
		blood.yVelocity = yVelocity;
		this.bloods.push(blood);
	},
	createPlayerBlood: function(x,y,xVelocity,yVelocity){
		createjs.Sound.play("playerHit",{volume:1.5});
		var blood = new app.BloodSprite(this.bloodImage,140,140,84,84,1/14);
		blood.x = x;
		blood.y = y;
		blood.xVelocity = xVelocity;
		blood.yVelocity = yVelocity;
		this.bloods.push(blood);
	},
	highScore: function(){
		var highScore = localStorage.getItem('highScore') || 0;
		if (this.kills > highScore) {
			  highScore = parseInt(this.kills);
			  localStorage.setItem('highScore', highScore);
			}
			return highScore;
	},
	gameOver: function(){
		this.ctx.fillStyle = "black";
		this.ctx.fillRect(0,0,this.WIDTH,this.HEIGHT);
		this.drawLib.text(this.ctx, "You Died.", this.WIDTH/2-125, this.HEIGHT/2-100, 50, "red");
		this.drawLib.text(this.ctx, "Total Kills: " + this.kills, this.WIDTH/2-195, this.HEIGHT/2, 50, "white");
		this.drawLib.text(this.ctx, "Play Again?", this.WIDTH/2-145, this.HEIGHT/2+100, 50, "red");
		this.drawLib.text(this.ctx, "Press Enter", this.WIDTH/2-150, this.HEIGHT/2+165, 50, "red");
		
		window.addEventListener("keydown", function(e){
			app.keydown[e.keyCode] = true;
			if(this.app.keydown[this.app.KEYBOARD.KEY_ENTER]){
				location.reload();
			}
		});
	},
}; // end app.main