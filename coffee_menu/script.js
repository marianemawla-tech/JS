const menu = [
  { name: 'Espresso', price: 3.0 },
  { name: 'Latte', price: 4.5 },
  { name: 'Mocha', price: 5.0 },
  { name: 'Muffin', price: 2.5 }
];
let cart = [];

const menuList = document.querySelector('#menu-list');
const cartList = document.querySelector('#cart-list');

// Create the menu rows and their Add buttons from JavaScript.
function renderMenu() {
  menuList.replaceChildren();
  menu.forEach((item, index) => {
    const li = document.createElement('li');
    const label = document.createElement('span');
    label.textContent = `${item.name} — $${item.price.toFixed(2)}`;
    const button = document.createElement('button');
    button.textContent = 'Add';
    button.dataset.index = String(index);
    li.append(label, button);
    menuList.appendChild(li);
  });
}

// Show cart entries and refresh the item count and total.
function renderCart() {
  cartList.replaceChildren();
  if (cart.length === 0) {
    const empty = document.createElement('li');
    empty.textContent = 'Your cart is empty.';
    empty.className = 'empty';
    cartList.appendChild(empty);
  }

  
  // Bonus: group repeated items and display quantity controls.
  const grouped = [];
  cart.forEach(item => {
    const existing = grouped.find(entry => entry.item === item);
    if (existing) existing.quantity++;
    else grouped.push({ item, quantity: 1 });
  });

  grouped.forEach(entry => {
    const li = document.createElement('li');
    const label = document.createElement('span');
    label.textContent = `${entry.item.name} ×${entry.quantity} — $${(entry.item.price * entry.quantity).toFixed(2)}`;
    const controls = document.createElement('div');
    controls.className = 'item-actions';
    const index = cart.indexOf(entry.item);
    
    ['+', '−', 'Remove'].forEach(action => {
      const button = document.createElement('button');
      button.textContent = action;
      button.className = 'secondary';
      button.dataset.index = String(index);
      button.dataset.action = action;
      controls.appendChild(button);
    });
    li.append(label, controls);
    cartList.appendChild(li);
  });
  document.querySelector('#cart-count').textContent = String(cart.length);
  updateTotal();
}




// Sum cart prices and toggle the free-cookie reward above $15.
function updateTotal() {
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const totalElement = document.querySelector('#cart-total');
  totalElement.textContent = total.toFixed(2);
  totalElement.style.color = total > 15 ? 'red' : '';
  document.querySelector('#reward-msg').classList.toggle('hidden', total <= 15);
}

// Validate a new menu item and add it if its name and price are valid.
function addCustomItem() {
  const nameInput = document.querySelector('#item-name');
  const priceInput = document.querySelector('#item-price');
  const error = document.querySelector('#error-msg');
  const name = nameInput.value.trim();
  const rawPrice = priceInput.value.trim();
  const price = Number(rawPrice);
  if (!name) { error.textContent = 'Name is required.'; return; }
  if (!rawPrice || !Number.isFinite(price) || price <= 0) { error.textContent = 'Price must be a positive number.'; return; }
  if (menu.some(item => item.name.toLowerCase() === name.toLowerCase())) {
    error.textContent = 'This item is already on the menu.';
    return;
  }
  menu.push({ name, price });
  renderMenu();
  nameInput.value = '';
  priceInput.value = '';
  error.textContent = '';
}

// Add a clicked menu item to the cart using event delegation.
menuList.addEventListener('click', event => {
  const button = event.target.closest('button[data-index]');
  if (!button || !menuList.contains(button)) return;
  cart.push(menu[Number(button.dataset.index)]);
  renderCart();
});

// Change or remove a single cart entry using one delegated listener.
cartList.addEventListener('click', event => {
  const button = event.target.closest('button[data-index]');
  if (!button || !cartList.contains(button)) return;
  const index = Number(button.dataset.index);
  if (button.dataset.action === '+') cart.push(cart[index]);
  else if (button.dataset.action === '−' || button.dataset.action === 'Remove') cart.splice(index, 1);
  renderCart();
});

document.querySelector('#add-custom-btn').addEventListener('click', addCustomItem);
document.querySelector('#clear-cart-btn').addEventListener('click', () => {
  cart = [];
  renderCart();
});
renderMenu();
renderCart();
