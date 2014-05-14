#pragma strict

var axis : String;
var paused = false;

private var tex : GUITexture;
private var texExists = true;
private var wasPaused = false;
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
	if (paused) {
		Time.timeScale = 0;
        if (!wasPaused) {
            Application.LoadLevelAdditive("PauseMenu");
            wasPaused = true;
        }
	} else {
        if (wasPaused) {
            Debug.Log("Unpaused!");
        }
        wasPaused = false;
		Time.timeScale = 1;
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

        if (pressed) {
            paused = true;
        }
	}
}

static function Unpause() {
    masterButton.paused = false;
}
