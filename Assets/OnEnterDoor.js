#pragma strict

var fbc : FourButtonControl;

var cheatingTomFoolery : String;
var isLevelDoor : boolean;

private var doorExit : GameObject;

function Start () {
	if(!isLevelDoor){
		doorExit = GameObject.Find( cheatingTomFoolery );	
	}
}

function Update () {

}

function OnTriggerEnter2D ( player : Collider2D ){
	if ( (doorExit && player.tag == "Player") && !isLevelDoor ) {	
		fbc.moveSpawn( doorExit.transform );
		fbc.movePlayer( doorExit.transform );
	}else if( player.tag == "Player" && isLevelDoor ){
		Application.LoadLevel(cheatingTomFoolery);
	}
}