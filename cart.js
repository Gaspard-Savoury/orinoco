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


// début de la partie sur le formulaire
const form = document.querySelector('form'); // Binds the form section to the js

const containNumber = /[0-9]/;
const regexEmail = /.+@.+\..+/;
const specialCharacter = /[$&+,:;=?@#|'<>.^*()%!"{}_"]/;

const isNotEmpty = value => value !== "" ? true : false; // Checks the field is not empty
const isLongEnough = value => value.length >= 2 ? true : false; // Check there is enough characters
const doNotContainNumber = value => !value.match(containNumber) ? true : false; // Checks there's no number
const doNotContainSpecialCharacter = value => !value.match(specialCharacter) ? true : false; // Checks there's no special character
const isValidEmail = (value) => value.match(regexEmail) ? true : false; // Checks the input is in the right format
const isValidInput = (value) => isNotEmpty(value) && isLongEnough(value) && doNotContainNumber(value) && doNotContainSpecialCharacter(value);// renvoie true si toutes les conditions sont vérifiées

// Form parts
const firstName = form.elements.firstName;
const lastName = form.elements.lastName;
const address = form.elements.address;
const city = form.elements.city;
const email = form.elements.email;
const btn = document.getElementById('site-btn');

const firstNameErrorMessage = document.getElementById('firstNameErrorMessage')
const lastNameErrorMessage = document.getElementById('lastNameErrorMessage')
const addressErrorMessage = document.getElementById('addressErrorMessage')
const cityErrorMessage = document.getElementById('cityErrorMessage')
const emailErrorMessage = document.getElementById('emailErrorMessage')

// Checks user inputs
const formValidate = () => {
        if (isValidInput(firstName.value)) { 
            firstNameErrorMessage.textContent = ""; 
    
        } else {
            firstNameErrorMessage.textContent = "Please enter your first name."
            firstName.focus();
            return false;
        }
    
        if(isValidInput(lastName.value)) {
            lastNameErrorMessage.textContent = "";
    
        } else {
            lastNameErrorMessage.textContent = "Please enter your last name"
            lastName.focus();
            return false;
        }
    
        if(isNotEmpty(address.value) && isLongEnough(address.value)) {
            addressErrorMessage.textContent = "";
    
        } else {
            addressErrorMessage.textContent = "Please enter your address"
            address.focus();
            return false;
        }
    
        if (isValidInput(city.value)) {
            cityErrorMessage.textContent = "";
    
        } else {
            cityErrorMessage.textContent = "Please enter your city";
            city.focus();
            return false;
        }
    
        if (isValidEmail(email.value)) {
            emailErrorMessage.textContent = "";
    
        } else {
            emailErrorMessage.textContent = "Please enter a valid email address"
            email.focus();
            return false;
        }
    
        return cartInformation.contact = { // If every input is valid, sends the objects to cartInformation
                                firstName: firstName.value,
                                lastName: lastName.value,
                                address: address.value,
                                city: city.value,
                                email: email.value
                            }
}

const postData = async (url, dataElt) => {
    console.log(cartInformation);
    const response = await fetch(url, {
        headers: {
            'Content-Type' : 'application/json'
        },
        method:'POST',
        body: JSON.stringify(dataElt)
    })
    return await response.json();
}

btn.addEventListener("click", async (event) => {
    event.preventDefault(); 
    const validForm = formValidate(); // validation du formulaire
    if (validForm !== false ) {
        const response = await postData('http://localhost:3000/api/furniture/order', cartInformation); // Envoi des données au server
        window.location = `order.html?id=${response.orderId}&price=${totalPrice}&user=${firstName.value}`; 
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


function dropdown() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  
  // Close the dropdown if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }
