#pragma strict

@script RequireComponent( CharacterController )

var leftButton : CompatibleButton;
var rightButton : CompatibleButton;
var jumpButton : CompatibleButton;

var speed : float = 4;
var jumpStrength : float = 16;
var decayFactor : float = 0.8;
var positionReady = false;

var health = 3;

var pauseButton : PauseButton;

var charIsGrounded;

private var thisTransform : Transform;
private var character : CharacterController;
private var velocity : Vector3;
private var activeTeleporter : teleporter;

var chd : changeHeadDirection;

private var hm : HealthManager;

function Start () {
	// Cache component lookup at startup instead of doing this every frame		
	thisTransform = GetComponent( Transform );
	character = GetComponent( CharacterController );
	hm = GetComponent( HealthManager );	

	// Move the character to the correct start position in the level, if one exists
	var spawn = GameObject.Find( "PlayerSpawn" );
	if ( spawn ) {
		thisTransform.position = spawn.transform.position;
	}
}

function Update () {
	charIsGrounded = character.isGrounded;

	positionReady = true;

	var movement = Vector3.zero;
	
	velocity.z = 0;
	
	if( this.transform.position.y <= -100 ){
		hm.minusHealth();
	}

	// Apply movement from move joystick
	if ( leftButton.pressed && !pauseButton.paused ) {
		movement = Vector3.left * speed;
		chd.changeTheHeadDirection(0);
	}

	if ( rightButton.pressed && !pauseButton.paused ) {
		movement = Vector3.right * speed;
		chd.changeTheHeadDirection(1);
	}
	
	// Check for jump
	if ( character.isGrounded && jumpButton.pressed && !pauseButton.paused ) {
		velocity = Vector3.zero;
		velocity.y = jumpStrength;
	}

	if (velocity.y != 0) {
		velocity.y += Physics.gravity.y * Time.deltaTime;
	}
	
	movement += Physics.gravity;
	movement += velocity;
	movement *= Time.deltaTime;
	
	// Actually move the character	
	character.Move( movement );

	if ( character.isGrounded ) {
		velocity = Vector3.zero;
	}
	
	//temp respawn stuff
	if ( hm.isDead() ){
		var spawn = GameObject.Find( "PlayerSpawn" );
		
		if ( spawn ) {
			thisTransform.position = spawn.transform.position;
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