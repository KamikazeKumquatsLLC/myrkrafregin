#pragma strict

@script RequireComponent( SpriteRenderer );

var headLeft : Sprite;
var headRight : Sprite;

private var _renderer : SpriteRenderer;

function Start () {
	_renderer = GetComponent( SpriteRenderer );
}

function Update () {

}

function changeTheHeadDirection(i){
	if(i == 0){
		_renderer.sprite = headLeft;
	}else{
		_renderer.sprite = headRight;
	}
}