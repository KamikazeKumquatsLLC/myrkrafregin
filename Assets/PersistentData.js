#pragma strict

var settingsReturnLocation = "Main Menu";
var isMobile : boolean;
var id = -1;

function Start () {
	if (GameObject.Find("Persistence") && GameObject.Find("Persistence").GetComponent(PersistentData).id != id) {
		Destroy(gameObject);
	} else {
		DontDestroyOnLoad(transform.gameObject);
		isMobile = false;
		#if UNITY_IPHONE
			isMobile = true;
		#elif UNITY_ANDROID
			isMobile = true;
		#elif UNITY_BLACKBERRY
			isMobile = true;
		#elif UNITY_WP8
			isMobile = true;
		#endif
	}
}

function Update () {
	if (id == -1) {
		id = Random.value;
	}
}