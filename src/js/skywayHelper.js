'use strict';

import utility from './utility';
import Peer from 'skyway-js';

class skywayHelper {

    constructor(param) {
        this.options = param;
        this.localAudioStream = null;
        this.skywayControlInstance = null;
        this.controlRoomInstance = null;
        this.mediaRoomInstance = null;
        this.peerId = null;
        this.roomName = null;
        this.controlRoomPrefix = '_ctl_';
        this.isSpeaker = false;
    }

    joinControlRoom(roomName,cb){
        this.skywayControlInstance = new Peer({key: this.options.APIKEY,debug: 3});
        this.roomName = roomName;
        const self = this;
        self.skywayControlInstance.on('open', peerId => {
            self.peerId = peerId;
            self.controlRoomInstance = self.skywayControlInstance.joinRoom(self.controlRoomPrefix + self.roomName,{mode: self.options.mode});
            self.controlRoomInstance.on('open', () =>{
                console.log('joined control room.');
                cb({type:'open',value:peerId});
            });
            self.controlRoomInstance.on('peerJoin', peerId =>{
                console.log('join the peer:' + peerId);
                if(self.isSpeaker){
                    self.controlRoomInstance.send({message:'speak'});
                }
            });
            self.controlRoomInstance.on('data', data =>{
                console.log('received data');
                if(data.data.message === 'speak'){
                    cb({type:'data',value:data.data.message});
                }
                if(data.data.message === 'stopSpeak'){
                    if(self.mediaRoomInstance){
                        self.mediaRoomInstance.close();
                    }
                    self.mediaRoomInstance = null;
                    cb({type:'data',value:data.data.message});
                }
            });
            self.controlRoomInstance.on('error', error =>{
                reject(error);
            });
        });
    }

    joinMediaRoom(){
        const self = this;
        return new Promise(async (resolve,reject) => {
            if(self.skywayControlInstance){
                if(self.isSpeaker){
                    await self._getlocalAudioStream();
                    self.mediaRoomInstance = self.skywayControlInstance.joinRoom(self.roomName,{mode: self.options.mode,stream:self.localAudioStream});
                }else{
                    self.mediaRoomInstance = self.skywayControlInstance.joinRoom(self.roomName,{mode: self.options.mode});
                }
                self.mediaRoomInstance.on('open', async (peerId) =>{
                    (self.options.mode === 'sfu')? await self._sfuWorkAround():false;
                    console.log('joined media room:');
                    if(self.isSpeaker){
                        self.controlRoomInstance.send({message:'speak'});
                    }
                });
                self.mediaRoomInstance.on('peerJoin', peerId =>{
                    console.log('join the peer:' + peerId);
                });
                self.mediaRoomInstance.on('stream', stream =>{
                    console.log('receive stream');
                    resolve({type:'stream',value:stream});
                });
                self.mediaRoomInstance.on('error', error =>{
                    reject(error);
                });
            }
        });        
        
    }

    async _getlocalAudioStream(){
        try{
            this.localAudioStream = await navigator.mediaDevices.getUserMedia(utility.createGumConstraints(false,true,320,240,10));
        } catch(err){
            console.error('mediaDevice.getUserMedia() error:', err);
        }
    }

    getRoomName(){
        return this.roomName;
    }

    getSpeakStatus(){
        return this.isSpeaker;
    }

    _sfuWorkAround(){
        const self = this;
        return new Promise((resolve, reject) => {
            const dummyPeer = new Peer({ key: self.options.APIKEY });
            dummyPeer.on('open', () => {
                const dummyRoom = dummyPeer.joinRoom(self.roomName, {mode: 'sfu'});
                dummyRoom.on('close', () => {
                    dummyPeer.destroy();
                    resolve(true);
                });
                dummyRoom.on('open', () => {
                    dummyRoom.close();
                });
                dummyRoom.on('error', (err) =>{
                    reject('SFU work around is error:' + err);
                });
            });
        });
    }
}

export default skywayHelper;