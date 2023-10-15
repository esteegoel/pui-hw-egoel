const currentPage = window.location.pathname;

if (currentPage.includes('detail.html')) {
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

    const rollInfo = rollsData[selectedRollType];
    const basePrice = rollInfo.basePrice;

    if (!isNaN(glazingPrice) && !isNaN(packPrice)) {
      const totalPrice = (basePrice + glazingPrice) * packPrice;
      priceDisplay.textContent = `$${totalPrice.toFixed(2)}`;
    } else {
      priceDisplay.textContent = "$0.00";
    }
  }

  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);
  let rollType = params.get('roll');
  if (rollType == null) {
    rollType = "Original";
  }

  // Initialize an empty cart array
  let cart = [];

  // When the user clicks on "Add to Cart"
  function addToCart() {
    const glazingSelect = document.getElementById("glazingOptions");
    const sizeSelect = document.getElementById("sizeOptions");

    const selectedRollType = document.getElementById('rollTitle').textContent.split(' ')[0];
    const selectedGlazing = glazingSelect.value;
    const selectedSize = sizeSelect.value;

    const rollInfo = rollsData[selectedRollType];
    const basePrice = rollInfo.basePrice;

    const roll = new Roll(selectedRollType, selectedGlazing, selectedSize, basePrice);

    // Add the roll to the cart array
    cart.push(roll);

    // Convert the updated cart to JSON and save it in local storage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Print the current contents of the cart in local storage
    console.log("Cart in local storage:", cart);
  }

  const rollInfo = rollsData[rollType];
      
  const imagePath = `../assets/products/${rollInfo.imageFile}`;

  document.getElementById('rollTitle').textContent = `${rollType} Cinnamon Roll`;
  document.getElementById('rollImage').src = imagePath;
  populateDropdownOptions(); // Populate the dropdowns when the page loads
  updatePrice(); // Update the initial price
} 
else if (currentPage.includes('cart.html')) {
  // Import rollsData for image sourcing in cart 
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

  // initialize cart 
  let cart = [];

  // create roll class 
  class Roll {
    constructor(rollType, rollGlazing, packSize, rollPrice) {
      this.type = rollType;
      this.glazing = rollGlazing;
      this.size = packSize;
      this.basePrice = rollPrice;
      this.calculatePrice();
    }

    calculatePrice() {
      // get rolls base price
      const basePrice = rollsData[this.type].basePrice;
      
      // glazing price, default to zero 
      const glazingPrice = glazingOptions[this.glazing] || 0;
      
      // pack size import 
      const packPrice = this.size;
    
      // actual price calculation 
      this.itemPrice = (basePrice + glazingPrice) * packPrice;
    }    
  }

  // Create Roll objects
  const originalRoll = new Roll("Original", "Sugar milk", 1, 2.49);
  const walnutRoll = new Roll("Walnut", "Vanilla milk", 12, 39.90);
  const raisinRoll = new Roll("Raisin",