﻿#pragma strict

function Start () {

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
        FourButtonControl.Player.GetComponent(HealthManager).kill();
        NukePauseMenuButton.Run();
    }
}