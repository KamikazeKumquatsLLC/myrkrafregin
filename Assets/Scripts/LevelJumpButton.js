#pragma strict

var level : String;
var minWorldUnlocked = -1;
var minLevelUnlocked = -1;

private var text : GUIText;
private var worldClear = false;
private var levelClear = false;

function Start () {
	text = GetComponent( GUIText );
	worldClear = minWorldUnlocked == -1 || minWorldUnlocked <= Persistence.LastWorldUnlocked;
	levelClear = minLevelUnlocked == -1 || minLevelUnlocked <= Persistence.LastLevelUnlocked;
	if (!(worldClear && levelClear)) {
		text.color = Color.grey;
	}
}

function Update () {
	var count = Input.touchCount;

	var pressed : boolean = false;

	for (var i : int = 0; i < count; i++) {
		var touch : Touch = Input.GetTouch(i);
		if (text.HitTest( touch.position )) {
			pressed = true;
		}
	}

	if (Input.GetMouseButton(0) && text.HitTest(Input.mousePosition)) {
		pressed = true;
	}

	if (pressed) {
		if (worldClear && levelClear) {
			Persistence.PushLevel(Application.loadedLevelName);
			Application.LoadLevel(level);
		}
	}
}
