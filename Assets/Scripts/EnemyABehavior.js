#pragma strict


var speed = 0.04;
private var enemyAcceleration : float;

var isSmart = false;
var isPlayerDetected : boolean;

var playerDistanceBeforeDetection : int;

private var waitTicks = 0;


var headLeft : Sprite;
var headRight : Sprite;

var debugStoof : float;

var hasGun : boolean;

var health : int;

var speedIncrement : float;

private var _render : SpriteRenderer;
private var player : FourButtonControl;
var grounded = false;
var groundCheck : Transform;
var groundRadius = 0.2;
var whatIsGround : LayerMask;

function Start () {
	player = FourButtonControl.Player;
	_render = GetComponent ( SpriteRenderer );
}

function Update () {
	if( isPlayerDetected ){
		move();
	}else if(Mathf.Abs(player.transform.position.x - this.transform.position.x) < playerDistanceBeforeDetection){
		isPlayerDetected = true;
	}
	
	if(health <= 0){
		Destroy(this.gameObject);
	}
	debugStoof = this.rigidbody2D.velocity.x;
}

function FixedUpdate(){
	grounded = Physics2D.OverlapCircle(groundCheck.position, groundRadius, whatIsGround);
}

function move(){
	if(waitTicks == 5){
		var distanceX = this.transform.position.x - player.transform.position.x;
		var distanceY = this.transform.position.y - player.transform.position.y;
		debugStoof = distanceY;
		if(distanceX != null && distanceX != 0){
			if(enemyAcceleration == 0){
				enemyAcceleration = 1;
			}
			
			if(distanceX > 0){
				this.rigidbody2D.velocity.x = (this.rigidbody2D.velocity.x >= -speed ? this.rigidbody2D.velocity.x - (1 / enemyAcceleration) : this.rigidbody2D.velocity.x);
				enemyAcceleration += 0.1;
			}else{
				if(this.rigidbody2D.velocity.x <= 0 && enemyAcceleration >= 1){
					enemyAcceleration -= 0.1;
				}else if( this.rigidbody2D.velocity.x >= 0){
					enemyAcceleration += 0.1;
				}
				this.rigidbody2D.velocity.x = (this.rigidbody2D.velocity.x <= speed ? this.rigidbody2D.velocity.x + (1 / enemyAcceleration) : this.rigidbody2D.velocity.x);
			}
		}
		
		if(distanceY != null && distanceY != 0){
			if((distanceY > 2 || distanceY < -2) && grounded){
				this.rigidbody2D.AddForce(Vector2(0,500));
			}
		}
		waitTicks = 0;
	
	}
	waitTicks++;
	//Debug.Log(distanceX + ", " + distanceY);
	
	if(this.transform.position.x - player.transform.position.x > 0){
		_render.sprite = headLeft;
	}else{
		_render.sprite = headRight;
	}	
}

function hurt( i : int ){
	this.health -= i;
}

function OnCollisionStay2D(coll : Collision2D){
	if(coll.gameObject.tag == "Player"){
		player.enemyHitPlayer();
	}
}

function OnCollisionEnter2D(coll : Collision2D){
	if(coll.gameObject.tag == "Enemy"){
		this.isPlayerDetected = true;
	}
}