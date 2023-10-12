
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

      const glazingPrice = parseFloat(glazingOptions[glazingSelect.value]);
      const packPrice = parseInt(sizeSelect.value);

      const selectedRollType = document.getElementById('rollTitle').textContent.split(' ')[0];

      const rollInfo = rollsData[selectedRollType]; // Get roll info
      const basePrice = rollInfo.basePrice; // Use the base price 

      if (!isNaN(glazingPrice) && !isNaN(packPrice)) {
        const totalPrice = (basePrice + glazingPrice) * packPrice;
        priceDisplay.textContent = `$${totalPrice.toFixed(2)}`;
      } else {
        priceDisplay.textContent = "$0.00";
      }
    }

    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const rollType = params.get('roll');
    if (rollType == null) {
      rollType = "Original";
    }

    const cart = []; // Initialize an empty cart array

    // ...

    function addToCart() {
      const glazingSelect = document.getElementById("glazingOptions");
      const sizeSelect = document.getElementById("sizeOptions");

      const selectedRollType = document.getElementById('rollTitle').textContent.split(' ')[0]; // Extract the roll type from the title
      const selectedGlazing = glazingSelect.value;
      const selectedSize = sizeSelect.value;

      const rollInfo = rollsData[selectedRollType]; // Get roll info based on the selected roll type
      const basePrice = rollInfo.basePrice; // Use the base price from the selected roll type

      // Create an instance of the Roll class and add it to the cart array
      const roll = new Roll(selectedRollType, selectedGlazing, selectedSize, basePrice);
      cart.push(roll);

      // Print the entire cart array to the console
      console.log("Cart:", cart);
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
        rollImage.className = 'products';
        rollImage.src = `../assets/products/${rollsData[roll.type].imageFile}`;
        rollImage.alt = roll.type;
      
        // roll detail
        const rollDetails = document.createElement('div');
        rollDetails.className = 'pic';
      
        // create paragraphs
        const nameParagraph = document.createElement('p');
        nameParagraph.textContent = `${roll.type} Cinnamon Roll`;
      
        const glazingParagraph = document.createElement('p');
        glazingParagraph.textContent = `Glazing: ${roll.glazing}`;
      
        const packSizeParagraph = document.createElement('p');
        packSizeParagraph.textContent = `Pack Size: ${roll.size}`;
      
        // Price display
        const priceParagraph = document.createElement('p');
        priceParagraph.textContent = `Price: $${roll.itemPrice.toFixed(2)}`;
        priceParagraph.className = 'price';
      
        // remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-botton';
      
        removeButton.addEventListener('click', () => {
          removeItemFromCart(roll);
          cartItem.remove();
          updateTotalPrice();
        });
      
        rollDetails.appendChild(nameParagraph);
        rollDetails.appendChild(glazingParagraph);
        rollDetails.appendChild(packSizeParagraph);
        rollDetails.appendChild(priceParagraph); // Append the price paragraph
      
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
    }