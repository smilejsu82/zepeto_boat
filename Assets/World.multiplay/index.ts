import { Sandbox, SandboxOptions, SandboxPlayer } from "ZEPETO.Multiplay";

export default class extends Sandbox {

    //Room이 생성될때 1회 호출 된다 
    onCreate(options: SandboxOptions) {

        console.log('onCreate');

        this.onMessage?.("echo", (client, message) => {
            console.log(`Echo onMessage from ${client.sessionId}, -> ${message}`);
    
            // Send current client
            client.send("echo", "echo to sender : " + message);
    
            // Broadcast all connected client
            this.broadcast?.("echo", "echo to all : " + message);
        });
    }

    private map = new Map<string, SandboxPlayer>();

    //클라이언트가 Room에 입장 할때 호출 됨 
    onJoin(client: SandboxPlayer) {
        console.log('onJoin');
        this.map.set(client.sessionId, client);
        console.log(this.map.size); //룸에 접속한 클라이언트 수 1

    }

    //클라이언트가 Room에서 퇴장 할때 호출 됨 
    onLeave(client: SandboxPlayer, consented?: boolean) {
        console.log('onLeave');
        this.map.delete(client.sessionId);
        console.log(this.map.size); //룸에 접속한 클라이언트 수 0
    }
}