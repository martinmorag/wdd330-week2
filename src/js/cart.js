import { setLocalStorage, getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <span class="remove-item" data-id="${item.Id}">X</span>
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>

</li>`;

  return newItem;
}

renderCartContents();

// Add event listener to each X icon
document.querySelectorAll('.remove-item').forEach(item => {
  item.addEventListener('click', () => {
    const itemId = item.dataset.id;
    let cartItems = getLocalStorage("so-cart");
    
    // Remove item from cartItems array based on itemId
    cartItems = cartItems.filter(cartItem => cartItem.Id !== itemId);
    
    // Update localStorage with updated cartItems
    setLocalStorage("so-cart", cartItems);
    
    // Re-render cart contents
    renderCartContents();
  });
});