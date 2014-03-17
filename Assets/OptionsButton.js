#pragma strict

private var text : GUIText;
private var persistence : PersistentData;

function Start () {
	text = GetComponent( GUIText );
	persistence = GameObject.Find("Persistence").GetComponent(PersistentData);
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
		persistence.settingsReturnLocation = Application.loadedLevelName;
		Application.LoadLevel("OptionsMenu");
	}
}