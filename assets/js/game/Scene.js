import {CITIES} from './data/cities';
import {TROLLS} from './data/trolls';
import {WORLD} from './data/world';
import {COINS} from './data/coins';
import Hero from './objects/Hero';
import City from './objects/City';
import Map from './objects/Map';
import Troll from './objects/Troll';
import Coin from './objects/Coin';
export default class Scene {
  constructor(game) {
    this.game = game;
    this.cities = [];
    this.trolls = [];
    this.elementsToUpdate = [];
    this.coins = [];
    this.setup();
  }
  setup() {
    this.map = new Map();
    this.addCoins();
    this.addAlice();
    this.addCities();
    this.addTrolls();
    this.elements = [
      ...this.cities.map(city => city.sign),
      ...this.map.elements,
      ...this.cities,
      ...this.trolls,
      this.hero
    ]

    console.log(this.elements)
  }
  doubleMatrix() {
    let matrice = [];
    WORLD.collisions.matrice.forEach(line => {
        let newline = '';
        [...line].forEach(value => {
            newline += value;
            newline += value;
        })
        matrice.push(newline);
        matrice.push(newline);
    });
  }
  addCoins() {
    COINS.forEach((coin, index) => {
      this.coins.push(new Coin({...coin, index}));
    });
  }
  addAlice() {
    this.hero = new Hero(WORLD.hero);
  }
  addCities() {
    CITIES.forEach(city => {
      this.cities.push(new City(city));
    });
  }
  addTrolls() {
    let i = 0;
    TROLLS.forEach((troll) => {
      this.trolls.push(new Troll(troll));
    })
  }
  checkCollision() {
    this.trolls.forEach(troll => {
      if (this.hero.collides(troll)) {
        troll.onCollide();
      }
    });
    this.cities.forEach(city => {
      if (this.hero.collides(city)) {
        city.onCollide();
      }
    });
    this.coins.forEach((coin) => {
      if (this.hero.collides(coin) && coin.active) {
        coin.onCollide();
      }
    });
  }
  update() {
    this.map.update();
    this.coins.forEach(coin => coin.update());
    this.elements.sort((a, b) => (a.y + a.depthOffset) - (b.y + b.depthOffset))
    this.elements.forEach(element => element.update());
    this.checkCollision();
  }
}