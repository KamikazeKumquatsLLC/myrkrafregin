#pragma strict

var fbc : FourButtonControl;

var cheatingTomFoolery : String;

private var doorExit : GameObject;

function Start () {
	doorExit = GameObject.Find( cheatingTomFoolery );	
}

function Update () {

}

function OnTriggerEnter ( player : Collider ){
	if ( doorExit ) {	
		fbc.moveSpawn( doorExit.transform );
		fbc.movePlayer( doorExit.transform );
	}
}