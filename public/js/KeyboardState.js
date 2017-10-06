const PRESSED = 1;
const RELEASED = 0;

export default class Keyboard {
    constructor() {
        this.keyStates = new Map();
        this.keyMap = new Map();
    }

    addMapping(code, callback) {
        this.keyMap.set(code, callback);
    }

    handleEvent(event) {
        const { code } = event;

        if (!this.keyMap.has(code)) {
            return false;
        }

        event.preventDefault();

        const keyState = event.type === 'keydown' ? PRESSED : RELEASED;

        if (this.keyStates.get(code) !== keyState) {
            if (this.keyMap.has(code)) {
                this.keyMap.get(code)(keyState, event);
            }
            this.keyStates.set(code, keyState);
        }
        return true;
    }

    listenTo(window) {
        window.addEventListener('keydown', event => this.handleEvent(event));
        window.addEventListener('keyup', event => this.handleEvent(event));
    }
}