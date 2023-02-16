import { Time, Vector3 } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

export default class Boat extends ZepetoScriptBehaviour {

    public speed : float;
    
    public MoveStart()
    {
        this.StartCoroutine(this.MoveRoutine());
    }

    *MoveRoutine()
    {
        while(true){
            var a = Vector3.forward * this.speed * Time.deltaTime;
            this.transform.Translate(a);
            yield null;
        }   
    }

}