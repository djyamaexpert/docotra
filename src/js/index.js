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
const roomNameElement = document.getElementById('roomName');
const speakElement = document.getElementById('speak');

const skyway = new skywayHelper(skywayOptions);
const view = new viewController();
const vad = new voiceDetertor();
view.initView();

joinRoomElement.addEventListener('click', () =>{
    skyway.joinControlRoom(roomNameElement.value,function(result){
        if(result.value === 'open') console.log(result);
        if(result.value === 'speak'){
            console.log(result);
            setTimeout(() => {
                skyway.joinMediaRoom().then(result =>{
                    if(result.type === 'stream'){
                        utility.playMediaStream(document.getElementById('remote'),result.value);
                        vad.startVoiceDetection(result.value,(val) =>{
                            console.log('curr val:', val);
                        });
                    }
                });
            },3000);
        }
        if(result.value === 'stopSpeak'){
            vad.stopVoiceDetection();    
            utility.stopMediaStream(document.getElementById('remote'));    
        }
        view.joinedView();
    });
});

speakElement.addEventListener('click', () =>{
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
    view.switchSpeakButton(skyway.getSpeakStatus());
});