'use strict';

import vad from 'voice-activity-detection';

class voiceDetertor {

    constructor() {
        this.vadobject = null;
    }

    startVoiceDetection(stream,update) {
        window.AudioContext = window.AudioContext;
        let audioContext = new AudioContext();
        let vadOptions = {
            onVoiceStart: function() {
                console.log('voice start');
            },
            onVoiceStop: function() {
                console.log('voice stop');
            },
            onUpdate: function(val) {
                update(val);
            }
        };
        this.vadobject = vad(audioContext,stream,vadOptions);
    }

    stopVoiceDetection(){
        if(this.vadobject){
            this.vadobject.destroy();
        }
    }

}

export default voiceDetertor;