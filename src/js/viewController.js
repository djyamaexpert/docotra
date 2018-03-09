'use strict';

class viewController {

    constructor(param) {
        this.options = param;
        this.joinRoomElement = document.getElementById('joinRoom');
        this.roomNameElement = document.getElementById('roomName');
        this.speakElement = document.getElementById('speak');
    }

    initView() {
    }

    joinedView() {
        this.joinRoomElement.style.display = 'none';
        this.roomNameElement.style.display = 'none';
        this.speakElement.style.display = 'block';
    }

    switchSpeakButton(isSpeaker) {
        if(isSpeaker){
            this.speakElement.value = 'やめる';
        }else {
            this.speakElement.value = '喋る';
        }
    }

}

export default viewController;
