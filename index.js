const output_div = document.querySelector(".products-center");
const url = "http://localhost:3000/api/furniture";
let output = ""; 

class Products {
    async getJson(url) {
        try {
            let response = await fetch(url);
            let data = await response.json();
            return data
        }
        catch(error) {
            console.log(error);    
        }
    }
}

class UI {
    showFurniture(products) {
        products.forEach(furniture => {
            output += `
            <article class="product">
                <h3 class="furniture-name">${furniture.name}</h3>
                <div class="img-container">
                    <img src ="${furniture.imageUrl}">
                </div>
                <div class="button-container">
                <a href="products.html?id=${furniture._id}"><button class="product-link" type="button">Show Product</button></a>
                </div>
            </article>
            `;
        });
        output_div.innerHTML = output;
    }
}

const ui = new UI();
const products = new Products();

products.getJson(url).then(products => {
    ui.showFurniture(products)
})





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
