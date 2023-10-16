const currentPage = window.location.pathname;

// Define the rollsData
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

function updatePrice() {
  const glazingSelect = document.getElementById("glazingOptions");
  const sizeSelect = document.getElementById("sizeOptions");
  const priceDisplay = document.getElementById("price");

  const selectedRollType = document.getElementById('rollTitle').textContent.split(' ')[0];
  const rollInfo = rollsData[selectedRollType];

  const basePrice = rollInfo.basePrice;
  const glazingPrice = parseFloat(glazingOptions[glazingSelect.value]);
  const packPrice = parseInt(sizeSelect.value);

  if (!isNaN(glazingPrice) && !isNaN(packPrice)) {
    const totalPrice = (basePrice + glazingPrice) * packPrice;
    priceDisplay.textContent = `$${totalPrice.toFixed(2)}`;
  } else {
    priceDisplay.textContent = "$0.00";
  }
}

class Roll {
  constructor(rollType, rollGlazing, packSize, basePrice) {
    this.type = rollType;
    this.glazing = rollGlazing;
    this.size = packSize;
    this.basePrice = basePrice;
    this.calculatePrice();
  }

  calculatePrice() {
    const glazingPrice = glazingOptions[this.glazing] || 0;
    const packPrice = packSizeOptions[this.size] || 1;
    this.itemPrice = (this.basePrice + glazingPrice) * packPrice;
  }
}

function populateDropdownOptions() {
  const glazingSelect = document.getElementById("glazingOptions");
  const sizeSelect = document.getElementById("sizeOptions");

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
    sizeSelect.appendChild(option);
  }
}

if (currentPage.includes('detail.html')) {
  let rollType; // Declare rollType variable
  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);
  rollType = params.get('roll') || "Original"; // Assign a value to rollType

  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  if (!cart) {
    cart = [];
  }

  const buttonElement = document.getElementById("addToCartButton");

  if (buttonElement) {
    buttonElement.addEventListener("click", addToCart);
  }

  function addToCart() {
    const glazingSelect = document.getElementById("glazingOptions");
    const sizeSelect = document.getElementById("sizeOptions");
    const rollTypeElement = document.getElementById('rollTitle');
    console.log("Updated Cart:", cart);

    if (glazingSelect && sizeSelect && rollTypeElement) {
      const selectedRollType = rollTypeElement.textContent.split(' ')[0];
      const selectedGlazing = glazingSelect.value;
      const selectedSize = sizeSelect.value;
      const rollInfo = rollsData[selectedRollType];
      const basePrice = rollInfo.basePrice;
      const roll = new Roll(selectedRollType, selectedGlazing, selectedSize, basePrice);
      roll.calculatePrice();
      cart.push(roll);
      localStorage.setItem('cart', JSON.stringify(cart));
      glazingSelect.value = 'Keep original';
      sizeSelect.value = '1';
    } else {
      console.error("Elements not selected correctly.");
    }
  }

  const rollInfo = rollsData[rollType];
  const imagePath = `../assets/products/${rollInfo.imageFile}`;

  document.getElementById('rollTitle').textContent = `${rollType} Cinnamon Roll`;
  document.getElementById('rollImage').src = imagePath;
  populateDropdownOptions();
  updatePrice();
}

if (currentPage.includes('cart.html')) {
  // Initialize the cart from local storage
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  if (!cart) {
    cart = [];
  }

  function updateCartDisplay() {
    const cartList = document.getElementById("cartList");
    const totalPriceDisplay = document.getElementById("totalPrice");

    if (cartList && totalPriceDisplay) {
      cartList.innerHTML = "";

      let totalCartPrice = 0;

      // Iterate through items in the cart
      for (const item of cart) {
        const itemInfo = rollsData[item.type];
        const imagePath = `../assets/products/${itemInfo.imageFile}`;

        // Create elements for the cart item
        const cartItem = document.createElement("li");
        const itemImage = document.createElement("img");
        const itemDescription = document.createElement("span");
        const itemPrice = document.createElement("span");
        const removeButton = document.createElement("a");

        itemImage.src = imagePath;
        itemDescription.textContent = `${item.type} - Glazing: ${item.glazing}, Pack Size: ${item.size}`;
        itemPrice.textContent = `$${item.itemPrice.toFixed(2)}`;
        removeButton.textContent = "Remove";
        removeButton.href = "#"; // For appearance, not functional

        // Calculate total cart price
        totalCartPrice += item.itemPrice;

        // Add a click event to remove the item
        removeButton.addEventListener("click", () => {
          removeItemFromCart(item);
          updateCartDisplay(); // Update the cart display after removing
          updateLocalStorage(); // Update local storage after removing
        });

        // Append elements to the cart list
        cartItem.appendChild(itemImage);
        cartItem.appendChild(itemDescription);
        cartItem.appendChild(itemPrice);
        cartItem.appendChild(removeButton);
        cartList.appendChild(cartItem);
      }

      // Display the total cart price
      totalPriceDisplay.textContent = `$${totalCartPrice.toFixed(2)}`;
    }
  }

  // Function to remove an item from the cart
  function removeItemFromCart(item) {
    const itemIndex = cart.findIndex((cartItem) => {
      return (
        cartItem.type === item.type &&
        cartItem.glazing === item.glazing &&
        cartItem.size === item.size
      );
    });

    if (itemIndex !== -1) {
      cart.splice(itemIndex, 1);
    }
  }

  // Function to update local storage with the current cart
  function updateLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
    // Print the updated cart in local storage
    console.log(JSON.parse(localStorage.getItem('cart')));
  }

  // Initialize cart display
  updateCartDisplay();
}

window.addEventListener('load', () => {
  if (currentPage.includes('cart.html')) {
    updateCartDisplay();
  }
});
