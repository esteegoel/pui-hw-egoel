// Define the Roll class
class Roll {
  constructor(rollType, rollGlazing, packSize, basePrice) {
    this.type = rollType;
    this.glazing = rollGlazing;
    this.size = packSize;
    this.basePrice = basePrice;
  }

  // Function to calculate the item price
  calculatePrice() {
    const glazingPrice = parseFloat(glazingOptions[this.glazing]);
    const packPrice = packSizeOptions[this.size];
    return (this.basePrice + glazingPrice) * packPrice;
  }
}

// Import rollsData
const rollsData = {
  "Original": {
    "basePrice": 2.49,
    "imageFile": "original-cinnamon-roll.jpg"
  },
  "Apple": {
    "basePrice": 3.49,
    "imageFile": "apple-cinnamon-roll.jpg"
  },
  "Raisin": {
    "basePrice": 2.99,
    "imageFile": "raisin-cinnamon-roll.jpg"
  },
  "Walnut": {
    "basePrice": 3.49,
    "imageFile": "walnut-cinnamon-roll.jpg"
  },
  "Double-Chocolate": {
    "basePrice": 3.99,
    "imageFile": "double-chocolate-cinnamon-roll.jpg"
  },
  "Strawberry": {
    "basePrice": 3.99,
    "imageFile": "strawberry-cinnamon-roll.jpg"
  }
};

const glazingOptions = {
  'Keep original': 0.00,
  'Sugar milk': 0.00,
  'Vanilla milk': 0.50,
  'Double Chocolate': 1.50,
};

const packSizeOptions = {
  '1': 1,
  '3': 3,
  '6': 5,
  '12': 10,
};

function populateDropdownOptions() {
  const glazingSelect = document.getElementById("glazingOptions");
  const packSizeSelect = document.getElementById("sizeOptions");

  glazingSelect.innerHTML = "";
  packSizeSelect.innerHTML = "";

  for (const glazing in glazingOptions) {
    const option = document.createElement("option");
    option.value = glazing;
    option.textContent = glazing;
    glazingSelect.appendChild(option);
  }

  for (const size in packSizeOptions) {
    const option = document.createElement("option");
    option.value = size;
    option.textContent = size;
    packSizeSelect.appendChild(option);
  }
}

const cart = [];

// Function to add an item to the cart
function addToCart(roll) {
  cart.push({ roll, price: roll.calculatePrice() });
}

// Create four new Roll objects & add them to the cart
const roll1 = new Roll('Original', 'Sugar milk', '1', 2.49);
const roll2 = new Roll('Walnut', 'Vanilla milk', '12', 39.90);
const roll3 = new Roll('Raisin', 'Sugar milk', '3', 8.97);
const roll4 = new Roll('Apple', 'Keep original', '3', 10.47);

addToCart(roll1);
addToCart(roll2);
addToCart(roll3);
addToCart(roll4);

// Function to display the cart
function displayCart() {
  const cartItemsContainer = document.getElementById('cart-items');
  cartItemsContainer.innerHTML = '';

  cart.forEach((cartItem, index) => {
    const cartItemDiv = document.createElement('div');
    cartItemDiv.classList.add('cart-item');

    const itemName = document.createElement('p');
    itemName.textContent = `${cartItem.roll.type} Roll`;
    cartItemDiv.appendChild(itemName);

    const itemDetails = document.createElement('p');
    itemDetails.textContent = `Glazing: ${cartItem.roll.glazing}\nPack Size: ${cartItem.roll.size}\nPrice: $${cartItem.price.toFixed(2)}`;
    cartItemDiv.appendChild(itemDetails);

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', () => removeItem(index));
    cartItemDiv.appendChild(removeButton);

    cartItemsContainer.appendChild(cartItemDiv);
  });
}

// Function to remove an item from the cart
function removeItem(index) {
  if (index >= 0 && index < cart.length) {
    cart.splice(index, 1);
    displayCart();
    updateTotalPrice();
  }
}

// Function to update the total price
function updateTotalPrice() {
  const totalPriceDisplay = document.getElementById('total-price');

  const total = cart.reduce((accumulator, cartItem) => {
    return accumulator + cartItem.price;
  }, 0);

  totalPriceDisplay.textContent = `$${total.toFixed(2)}`;
}

populateDropdownOptions();
displayCart();
