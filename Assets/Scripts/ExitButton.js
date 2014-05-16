#pragma strict

function Start () {
	if (Persistence.IsMobile) {
		Destroy(this.gameObject);
	}
}

function Update () {
	var count = Input.touchCount;

	var pressed : boolean = false;

	for (var i : int = 0; i < count; i++) {
		var touch : Touch = Input.GetTouch(i);
		if (guiText.HitTest( touch.position )) {
			pressed = true;
		}
	}

	if (Input.GetMouseButton(0) && guiText.HitTest(Input.mousePosition)) {
		pressed = true;
	}

	if (pressed) {
		Application.Quit();
	}
}
