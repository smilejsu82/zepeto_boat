import { Debug, GameObject, KeyCode, Physics, Ray, RaycastHit, Vector3 } from 'UnityEngine'
import { ZepetoCharacter , ZepetoPlayers} from 'ZEPETO.Character.Controller';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { Input, Color } from 'UnityEngine'
import { Action } from 'System';

export default class MyCharacter extends ZepetoScriptBehaviour {

    private rayOriginGo : GameObject;

    public onBoat : Action;

    public Init()
    {
        console.log('Init');
        this.rayOriginGo = new GameObject();
        this.rayOriginGo.name = "rayOriginGo";
        this.rayOriginGo.transform.SetParent(this.transform);
        this.rayOriginGo.transform.localPosition = Vector3.zero;
    }

    private ray : Ray;

    Update()
    {
        //console.log(ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character.characterController.velocity.y);

        
        if( Input.GetKeyDown(KeyCode.Space)){
            this.ray = new Ray(this.rayOriginGo.transform.position + new Vector3(0, 0.5, 0), this.transform.up * -1);   
        }

        //console.log(ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character.characterController.velocity.y);

        if( ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character.characterController.velocity.y < -5)
        {
            if( this.ray != null){
                Debug.DrawRay(this.rayOriginGo.transform.position + new Vector3(0, 0.5, 0), this.ray.direction * 0.7, Color.red);
                let ref = $ref<RaycastHit>();
                //console.log(this.ray);
                if(Physics.Raycast(this.rayOriginGo.transform.position + new Vector3(0, 0.5, 0), this.ray.direction, ref, 0.7)){
                    let hitinfo = $unref(ref);
                    this.ray = null;

                    if(hitinfo.collider.tag == "Boat")
                    {    
                        console.log("----------->>> " + hitinfo.collider.tag);
                        this.onBoat();
                    }
                    else if(hitinfo.collider.tag == "Ground")
                    {
                        console.log('-------------->> ' + hitinfo.collider.tag);
                        this.transform.SetParent(null);   
                    }
                }
                
            }
        }

       
            
    }

}