import { loadLevel } from './loaders.js';
import { loadMarioSprite, loadBackgroundSprites } from './sprites.js';
import Compositor from './Compositor.js';
import { createBackgroundLayer } from './layers.js';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

function createSpriteLayer(sprite, pos) {
    return function drawSpriteLayer(context) {
        sprite.draw('idle', context, pos.x, pos.y);
    }
}

Promise.all([
    loadMarioSprite(),
    loadBackgroundSprites(), 
    loadLevel('1-1')
])
.then(([marioSprite, backgroundSprites, level]) => {
        const compositor = new Compositor();
        compositor.layers.push(createBackgroundLayer(level.backgrounds, backgroundSprites));
        const pos = {
            x: 64,
            y: 64
        }
        compositor.layers.push(createSpriteLayer(marioSprite, pos));
        function update() {
            compositor.draw(context);
            pos.x += 2;
            pos.y += 1;
            requestAnimationFrame(update);
        }
        update();
    });
