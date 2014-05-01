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

var hueIncrement = 1;

var grounded = false;
var groundCheck : Transform;
var groundRadius = 0.2;
var whatIsGround : LayerMask;

private var velocity : Vector3;
private var activeTeleporter : teleporter;

private var hm : HealthManager;
private var anim : Animator;

private var godMode = false;
private var hue = 1;

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
  godMode = PersistentData.GodMode;
}

private function hsl2rgb(h : float, s : float, v : float) : Color {
  // Convert HSL to RGB
  var r : float;
	var g : float;
	var b : float;
	var max : float = v;
	var dif : float = v * s;
	var min : float = v - dif;
	if (h < 60) {
		r = max;
		g = h * dif / 60.0 + min;
		b = min;
	} else if (h < 120) {
		r = -(h - 120) * dif / 60.0 + min;
		g = max;
		b = min;
	} else if (h < 180) {
		r = min;
		g = max;
		b = (h - 120) * dif / 60.0 + min;
	} else if (h < 240) {
		r = min;
		g = -(h - 240) * dif / 60.0 + min;
		b = max;
	} else if (h < 300) {
		r = (h - 240) * dif / 60.0 + min;
		g = min;
		b = max;
	} else if (h <= 360) {
		r = max;
		g = min;
		b = -(h - 360) * dif / 60.0 + min;
	}
	return Color(Mathf.Clamp01(r), Mathf.Clamp01(g), Mathf.Clamp01(b));
}

private function setColor() {
  this.GetComponent(SpriteRenderer).color = hsl2rgb(hue, 1, 1);
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

  hue += hueIncrement;
  if (hue > 360) {
    hue -= 360;
  }
}

private function Flip () {
  facingRight = !facingRight;
  transform.localScale.x *= -1;
}

function Update () {
  if (godMode) {
    setColor();
  }

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
