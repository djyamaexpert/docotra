'use strict';

class viewController {

    constructor(param) {
        this.options = param;
        this.joinRoomElement = document.getElementById('joinRoom');
        this.nickNameElement = document.getElementById('nickName');
        this.infomationFieldElement = document.getElementById('infomationField');
        this.micElement = document.getElementById('mic');
    }

    initView() {
    }

    joinedView(roomName) {
        this.joinRoomElement.style.display = 'none';
        //this.nickNameElement.style.display = 'none';
        this.infomationFieldElement.style.display = 'block';
        this.micElement.style.display = 'block';
    }

    switchMicButton(isSpeaker) {
        if(isSpeaker){
            this.micElement.classList.add('speaker');
        }else {
            this.micElement.classList.remove('speaker');
        }
    }

    micEffecter(level){
        if(level > 0){
            this.micElement.classList.add('speaking');
        }else if(level == 0){
            this.micElement.classList.remove('speaking');
        }      
    }

    micEffectOff(){
        this.micElement.classList.remove('speaking');   
    }

    micEnabled(){
        this.micElement.disabled = '';
    }

    micDisabled(){
        this.micElement.disabled = 'true';  
    }

    setInfomation(string){
        this.infomationFieldElement.innerText = string;
    }
}

export default viewController;
