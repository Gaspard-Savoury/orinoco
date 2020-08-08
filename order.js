
const orderInformation = window.location.search.substr(1).split('&'); //retrieves the different parts of the json string and returns an array
const orderId = orderInformation[0].replace('id=', '');
const totalPrice = orderInformation[1].replace('price=', '');
const userName = orderInformation[2].replace('user=', '');
const orderArticle = document.querySelector(".order-products");

function renderConfirmation() {
    orderArticle.innerHTML = `
    <h3>Your order has been registered</h3>
    <p>Thank you ${userName}, for shopping with Orinoco.</p>
    <p>The total amount of your order is: £${totalPrice}.</p>
    <p>Your order is being processed, the identification number is: ${orderId}</p>
    `
};

renderConfirmation();




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
