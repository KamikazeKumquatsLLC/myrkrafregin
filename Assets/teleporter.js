#pragma strict

@script RequireComponent( SpriteRenderer );

var fbc : FourButtonControl;

var teleOn : Sprite;
var teleOff : Sprite;

private var teleState : boolean;
private var _render : SpriteRenderer;

private var hm : HealthManager;

function Start () {
	teleState = false;
	_render = GetComponent ( SpriteRenderer );
	hm = fbc.GetComponent ( HealthManager );
}

function Update () {
	if (!teleState){
		_render.sprite = teleOff;
	}else{
		_render.sprite = teleOn;
	}

	if( fbc.getActiveTeleporter() != this ){
		teleState = false;
	}
}

function OnTriggerEnter ( player : Collider ){
	hm.healHealth();

	if(!teleState){
		fbc.moveSpawn( this.transform );
		fbc.setActiveTeleporter( this );
		teleState = true;
		_render.sprite = teleOn;
	}
}