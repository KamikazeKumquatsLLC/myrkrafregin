#pragma strict

@script RequireComponent( SpriteRenderer );

var fullHealth : Sprite;
var mediumHealth : Sprite;
var lowHealth : Sprite;

var fbc : FourButtonControl;
var hm : HealthManager;

private var _render : SpriteRenderer;

function Start () {
	//fbc = GetComponent( FourButtonControl );
	_render = GetComponent ( SpriteRenderer );
}

function Update () {
	if( hm.getHealthState() == 3 ){
		_render.sprite = fullHealth;
	}else if( hm.getHealthState() == 2 ){
		_render.sprite = mediumHealth;
	}else{
		_render.sprite = lowHealth;
	}
}