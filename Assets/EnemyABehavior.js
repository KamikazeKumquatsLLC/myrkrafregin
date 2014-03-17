#pragma strict

@script RequireComponent(CharacterController);

var speed = 4;
var isSmart = false;

var player : GameObject;
var havePlayer = false;
private var character : CharacterController;

function Start () {
}

function Update () {
	if (!havePlayer) {
		player = FindObjectOfType(FourButtonControl) as GameObject;
		havePlayer = true;
	}
	var distance : Vector3 = this.transform.position - player.transform.position;
	Debug.Log(distance);
	character.Move(distance.normalized * speed);
}