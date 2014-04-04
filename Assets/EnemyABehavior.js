#pragma strict


var speed = 0.04;
var isSmart = false;

private var waitTicks = 0;

var player : FourButtonControl;

var headLeft : Sprite;
var headRight : Sprite;

private var _render : SpriteRenderer;

function Start () {
	_render = GetComponent ( SpriteRenderer );
}

function Update () {
	if(waitTicks == 5){
		var distanceX = this.transform.position.x - player.transform.position.x;
		var distanceY = this.transform.position.y - player.transform.position.y;
		if(distanceX != null && distanceX != 0){
			if(distanceX > 0){
				this.transform.position.x = (speed <= distanceX ? this.transform.position.x - speed : this.transform.position.x - distanceX);
			}else{
				this.transform.position.x = (speed <= -distanceX ? this.transform.position.x + speed : this.transform.position.x + distanceX);
			}
		}
		if(distanceY != null && distanceY != 0){
			if(distanceY > 0){
				this.transform.position.y = (speed <= distanceY ? this.transform.position.y - speed : this.transform.position.y - distanceY);
			}else{
				this.transform.position.y = (speed <= -distanceY ? this.transform.position.y + speed : this.transform.position.y + distanceY);
			}
		}
		waitTicks = 0;
		
		if((distanceX <= 0.75 && distanceX >= -0.75) && (distanceY <= 1.65 && distanceY >= -1.65)){
			player.enemyHitPlayer();
		}
	}
	waitTicks++;
	Debug.Log(distanceX + ", " + distanceY);
	
	if(this.transform.position.x - player.transform.position.x > 0){
		_render.sprite = headLeft;
	}else{
		_render.sprite = headRight;
	}		
}