function Hamburger(size, stuffing) {
    this.size = size;
    this.stuffing = stuffing;

    this.toppings = [];
}

const Hamburger_SIZE_SMALL = {
    price: 50,
    calories: 20
};
const Hamburger_SIZE_LARGE = {
    price: 100,
    calories: 40
};
const Hamburger_STUFFING_CHEESE = {
    price: 10,
    calories: 20
};
const Hamburger_STUFFING_SALAD = {
    price: 20,
    calories: 5
};
const Hamburger_STUFFING_POTATO = {
    price: 15,
    calories: 10
};
const Hamburger_TOPPING_SPICE = {
    price: 15,
    calories: 0
};
const Hamburger_TOPPING_MAYO = {
    price: 20,
    calories: 5
};

Hamburger.prototype.addTopping = function (topping) {
    let toppingChoice = this.toppings.indexOf(topping);
    if (toppingChoice === -1) {
        this.getToppings().push(topping);
    } else {
        this.removeTopping(topping);
    }
};

Hamburger.prototype.removeTopping = function (topping) {
    let toppingChoice = this.toppings.indexOf(topping);
    if (toppingChoice !== -1) {
        this.toppings.splice(toppingChoice, 1);
    }

};

Hamburger.prototype.getToppings = function () {
    return this.toppings;
};

Hamburger.prototype.getSize = function () {
    return this.size;
};

Hamburger.prototype.getStuffing = function () {
    return this.stuffing;
};

Hamburger.prototype.calculatePrice = function () {
    let finalPrice = 0;
    [...this.getStuffing(), ...this.getToppings(), this.getSize()].forEach(item => {
        finalPrice += item.price;
    });
    return finalPrice;
};

Hamburger.prototype.calculateCalories = function () {
    let finalCalories = 0;
    [...this.getStuffing(), ...this.getToppings(), this.getSize()].forEach(item => {
        finalCalories += item.calories;
    });
    return finalCalories;
};

let selectedSize = Hamburger_SIZE_SMALL;
let addedStuffing = [Hamburger_STUFFING_CHEESE];
let newBurger;


function createBurger() {
    newBurger = new Hamburger(selectedSize, addedStuffing);
    [...document.getElementsByClassName('topping_card')].forEach(
        (element) => {
            element.classList.remove('card-active');
        }
    );

}

function chooseSize(card, size) {
    selectedSize = size;
    chooseCard(card, "burger_card", false);
    createBurger();
}

function chooseTopping(card, topping) {
    newBurger.addTopping(topping);
    chooseCard(card, "topping_card", true);
}

function chooseStuffing(card, stuffing) {
    let result = addedStuffing.indexOf(stuffing);
    if (result === -1) {
        addedStuffing.push(stuffing);
    } else {
        addedStuffing.splice(result, 1);
    }

    createBurger();
    chooseCard(card, "stuffing_card", true);
}

function chooseCard(card, card_button, multiply) {
    if (!multiply) {
        [...document.getElementsByClassName(card_button)].forEach(
            (element) => {
                element.classList.remove('card-active');
            }
        );
    }
    card.classList.toggle('card-active');
}

function showFinalInformation() {
    alert(`Стоимость бургера ${newBurger.calculatePrice()}$, калорийность: ${newBurger.calculateCalories()} ккал`);
}

createBurger();




