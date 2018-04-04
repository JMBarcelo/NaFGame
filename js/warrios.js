// Warrior
function Warrior(health, strength, movement) {
  this.movement = movement;
  this.health = health;
  this.strength = strength;
}

Warrior.prototype.attack = function(){
  return this.strength;
}

Warrior.prototype.receiveDamage = function(damage){
  this.health -= damage;
}

Warrior.prototype.move = function(){
  return this.move;
}

// Hero
function Hero(name, health, strength, movement) {
  Warrior.call(this, health, strength, movement);
  this.name = name;
}

Hero.prototype = Object.create(Warrior.prototype);
Hero.prototype.constructor = Hero;

Hero.prototype.receiveDamage = function(damage){
  this.health -= damage;
  if (this.health > 0){
    return this.name + " has received " + damage + " points of damage"
  } else {
    return this.name + " has died in a horrible way"
  }
}

// Monster
function Monster(kindof, health, strength, movement) {
  Soldier.call(this, health, strength, movement);
  this.kindof = kindof;
}

Monster.prototype = Object.create(Warrior.prototype);
Monster.prototype.constructor = Monster;

Monster.prototype.receiveDamage = function(damage){
  this.health -= damage;
  if (this.health > 0){
    return "The" + this.kindof + " has received " + damage + " points of damage"
  } else {
    return "The" + this.kindof + " has died in a horrible way"
  }
}

// Combat
function Combat() {
  this.monstersArray = [];
}

Combat.prototype.addMonster = function(monsterObj){
  this.monstersArray.push(monsterObj)
}

Combat.prototype.heroAttack = function(i){
  var hero = this.Hero;
  var monster =  this.monstersArray[i];
  var msg = monster.receiveDamage (hero.attack());
  if (monster.health > 0) {
    this.monstersArray[i].health = monster.health;
  } else {
    this.monstersArray.splice(monstersArray[i], 1);
  }
  return msg;
}

Combat.prototype.saxonAttack = function(i){
  var hero = this.Hero;
  var monster =  this.monstersArray[i];
  var msg = monster.receiveDamage (hero.attack());
  if (hero.health > 0) {
    this.Hero.health = hero.health;
  }
  return msg;
}

Combat.prototype.showStatus = function(){
  if (this.monstersArray.length < 1) {
    return "Hero! Your enemies are death. Continue to the next floor"
  } else if (this.heroesArra.length < 1) {
    return "The Black Tower was too much for you..."
  }
}