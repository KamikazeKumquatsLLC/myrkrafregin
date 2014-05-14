#pragma strict

var axis : String;

function Start () {

}

function Update () {
    var pressed = false;

    for (var i : int = 0; i < Input.touchCount; i++) {
        var touch : Touch = Input.GetTouch(i);
        if (guiText.HitTest( touch.position )) {
            pressed = true;
        }
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
    Debug.Log("Unpausing!");
    PauseButton.Unpause();
}