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

  const glazingPrice = parseFloat(glazingSelect.selectedOptions[0].value);
  const packPrice = parseInt(sizeSelect.value);

  const totalPrice = (basePrice + glazingPrice) * packPrice;

  priceDisplay.textContent = `$${totalPrice.toFixed(2)}`;
}

populateDropdownOptions();

const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const rollType = params.get('roll');
if (rollType == null) {
  rollType = "Original";
}

const rollInfo = rollsData[rollType];

console.log(rollInfo)
const imagePath = `../assets/products/${rollInfo.imageFile}`;
console.log(imagePath);

// document.querySelector("#rollTitle")
// console.log(document.getElementById('rollTitle'))
document.getElementById('rollTitle').textContent = `${rollType} Cinnamon Roll`;
document.getElementById('rollImage').src = imagePath;
populateDropdownOptions(); // Populate the dropdowns when the page loads
updatePrice(); // Update the initial price