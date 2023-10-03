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

const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const rollType = params.get('roll');

const rollInfo = rolls[rollType]; 

function populateDropdownOptions() {
  const glazingSelect = document.getElementById("glazingOptions");
  const packSizeSelect = document.getElementById("sizeOptions");

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

function updatePrice() {
  const glazingSelect = document.getElementById("glazingOptions");
  const sizeSelect = document.getElementById("sizeOptions");
  const priceDisplay = document.getElementById("price");

  const selectedGlazing = glazingSelect.value;
  const selectedSize = sizeSelect.value;

  const totalPrice = (rollInfo.basePrice + glazingOptions[selectedGlazing]) * packSizeOptions[selectedSize];

  priceDisplay.textContent = `$${totalPrice.toFixed(2)}`;
}

document.getElementById("glazingOptions").addEventListener("change", updatePrice);
document.getElementById("sizeOptions").addEventListener("change", updatePrice);

populateDropdownOptions();
updatePrice();

document.getElementById('rollTitle').textContent = `${rollType} Cinnamon Roll`;
document.getElementById('rollImage').src = `../assets/products/${rollInfo.imageFile}`;
