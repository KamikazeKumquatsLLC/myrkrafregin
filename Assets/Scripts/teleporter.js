#pragma strict

@script RequireComponent( SpriteRenderer );

private var fbc : FourButtonControl;

var teleOn : Sprite;
var teleOff : Sprite;

private var teleState : boolean;
private var _render : SpriteRenderer;

private var hm : HealthManager;

function Start () {
	teleState = false;
  fbc = FourButtonControl.Player;
	_render = GetComponent ( SpriteRenderer );
	if (!!fbc) {
    hm = fbc.GetComponent ( HealthManager );
  }
}

function Update () {
  if (!fbc) {
    fbc = FourButtonControl.Player;
  } else {
  	if (!teleState){
  		_render.sprite = teleOff;
  	}else{
  		_render.sprite = teleOn;
  	}

  	if( fbc.getActiveTeleporter() != this ){
  		teleState = false;
  	}
  }
}

function OnTriggerEnter2D ( player : Collider2D ){
  if (!hm) {
    hm = fbc.GetComponent(HealthManager);
  }
  
	hm.healHealth();

	if(!teleState){
		fbc.moveSpawn( this.transform );
		fbc.setActiveTeleporter( this );
		teleState = true;
		_render.sprite = teleOn;
	}
}
