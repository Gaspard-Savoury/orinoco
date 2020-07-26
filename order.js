const orderInformation = window.location.search.substr(1).split('&'); //retrieves the different parts of the json string and returns an array
const orderId = orderInformation[0].replace('id=', '');
const totalPrice = orderInformation[1].replace('price=', '');
const userName = orderInformation[2].replace('user=', '');

document.querySelector('.user').textContent += userName;
document.querySelector('.order-id').textContent += orderId; 