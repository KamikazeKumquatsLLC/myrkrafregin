#pragma strict

private var fbc : FourButtonControl;

var cheatingTomFoolery : String;
var isLevelDoor : boolean;

private var doorExit : GameObject;

function Start () {
  fbc = FourButtonControl.Player;
	if(!isLevelDoor){
		doorExit = GameObject.Find( cheatingTomFoolery );
	}
}

function Update () {
  if (!fbc) {
    fbc = FourButtonControl.Player;
  }
}

function OnTriggerEnter2D ( player : Collider2D ){
	if ( (doorExit && player.tag == "Player") && !isLevelDoor ) {
		fbc.moveSpawn( doorExit.transform );
		fbc.movePlayer( doorExit.transform );
	}else if( player.tag == "Player" && isLevelDoor ){
        Persistence.LastLevel = Application.loadedLevelName;
		Application.LoadLevel(cheatingTomFoolery);
	}
}
