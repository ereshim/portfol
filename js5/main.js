// local storage start
function inintStorage() {
  if (!localStorage.getItem("products-data")) {
    localStorage.setItem("products-data", "[]");
  }
}
function setProductsToStorage(products) {
  localStorage.setItem("products-data", JSON.stringify(products));
}

function getProductsFromStorage() {
  let products = JSON.parse(localStorage.getItem("products-data"));
  return products;
}
// local storage end

let db = [];
function render() {
  let container = document.querySelector(".container");
  container.innerHTML = "";
  let data = getProductsFromStorage();
  console.log(data);
  data.forEach((item, index) => {
    container.innerHTML += `
<div class="card" style="width: 18rem;" id="${index}">
        <img src="${item.url}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${item.title}</h5>
          <p class="card-text">${item.price}$</p>
          <a href="#" class="btn btn-danger" id="delete-product-btn">Delete</a>
        </div>
      </div>

`;
  });
  if (data.length === 0) return;
  addDeleteEvent();
}
render();
// create
function createProduct() {
  let imgInp = document.querySelector("#product-url-input");
  let titleInp = document.querySelector("#product-title-input");
  let priceInp = document.querySelector("#product-price-input");
  let productObj = {
    url: imgInp.value,
    title: titleInp.value,
    price: priceInp.value,
  };
  console.log(productObj);
  //   db.push(productObj);
  let products = getProductsFromStorage();
  products.push(productObj);
  setProductsToStorage(products);

  imgInp.value = "";
  titleInp.value = "";
  priceInp.value = "";

  render();
}
let addProductBtn = document.querySelector("#add-product-btn");
addProductBtn.addEventListener("click", createProduct);
// delete
function deleteProduct(e) {
  let productId = e.target.parentNode.parentNode.id;
  
//   db.splice(productId, 1);
let products = getProductsFromStorage();
products.splice(productId, 1);
setProductsToStorage(products);
  render();
}

function addDeleteEvent() {
  let deleteBtns = document.querySelectorAll("#delete-product-btn");
  deleteBtns.forEach((item) => item.addEventListener("click", deleteProduct));
}
