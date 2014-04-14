#pragma strict

@script RequireComponent( Collider2D )
@script RequireComponent( Rigidbody2D )

var leftButton : CompatibleButton;
var rightButton : CompatibleButton;
var jumpButton : CompatibleButton;
var shootButton : CompatibleButton;

private var shootButtonDebouncer : boolean;

var speed : float = 10;
var jumpStrength : float = 80;
var positionReady = false;
private var facingRight = true;

var pauseButton : PauseButton;

var BulletTemplate : Bullets;
var bulletSource : Transform;

var grounded = false;
var groundCheck : Transform;
var groundRadius = 0.2;
var whatIsGround : LayerMask;

private var velocity : Vector3;
private var activeTeleporter : teleporter;

private var hm : HealthManager;
private var anim : Animator;

function Start () {
	// Cache component lookup at startup instead of doing this every frame
	hm = GetComponent( HealthManager );
    anim = GetComponent(Animator);

	shootButtonDebouncer = false;

	// Move the character to the correct start position in the level, if one exists
	var spawn = GameObject.Find( "PlayerSpawn" );
	if ( spawn ) {
		transform.position = spawn.transform.position;
	}
}

function FixedUpdate () {
  grounded = Physics2D.OverlapCircle(groundCheck.position, groundRadius, whatIsGround);
  anim.SetBool("Ground", grounded);

  if (leftButton.pressed && !pauseButton.paused) {
    rigidbody2D.velocity.x = -speed;
    if (facingRight) {
      Flip();
    }
  }
  if (rightButton.pressed && !pauseButton.paused) {
    rigidbody2D.velocity.x = speed;
    if (!facingRight) {
      Flip();
    }
  }
  if (!leftButton.pressed && !rightButton.pressed) {
    rigidbody2D.velocity.x = 0;
  }
  anim.SetFloat("Speed", Mathf.Abs(rigidbody2D.velocity.x));
  anim.SetFloat("vSpeed", rigidbody2D.velocity.y);
}

private function Flip () {
  facingRight = !facingRight;
  transform.localScale.x *= -1;
}

function Update () {
	positionReady = true;

  if (grounded && jumpButton.pressed) {
    anim.SetBool("Ground", false);
    rigidbody2D.AddForce(new Vector2(0, jumpStrength));
  }

    if ( shootButton.pressed && !shootButtonDebouncer ) {
		this.fire();
		shootButtonDebouncer = true;
	}else if( !shootButton.pressed && shootButtonDebouncer ) {
		shootButtonDebouncer = false;
	}

	//temp respawn stuff
	if ( hm.isDead() ){
		var spawn = GameObject.Find( "PlayerSpawn" );

		if ( spawn ) {
			transform.position = spawn.transform.position;
			hm.respawned();
		}
	}
}

//this is sloppy, shut up
function moveSpawn( t : Transform ){
	var spawn = GameObject.Find( "PlayerSpawn" );
	if ( spawn ) {
		spawn.transform.position = t.position;
	}
}

function setActiveTeleporter ( g : teleporter ){
	activeTeleporter = g;
}

function getActiveTeleporter (){
	return activeTeleporter;
}

function movePlayer( t : Transform ){
	this.transform.position = t.position;
}

function enemyHitPlayer(){
	hm.minusHealth();
}

function fire(){
	var bulletClone : Bullets = Instantiate(BulletTemplate);
	bulletClone.transform.position = bulletSource.position;
	bulletClone.rigidbody2D.AddForce(Vector2(3000,0));
	Destroy(bulletClone.gameObject, 0.5);
}
