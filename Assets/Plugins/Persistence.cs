using UnityEngine;
using System.Collections;
using System;
using System.Runtime.Serialization.Formatters.Binary;
using System.IO;

public class Persistence : MonoBehaviour {

    public static bool IsMobile = false;
    public static bool GodMode = false;
    public static int LastWorldUnlocked = -1;
    public static int LastLevelUnlocked = -1;
    public bool isLevel = true;
    public int worldNumber;
    public int levelNumber;
    private static bool ready = false;
    private static Stack backStack;
    private static bool deleting = false;

    // Use this for initialization
    void Awake() {
        if (deleting) {
            File.Delete(Application.persistentDataPath + "/state.dat");
            GodMode = false;
            LastWorldUnlocked = LastLevelUnlocked = -1;
            deleting = false;
        }
        if (isLevel) {
            if (worldNumber > Persistence.LastWorldUnlocked) {
                Persistence.LastWorldUnlocked = worldNumber;
                Persistence.LastLevelUnlocked = levelNumber;
                Persistence.Save();
            } else if (levelNumber > Persistence.LastLevelUnlocked) {
                Persistence.LastLevelUnlocked = levelNumber;
                Persistence.Save();
            }
        }
        if (!ready) {
            backStack = new Stack();
            if (!Persistence.Load()) {
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
                Persistence.Save();
            }
            ready = true;
        }
        Destroy(this.gameObject);
    }

    public static void Save() {
        BinaryFormatter bf = new BinaryFormatter();
        FileStream file = File.Create(Application.persistentDataPath + "/state.dat");

        PlayerData data = new PlayerData();
        data.IsMobile = Persistence.IsMobile;
        data.GodMode = Persistence.GodMode;
        data.LastLevelUnlocked = Persistence.LastLevelUnlocked;
        data.LastWorldUnlocked = Persistence.LastWorldUnlocked;

        bf.Serialize(file, data);
        file.Close();
    }

    public static bool Load() {
        if (File.Exists(Application.persistentDataPath + "/state.dat")) {
            BinaryFormatter bf = new BinaryFormatter();
            FileStream file = File.Open(Application.persistentDataPath + "/state.dat", FileMode.Open);

            PlayerData data = (PlayerData)bf.Deserialize(file);
            Persistence.IsMobile = data.IsMobile;
            Persistence.GodMode = data.GodMode;
            Persistence.LastLevelUnlocked = data.LastLevelUnlocked;
            Persistence.LastWorldUnlocked = data.LastWorldUnlocked;

            file.Close();

            return true; // successfully loaded
        } else {
            return false; // didn't load since save file didn't exist
        }
    }

    public static void PushLevel(String lastLevel) {
        backStack.Push(lastLevel);
    }

    public static String PopLevel() {
        return (String)backStack.Pop();
    }

    public static void DeleteSave() {
        deleting = true;
        Application.LoadLevel("MainMenu");
    }
}

[Serializable]
class PlayerData {
    public bool IsMobile;
    public bool GodMode;
    public int LastWorldUnlocked;
    public int LastLevelUnlocked;

    public override String ToString() {
        return "mobile: " + this.IsMobile + ", god: " + this.GodMode + ", world: " + this.LastWorldUnlocked + ", level: " + this.LastLevelUnlocked;
    }
}
