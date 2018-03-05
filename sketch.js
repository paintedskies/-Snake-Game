var s;
var scl = 10;
var food;
function setup() {
	createCanvas(500, 500);
	s = new Snek();
	console.log("Hi");
	frameRate(10);
	pickLocation();
}

function draw() {
	background(50);
	if(s.foundFood()) {
		s.eat();
		pickLocation();
	}

	s.update();
	s.show();
	fill(255, 0, 0);
	rect(food.x, food.y, scl, scl);

}
function pickLocation(){
	 food = createVector(floor(random(width/scl)), floor(random(height/scl)));
	 food.mult(scl);
}
function keyPressed(){
	if(keyCode === UP_ARROW && s.yspeed!=1) {
		s.dir(0,-1);
	} else if (keyCode === DOWN_ARROW && s.yspeed!=-1) {
		s.dir(0,1);
	} else if(keyCode === RIGHT_ARROW&& s.xspeed != -1) {
		s.dir(1,0);
	} else if(keyCode === LEFT_ARROW&& s.xspeed != 1) {
		s.dir(-1,0);
	}
}

function Snek()
{
	this.x = 0;
	this.y = 0;
	this.xspeed = 1;
	this.yspeed = 0;
	this.total = 0;
	this.tail = [];
	
	this.update = function() { 
		for(var i = 0; i < this.tail.length-1; i++)
		{
			this.tail[i] = this.tail[i+1];
		}
		this.tail[this.tail.length-1]=createVector(this.x, this.y);
		this.x  =this.x+this.xspeed*scl;
		this.y = this.y+this.yspeed*scl;
		this.x = constrain(this.x, 0, width-scl);
		this.y = constrain(this.y, 0, height-scl);
		if(this.collide()){
			this.x = 0; 
			this.y = 0;
			this.xspeed=1; 
			this.yspeed = 0;
			this.tail = [];
			this.total = 0;
		}
	}
	this.show = function(){
		fill(255);
		rect(this.x, this.y, 10, 10);
		for(var i = 0; i < this.tail.length; i++)
		{
			rect(this.tail[i].x, this.tail[i].y, scl, scl);
		}
	}
	this.dir = function(x,y) {
		this.xspeed= x;
		this.yspeed = y;
	}
	this.foundFood = function() {
		var d = dist(this.x, this.y, food.x, food.y);
		if(d<1){
			return true;
		}
		else{
			return false;
		}
	}
	this.eat = function(){
		this.tail[this.total]= createVector(this.x, this.y);
		this.total++;
	}
	this.collide = function(){
		for(var i = 0; i  < this.total; i++)
		{
			var d = dist(this.x, this.y, this.tail[i].x, this.tail[i].y);
			if(d<1)
			{
				return true;
			}
		}
		return false;
	}

}
