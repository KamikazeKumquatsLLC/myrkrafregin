#pragma strict

private var text : GUIText;
private var clear = false;
private var levelClear = false;

function Start () {
	text = GetComponent( GUIText );
	clear = Persistence.LastWorldUnlocked > -1;
	if (!clear) {
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
		if (clear) {
			Persistence.PushLevel(Application.loadedLevelName);
			Application.LoadLevel("Level" + Persistence.LastWorldUnlocked + "-" + Persistence.LastLevelUnlocked);
		}
	}
}
