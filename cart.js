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
        let furnitureQuantity = product.quantity;
        cartInformation.products.push(furnitureId); // push produit vers cartInformation

        renderCart(furnitureName, furniturePrice, furnitureVarnish, furnitureQuantity) // le produit apparait

        const remove = document.querySelectorAll('.remove')[i]; 
        const article = document.querySelectorAll('article')[i];

        deleteCart(remove, article, furnitureName) 
        }
    } else {
        cart.textContent = 'Votre panier est vide.';
        form.classList.add('invisible')
    }   
}

const renderCart = (productName, productPrice, varnish, quantity) => {
    // Montre les produits dans le cart
    const article = document.createElement('article');
    article.innerHTML = `
    <div class="product-information">
    <p class="product-title">${productName}</p>
    <p class="quantity"><i class="fas fa-chevron-left"></i> ${quantity} <i class="fas fa-chevron-right"></i></p>
    <p class="product-varnish">${varnish}</p>
    <p class="product-price">£${productPrice}</p>
    <div class="remove"><button class="site-btn btn-line">Delete</button></div>
    </div>`
    cart.insertBefore(article, cartTotal); // article affiché avant cart total
    
    totalPrice += (productPrice * quantity); //crée le prix total
    cartTotal.textContent = `Total : £${totalPrice}`; 
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
        nameErrorMessage.textContent = "¨Please enter your name"
        name.focus();
        return false;
    }

    if(isNotEmpty(address.value) && isLongEnough(address.value)) {
        addressErrorMessage.textContent = "";

    } else {
        addressErrorMessage.textContent = "Please your address"
        address.focus();
        return false;
    }

    if (isValidEmail(email.value)) {
        emailErrorMessage.textContent = "";

    } else {
        emailErrorMessage.textContent = "Please enter a valid email address"
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
    const validForm = formValidate(); // validation du formulaire
    if (validForm !== false ) {
        const response = await postData('POST', 'http://localhost:3000/api/teddies/order', cartInformation); // Envoi des données au server
        window.location = `checkout.html?id=${response.orderId}&price=${totalPrice}&user=${firstName.value}`; 
    }
})






// else if(event.target.classList.contains("fa-chevron-right")){
//     let addAmount = event.target;
//     let id = addAmount.dataset.id;
//     let tempItem = cart.find(item => item.id === id);
//     tempItem.amount += 1;
//     Storage.saveCart(cart);
//     this.setCartValues(cart);
//     addAmount.nextElementSibling.innerText = tempItem.amount;
// }
// else if(event.target.classList.contains("fa-chevron-left")){
//     let lowerAmount = event.target;
//     let id = lowerAmount.dataset.id;
//     let tempItem = cart.find(item => item.id === id);
//     tempItem.amount -= 1;
//     if(tempItem.amount > 0){
//         Storage.saveCart(cart);
//         this.setCartValues(cart);
//         lowerAmount.previousElementSibling.innerText = tempItem.amount;
//     }
//     else{
//         cartContent.removeChild(lowerAmount.parentElement.parentElement);
//         this.removeItem(id);
//     }
