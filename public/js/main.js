import { loadLevel } from './loaders.js';
import Entity from './Entity.js';
import { createMario } from './entities.js';
import Timer from './Timer.js';
import { setupInput } from './input.js';
import { createCollisionLayer } from './layers.js';
const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

Promise.all([
    createMario(),
    loadLevel('1-1')
])
    .then(([mario, level]) => {

        const input = setupInput(mario);
        input.listenTo(window);

        mario.pos.set(64, 64);
        level.entities.add(mario);
        level.comp.layers.push(createCollisionLayer(level));
        ['mousedown', 'mousemove'].forEach(eventName => {
            canvas.addEventListener(eventName, event => {
                if (event.buttons === 1) {
                    mario.vel.set(0, 0);
                    mario.pos.set(event.offsetX, event.offsetY);
                }
            });
        });

        const timer = new Timer(1 / 60);
        timer.update = function update(deltaTime) {

            level.update(deltaTime);
            level.comp.draw(context);

        };

        timer.start();
    });
