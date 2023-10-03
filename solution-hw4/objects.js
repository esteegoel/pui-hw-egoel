// From HW3
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

// Get reference to price display element
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
  const packSizeSelect = document.getElementById("sizeOptions");

  // Populate glazing options (HW3)
  for (const glazing in glazingOptions) {
    const option = document.createElement("option");
    option.value = glazing;
    option.textContent = glazing;
    glazingSelect.appendChild(option);
  }

  // Populate pack size options (HW3)
  for (const size in packSizeOptions) {
    const option = document.createElement("option");
    option.value = size;
    option.textContent = size;
    packSizeSelect.appendChild(option);
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

document.getElementById("glazingOptions").addEventListener("change", updatePrice);
document.getElementById("sizeOptions").addEventListener("change", updatePrice);

document.getElementById('rollTitle').textContent = `${rollType} Cinnamon Roll`;
document.getElementById('rollImage').src = imagePath;

console.log("rollType:", rollType);
console.log("rollInfo:", rollInfo);

populateDropdownOptions();
updatePrice();
