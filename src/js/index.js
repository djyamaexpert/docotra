'use strict';

import utility from './utility';
import skywayHelper from './skywayHelper';
import viewController from './viewController';
import voiceDetertor from './voiceDetertor';

const skywayOptions = {
    APIKEY: '6391272d-5c41-476d-9456-23b68a0f9ba2',
    mode: 'sfu',
}

const joinRoomElement = document.getElementById('joinRoom');
const micElement = document.getElementById('mic');
const roomName = utility.getURLHash();

const skyway = new skywayHelper(skywayOptions);
const view = new viewController();
const vad = new voiceDetertor();
view.initView();

joinRoomElement.addEventListener('click', () =>{
    skyway.joinControlRoom(roomName,function(result){
        if(result.value === 'open') console.log(result);
        if(result.value === 'speak'){
            console.log(result);
            setTimeout(() => {
                skyway.joinMediaRoom(roomName).then(result =>{
                    if(result.type === 'stream'){
                        utility.playMediaStream(document.getElementById('remote'),result.value);
                        vad.startVoiceDetection(result.value,(val) =>{
                            console.log('curr val:', val);
                            view.micEffecter(val);
                        });
                    }
                });
            },2000);
            view.micDisabled();
            view.setInfomation('誰か喋ってるよ');
        }
        if(result.value === 'stopSpeak'){
            vad.stopVoiceDetection();    
            utility.stopMediaStream(document.getElementById('remote')); 
            view.micEnabled();
            view.micEffectOff();
            view.setInfomation('マイクボタンを押して喋ってね');   
        }
        view.joinedView();
    });
});

micElement.addEventListener('click', () =>{
    if(skyway.isSpeaker === false){
        skyway.isSpeaker = true;
        skyway.joinMediaRoom().then(result =>{
            console.log(result);
            utility.playMediaStream(document.getElementById('remote'),result.value);
            utility.voiceDetection(result.value,(val) =>{
                console.log('curr val:', val);
            });
        });            
    }else{
        skyway.isSpeaker = false;
        skyway.mediaRoomInstance.close();
        skyway.mediaRoomInstance = null;
        skyway.controlRoomInstance.send({message:'stopSpeak'});
    }
    view.switchMicButton(skyway.getSpeakStatus());
});