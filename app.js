const output_div = document.querySelector(".products-center");
const products_div = document.querySelector(".products");
const iconBars = document.getElementById("icon-bars")
const addCartButtons = document.querySelector(".add-cart");
let output = "";
let products = ""; 

async function getJson() {
    let response = await fetch("http://localhost:3000/api/furniture");
    let data = await response.json();
    return data;
}

// index page

async function showFurniture() {
    data = await getJson();
    data.forEach(function(furniture) {
        output += `
        <article class="product">
            <h3 class="furniture-name">${furniture.name}</h3>
            <div class="img-container">
                <img src ="${furniture.imageUrl}">
            </div>
        </article>
        `
    });
    output_div.innerHTML = output;
}

showFurniture();

// products page

async function showProducts() {
    data = await getJson();
    let furnitureVarnish = '';
    data.forEach(function(furniture) {
        furniture.varnish.forEach(function(varnish) {
            furnitureVarnish += `<button class="varnish-btn">${varnish}</button>`
        });
        furniture.price = furniture.price/100;
        products += `
        <article class="product">
            <div class="left-container">
                <h3>${furniture.name}</h3>
                <p>£${furniture.price}</p>
                <div class="img-container">
                    <img src="${furniture.imageUrl}" alt="furniture">
                </div> 
            </div>
            <div class="right-container">
                <p class="varnish-selection">choose a varnish</p>
                <div class="varnish-buttons">
                    ${furnitureVarnish}
                </div>
                <button class="add-cart">add to cart</button>
            </div>
        </article>
        `;
    furnitureVarnish = '';
    });
    products_div.innerHTML = products;
}

showProducts();


// function logFurniture() {
//     let data = getJson();
//     console.log(data);
// }

// logFurniture();

// iconBars.addEventListener