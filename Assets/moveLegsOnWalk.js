#pragma strict

@script RequireComponent( SpriteRenderer );

var legLeftUp : Sprite;
var legLeftDown : Sprite;
var legRightUp : Sprite;
var legRightDown : Sprite;

private var debouncer : boolean;

var fbc : FourButtonControl;

var legIsUp : boolean;
var isLegLeft : boolean;

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
	
	debouncer = false;
}

function Update () {
	if( (!isLegLeft && fbc.leftButton.pressed) && !debouncer ){
		this.transform.position.x -= 0.5;
		debouncer = true;
	}else if( (isLegLeft && fbc.rightButton.pressed) && !debouncer ){
		this.transform.position.x += 0.5;
		debouncer = true;
	}

	if( ( fbc.leftButton.pressed || fbc.rightButton.pressed ) && fbc.charIsGrounded ){
		if( fbc.leftButton.pressed ){	
			if(legIsUp && legUpCount >= legTicks){
				_render.sprite = legLeftDown;
				legIsUp = false;
				legUpCount--;
			}else if(legUpCount <= 0){
				_render.sprite = legLeftUp;
				legIsUp = true;
				legUpCount++;
			}

			if( legIsUp && legUpCount > 0){
				legUpCount++;
			}else if( !legIsUp && legUpCount < legTicks){
				legUpCount--;
			}
		}else{
			if(legIsUp && legUpCount >= legTicks){
				_render.sprite = legRightDown;
				legIsUp = false;
				legUpCount--;
			}else if(legUpCount <= 0){
				_render.sprite = legRightUp;
				legIsUp = true;
				legUpCount++;
			}

			if( legIsUp && legUpCount > 0){
				legUpCount++;
			}else if( !legIsUp && legUpCount < legTicks){
				legUpCount--;
			}
		}
	}else{
		if( debouncer ){
			debouncer = !debouncer;
			if( !isLegLeft ){
				this.transform.position.x += 0.5;
			}else if( isLegLeft ){
				this.transform.position.x -= 0.5;
			}
		}	
	
		if( fbc.charIsGrounded || fbc.pauseButton.paused ){
			if( isLegLeft ){
				_render.sprite = legLeftDown;
			}else{
				_render.sprite = legRightDown;
			}
		}else{
			if( isLegLeft ){
				_render.sprite = legLeftUp;
			}else{
				_render.sprite = legRightUp;
			}
		}
	}
}