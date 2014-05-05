#pragma strict

static var SettingsReturnLocation = "Main Menu";
static var IsMobile : boolean;
static var GodMode : boolean;
var id = -1;

function Start () {
	if (GameObject.Find("Persistence") && GameObject.Find("Persistence").GetComponent(PersistentData).id != id) {
		Destroy(gameObject);
	} else {
		DontDestroyOnLoad(transform.gameObject);
		IsMobile = false;
		#if UNITY_IPHONE
			IsMobile = true;
		#elif UNITY_ANDROID
			IsMobile = true;
		#elif UNITY_BLACKBERRY
			IsMobile = true;
		#elif UNITY_WP8
			IsMobile = true;
		#endif
	}
}

function Update () {
	if (id == -1) {
		id = Random.value;
	}
}
