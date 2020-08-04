const url = "http://localhost:3000/api/furniture/";
const parameters = new URLSearchParams(window.location.search);
const id = parameters.get("id");
const section = document.querySelector(".products-product");



async function getSingleProduct(productUrl, productId) {
    try {
        let response = await fetch(productUrl + productId);
        let data = await response.json();
        return data
    }
    catch(error) {
        console.log(error);    
    }
};

async function displayFurniture() {
    const data = await getSingleProduct(url, id);
    renderProduct(data);
    chooseVarnish(section, data.varnish);
    addToCart(section, data)
}

function renderProduct(product) {
    section.innerHTML = `
    <h2 class="furniture-name">${product.name}</h2>
        <div class="product-container">
            <div class="img-container">
                <img src="${product.imageUrl}" alt="cross table big">
            </div>
            <div class="product-information">
                <p class="description">${product.description}</p>
                <p class="price">£${product.price / 100}</p>
                <div class="dropdown"> 
                </div>
            </div>
        </div>
    `;
};

function chooseVarnish(parentElt, varnishList) {
    // création de la liste déroulante
    const label = document.createElement("label");
    const select = document.createElement("select");

    label.setAttribute("for", "varnish");
    label.textContent = "Select a varnish : ";
    select.id = "varnish";

    parentElt.appendChild(label).appendChild(select);

    // création d'une entrée pour chaque vernis
    varnishList.forEach((varnish) => {
        const option = document.createElement('option');
        option.value = varnish;
        option.textContent = varnish;
        select.appendChild(option);
    });

    // récupération du vernis dans la console
    select.addEventListener("change", (event) => {
        chosenVarnish = event.target.value;
    });
};

// ajoute le produit au panier
function addToCart(parentElt, furnitureData) {
    // création du bouton d'envoi 
    const addCartBtn = document.createElement("button");
    const addCartDiv = document.createElement("div");
    addCartBtn.textContent = "add to cart";
    addCartBtn.classList.add("add-cart-btn");
    addCartDiv.classList.add("button-container");
    parentElt.appendChild(addCartDiv).appendChild(addCartBtn);


    let varnish = document.getElementById("varnish").value;
    let selectedVarnish = [varnish];
    const furniture = {
        id: furnitureData._id,
        name: furnitureData.name,
        price: furnitureData.price,
        imageUrl: furnitureData.imageUrl,
        varnish: selectedVarnish,
        quantity: 1,
    };
    
    addCartBtn.addEventListener('click', () => {
        localStorage.setItem(furnitureData.name, JSON.stringify(furniture));
        addCartBtn.classList.add("invisible");
        addCartDiv.textContent = "product was added to cart."
    });
};

displayFurniture();