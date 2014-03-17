
#pragma strict

var target : FourButtonControl;
var smoothTime = 0.3;
private var thisTransform : Transform;
private var velocity : Vector2;

function Start()
{
	thisTransform = transform;

	var spawn = GameObject.Find( "PlayerSpawn" );
	if ( spawn ) {
		thisTransform.position.x = spawn.transform.position.x;
		thisTransform.position.y = spawn.transform.position.y;
	}
}

function Update() 
{
	thisTransform.position.x = Mathf.SmoothDamp( thisTransform.position.x, 
		target.transform.position.x, velocity.x, smoothTime);
	thisTransform.position.y = Mathf.SmoothDamp( thisTransform.position.y, 
		target.transform.position.y, velocity.y, smoothTime);
}