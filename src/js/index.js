'use strict';

import skywayHelper from './skywayHelper';
import viewController from './viewController';

const skywayOptions = {
    APIKEY: '6391272d-5c41-476d-9456-23b68a0f9ba2',
    mode: 'sfu',
}

const joinRoomElement = document.getElementById('joinRoom');
const roomNameElement = document.getElementById('roomName');
const speakElement = document.getElementById('speak');

const skyway = new skywayHelper(skywayOptions);
const view = new viewController();
view.initView();

joinRoomElement.addEventListener('click', () =>{
    let _roomName = roomNameElement.value;
    skyway.joinControlRoom(_roomName).then(result =>{
        console.log(result);
        view.joinedView();
    });
});

speakElement.addEventListener('click', () =>{
    skyway.speak();
    view.switchSpeakButton(skyway.getSpeakStatus());
});
