const PRESSED = 1;
const RELEASED = 0;

export default class KeyboardState {
    constructor() {
        this.keyStates = new Map();
        this.keyMap = new Map();
    }

    addMapping(code, callback) {
        this.keyMap.set(code, callback);
    }

    handleEvent(event) {
        const { keyCode } = event;

        if (!this.keyMap.has(keyCode)) {
            return false;
        }

        event.preventDefault();

        const keyState = event.type === 'keydown' ? PRESSED : RELEASED;

        if (this.keyStates.get(keyCode) !== keyState) {
            if (this.keyMap.has(keyCode)) {
                this.keyMap.get(keyCode)(keyState, event);
            }
            this.keyStates.set(keyCode, keyState);
        }
        return true;
    }

    listenTo(window) {
        window.addEventListener('keydown', event => this.handleEvent(event));
        window.addEventListener('keyup', event => this.handleEvent(event));
    }
}