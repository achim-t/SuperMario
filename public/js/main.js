import { loadLevel } from './loaders.js';
import { loadMarioSprite, loadBackgroundSprites } from './sprites.js';
import Compositor from './Compositor.js';
import { createBackgroundLayer, createSpriteLayer } from './layers.js';
import Entity from './Entity.js';
import { createMario } from './entities.js';
import Timer from './Timer.js';
import { setupInput } from './input.js';

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

        const input = setupInput(mario);
        input.listenTo(window);

        const gravity = 2000;
        mario.pos.set(64, 180);

        const spriteLayer = createSpriteLayer(mario);
        compositor.layers.push(spriteLayer);

        const timer = new Timer(1 / 60);
        timer.update = function update(deltaTime) {

            mario.update(deltaTime);
            compositor.draw(context);
            mario.vel.y += gravity * deltaTime;

        };

        timer.start();
    });
