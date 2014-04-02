#pragma strict

@script RequireComponent( BoxCollider2D )
@script RequireComponent( Rigidbody2D )

var isGrounded : boolean = false;

private var reset = false;
private var thisCollider : BoxCollider2D;

function Start () {
	thisCollider = GetComponent( BoxCollider2D );
}

function Update () {
  if (reset) {
    rigidbody2D.velocity = Vector2.zero;
  }
  isGrounded = getIsGrounded();
}

function LateUpdate() {
  reset = true;
}

private function getIsGrounded() : boolean {
  var bottomLeftCorner : Vector2 = thisCollider.center + (-Vector2.right * thisCollider.size.x / 2) + (-Vector2.up * thisCollider.size.y / 2);
  var leftEdgeHit : RaycastHit2D = Physics2D.Raycast(bottomLeftCorner, -Vector2.up, 0.01);
  var bottomRightCorner : Vector2 = thisCollider.center + (Vector2.right * thisCollider.size.x / 2) + (-Vector2.up * thisCollider.size.y / 2);
  var rightEdgeHit : RaycastHit2D = Physics2D.Raycast(bottomRightCorner, -Vector2.up, 0.01);
  return leftEdgeHit != null || rightEdgeHit != null;
}

function Move (delta : Vector3) {
  if (isGrounded) {
    delta -= Physics.gravity;
  }
  reset = false;
	rigidbody2D.velocity = delta / Time.deltaTime;
}
