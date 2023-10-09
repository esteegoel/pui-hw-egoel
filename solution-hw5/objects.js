// Define  Roll class
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

// Initialize the shopping cart
const cart = [];

// Create Roll objects and add them to the cart
const rollsToAdd = [
  new Roll("Original", "Sugar Milk", 1, 2.49),
  new Roll("Walnut", "Vanilla Milk", 12, 3.99),
  new Roll("Raisin", "Sugar Milk", 3, 2.99),
  new Roll("Apple", "Original", 3, 3.49)
];

cart.push(...rollsToAdd);

// update product price
function updatePrice() {
  const glazingSelect = document.getElementById("glazingOptions");
  const sizeSelect = document.getElementById("sizeOptions");
  const priceDisplay = document.getElementById("price");

  const glazingPrice = parseFloat(glazingOptions[glazingSelect.value]);
  const packPrice = parseInt(sizeSelect.value);

  const selectedRollType = document.getElementById('rollTitle').textContent.split(' ')[0];

  const rollInfo = rollsData[selectedRollType];
  const basePrice = rollInfo.basePrice;

  if (!isNaN(glazingPrice) && !isNaN(packPrice)) {
    const totalPrice = (basePrice + glazingPrice) * packPrice;
    priceDisplay.textContent = `$${totalPrice.toFixed(2)}`;
  } else {
    priceDisplay.textContent = "$0.00";
  }
}

function populateDropdownOptions() {
  const glazingSelect = document.getElementById("glazingOptions");
  const packSizeSelect = document.getElementById("sizeOptions");

  // Clear 
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

function initializePage() {
  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);
  let rollType = params.get('roll') || "Original";

  const rollInfo = rollsData[rollType];
  const imagePath = `../assets/products/${rollInfo.imageFile}`;

  document.getElementById('rollTitle').textContent = `${rollType} Cinnamon Roll`;
  document.getElementById('rollImage').src = imagePath;

  populateDropdownOptions();
  updatePrice();
}

// Add event listeners for buttons
document.getElementById("addToCartButton").addEventListener("click", addToCart);
document.getElementById("updatePriceButton").addEventListener("click", updatePrice);

// Call initializePage when the page loads
window.addEventListener("load", initializePage);