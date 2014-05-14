#pragma strict

var axis : String;
var paused = false;

private var tex : GUITexture;
private var texExists = true;
private var wasPressed = false;

function Start () {
	tex = GetComponent( GUITexture );
	if (!Persistence.IsMobile) {
		Destroy(tex);
		texExists = false;
	}
}

function Update () {
    var pressed = false;

    for (var i : int = 0; i < Input.touchCount; i++) {
        var touch : Touch = Input.GetTouch(i);
        if (texExists && tex.HitTest( touch.position )) {
            pressed = true;
        }
    }

    if (!!axis && !Persistence.IsMobile && Input.GetButtonDown(axis)) {
        pressed = true;
    }

    if (pressed && !wasPressed) {
        wasPressed = true;
        paused = !paused;
    } else if (!pressed) {
        wasPressed = false;
    }
    
	if (paused) {
		Time.timeScale = 0;
	} else {
		Time.timeScale = 1;
	}
}
