
"use strict";

var app = app || {};

app.mouse = {
	x:0,
	y:0,
	targetX:0,
	targetY:0,
	clicked:false,
	holding:false
};

app.KEYBOARD = {
	"KEY_LEFT": 65,
	"KEY_UP": 87,
	"KEY_RIGHT": 68,
	"KEY_DOWN": 83,
	"KEY_ENTER": 13
};

app.IMAGE_SOURCES = {
	playerImage: "images/player_image.png",
	zombieImage: "images/zombie_image.png",
	deadZombie: "images/dead_zombie.png",
	bloodImage: "images/blood_sprite_sheet.png",
	playerShoot: "images/player_shoot.png",
	bloodSplat: "images/blood_splat.png",
	titleScreen: "images/title_screen.png",
	intructionsScreen: "images/instructions_screen.png",
	shotgunImage: "images/shotgun.png",
	pistolImage: "images/pistol.png",
	rifleImage: "images/rifle.png",
};

app.keydown = [];

window.onload = function(){
	console.log("window.onload called");
	app.main.app = app;
	app.main.utils = app.utils;
	app.player.drawLib = app.drawLib;
	app.player.app = app;
	app.drawLib.app = app;
	app.main.drawLib = app.drawLib;
	
	//event listeners
	window.addEventListener("mousemove", function(e){
		app.mouse.x = e.pageX;
		app.mouse.x = app.mouse.x - e.target.offsetLeft;
		app.mouse.y = e.pageY;
		app.mouse.y = app.mouse.y - e.target.offsetTop;
		//console.log(app.mouse.x, app.mouse.y);
	});
	
	window.addEventListener("click", function(e){
		app.mouse.clicked = true;
		app.mouse.targetX = e.pageX;
		app.mouse.targetX = app.mouse.targetX - e.target.offsetLeft;
		app.mouse.targetY = e.pageY;
		app.mouse.targetY = app.mouse.targetY -  e.target.offsetTop;
		//console.log(app.mouse.targetX, app.mouse.targetY);
	});
	
	window.addEventListener("keydown", function(e){
		//console.log("keydown=" + e.keyCode);
		app.keydown[e.keyCode] = true;
		if(this.app.keydown[this.app.KEYBOARD.KEY_ENTER]){
			app.main.isRunning = true;
		}
	});
	
	window.addEventListener("keyup", function(e){
		//console.log("keyup=" + e.keyCode);
		app.keydown[e.keyCode] = false;
	});
	
	//Preload images and sound
	app.queue = new createjs.LoadQueue(false);
	app.queue.installPlugin(createjs.Sound);
	app.queue.on("complete", function(){
		console.log("images loaded called");
		app.main.init(app.player);
	});
	
	app.queue.loadManifest([
		{id: "playerImage", src:"images/player_image.png"},
		{id: "zombieImage", src:"images/zombie_image.png"},
		{id: "bloodImage", src:"images/blood_sprite_sheet.png"},
		{id: "deadZombie", src:"images/dead_zombie.png"},
		{id: "bloodSplat", src:"images/blood_splat.png"},
		{id: "titleScreen", src:"images/title_screen.png"},
		{id: "shotgunImage", src:"images/shotgun.png"},
		{id: "pistolImage", src:"images/pistol.png"},
		{id: "rifleImage", src:"images/rifle.png"},
		{id: "instructionsScreen", src:"images/instructions_screen.png"},
		{id: "bullet", src:"sounds/gunshot.mp3", data:10},
		{id: "shotgun", src:"sounds/shotgun.wav", data:10},
		{id: "rifle", src:"sounds/rifle.wav", data:20},
		{id: "zombieDeath", src:"sounds/zombieDeath.wav", data:10},
		{id: "playerHit", src:"sounds/playerHit.wav", data:10},
		{id: "playerDeath", src:"sounds/playerDeath.wav"},
		{id: "zombie1", src:"sounds/zombie1.wav"},
		{id: "zombie2", src:"sounds/zombie2.wav"},
		{id: "zombie3", src:"sounds/zombie3.wav"},
		{id: "bite", src:"sounds/bite.wav"},
		{id: "soundtrack", src:"sounds/soundtrack.mp3"},
	]);
}