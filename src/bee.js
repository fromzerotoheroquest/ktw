/*
class Bee extends Animal {
    constructor(type = "bee", speed) {
        super(speed)
        this.type = type
    }
}
*/

function Bee(type = "bee", speed) {
    Animal.call(this, type, speed)
}
Bee.prototype = Object.create(Animal.prototype)
Bee.prototype.constructor = Bee



