#pragma strict

@script RequireComponent( SpriteRenderer );

var legUp : Sprite;
var legDown : Sprite;
var fbc : FourButtonControl;

var legIsUp : boolean;

private var legTicks = 5;
private var legUpCount = 0;
private var _render : SpriteRenderer;
//private var character : CharacterController;

function Start () {
	_render = GetComponent ( SpriteRenderer );
	//character = GetComponent( CharacterController );
	if(legIsUp){
		legUpCount = legTicks;
	}else{
		legUpCount = 0;
	}
}

function Update () {
	if( ( fbc.leftButton.pressed || fbc.rightButton.pressed ) && fbc.grounded ){
		if(legIsUp && legUpCount >= legTicks){
			_render.sprite = legDown;
			legIsUp = false;
			legUpCount--;
		}else if(legUpCount <= 0){
			_render.sprite = legUp;
			legIsUp = true;
			legUpCount++;
		}

		if( legIsUp && legUpCount > 0){
			legUpCount++;
		}else if( !legIsUp && legUpCount < legTicks){
			legUpCount--;
		}
	}else if( fbc.grounded || fbc.pauseButton.paused ){
		_render.sprite = legDown;
	}else{
		_render.sprite = legUp;
	}
}
