"use strict";

var gridColor = "#fff";

function Block(row, column, cx, cy)
		{
			var self = this;
			this.width = 50;
			this.height = 50;
			this.x = 0;
			this.y = 0;
			this.cx = cx;
			this.cy = cy;
			this.fillStyle = gridColor;
			this.strokeStyle = "EEE";
			this.lineWidth = 1;
			this.target = false;
			this.drop = false;
			this.obstacle = false;
			this.beenColored = false;
			this.beenDropped = false;
			this.row = row;
			this.column = column;
			this.insideColor = "fff";
			
		}
		
		var p = Block.prototype;
		
		p.draw = function(ctx)
		{
			ctx.save();
			ctx.beginPath();
			ctx.fillStyle = this.fillStyle;
			ctx.strokeStyle = this.strokeStyle;
			ctx.lineWidth = this.lineWidth;
			ctx.rect(this.cx, this.cy, this.width, this.height);
			ctx.closePath();
			ctx.fill();
			//ctx.stroke();
			
			ctx.beginPath();
			ctx.rect(this.cx, this.cy, this.width , this.height);
			ctx.clip();
			
			for (var k =0; k < 10; k++)
			{
				ctx.beginPath();
				ctx.strokeStyle = this.strokeStyle;
				ctx.lineWidth = 5;
				ctx.shadowBlur = 15;
				ctx.shadowColor = this.insideColor;
				ctx.shadowOffsetX = 0;
				ctx.shadowOffsetY = 0;
				ctx.strokeRect(this.cx, this.cy, this.width, this.height);
				ctx.closePath();	
			}
			ctx.restore();
		}
		
		p.isPointInside = function(x,y)
		{
			//console.log(x,y, this.cx, this.cy, this.row, this.column);
			return ( x >= this.cx 
					&& x <= this.cx + this.width
					&& y >= this.cy
					&& y <= this.cy + this.height);
		}