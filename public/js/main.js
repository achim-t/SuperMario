import { loadLevel } from './loaders.js';
import { loadMarioSprite, loadBackgroundSprites } from './sprites.js';
import Compositor from './Compositor.js';
import { createBackgroundLayer, createSpriteLayer } from './layers.js';
import Entity from './Entity.js';
import { createMario } from './entities.js';
import Timer from './Timer.js';
const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

Promise.all([
    createMario(),
    loadBackgroundSprites(),
    loadLevel('1-1')
])
    .then(([mario, backgroundSprites, level]) => {
        const compositor = new Compositor();
        compositor.layers.push(createBackgroundLayer(level.backgrounds, backgroundSprites));

        const gravity = 30;
        mario.pos.set(64, 180);
        mario.vel.set(200, -600);

        const spriteLayer = createSpriteLayer(mario);
        compositor.layers.push(spriteLayer);

        const timer = new Timer(1 / 60);
        timer.update = function update(deltaTime) {

            mario.update(deltaTime);
            mario.vel.y += gravity;

        };
        timer.draw = function draw() {
            compositor.draw(context);
        }

        timer.start();
    });
