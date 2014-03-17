#pragma strict

@script RequireComponent( BoxCollider2D )
@script RequireComponent( Rigidbody2D )

var isGrounded : boolean = false;

private var thisCollider : BoxCollider2D;

function Start () {
	thisCollider = GetComponent( BoxCollider2D );
}

function Update () {
	rigidbody2D.velocity = Vector3.zero;
}

function Move (delta : Vector3) {
	rigidbody2D.velocity = delta;
}