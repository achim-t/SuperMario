import { loadImage } from './loaders.js';
import SpriteSheet from './SpriteSheet.js';
export function loadMarioSprite() {
    return loadImage('/img/characters.gif')
    .then(image => {
        const mario = new SpriteSheet(image);
        mario.define('idle', 276, 44, 16, 16);
        return mario;
    });
}
export function loadBackgroundSprites() {
    return loadImage('/img/tileset.png')
    .then(image => {
        const sprites = new SpriteSheet(image);
        sprites.defineTile('ground', 0, 0);
        sprites.defineTile('sky', 3, 23);
        return sprites;
    });
}