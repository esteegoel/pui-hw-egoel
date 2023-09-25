// Define glazing and pack size options with their respective price changes
const glazingOptions = {
  'Keep original': 0.00,
  'Sugar milk': 0.00,
  'Vanilla Milk': 0.50,
  'Double Chocolate': 1.50, // Corrected capitalization
};

const packSizeOptions = {
  '1': 1,
  '3': 3,
  '6': 5,
  '12': 10,
};

// Base price
const basePrice = 2.49;

// Function to update the price based on glazing and pack size selections
function updatePrice() {
  const glazingSelect = document.getElementById("glazingOptions");
  const packSizeSelect = document.getElementById("sizeOptions"); // Corrected to match your HTML
  const priceDisplay = document.getElementById("price");

  const selectedGlazing = glazingSelect.value;
  const selectedPackSize = packSizeSelect.value;

  // Get the price changes from the options
  const glazingPriceChange = glazingOptions[selectedGlazing] || 0.00;
  const packSizeMultiplier = packSizeOptions[selectedPackSize] || 1;

  // Calculate the total price by adding glazing price change and multiplying by pack size
  const totalPrice = (basePrice + glazingPriceChange) * packSizeMultiplier;

  // Update the price display
  priceDisplay.textContent = `$${totalPrice.toFixed(2)}`;
}

// Initial update of the price when the page loads
updatePrice();
