﻿#pragma strict

var pressed = false;

var unpressedTexture : Texture;
var pressedTexture : Texture;

var axis : String;
var nukeGuiOffMobile = true;

private var gui : GUIElement;
private var guiNuked = false;

function Start () {
	gui = GetComponent( GUIElement );
	if (nukeGuiOffMobile && !Persistence.IsMobile) {
		Destroy(gui);
		guiNuked = true;
	}
}

function Update () {
	var tempPressed = false;

	if (Persistence.IsMobile) {
		var count = Input.touchCount;

		for (var i : int = 0; i < count; i++) {
			var touch : Touch = Input.GetTouch(i);
			if (gui.HitTest( touch.position )) {
				tempPressed = true;
			}
		}

		if (gui instanceof GUITexture) {
			if (tempPressed) {
				gui.GetComponent(GUITexture).texture = pressedTexture;
			} else {
				gui.GetComponent(GUITexture).texture = unpressedTexture;
			}
		}
	} else {
		if (!guiNuked && Input.GetMouseButton(0) && gui.HitTest(Input.mousePosition)) {
			tempPressed = true;
		}

		if (!!axis && Input.GetButton(axis)) {
			tempPressed = true;
		}
	}

	pressed = tempPressed;
}
