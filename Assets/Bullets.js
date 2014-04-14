#pragma strict
var bulletDamage : int;

function Start () {

}

function Update () {

}

function OnCollisionEnter2D(coll:Collision2D){
	if(coll.gameObject.tag == "Enemy"){
		coll.gameObject.GetComponent(EnemyABehavior).hurt(bulletDamage);
	}
}