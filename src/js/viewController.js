'use strict';

class viewController {

    constructor(param) {
        this.options = param;
        this.joinRoomElement = document.getElementById('joinRoom');
        this.nickNameElement = document.getElementById('nickName');
        this.speakElement = document.getElementById('speak');
        this.infomationFieldElement = document.getElementById('infomationField');
    }

    initView() {
    }

    joinedView(roomName) {
        this.joinRoomElement.style.display = 'none';
        this.nickNameElement.style.display = 'none';
        this.speakElement.style.display = 'block';
        this.infomationFieldElement.innerHTML = 'Name: ' + this.nickNameElement.value + ' / Room: ' + roomName;
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
