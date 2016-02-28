"use strict";

var GAME_WIDTH = 760;
var GAME_HEIGHT = 480;
var BLOCK_OFFSET = 50;
//grid size,target blocks grid location, target block grid color,
//drop blocks grid locations, drop blocks number, number moves total
// obstacles number, obstacles grid locations
		
		
var levels = [
	//level 1
	{		
		numMoves: 1,
		minMoves: 0,
		midMoves: 0,
		gridRows: 1,
		gridColumns: 5,
		stars: 0,
		cx: GAME_WIDTH/2 - BLOCK_OFFSET*2.5, // ask about how this is calculated then change to match grid size
		cy: GAME_HEIGHT/2 - BLOCK_OFFSET*0.5,  // same dealio
		targetNum: 1,
		targetGrid: [{i:0, j:4}],
		targetColor:["red"],
		dropNum: 1,
		dropGrid: [{i:0, j:0}],
		obstacleNum: 0,
		obstacleGrid: [],
		message: ["There are only 3 colors...", "its what we do with them", "that's important."],
		author: "- Jim Rohn",
		levelEnd: ["Click on the question mark button"," below for game tips and help!"]
	},
	//level 2
	{
		numMoves: 2,
		minMoves: 0,
		midMoves: 0,
		gridRows: 4,
		gridColumns: 4,
		stars: 0,
		cx: GAME_WIDTH/2 - BLOCK_OFFSET*2.0,
		cy: GAME_HEIGHT/2 - BLOCK_OFFSET*2.5,
		targetNum: 2,
		targetGrid: [{i:0, j:3}, {i:3, j:0}],
		targetColor:["blue", "yellow"],
		dropNum: 2,
		dropGrid: [{i:0, j:0}, {i:3, j:3}],
		obstacleNum: 8,
		obstacleGrid: [{i:1, j:0}, {i:1, j:1}, {i:1, j:2}, {i:1, j:3}, 
						{i:2, j:0}, {i:2, j:1}, {i:2, j:2}, {i:2, j:3}],
		message: ["We are not retreating,", "we are advancing", "in another direction."],
		author: "- Douglas MacArthur",
		levelEnd: ["Drop blocks can be on", "the left or right."]
	},
	//level 3
	{
		numMoves: 2,
		minMoves: 0,
		midMoves: 0,
		gridRows: 4,
		gridColumns: 4,
		stars: 0,
		cx: GAME_WIDTH/2 - BLOCK_OFFSET*2.0,
		cy: GAME_HEIGHT/2 - BLOCK_OFFSET*2.5,
		targetNum: 2,
		targetGrid: [{i:0, j:3}, {i:3, j:0}],
		targetColor:["blue", "yellow"],
		dropNum: 2,
		dropGrid: [{i:0, j:0}, {i:3, j:3}],
		obstacleNum: 8,
		obstacleGrid: [{i:0, j:1}, {i:1, j:1}, {i:2, j:1}, {i:3, j:1}, 
						{i:0, j:2}, {i:1, j:2}, {i:2, j:2}, {i:3, j:2}],
		message: [],
		author: "",
		levelEnd: ["Drop blocks can also","be above or below."]
		
	},
	//level 4
	{
		numMoves: 2,
		minMoves: 0,
		midMoves: 0,
		gridRows: 4,
		gridColumns: 4,
		stars: 0,
		cx: GAME_WIDTH/2 - BLOCK_OFFSET*2.0,
		cy: GAME_HEIGHT/2 - BLOCK_OFFSET*2.5,
		targetNum: 1,
		targetGrid: [{i:3, j:3}],
		targetColor:["DarkOrange"],
		dropNum: 2,
		dropGrid: [{i:0, j:3}, {i:3, j:0}],
		obstacleNum: 9,
		obstacleGrid: [{i:0, j:0},{i:0, j:1},{i:0, j:2},{i:1, j:0}, {i:1, j:1}, {i:1, j:2}, 
						{i:2, j:0}, {i:2, j:1}, {i:2, j:2}],
		message: ["Orange is the", "happiest color."],
		author: "- Frank Sinatra",
		levelEnd: ["Color combinations can be found", "by clicking the help button below."]
	},
	//level 5
	{
		numMoves: 2,
		minMoves: 0,
		midMoves: 0,
		gridRows: 4,
		gridColumns: 7,
		stars: 0,
		cx: GAME_WIDTH/2 - BLOCK_OFFSET*3.4,
		cy: GAME_HEIGHT/2 - BLOCK_OFFSET*2.5,
		targetNum: 1,
		targetGrid: [{i:3, j:6}],
		targetColor:["DarkOrange"],
		dropNum: 2,
		dropGrid: [{i:0, j:3}, {i:3, j:0}],
		obstacleNum: 9,
		obstacleGrid: [{i:0, j:0}, {i:0, j:1}, {i:0, j:2}, {i:0, j:4}, {i:0, j:5}, {i:0, j:6},
						{i:1, j:0}, {i:1, j:1}, {i:1, j:2}, {i:1, j:4}, {i:1, j:5}, {i:1, j:6},
						{i:2, j:0}, {i:2, j:1}, {i:2, j:2}, {i:2, j:4}, {i:2, j:5}, {i:2, j:6}],
		message: ["Order Matters."],
		author: "",
		levelEnd: ["Once one color hits another,","every preceding block will","be the new color."]
		
	},
	//level 6
	{
		numMoves: 3,
		gridRows: 7,
		gridColumns: 7,
		stars: 0,
		cx: GAME_WIDTH/2 - BLOCK_OFFSET*3.5,
		cy: GAME_HEIGHT/2 - BLOCK_OFFSET*3.5,
		targetNum: 3,
		targetGrid: [{i:2, j:6}, {i:4, j:0}, {i:6, j:3}],
		targetColor:["green", "purple", "blue"],
		dropNum: 3,
		dropGrid: [{i:0, j:3}, {i:2, j:0}, {i:4, j:6}],
		obstacleNum: 30,
		obstacleGrid: [{i:0, j:0}, {i:0, j:1}, {i:0, j:2},{i:0, j:4}, {i:0, j:5}, {i:0, j:6},
						{i:1, j:0}, {i:1, j:1}, {i:1, j:2},{i:1, j:4}, {i:1, j:5}, {i:1, j:6},
						{i:3, j:0}, {i:3, j:1}, {i:3, j:2},{i:3, j:4}, {i:3, j:5}, {i:3, j:6},
						{i:5, j:0}, {i:5, j:1}, {i:5, j:2},{i:5, j:4}, {i:5, j:5}, {i:5, j:6},
						{i:6, j:0}, {i:6, j:1}, {i:6, j:2},{i:6, j:4}, {i:6, j:5}, {i:6, j:6}],
		message: [],
		author: "",
		levelEnd: []
		
	},
	//level 7
	{
		numMoves: 4,
		minMoves: 2,
		midMoves: 1,
		gridRows: 5,
		gridColumns: 7,
		stars: 0,
		cx: GAME_WIDTH/2 - BLOCK_OFFSET*3.5,
		cy: GAME_HEIGHT/2 - BLOCK_OFFSET*4,
		targetNum: 2,
		targetGrid: [{i:2, j:2},{i:2, j:4}],
		targetColor:["green", "green"],
		dropNum: 16,
		dropGrid: [{i:0, j:1},{i:0, j:2},{i:0, j:3},{i:0, j:4},{i:0, j:5},
					{i:1, j:0},{i:2, j:0},{i:3, j:0},{i:1, j:6},{i:2, j:6},{i:3, j:6},
					{i:4, j:1},{i:4, j:2},{i:4, j:3},{i:4, j:4},{i:4, j:5}],
		obstacleNum: 4,
		obstacleGrid: [{i:0, j:0},{i:0, j:6},{i:4, j:0},{i:4, j:6}],
		message: [],
		author: "",
		levelEnd: []
	},
	//level 8
	{
		numMoves: 4,
		minMoves: 2,
		midMoves: 1,
		gridRows: 7,
		gridColumns: 7,
		stars: 0,
		cx: GAME_WIDTH/2 - BLOCK_OFFSET*3.5,
		cy: GAME_HEIGHT/2 - BLOCK_OFFSET*4,
		targetNum: 3,
		targetGrid: [{i:3, j:3},{i:3, j:6},{i:6, j:3},],
		targetColor:["purple", "purple", "red"],
		dropNum: 9,
		dropGrid: [{i:0, j:1},{i:0, j:2},{i:0, j:3},{i:0, j:4},{i:0, j:5},{i:0, j:6},
					{i:1, j:0},{i:2, j:0},{i:3, j:0},{i:4, j:0},{i:5, j:0},{i:6, j:0} ],
		obstacleNum: 1,
		obstacleGrid: [{i:0, j:0}],
		message: [],
		author: "",
		levelEnd: []
	}
];