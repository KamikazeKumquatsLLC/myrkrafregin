#pragma strict

var value = 0;
var sliderPositionScreenRelative : Rect;
var sliderStyle : GUIStyle;
var markerStyle : GUIStyle;

private var absolutePosition : Rect;

function Start () {
  absolutePosition = new Rect(0,0,0,0);
  absolutePosition.x = sliderPositionScreenRelative.x * Screen.width;
  absolutePosition.y = sliderPositionScreenRelative.y * Screen.height;
  absolutePosition.width = sliderPositionScreenRelative.width * Screen.width;
  absolutePosition.height = sliderPositionScreenRelative.height * Screen.height;
}

function Update () {
  //value = (marker.transform.x - base.transform.x) / base.pixelInset.width * 100;
}

function OnGUI() {
  value = GUI.HorizontalSlider(absolutePosition, value, 0.0, 100.0, sliderStyle, markerStyle);
}
