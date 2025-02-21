class Mekadon {
    constructor(...args) {
        this.init(...args);
    }
    
    init(controller, game) {
        this.controller = controller;
        this.game = game;
        this.lr = false;
        this.lr2 = 0; 
        this.lastHit = -Infinity;
        this.delay = controller.audioLatency;
    }
    
    play(circle) {
        var type = circle.type;
        if ((type === "balloon" || type === "drumroll" || type === "daiDrumroll") && this.getMS() > circle.endTime) {
            if (circle.section && circle.timesHit === 0) {
                this.game.resetSection();
            }
            circle.played(-1, false);
            this.game.updateCurrentCircle();
        }
        type = circle.type;
        if (type === "balloon") {
            return this.playDrumrollAt(circle, 0, 10);
        } else if (type === "drumroll" || type === "daiDrumroll") {
            return this.playDrumrollAt(circle, 0, 20);
        } else {
            return this.playAt(circle, 0, 450);
        }
    }

    playAt(circle, ms, score, dai, reverse) {
        var currentMs = circle.ms - this.getMS() + this.delay;
        if (ms > currentMs - 10) {
            return this.playNow(circle, score, dai, reverse);
        }
    }

    playDrumrollAt(circle, ms, pace, kaAmount) {
        if (pace && this.getMS() >= this.lastHit + pace) {
            var score = 1;
            if (kaAmount > 0) {
                score = Math.random() > kaAmount ? 1 : 2;
            }
            return this.playAt(circle, ms, score);
        }
    }

    miss(circle) {
        var currentMs = circle.ms - this.getMS();
        if (0 >= currentMs - 10) {
            this.controller.displayScore(0, true);
            this.game.updateCurrentCircle();
            this.game.updateCombo(0);
            this.game.updateGlobalScore(0, 1, circle.gogoTime);
            this.game.sectionNotes.push(0);
            return true;
        }
    }

    playNow(circle, score, dai, reverse) {
        var type = circle.type;
        var keyDai = false;
        var playDai = !dai || dai === 2;
        var drumrollNotes = type === "balloon" || type === "drumroll" || type === "daiDrumroll";
        
        var ms = drumrollNotes ? this.getMS() : circle.ms;
        
        if (reverse) {
            if (type === "don" || type === "daiDon" || type === "adlib") {
                type = "ka";
            } else if (type === "ka" || type === "daiKa") {
                type = "don";
            }
        } else if (type === "adlib") {
            type = "don";
        }

        if (type === "daiDon" && playDai) {
            if (this.lr) {
                this.setKey("don_l", ms);  
            } else {
                this.setKey("don_r", ms);  
            }
            this.lr = !this.lr;  
        } else if (type === "green") {
            this.setKey("ka_l", ms);
            this.setKey("don_r", ms);
            this.lr = false;
            keyDai = true;
        } else if (type === "don" || type === "daiDon" || (drumrollNotes && score !== 2)) {
            this.setKey(this.lr ? "don_l" : "don_r", ms);
            this.lr = !this.lr;
        } else if (type === "daiKa" && playDai) {
            if (this.lr) {
                this.setKey("ka_l", ms);  
            } else {
                this.setKey("ka_r", ms);  
            }
            this.lr = !this.lr;  
        } else if (type === "ka" || type === "daiKa" || drumrollNotes) {
            this.setKey(this.lr ? "ka_l" : "ka_r", ms);
            this.lr = !this.lr;
        }

        // ドンカツ交互にやるようにした
        if (type === "drumroll" || type === "daiDrumroll") {
            if (this.lr2 === 0) {
                this.setKey("don_l", ms);
            } else if (this.lr2 === 1) {
                this.setKey("ka_r", ms);
            } else if (this.lr2 === 2) {
                this.setKey("don_r", ms);
            } else {
                this.setKey("ka_l", ms);
            }
            
            this.lr2 = (this.lr2 + 1) % 4;  
        }

        if (type === "balloon") {
            if (circle.requiredHits === 1) {
                assets.sounds["se_balloon"].play();
            }
            this.game.checkBalloon(circle);
        } else if (type === "drumroll" || type === "daiDrumroll") {
            this.game.checkDrumroll(circle, score === 2);
        } else {
            this.controller.displayScore(score, false, keyDai, circle.type === "adlib");
            this.game.updateCombo(score);
            this.game.updateGlobalScore(score, keyDai ? 2 : 1, circle.gogoTime);
            this.game.updateCurrentCircle();
            circle.played(score, keyDai);
            if (circle.section) {
                this.game.resetSection();
            }
            if (circle.type === "adlib" && score) {
                this.game.globalScore.adlib++;
            }
            this.game.sectionNotes.push(score === 450 ? 1 : (score === 230 ? 0.5 : 0));
        }
        this.lastHit = ms;
        return true;
    }

    getMS() {
        return this.controller.getElapsedTime();
    }

    setKey(name, ms) {
        this.controller.setKey(true, name, ms);
    }
}