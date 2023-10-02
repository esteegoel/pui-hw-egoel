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

// Embed options in java so it is not hardcoded in HTML 
function populateDropdownOptions() {
  const glazingSelect = document.getElementById("glazingOptions");
  const packSizeSelect = document.getElementById("sizeOptions");

  // Populate options
  for (const glazing in glazingOptions) {
    const option = document.createElement("option");
    option.value = glazingOptions[glazing];
    option.textContent = glazing;
    glazingSelect.appendChild(option);
  }

  // Populate options
  for (const size in packSizeOptions) {
    const option = document.createElement("option");
    option.value = packSizeOptions[size];
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

  const basePrice = rollInfo.basePrice;

  const totalPrice = (basePrice + rollInfo.glazingOptions[selectedGlazing]) * rollInfo.sizeOptions[selectedSize];

  priceDisplay.textContent = `$${totalPrice.toFixed(2)}`;
}

document.getElementById("glazingOptions").addEventListener("change", updatePrice);
document.getElementById("sizeOptions").addEventListener("change", updatePrice);

populateDropdownOptions();

updatePrice();
