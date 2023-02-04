function Bee(type = "bee", speed) {
    Animal.call(this, type, speed)
}
Bee.prototype = Object.create(Animal.prototype)
Bee.prototype.constructor = Bee

Bee.prototype.die = function() {
}

