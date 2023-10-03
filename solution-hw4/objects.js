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

// Get roll type 
const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const rollType = params.get('roll');

// Get roll info 
const rollInfo = rollsData[rollType];

// Image reference
const imagePath = `../assets/products/${rollInfo.imageFile}`;

// Empty Cart
const cart = [];

// Get reference to price 
const priceDisplay = document.getElementById("price");

// Roll class definition
class Roll {
  constructor(name, glazing, size, basePrice) {
    this.name = name;
    this.glazing = glazing;
    this.size = size;
    this.basePrice = basePrice;
  }
}

function populateDropdownOptions() {
  const glazingSelect = document.getElementById("glazingOptions");
  const sizeSelect = document.getElementById("sizeOptions");

  // Populate glazing options
  for (const glazing in glazingOptions) {
    const option = document.createElement("option");
    option.value = glazing;
    option.textContent = glazing;
    glazingSelect.appendChild(option);
  }

  // Populate pack size options
  for (const size in packSizeOptions) {
    const option = document.createElement("option");
    option.value = size;
    option.textContent = size;
    sizeSelect.appendChild(option);
  }
}

function updatePrice() {
  const glazingSelect = document.getElementById("glazingOptions");
  const sizeSelect = document.getElementById("sizeOptions");

  const selectedGlazing = glazingSelect.value;
  const selectedSize = sizeSelect.value;

  const totalPrice = (rollInfo.basePrice + glazingOptions[selectedGlazing]) * packSizeOptions[selectedSize];

  // Update the price display element
  priceDisplay.textContent = `$${totalPrice.toFixed(2)}`;

  // Create a new Roll object and add it to the cart array
  const roll = new Roll(rollInfo.name, selectedGlazing, selectedSize, rollInfo.basePrice);
  cart.push(roll);

  // Print the cart array to the console
  console.log("Cart:", cart);
}

function addToCart() {
  const glazingSelect = document.getElementById("glazingOptions");
  const sizeSelect = document.getElementById("sizeOptions");

  const selectedGlazing = glazingSelect.value;
  const selectedSize = sizeSelect.value;

  // Create a new Roll object and add it to the cart array
  const roll = new Roll(rollInfo.name, selectedGlazing, selectedSize, rollInfo.basePrice);
  cart.push(roll);

  // Print the cart array to the console
  console.log("Cart:", cart);
}

document.getElementById("glazingOptions").addEventListener("change", updatePrice);
document.getElementById("sizeOptions").addEventListener("change", updatePrice);

document.getElementById('rollTitle').textContent = `${rollType} Cinnamon Roll`;
document.getElementById('rollImage').src = imagePath;

// Update the image alt text
document.getElementById('rollImage').alt = `${rollType} Cinnamon Roll`;

console.log("rollType:", rollType);
console.log("rollInfo:", rollInfo);

populateDropdownOptions();
updatePrice();
