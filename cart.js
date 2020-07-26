const cart = document.querySelector('.shopping-cart'); 
const cartTotal = document.querySelector('.cart-total'); 

const cartInformation = { // array vide pour contact et product
    contact: {},
    products: []
}

let totalPrice = 0;


// Rechercher les éléments du localStorage
const getCart = async (index) => {
    return await JSON.parse(localStorage.getItem(localStorage.key(index)))
}

// Montrer les produits du cart
const displayCart = async () => {
    if(localStorage.length > 0) { 
        for (let i = 0; i < localStorage.length; i++) { // loop chaque objet dans storage
        const product = await getCart(i) // prend un objet du cart
        const furnitureId = product.id; 
        const furnitureName = product.name; 
        const furniturePrice = product.price / 100; 
        const furnitureVarnish = product.varnish; 
        cartInformation.products.push(furnitureId); // push produit vers cartInformation

        renderCart(furnitureName, furniturePrice, furnitureVarnish) // le produit apparait

        const remove = document.querySelectorAll('.remove')[i]; 
        const article = document.querySelectorAll('article')[i];

        deleteCart(remove, article, furnitureName) 
        }
    } else {
        cart.textContent = 'Votre panier est vide.';
        form.classList.add('invisible')
    }   
}

const renderCart = (productName, productPrice, varnish) => {
    // Montre les produits dans le cart
    const article = document.createElement('article');
    article.innerHTML = `
    <div class="product-information">
    <p class="product-title">${productName}</p>
    <p>${varnish}</p>
    <p class="price">${productPrice} €</p>
    <div class="remove"><button class="site-btn btn-line">Supprimer</button></div>
    </div>`
    cart.insertBefore(article, cartTotal); // article affiché avant cart total
    
    totalPrice += productPrice; //crée le prix total
    cartTotal.textContent = `Total : ${totalPrice}€`; 
}
// supprimer les éléments du cart
const deleteCart = (removeElt, container, productName) => {
    removeElt.addEventListener('click', async () => {
        await localStorage.removeItem(productName);// supprime du local storage
        container.remove(); // supprime du dom
        location.reload(true); // recharge la page
    })
}
displayCart();

// formulaire
const form = document.querySelector('form');

const containNumber = /[0-9]/;
const regexEmail = /.+@.+\..+/;
const specialCharacter = /[$&+,:;=?@#|'<>.^*()%!"{}_"]/;

const isNotEmpty = value => value !== "" ? true : false; // Vérifie que ce n'est pas vide
const isLongEnough = value => value.length >= 2 ? true : false; // assez de caractère ? 
const doNotContainNumber = value => !value.match(containNumber) ? true : false; // pas de chiffre
const doNotContainSpecialCharacter = value => !value.match(specialCharacter) ? true : false; // pas de caractère spéciaux
const isValidEmail = (value) => value.match(regexEmail) ? true : false; // Bon format
const isValidInput = (value) => isNotEmpty(value) && isLongEnough(value) && doNotContainNumber(value) && doNotContainSpecialCharacter(value);// renvoie true si toutes les conditions sont vérifiées

const name = form.elements.name;
const email = form.elements.email;
const phone = form.elements.phone;
const address = form.elements.address;
const btn = document.querySelector(".btn-send-cart-form");

const nameErrorMessage = document.getElementById('nameErrorMessage');
const emailErrorMessage = document.getElementById('emailErrorMessage');
const phoneErrorMessage = document.getElementById('phoneErrorMessage');
const addressErrorMessage = document.getElementById('addressErrorMessage');

function formValidate() {
    if (isValidInput(name.value)) { 
        nameErrorMessage.textContent = ""; 

    } else {
        nameErrorMessage.textContent = "Veuillez renseigner votre prénom"
        name.focus();
        return false;
    }

    if(isNotEmpty(address.value) && isLongEnough(address.value)) {
        addressErrorMessage.textContent = "";

    } else {
        addressErrorMessage.textContent = "Veuillez renseigner votre adresse"
        address.focus();
        return false;
    }

    if (isValidEmail(email.value)) {
        emailErrorMessage.textContent = "";

    } else {
        emailErrorMessage.textContent = "Veuillez renseigner une adresse e-mail valide"
        email.focus();
        return false;
    }

    return cartInformation.contact = {
        name: name.value,
        email: email.value,
        address: address.value,
        phone: phone.value,
    }
};

const postData = async (method, url, dataElt) => {
    const response = await fetch(url, {
        headers: {
            'Content-Type' : 'application/json'
        },
        method,
        body: JSON.stringify(dataElt)
    })
    return await response.json();
}

btn.addEventListener("click", async (event) => {
    event.preventDefault(); 
    const validForm = formValidate(); // Validates form
    if (validForm !== false ) {
        const response = await postData('POST', 'http://localhost:3000/api/teddies/order', cartInformation); // Sends data to server    
        window.location = `checkout.html?id=${response.orderId}&price=${totalPrice}&user=${firstName.value}`; // Sends to checkout page
    }
})