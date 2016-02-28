"use strict";
app.Zombie = function(){

	function Zombie(x,y,image,canvasWidth,canvasHeight) {
		// ivars
		this.canvasWidth = canvasWidth;
		this.canvasHeight = canvasHeight;
		this.active = true;
		this.age = Math.floor(Math.random() * 128);
		this.radians = 0;
		this.health = 2;
		if(app.main.kills >= 50){
			this.health = 3;
		}
		if(app.main.kills >= 100){
			this.health = 4;
		}
		this.color = "#A2B";
		this.x = x;
		//this.x = this.canvasWidth / 4 + Math.random() * this.canvasWidth / 2;
		this.y = y;
		if(this.y >= 0 && this.y <= 70){
			this.xVelocity = 0;
			this.yVelocity = 75;
			//console.log(this.yVelocity);
		}
		if(this.y >= 430 && this.y <= 500){
			this.xVelocity = 0;
			this.yVelocity = -75;
			//console.log(this.yVelocity);
		}
		if(this.x >= 0 && this.x <= 70){
			this.xVelocity = 75;
			this.yVelocity = 0;
		}
		if(this.x >= 780 && this.x <= 850){
			this.xVelocity = -75;
			this.yVelocity = 0;
		}
		this.amplitude = app.utils.getRandom(1.5,7.0); // oops, app global
		this.image = image;
		this.width = 35;
		this.height = 28;
	};
		

	var p = Zombie.prototype;
	
	  p.draw = function(ctx) {
			var halfW = this.width/2;
			var halfH = this.height/2;
			
			if(!this.image){
				ctx.fillStyle = this.color;
				ctx.fillRect(this.x - halfW, this.y - halfH, this.width, this.height);
				
			} else{
				ctx.save();
		
				app.drawLib.zombie(ctx, this.image, this.x, this.y, this.width, this.height, this.radians);
		
				ctx.restore();
			}
	  };
	
	p.update = function(ctx,dt,speed,playerX,playerY) {
		this.radians = Math.atan2(this.x - playerX, this.y - playerY) + Math.PI/2;
		if(this.y >= 70 && this.y <= 430 && this.x >= 70 && this.x <= 780){
			this.xVelocity = speed * Math.cos(Math.atan2(this.x - app.player.x, this.y - app.player.y) + Math.PI/2);
			this.yVelocity = -speed * Math.sin(Math.atan2(this.x - app.player.x, this.y - app.player.y) + Math.PI/2);
			//console.log(this.yVelocity);
		}
		this.x += this.xVelocity * dt;
		this.y += this.yVelocity * dt;
		this.age++;
		this.active = this.active;
	  };
	  
	 p.death  = function() {
		this.active = false;
	  };
	
	return Zombie;
	
}();
