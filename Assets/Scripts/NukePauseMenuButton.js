#pragma strict

var axis : String;

private var wasPressed = false;

function Start () {
    wasPressed = PauseButton.WasPressed();
}

function Update () {
    var pressed = false;

    for (var i : int = 0; i < Input.touchCount; i++) {
        var touch : Touch = Input.GetTouch(i);
        if (guiText.HitTest( touch.position )) {
            if (!wasPressed) {
                pressed = true;
                wasPressed = true;
            }
        }
    }
    
    if (!pressed) {
        wasPressed = false;
    }
    
    if (!!axis && !Persistence.IsMobile && Input.GetButtonDown(axis)) {
        pressed = true;
    }

    if (Input.GetMouseButton(0) && guiText.HitTest(Input.mousePosition)) {
        pressed = true;
    }

    if (pressed) {
        Run();
    }
}

static function Run() {
    // nuke everything tagged as a pause menu component
    var pauseMenuComponents = GameObject.FindGameObjectsWithTag("Pause Menu Component");
    for (var i = 0; i < pauseMenuComponents.length; i++) {
        Destroy(pauseMenuComponents[i].gameObject);
    }
    PauseButton.Unpause();
}