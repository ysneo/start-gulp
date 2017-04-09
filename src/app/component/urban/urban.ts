namespace UrbanFlood {
    export class UrbanFlood {
        private name: string;
        constructor(_name: string) {
            this.name = _name;
        }
        getController() {
            return this.name;
        }
    }
}