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
      // get rolls base price
      const basePrice = rollsData[this.type].basePrice;
      
      // glazing price, default to zero 
      const glazingPrice = rollsData[this.type].glazingPrice || 0;
      
      // pack size import 
      const packPrice = this.size;
    
      // actual price calculation 
      this.itemPrice = (basePrice + glazingPrice) * packPrice;
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
    cartItem.className = 'item';
  
    // image element
    const rollImage = document.createElement('img');
    rollImage.className = 'prod';
    rollImage.src = `../assets/products/${rollsData[roll.type].imageFile}`;
    rollImage.alt = roll.type;
  
    // roll detail
    const rollDetails = document.createElement('div');
    rollDetails.className = 'pic';
  
    // create paragraphs
    const nameParagraph = document.createElement('p');
    nameParagraph.textContent = roll.type;
  
    const glazingParagraph = document.createElement('p');
    glazingParagraph.textContent = `Glazing: ${roll.glazing}`;
  
    const packSizeParagraph = document.createElement('p');
    packSizeParagraph.textContent = `Pack Size: ${roll.size}`;
  
    // remove button
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.className = 'button';
  
    removeButton.addEventListener('click', () => {
        removeItemFromCart(roll);
        cartItem.remove(); // Remove the DOM element for the cart item
        updateTotalPrice(); // Update the total price after removal
    });
  
    rollDetails.appendChild(nameParagraph);
    rollDetails.appendChild(glazingParagraph);
    rollDetails.appendChild(packSizeParagraph);
  
    cartItem.appendChild(rollImage);
    cartItem.appendChild(rollDetails);
    cartItem.appendChild(removeButton);
  
    const cartContainer = document.getElementById('cart-container');
    cartContainer.appendChild(cartItem);
  }
  
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
