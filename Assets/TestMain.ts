import { ZepetoScriptBehaviour } from 'ZEPETO.Script';
import { SpawnInfo, ZepetoPlayers, LocalPlayer } from 'ZEPETO.Character.Controller';
import { Button } from 'UnityEngine.UI'
import { GameObject } from 'UnityEngine';
import Boat from './Boat';
import MyCharacter from './MyCharacter';

export default class TestMain extends ZepetoScriptBehaviour {

    public btn : Button;
    public boatGo : GameObject;

    //public _boat : Boat;(x)

    Start() {    

        const boat = this.boatGo.GetComponent<Boat>();

        

        this.btn.onClick.AddListener(()=>{
            boat.MoveStart();
        });

        ZepetoPlayers.instance.CreatePlayerWithZepetoId("", "smilejsu82", new SpawnInfo(), true);
        ZepetoPlayers.instance.OnAddedLocalPlayer.AddListener(() => {
            let _player : LocalPlayer = ZepetoPlayers.instance.LocalPlayer;

            console.log("-------------???");

            let myCharacter:MyCharacter = _player.zepetoPlayer.character.gameObject.AddComponent<MyCharacter>();
            myCharacter.onBoat = ()=>{

                myCharacter.transform.SetParent(this.boatGo.transform);
                
            };
            myCharacter.Init();

        });
    }

}