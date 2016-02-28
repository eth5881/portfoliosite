"use strict"
var app = app || {};

app.Bullet = function(){
	
	function Bullet(x,y,speed,offset){
		//ivars - unique for every instance
		this.x = x;
		this.y = y;
		this.active = true;
		
		if(app.main.kills >= 100){
			this.xVelocity = speed * Math.cos(Math.atan2(this.x - app.mouse.targetX, this.y - app.mouse.targetY + offset) + Math.PI/2);
			this.yVelocity = -speed * Math.sin(Math.atan2(this.x - app.mouse.targetX, this.y - app.mouse.targetY + offset) + Math.PI/2);
		} else if(app.main.kills >= 50 && app.main.kills < 100){
			this.xVelocity = speed * Math.cos(Math.atan2(this.x - app.mouse.targetX + offset, this.y - app.mouse.targetY + offset) + Math.PI/2);
			this.yVelocity = -speed * Math.sin(Math.atan2(this.x - app.mouse.targetX + offset, this.y - app.mouse.targetY + offset) + Math.PI/2);
		} else {
			this.xVelocity = speed * Math.cos(Math.atan2(this.x - app.mouse.targetX, this.y - app.mouse.targetY) + Math.PI/2);
			this.yVelocity = -speed * Math.sin(Math.atan2(this.x - app.mouse.targetX, this.y - app.mouse.targetY) + Math.PI/2);
		}
		this.width = 3;
		this.height = 3;
		this.color = "#FFF";
	} // end Bullet Constructor
	
	var p = Bullet.prototype;
	
	p.update = function(dt,ctx,canvas){
		this.x += this.xVelocity * dt;
		this.y += this.yVelocity * dt;
		this.active = this.active && inBounds(this.y) && inBounds(this.x);
	};
	
	p.draw = function(ctx){
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.width, this.height);
	};
	
	//private method
	function inBounds(y){
		return y >= 55;
	};
	
	return Bullet;
}();