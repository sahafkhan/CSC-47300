const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});

const heroSlides = document.querySelectorAll(".hero-slide");
const heroDots = document.querySelectorAll(".hero-dot");
let currentHeroSlide = 0;

function showHeroSlide(index) {
  heroSlides.forEach(slide => slide.classList.remove("active"));
  heroDots.forEach(dot => dot.classList.remove("active"));

  heroSlides[index].classList.add("active");
  heroDots[index].classList.add("active");
  currentHeroSlide = index;
}

heroDots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    showHeroSlide(index);
  });
});

setInterval(() => {
  const nextHeroSlide = (currentHeroSlide + 1) % heroSlides.length;
  showHeroSlide(nextHeroSlide);
}, 4500);

const slides = document.querySelectorAll(".slide");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
let currentSlide = 0;

function showSlide(index) {
  slides.forEach(slide => slide.classList.remove("active"));
  slides[index].classList.add("active");
}

nextBtn.addEventListener("click", () => {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
});

prevBtn.addEventListener("click", () => {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
});

setInterval(() => {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}, 4000);

const cartItemsContainer = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const clearCartBtn = document.getElementById("clearCart");
const addButtons = document.querySelectorAll(".add-btn");

let cart = [];

addButtons.forEach(button => {
  button.addEventListener("click", () => {
    const card = button.closest(".menu-card");
    const name = card.dataset.name;
    const price = Number(card.dataset.price);

    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push({ name, price, quantity: 1 });
    }

    updateCart();
  });
});

function updateCart() {
  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty.</p>';
    cartTotal.textContent = "$0";
    return;
  }

  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";

    cartItem.innerHTML = `
      <div class="cart-item-top">
        <strong>${item.name}</strong>
        <span>$${item.price * item.quantity}</span>
      </div>
      <div class="cart-controls">
        <button class="qty-btn" onclick="decreaseQty(${index})">-</button>
        <span>${item.quantity}</span>
        <button class="qty-btn" onclick="increaseQty(${index})">+</button>
        <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
      </div>
    `;

    cartItemsContainer.appendChild(cartItem);
  });

  cartTotal.textContent = `$${total}`;
}

function increaseQty(index) {
  cart[index].quantity++;
  updateCart();
}

function decreaseQty(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity--;
  } else {
    cart.splice(index, 1);
  }
  updateCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  updateCart();
}

clearCartBtn.addEventListener("click", () => {
  cart = [];
  updateCart();
});

document.querySelector(".contact-form").addEventListener("submit", event => {
  event.preventDefault();
  alert("Thank you! Your message has been received.");
  event.target.reset();
});
