#pragma strict

var maxHealth : int;

private var healthLow : int;
private var healthMedium : int;
private var healthHigh : int;

var healthCurrent : int;

function Start () {
	healthCurrent = maxHealth;

	healthLow = Mathf.Floor( maxHealth / 3 );
	healthMedium = 2 * healthLow ;
	healthHigh = Mathf.Floor( healthMedium * 1.5 );
}

function Update () {

}

function getHealth () {
	return healthCurrent;
}

function minusHealth () {
	healthCurrent--;
}

function healHealth () {
	healthCurrent = maxHealth;
}

function getHealthState () {
	if( healthCurrent > 0 ) {
		if( healthCurrent > healthLow ) {
			if( healthCurrent > healthMedium ) {
				return 3;
			} else {
				return 2;
			}

		} else {
			return 1;
		}
	} else {
		return 0;
	}
}

function OnControllerColliderHit (hit : ControllerColliderHit) {
	var body = hit.collider.gameObject;
	if (body.tag == "Spike") {
		this.minusHealth();
	}
}

function isDead () {
	return healthCurrent <= 0;
}

function respawned () {
	this.healHealth();
}