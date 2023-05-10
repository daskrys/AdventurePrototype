//const Phaser = require("phaser");

class Demo1 extends AdventureScene {
    constructor() 
    {
        super("demo1", "Your Room");
    }

    preload () 
    {
        this.load.image('ghost', 'assets/Mega-Ghost.png');
    }

    onEnter() {

        let textBox = this.add.text(350, 50, "");
        textBox.setFontSize(55);
        let rand = this.randomNum();
        let newText = "Welcome Asset # " + rand;

        this.typeWrite(textBox, newText, 0, 150);
        let clip = this.add.text(this.w * 0.3, this.w * 0.3, "🧠 the brain")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => this.showMessage("Just you and your brain in this room."))
            .on('pointerdown', () => {
                this.showMessage("No touching!");
                this.tweens.add({
                    targets: clip,
                    x: '+=' + this.s,
                    repeat: 2,
                    yoyo: true,
                    ease: 'Sine.inOut',
                    duration: 100
                });
            });

        let note1 = this.add.text(this.w * 0.6, this.w * 0.4, "🗒️ Note 1")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("1083 days since.. *the rest of the note is missing*");
            })
            .on('pointerdown', () => {

            });

        let note2 = this.add.text(this.w * 0.5, this.w * 0.22, "🗒️ Note 2")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("blue 🔵");
            })
            .on('pointerdown', () => {

            });     

        let note3 = this.add.text(this.w * 0.1, this.w * 0.35, "🗒️ Note 3")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("( ͡° ͜ʖ ͡°)");
            })
            .on('pointerdown', () => {

            }); 

        let key = this.add.text(this.w * 0.5, this.w * 0.1, "🔑 key")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("It's a nice key.")
            })
            .on('pointerdown', () => {
                this.showMessage("You pick up the key.");
                this.gainItem('key');
                this.tweens.add({
                    targets: key,
                    y: `-=${2 * this.s}`,
                    alpha: { from: 1, to: 0 },
                    duration: 500,
                    onComplete: () => key.destroy()
                });
            });

        let door = this.add.text(this.w * 0.1, this.w * 0.15, "🚪 locked door")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                if (this.hasItem("key")) {
                    this.showMessage("You've got the key for this door.");
                } else {
                    this.showMessage("It's locked. Can you find a key?");
                }
            })
            .on('pointerdown', () => {
                if (this.hasItem("key")) {
                    this.loseItem("key");
                    this.showMessage("*squeak*");
                    door.setText("🚪 unlocked door");
                    this.gotoScene('demo2');
                }
            })

    }

    update () 
    {
        /*
        const speed = 4;

        // Update the ghost's position based on the keys being pressed this is for controls
        // commented out for animation
        if (this.keys.W.isDown) 
        {
            this.ghost.y -= speed;
        }

        if (this.keys.A.isDown) 
        {
            this.ghost.x -= speed;
            this.ghost.flipX = false;
        }

        if (this.keys.S.isDown) 
        {
            this.ghost.y += speed;
        }

        if (this.keys.D.isDown) 
        {
            this.ghost.x += speed;
            this.ghost.flipX = true;
        }*/
    }
}

class Demo2 extends AdventureScene {
    constructor() {
        super("demo2", "This is just a long hallway.");
    }
    onEnter() {
        this.add.text(this.w * 0.3, this.w * 0.4, "just go back")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("You've got no other choice, really.");
            })
            .on('pointerdown', () => {
                this.gotoScene('demo1');
            });

        let finish = this.add.text(this.w * 0.6, this.w * 0.2, '(finish the game)')
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage('*giggles*');
                this.tweens.add({
                    targets: finish,
                    x: this.s + (this.h - 2 * this.s) * Math.random(),
                    y: this.s + (this.h - 2 * this.s) * Math.random(),
                    ease: 'Sine.inOut',
                    duration: 500
                });
            })
            .on('pointerdown', () => this.gotoScene('outro'));

            let textBox = this.add.text(325, 50, "");
            textBox.setFontSize(55);
            //let rand = this.randomNum();
            let newText = "Where are you going Asset.";
    
            this.typeWrite(textBox, newText, 0, 150);

            let door = this.add.text(this.w * 0.1, this.w * 0.15, "🚪 Door")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {this.showMessage("A door at the end of the hallway. It's unlocked.");})
            .on('pointerdown', () => {this.gotoScene('demo3');});
    }
}

class Demo3 extends AdventureScene 
{
    constructor () 
    {
        super("demo3", "Third Scene Room");
    }

    onEnter () 
    {
        let textBox = this.add.text(170, 50, "");
            textBox.setFontSize(55);
            //let rand = this.randomNum();
            let newText = "Don't walk through that door.";
            let newText2 = "Just know, there is no coming back."
    
            this.typeWrite(textBox, newText, 0, 150);
            this.time.delayedCall(8000, () => {
                textBox.text = "";
                this.time.delayedCall(1000, () => {this.typeWrite(textBox, newText2, 0, 150)});
            });

            let door = this.add.text(this.w * 0.11, this.w * 0.25, "🚪 Door")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {this.showMessage("A door at the end of the hallway. It's unlocked.");})
            .on('pointerdown', () => {this.gotoScene('demo4');});
    }
}

class Demo4 extends AdventureScene 
{
    constructor() {
        super("demo4", "Fourth Scene Room");
    }
}

class Intro extends Phaser.Scene {
    constructor() 
    {
        super('intro')
    }

    preload ()
    {
        this.load.image('studio', "assets/MegaGhostStudios.png");
    } 

    create () 
    {
        this.cameras.main.setBackgroundColor('#4F4B5A');
        //this.add.text(50,50, "Adventure awaits!").setFontSize(50);
        this.studio = this.add.image(960, 540, 'studio');
        //this.studio.setScale(0.70);
       this.add.text(750,950, "Click anywhere to begin.", {color: '#000000'}).setFontSize(30);
       
        this.input.on('pointerdown', () => {
            this.cameras.main.fade(1000, 0,0,0);
            this.time.delayedCall(1000, () => this.scene.start('demo1'));
        });
    }
}

class Outro extends Phaser.Scene {
    constructor() 
    {
        super('outro');
    }
    create() {
        this.add.text(50, 50, "That's 2!").setFontSize(50);
        this.add.text(830,850, "Click anywhere to restart.").setFontSize(20);
        this.input.on('pointerdown', () => this.scene.start('intro'));
    }
}


const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    scene:[Demo2, Demo3],
    //scene: [Intro, Demo1, Demo2 ,Demo3, Demo4, Outro],
    title: "Adventure Game",
});

/*
    /*const speed = 4;

        // Update the ghost's position based on the keys being pressed this is for controls
        // commented out for animation
        if (this.keys.W.isDown) 
        {
            this.ghost.y -= speed;
        }

        if (this.keys.A.isDown) 
        {
            this.ghost.x -= speed;
            this.ghost.flipX = false;
        }

        if (this.keys.S.isDown) 
        {
            this.ghost.y += speed;
        }

        if (this.keys.D.isDown) 
        {
            this.ghost.x += speed;
            this.ghost.flipX = true;
        }
*/