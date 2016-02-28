
"use strict";
var app = app || {};

app.drawLib = {

	clear: function(ctx,x,y,w,h){
		ctx.clearRect(x,y,w,h);
	},
	
	player: function(ctx,image,x,y,w,h,rad){
		ctx.save();
		ctx.translate(x, y);
		ctx.rotate(-rad);
		ctx.drawImage(image, -w/2,-h/2,w,h);
		/*ctx.fillStyle = col;
		ctx.strokeStyle = "black";
		ctx.fillRect(-w/2,-h/2,w,h);
		ctx.strokeRect(-w/2,-h/2,w,h);*/
		ctx.restore();
	},
	
	zombie: function(ctx,image,x,y,w,h,rad){
		ctx.save();
		ctx.translate(x, y);
		ctx.rotate(-rad);
		ctx.drawImage(image, -w/2,-h/2,w,h);
		/*ctx.fillStyle = col;
		ctx.strokeStyle = "black";
		ctx.fillRect(-w/2,-h/2,w,h);
		ctx.strokeRect(-w/2,-h/2,w,h);*/
		ctx.restore();
	},
	
	text: function(ctx, string, x, y, size, col){
		ctx.save();
		ctx.font = 'bold ' + size + 'px Monospace';
		ctx.fillStyle = col;
		ctx.fillText(string, x, y);
		ctx.restore();
	},
	
	background: function(ctx,width,height){
		ctx.save();

		ctx.fillStyle = "#555555";
		ctx.strokeStyle = "black";
		ctx.lineWidth = 2;
		ctx.translate(-52,-11);
	
		for(var i=0;i < 16; i++){
			ctx.save();  			// push state before a row is drawn
			for(var j=0;j < 26; j++){
				ctx.translate(35,0);
				ctx.fillRect(5,0,35,35);
				ctx.strokeRect(5,0,35,35);
			}
			// done with a row
			ctx.restore(); 			// move (0,0) back to left
			ctx.translate(0,35); 	// move (0,0) down for next row
		}
		ctx.restore();
		
		ctx.save();
		ctx.fillStyle = "#777777";
		ctx.fillRect(0,0,59,200);
		ctx.fillRect(0,303,59,200);
		ctx.fillRect(0,440,374,200);
		ctx.fillRect(477,440,800,200);
		ctx.fillRect(792,303,94,200);
		ctx.fillRect(792,0,94,200);
		ctx.fillRect(477,0,400,60);
		ctx.fillRect(0,0,374,60);
		ctx.restore();
		
		ctx.drawImage(app.main.bloodSplat, 100, 100, 100, 87);
		ctx.drawImage(app.main.bloodSplat, 100, 100, 100, 87);
		ctx.drawImage(app.main.bloodSplat, 100, 100, 100, 87);
		ctx.drawImage(app.main.bloodSplat, 500, 200, 80, 70);
		ctx.drawImage(app.main.bloodSplat, 500, 200, 80, 70);
		ctx.drawImage(app.main.bloodSplat, 200, 350, 50, 44);
		ctx.drawImage(app.main.bloodSplat, 210, 360, 50, 44);
		//ctx.drawImage(app.main.titleScreen, 0, 0, width, height);
	}
}