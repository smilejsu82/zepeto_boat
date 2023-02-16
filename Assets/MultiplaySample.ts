import { Room$1, RoomLeaveEvent } from 'ZEPETO.Multiplay';
import { State } from 'ZEPETO.Multiplay.Schema';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { ZepetoWorldMultiplay } from 'ZEPETO.World'
import { Button } from 'UnityEngine.UI'

export default class MultiplaySample extends ZepetoScriptBehaviour {
    
    private multiplay: ZepetoWorldMultiplay;
    public btn : Button;
    private room : Room$1<State>;
    Start() {    

        this.btn.onClick.AddListener(()=>{
            console.log(this.room.Id);
            this.room.Leave();
        });

        this.multiplay = this.gameObject.GetComponent<ZepetoWorldMultiplay>();

        //Room이 생성되고, 접속 가능할 때 호출됩니다. Room을 인자로 전달합니다.
        this.multiplay.RoomCreated += (room : Room$1<State>)=>{
            console.log('[RoomCreated]');
            console.log(room);
        };

        //해당 Room에 접속되면 호출됩니다. Room을 인자로 전달합니다.        
        this.multiplay.RoomJoined += (room : Room$1<State>)=>{
            console.log('[RoomJoined]');
            console.log(room);

            this.room = room;
        };

        this.multiplay.RoomLeave += (evt : RoomLeaveEvent) =>
        {
            console.log('[RoomLeave]');
            console.log(evt.Code);
            console.log(evt.Message);
        };
    }

}