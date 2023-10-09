// Define the Roll class
class Roll {
  constructor(rollType, rollGlazing, packSize, basePrice) {
    this.type = rollType;
    this.glazing = rollGlazing;
    this.size = packSize;
    this.basePrice = basePrice;
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

const basePrice = 2.49;

function populateDropdownOptions() {
  const glazingSelect = document.getElementById("glazingOptions");
  const packSizeSelect = document.getElementById("sizeOptions");

  // glazing
  for (const glazing in glazingOptions) {
    const option = document.createElement("option");
    option.value = glazing; // Use the glazing name as the value
    option.textContent = glazing; // Use the glazing name as the displayed text
    // console.log(glazingSelect);
    glazingSelect.appendChild(option);
  }

  // size
  for (const size in packSizeOptions) {
    const option = document.createElement("option");
    option.value = size; // Use the size as the value
    option.textContent = size; // Use the size as the displayed text
    packSizeSelect.appendChild(option);
  }
}

// Function to update product price
function updatePrice() {
  const glazingSelect = document.getElementById("glazingOptions");
  const sizeSelect = document.getElementById("sizeOptions");
  const priceDisplay = document.getElementById("price");

  const glazingPrice = parseFloat(glazingOptions[glazingSelect.value]);
  const packPrice = parseInt(sizeSelect.value);

  const selectedRollType = document.getElementById('rollTitle').textContent.split(' ')[0];

  const rollInfo = rollsData[selectedRollType]; // Get roll info
  const basePrice = rollInfo.basePrice; // Use the base price 

  if (!isNaN(glazingPrice) && !isNaN(packPrice)) {
    const totalPrice = (basePrice + glazingPrice) * packPrice;
    priceDisplay.textContent = `$${totalPrice.toFixed(2)}`;
  } else {
    priceDisplay.textContent = "$0.00";
  }
}

// Initialize cart array
const cart = [];

// Create four new Roll objects & add
const roll1 = new Roll('Original', 'Sugar Milk', 1, 2.49);
const roll2 = new Roll('Walnut', 'Vanilla Milk', 12, 39.90);
const roll3 = new Roll('Raisin', 'Sugar Milk', 3, 8.97);
const roll4 = new Roll('Apple', 'Original', 3, 10.47);

// Calculate prices
const price1 = roll1.calculatePrice();
const price2 = roll2.calculatePrice();
const price3 = roll3.calculatePrice();
const price4 = roll4.calculatePrice();

// Add the obj to cart with prices
cart.push({ roll: roll1, price: price1 });
cart.push({ roll: roll2, price: price2 });
cart.push({ roll: roll3, price: price3 });
cart.push({ roll: roll4, price: price4 });

function removeItem(index) {
  cart.splice(index, 1); 
  displayCart(); 
}

function displayCart() {
  const cartItemsContainer = document.getElementById('cart-items'); 
  cartItemsContainer.innerHTML = ''; 

  cart.forEach((cartItem, index) => {
    const cartItemDiv = document.createElement('div');
    cartItemDiv.classList.add('cart-item');

    const itemName = document.createElement('h4');
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

displayCart();
