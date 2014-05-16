#pragma strict

var value = false;
var checkboxPositionScreenRelative : Rect;
var uncheckedImage : Texture;
var checkedImage : Texture;
var hidePointlessBox : GUIStyle;
var persistenceProperty = "";

private var valueLoaded = false;

private var absolutePosition : Rect;

function Start () {
    absolutePosition = new Rect(0,0,0,0);
    absolutePosition.x = checkboxPositionScreenRelative.x * Screen.width;
    absolutePosition.y = checkboxPositionScreenRelative.y * Screen.height;
    absolutePosition.width = checkboxPositionScreenRelative.width * Screen.width;
    absolutePosition.height = checkboxPositionScreenRelative.height * Screen.height;
}

function Update () {
    if (!valueLoaded) {
        value = Persistence.GodMode;
        valueLoaded = true;
    }
}

function OnGUI() {
    value = GUI.Toggle(absolutePosition, value, value ? checkedImage : uncheckedImage, hidePointlessBox);
    Persistence.GodMode = value;
    Persistence.Save();
}
