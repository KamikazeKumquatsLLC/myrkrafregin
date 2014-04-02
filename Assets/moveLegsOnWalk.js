#pragma strict

@script RequireComponent( SpriteRenderer );

var legLeftUp : Sprite;
var legLeftDown : Sprite;
var legLeftOut : Sprite;
var legRightUp : Sprite;
var legRightDown : Sprite;
var legRightOut : Sprite;

//Stage 1 & 2 the leg is down, Stage 3 the leg is up, Stage 4 the leg is protruding.
private var legMoveStage : int;

private var debouncer : boolean;

var fbc : FourButtonControl;

var legIsUp : boolean;
var isLegLeft : boolean;

private var isLegXChanged : boolean;

private var legTicks = 5;
private var legStageCount = 0;
private var _render : SpriteRenderer;
//private var character : CharacterController;

function Start () {
	_render = GetComponent ( SpriteRenderer );
	//character = GetComponent( CharacterController );
	if(legIsUp){
		legStageCount = 0;
		legMoveStage = 2;
	}else{
		legStageCount = 0;
		legMoveStage = 0;
	}
	
	isLegXChanged = false;
	debouncer = false;
}

function Update () {
	this.changeLegSpriteBasedOnStage();
	this.changeLegX();
}

private function changeLegSpriteBasedOnStage(){
	if( ( fbc.leftButton.pressed || fbc.rightButton.pressed ) && fbc.charIsGrounded ){
		if( legStageCount >= legTicks ){
			legMoveStage++;
			legStageCount = 0;
		}
			
		if( legMoveStage >= 4 ){
			legMoveStage = 0;
		}
	
		if( fbc.leftButton.pressed ){
			switch(legMoveStage){
				case 0:
					_render.sprite = legLeftDown;
					legStageCount++;
					legIsUp = false;
					break;
				case 1:
					_render.sprite = legLeftDown;
					legStageCount++;
					legIsUp = false;
					break;
				case 2:
					_render.sprite = legLeftUp;
					legStageCount++;
					legIsUp = true;
					break;
				case 3:
					_render.sprite = legLeftOut;
					legStageCount++;
					legIsUp = true;
					break;
			}
		}else if( fbc.rightButton.pressed ){
			switch(legMoveStage){
				case 0:
					_render.sprite = legRightDown;
					legStageCount++;
					legIsUp = false;
					break;
				case 1:
					_render.sprite = legRightDown;
					legStageCount++;
					legIsUp = false;
					break;
				case 2:
					_render.sprite = legRightUp;
					legStageCount++;
					legIsUp = true;
					break;
				case 3:
					_render.sprite = legRightOut;
					legStageCount++;
					legIsUp = true;
					break;
			}
		}
	}else if( !fbc.charIsGrounded ){
		if( isLegLeft ){
			_render.sprite = legLeftUp;
		}else{
			_render.sprite = legRightUp;
		}
	}else if( !( fbc.rightButton.pressed || fbc.leftButton.pressed ) ){
		if( isLegLeft ){
			_render.sprite = legLeftDown;
		}else{
			_render.sprite = legRightDown;
		}
	}	
}

private function changeLegX(){
	if( (!isLegLeft && fbc.leftButton.pressed) && !debouncer ){
		this.transform.position.x -= 0.5;
		debouncer = true;
		isLegXChanged = true;
	}else if( (isLegLeft && fbc.rightButton.pressed) && !debouncer ){
		this.transform.position.x += 0.5;
		debouncer = true;
		isLegXChanged = true;
	}
	
	if( isLegLeft ){
		if( fbc.leftButton.pressed ){
			this.transform.position.z = 0.01;
		}else if ( fbc.rightButton.pressed ){
			this.transform.position.z = -0.01;
		}
	}
	
	if( ( !isLegLeft && fbc.rightButton.pressed ) && debouncer ){
		this.transform.position.x += 0.5;
		debouncer = false;
		isLegXChanged = false;
	}else if( ( isLegLeft && fbc.leftButton.pressed ) && debouncer ){
		this.transform.position.x -= 0.5;
		debouncer = false;
		isLegXChanged = false;
	}
	
	if( debouncer && !( ( fbc.leftButton.pressed || fbc.rightButton.pressed ) && fbc.charIsGrounded ) ){
		debouncer = false;
		if( !isLegLeft ){
			this.transform.position.x += 0.5;
			isLegXChanged = false;
		}else if( isLegLeft ){
			this.transform.position.x -= 0.5;
			isLegXChanged = false;
		}
	}
	
	if( ( !( fbc.leftButton.pressed || fbc.rightButton.pressed ) && ( isLegXChanged && fbc.charIsGrounded ) ) || ( isLegXChanged && !fbc.charIsGrounded ) ){
		if( !isLegLeft ){
			this.transform.position.x += 0.5;
			isLegXChanged = false;
		}else if( isLegLeft ){
			this.transform.position.x -= 0.5;
			isLegXChanged = false;
		}
		
		if( legIsUp ){
			legMoveStage = 2;
			legStageCount = 0;
		}else{
			legMoveStage = 0;
			legStageCount = 0;
		}
	}
}