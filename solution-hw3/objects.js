const glazingOptions = {
  'Keep original': 0.00,
  'Sugar milk': 0.00,
  'Vanilla Milk': 0.50,
  'Double Chocolate': 1.50, 
};

const packSizeOptions = {
  '1': 1,
  '3': 3,
  '6': 5,
  '12': 10,
};

const basePrice = 2.49;

function updatePrice() {
  const glazingSelect = document.getElementById("glazingOptions");
  const packSizeSelect = document.getElementById("sizeOptions"); 
  const priceDisplay = document.getElementById("price");

  const selectedGlazing = glazingSelect.value;
  const selectedPackSize = packSizeSelect.value;

  const glazingPriceChange = glazingOptions[selectedGlazing] || 0.00;
  const packSizeMultiplier = packSizeOptions[selectedPackSize] || 1;

  const totalPrice = (basePrice + glazingPriceChange) * packSizeMultiplier;

  priceDisplay.textContent = `$${totalPrice.toFixed(2)}`;
}

updatePrice();
