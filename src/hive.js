class Hive {
  constructor() {
    this.colony = []
    this.deathCount = 0
  }
  addAnimal (animal){
    this.colony.push(animal)
  }
  deleteAnimal (idx) {
    this.deathCount++
    this.colony.splice(idx,1)
  }
}

const beeHive = new Hive()
const waspHive = new Hive()