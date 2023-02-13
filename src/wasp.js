

/*
class Wasp extends Animal {
    constructor(type = "wasp", speed) {
        super(speed)
        this.type = type
    }
}

*/

function Wasp(type = "wasp", speed) {
    Animal.call(this, type, speed)
}
Wasp.prototype = Object.create(Animal.prototype)
Wasp.prototype.constructor = Wasp


