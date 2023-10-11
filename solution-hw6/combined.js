document.addEventListener('DOMContentLoaded', function () {

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

  const cart = [];

  class Roll {
    constructor(rollType, rollGlazing, packSize) {
      this.type = rollType;
      this.glazing = rollGlazing;
      this.size = packSize;
      this.basePrice = rollsData[rollType].basePrice;
      this.calculatePrice();
    }

    calculatePrice() {
      const glazingOptions = {
        'Keep original': 0.00,
        'Sugar milk': 0.00,
        'Vanilla milk': 0.50,
        'Double Chocolate': 1.50,
      };

      const glazingPrice = glazingOptions[this.glazing] || 0;
      const packSizeOptions = {
        '1': 1,
        '3': 3,
        '6': 5,
        '12': 10,
      };
      const packPrice = packSizeOptions[this.size] || 0;

      this.itemPrice = (this.basePrice + glazingPrice) * packPrice;
    }
  }

  function updateTotalPrice() {
    let totalPrice = 0;
    for (const roll of cart) {
      totalPrice += roll.itemPrice;
    }

    const totalPriceField = document.getElementById('total-price');
    totalPriceField.textContent = `Total: $${totalPrice.toFixed(2)}`;
  }

  updateTotalPrice();

  function displayCartItem(roll) {
    const cartItem = document.createElement('div');
    cartItem.className = 'item';

    const rollImage = document.createElement('img');
    rollImage.className = 'products';
    rollImage.src = `../assets/products/${rollsData[roll.type].imageFile}`;
    rollImage.alt = roll.type;

    const rollDetails = document.createElement('div');
    rollDetails.className = 'pic';

    const nameParagraph = document.createElement('p');
    nameParagraph.textContent = `${roll.type} Cinnamon Roll`;

    const glazingParagraph = document.createElement('p');
    glazingParagraph.textContent = `Glazing: ${roll.glazing}`;

    const packSizeParagraph = document.createElement('p');
    packSizeParagraph.textContent = `Pack Size: ${roll.size}`;

    const priceParagraph = document.createElement('p');
    priceParagraph.textContent = `Price: $${roll.itemPrice.toFixed(2)}`;
    priceParagraph.className = 'price';

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.className = 'remove-button';    removeButton.addEventListener('click', () => {
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

  function removeItemFromCart(roll) {
    const index = cart.indexOf(roll);

    if (index !== -1) {
      cart.splice(index, 1);
    }
  }
});
