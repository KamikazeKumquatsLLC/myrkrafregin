#pragma strict

private var text : GUIText;

function Start () {
	text = GetComponent( GUIText );
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
		PersistentData.SettingsReturnLocation = Application.loadedLevelName;
		Application.LoadLevel("OptionsMenu");
	}
}
