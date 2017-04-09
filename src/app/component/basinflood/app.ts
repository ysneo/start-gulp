export class Greet {
    name = 3;
    greet() {
        console.log('greet everyone!');
    }

    get getNameFn() {
        return this.name;
    }
}
let app = new Greet();
app.greet(); // console greet 

