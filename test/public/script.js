// Function to fetch candies from the server
async function fetchCandies() {
  const response = await fetch('/api/candies');
  const candies = await response.json();
  return candies;
}

// Function to buy a candy
async function buyCandy(candyId, quantity) {
  const response = await fetch('/api/buy', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ candyId, quantity }),
  });
  const result = await response.json();
  return result;
}

// Function to add a new candy
async function addCandy() {
  const candyname = document.getElementById('candyname').value;
  const description = document.getElementById('description').value;
  const price = parseFloat(document.getElementById('price').value);
  const quantity = parseInt(document.getElementById('quantity').value, 10);

  const newCandy = { candyname, description, price, quantity };

  try {
    const response = await fetch('/api/add-candy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCandy),
    });

    if (response.ok) {
      clearInputFields();
      renderCandies();
    } else {
      console.error('Failed to add candy');
    }
  } catch (error) {
    console.error(error);
  }
}

// Function to clear input fields
function clearInputFields() {
  document.getElementById('candyname').value = '';
  document.getElementById('description').value = '';
  document.getElementById('price').value = '';
  document.getElementById('quantity').value = '';
}

// Function to render the list of candies
async function renderCandies() {
  const candies = await fetchCandies();
  const candyList = document.getElementById('candy-list');
  candyList.innerHTML = '';

  candies.forEach(candy => {
    const card = createCandyCard(candy);
    candyList.appendChild(card);
  });

  // Attach buy button listeners after rendering
  attachBuyButtonListeners();
}

// Function to create a candy card
function createCandyCard(candy) {
  console.log('Candy price:', candy.price); // Log the price value

  const card = document.createElement('div');
  card.className = 'candy-card';

  // Check if candy.price is a valid number or not
  const priceDisplay = typeof candy.price === 'number'
    ? `$${candy.price.toFixed(2)}`
    : 'N/A';

  card.innerHTML = `
    <h3>${candy.candyname}</h3>
    <p>${candy.description}</p>
    <p>Price: ${priceDisplay}</p>
    <p>Quantity: ${candy.quantity}</p>
    <button class="buy-button" data-candy-id="${candy.id}" data-quantity="1">Buy One</button>
    <button class="buy-button" data-candy-id="${candy.id}" data-quantity="2">Buy Two</button>
    <button class="buy-button" data-candy-id="${candy.id}" data-quantity="3">Buy Three</button>
  `;
  return card;
}






// Function to attach buy button listeners
function attachBuyButtonListeners() {
  const buyButtons = document.querySelectorAll('.buy-button');
  buyButtons.forEach(button => {
    button.addEventListener('click', handleBuyClick);
  });
}

// Function to handle buy button click
async function handleBuyClick(event) {
  const candyId = event.target.getAttribute('data-candy-id');
  const quantity = parseInt(event.target.getAttribute('data-quantity'), 10);

  try {
    const result = await buyCandy(candyId, quantity);
    console.log(result);
    renderCandies();
  } catch (error) {
    console.error(error);
  }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
  renderCandies();
});
