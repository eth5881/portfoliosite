
"use strict";

var app = app || {};

app.player = {
	color: "green",
	x: 425,
	y: 420,
	width: 50,
	height: 35,
	speed: 150,
	mouse: {},
	radians: 0,
	image: undefined,
	drawLib: undefined,
	app: undefined,

	init: function(){
		console.log("app.player.init() called");
	
	},
	update: function(mouseX, mouseY){
		this.radians = Math.atan2(this.x - mouseX, this.y - mouseY) + Math.PI/2;
		//console.log(this.radians);
	},
	draw: function(ctx){
		ctx.save();
		
		this.drawLib.player(ctx, this.image, this.x, this.y, this.width, this.height, this.radians);
		
		ctx.restore();
	},
	moveLeft: function(dt){
		this.x -= this.speed * dt;
	},
	moveRight: function(dt){
		this.x += this.speed * dt;
	},
	moveUp: function(dt){
		this.y -= this.speed * dt;
	},
	moveDown: function(dt){
		this.y += this.speed * dt;
	},
}; // end app.player