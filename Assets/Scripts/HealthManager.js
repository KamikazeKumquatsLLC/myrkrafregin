#pragma strict

var maxHealth : int;

private var healthLow : int;
private var healthMedium : int;
private var healthHigh : int;

var healthCurrent : int;

var godMode : boolean;

function Start () {
	healthCurrent = maxHealth;

	healthLow = Mathf.Floor( maxHealth / 3 );
	healthMedium = 2 * healthLow ;
	healthHigh = Mathf.Floor( healthMedium * 1.5 );
    godMode = Persistence.GodMode;
}

function Update () {
	if(godMode && healthCurrent != -9001){
		healHealth();
	}
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

function OnCollisionStay2D (hit : Collision2D) {
	var body = hit.gameObject;
	if (body.tag == "Spike") {
		this.minusHealth();
	}
}

function kill() {
    healthCurrent = -9001; // special unreachable sentinel value to allow respawning in god mode
}

function isDead () {
	return healthCurrent <= 0;
}

function respawned () {
	this.healHealth();
}

function isGodMode(){
	return godMode;
}