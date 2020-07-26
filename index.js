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
                <a href="products.html?id=${furniture._id}"><button class="product-link" type="button">Voir le produit</button></a>
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
