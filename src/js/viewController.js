'use strict';

class viewController {

    constructor(param) {
        this.options = param;
        this.joinRoomElement = document.getElementById('joinRoom');
        this.roomNameElement = document.getElementById('roomName');
        this.nickNameElement = document.getElementById('nickName');
        this.speakElement = document.getElementById('speak');
        this.infomationFieldElement = document.getElementById('infomationField');
    }

    initView() {
    }

    joinedView() {
        this.joinRoomElement.style.display = 'none';
        this.roomNameElement.style.display = 'none';
        this.nickNameElement.style.display = 'none';
        this.speakElement.style.display = 'block';
        this.infomationFieldElement.innerHTML = 'Name: ' + this.nickNameElement.value + ' / Room: ' + this.roomNameElement.value
        this.infomationFieldElement.style.display = 'block';
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
