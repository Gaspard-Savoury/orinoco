
function commande(){

    let data = JSON.parse(sessionStorage.getItem('order'));
    let totalPrice = JSON.parse(sessionStorage.getItem('prix'));

    let productContainer = document.querySelector(".order-products");

    // Création du message de confirmation de commande

    if( data != null ) {
        productContainer.innerHTML = '';
        // on récupere les données dans l'objet order de la commande dans le LocalStorage
        Object.values(data).map( () => {

            //et on affiche le message de confirmation avec les données récupérées
            productContainer.innerHTML = 
            `<p>Thank you for your order.</p>
            <p>Your order Id is : <span class="gras"> ${data.orderId}</span>,
            total amount is :  <span class="gras">${totalPrice} €</span>.
            </p>
                
            <p>Thank you for using Orinoco.<br>` 
        });    
    } 
}
// remise à zero du sessionStorage grace au bouton "retour a l'accueil du site" et retour a index.html
function retour(){

    localStorage.clear();
    sessionStorage.clear();
}
commande();