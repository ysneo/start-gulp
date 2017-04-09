namespace BasinFlood {
    export class BasinFlood {
        private name: string;
        constructor(_name: string) {
            this.name = _name;
        }
        getController() {
            return this.name;
        }
    }
}