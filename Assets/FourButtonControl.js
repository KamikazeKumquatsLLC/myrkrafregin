#pragma strict

@script RequireComponent( BoxCollider2D )
@script RequireComponent( Rigidbody2D )

var leftButton : CompatibleButton;
var rightButton : CompatibleButton;
var jumpButton : CompatibleButton;

var speed : float = 4;
var jumpStrength : float = 16;
var decayFactor : float = 0.8;
var positionReady = false;
private var facingRight = true;

var health = 3;

var pauseButton : PauseButton;

var charIsGrounded;

private var velocity : Vector3;
private var activeTeleporter : teleporter;

var chd : changeHeadDirection;

private var hm : HealthManager;
private var anim : Animator;

function Start () {
	// Cache component lookup at startup instead of doing this every frame
	hm = GetComponent( HealthManager );
  anim = GetComponent(Animator);

	// Move the character to the correct start position in the level, if one exists
	var spawn = GameObject.Find( "PlayerSpawn" );
	if ( spawn ) {
		transform.position = spawn.transform.position;
	}
}

function FixedUpdate () {
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
  Debug.Log(Mathf.Abs(rigidbody2D.velocity.x));
  anim.SetFloat("Speed", Mathf.Abs(rigidbody2D.velocity.x));
}

private function Flip () {
  facingRight = !facingRight;
  transform.localScale.x *= -1;
}

function Update () {
	positionReady = true;

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
