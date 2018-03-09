'use strict';

class viewController {

    constructor(param) {
        this.options = param;
    }

    initView() {
    }

    joinedView() {
        const joinRoomElement = document.getElementById('joinRoom');
        const roomNameElement = document.getElementById('roomName');
        const speakElement = document.getElementById('speak');
        joinRoomElement.style.display = 'none';
        roomNameElement.style.display = 'none';
        speakElement.style.display = 'block';
    }

}

export default viewController;
