document.addEventListener('DOMContentLoaded', function () {

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
  const cart = [];

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
      const glazingPrice = glazingOptions[this.glazing] || 0; // get glazing price
      const packPrice = packSizeOptions[this.size] || 1; // get pack size price

      this.itemPrice = (this.basePrice + glazingPrice) * packPrice;
    }
  }

  // Create Roll objects
  const originalRoll = new Roll("Original", "Sugar Milk", 1, 2.49);
  const walnutRoll = new Roll("Walnut", "Vanilla Milk", 12, 39.90);
  const raisinRoll = new Roll("Raisin", "Sugar Milk", 3, 8.97);
  const appleRoll = new Roll("Apple", "Original", 3, 10.47);

  // add items to cart
  cart.push(originalRoll, walnutRoll, raisinRoll, appleRoll);

  // display cart items
  function displayCartItem(roll) {
    // container
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';

    // image element
    const rollImage = document.createElement('img');
    rollImage.className = 'cart-item-image';
    rollImage.src = `../assets/products/${rollsData[roll.type].imageFile}`;
    rollImage.alt = roll.type;

    // roll detail
    const rollDetails = document.createElement('div');
    rollDetails.className = 'cart-item-details';

    // create paragraphs
    const nameParagraph = document.createElement('p');
    nameParagraph.textContent = `Name: ${roll.type}`;

    const glazingParagraph = document.createElement('p');
    glazingParagraph.textContent = `Glazing: ${roll.glazing}`;

    const packSizeParagraph = document.createElement('p');
    packSizeParagraph.textContent = `Pack Size: ${roll.size}`;

    const priceParagraph = document.createElement('p');
    priceParagraph.textContent = `Price: $${roll.itemPrice.toFixed(2)}`;

    // remove button
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.className = 'remove-button';
    removeButton.dataset.rollType = roll.type; 

    removeButton.addEventListener('click', () => {
        removeItemFromCart(roll);
        cartItem.remove(); 
        updateTotalPrice(); 
    });

    rollDetails.appendChild(nameParagraph);
    rollDetails.appendChild(glazingParagraph);
    rollDetails.appendChild(packSizeParagraph);
    rollDetails.appendChild(priceParagraph);

    cartItem.appendChild(rollImage);
    cartItem.appendChild(rollDetails);
    cartItem.appendChild(removeButton);

    const cartContainer = document.getElementById('cart-container');
    cartContainer.appendChild(cartItem);
  }

  // looping
  cart.forEach(displayCartItem);

  function removeItemFromCart(roll) {
    const index = cart.indexOf(roll);

    if (index !== -1) {
        cart.splice(index, 1); 
    }
  }

  function updateTotalPrice() {
    let totalPrice = 0;
    for (const roll of cart) {
        totalPrice += roll.itemPrice;
    }

    // update actual price
    const totalPriceField = document.getElementById('total-price');
    totalPriceField.textContent = `Total: $${totalPrice.toFixed(2)}`;
  }

  updateTotalPrice();
});
