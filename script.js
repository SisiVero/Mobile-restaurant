const menuArray = [
  {
    name: "Pizza",
    ingredients: ["pepperoni", "mushrom", "mozarella"],
    id: 0,
    price: 50,
    emoji: "🍕"
  },
  {
    name: "Hamburger",
    ingredients: ["beef", "cheese", "lettuce"],
    price: 20,
    emoji: "🍔",
    id: 1
  },
  {
    name: "Beer",
    ingredients: ["grain, hops, yeast, water"],
    price: 15,
    emoji: "🍺",
    id: 2
  }
];

const menuHtml = document.getElementById("container");
const ordersContainer = document.getElementById("orders-div");
const payForm = document.getElementById("payment-form");
let orderList = [];

payForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const cardDetailsForm = new FormData(payForm);
  const buyerName = cardDetailsForm.get("name");
  document.getElementById("order-msg").innerHTML = `Thanks, ${buyerName
    .charAt(0)
    .toUpperCase()}${buyerName.slice(1)}! Your order is on the way!`;
  document.getElementById("order-msg").style.display = "block";
  document.getElementById("payment-form").style.display = "none";
  document.getElementById("name").value = ``;
  document.getElementById("card-number").value = ``;
  document.getElementById("card-cvv").value = ``;
  orderList.splice(0, orderList.length);
  ordersContainer.innerHTML = ``;
});

document.addEventListener("click", function (e) {
  if (e.target.dataset.add) {
    orderBtn(e.target.dataset.add);
    renderOrdersHtml();
  }
   else if (e.target.dataset.remove) {
    handleRemoveBtn(e.target.dataset.remove);
  }else if (e.target.id === "complete-btn") {
    document.getElementById("payment-form").style.display = "block";
  }
});

function orderBtn(order) {
  const orderItem = menuArray.filter(function (menu) {
    return menu.id == order;
  })[0];
  orderList.push(orderItem);
  generateOrdersHtml();
  renderOrdersHtml();
}

function handleRemoveBtn(index) {
  orderList.splice(index, 1);
  renderOrdersHtml();

  if (orderList.length === 0) {
    ordersContainer.innerHTML = ``;
  }
}

menuArray.forEach(function (menu) {
  menuHtml.innerHTML += `
    <div class="menu-container">
    <div class="food-img">
    ${menu.emoji}
    </div>
    <div class="food-details">
    <p class="food">${menu.name}</p>
    <p class="ingredients">${menu.ingredients}</p>
    <p class="price">$${menu.price}</p>
    </div>
    <button id="add-btn" data-add="${menu.id}"> + </button> 
    </div>`;
});

function generateOrdersHtml() {
  let totalPrice = 0;
  let orders = ``;
  orderList.forEach(function (menu) {
    orders += `
                      <div id="ordered-items">
                      <span id="food">${menu.name}</span>
                      <span id="${menu.id}" class="remove" data-remove="remove-btn"> remove </span>
                      <span id="food-price">$${menu.price}</span>                    
                     </div>
                     `;
    totalPrice += menu.price;
  });
  document.getElementById("total").textContent = `$${totalPrice}`;
  return orders;
}

function hideAndShowEl(ordered) {
  const orderedFood = document.querySelector(".orders-div");
  if ((ordered === 1) & orderedFood.classList.contains("hidden")) {
    orderedFood.classList.remove("hidden");
  } else if (ordered == 0) {
    orderedFood.classList.add("hidden");
  }
}

function renderOrdersHtml() {
  if (orderList.length > 0) {
    hideAndShowEl(1);
    document.querySelector(".cart-details").innerHTML = generateOrdersHtml();
  }
}