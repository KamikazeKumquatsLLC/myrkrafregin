#pragma strict

var axis : String;
var paused = false;

private var tex : GUITexture;
private var texExists = true;
private var wasPaused = false;
private var wasPressed = false;
private static var masterButton : PauseButton;

function Start () {
    masterButton = this;
	tex = GetComponent( GUITexture );
	if (!Persistence.IsMobile) {
		Destroy(tex);
		texExists = false;
	}
}

function Update () {
    var pressed = false;
	if (paused) {
		Time.timeScale = 0;
        if (!wasPaused) {
        	setControlTextures(false);
            Application.LoadLevelAdditive("PauseMenu");
            wasPaused = true;
        }
	} else {
        if (wasPaused) {
            setControlTextures(true);
        }
        wasPaused = false;
		Time.timeScale = 1;

        for (var i = 0; i < Input.touchCount; i++) {
            var touch : Touch = Input.GetTouch(i);
            if (texExists && tex.HitTest( touch.position )) {
                if (!wasPressed) {
                    pressed = true;
                    wasPressed = true;
                }
            }
        }

        if (!!axis && !Persistence.IsMobile && Input.GetButtonDown(axis)) {
            pressed = true;
        }

        if (pressed) {
            paused = true;
        }
	}
    if (!pressed) {
        wasPressed = false;
    }
}

private function setControlTextures(enabled : boolean) {
    var controls = GameObject.FindGameObjectsWithTag("Control");
    for (var i = 0; i < controls.length; i++) {
        var texture = controls[i].guiTexture;
        if (!!texture) {
            texture.enabled = enabled;
        }
    }
}

static function Unpause() {
    masterButton.paused = false;
    masterButton.wasPressed = true;
}

static function WasPressed() : boolean {
    return masterButton.wasPressed;
}
