furnitureRequest();

function furnitureRequest() {
    fetch("http://localhost:3000/api/furniture")
    .then((res) => res.json())
    .then((data) => {
        let output = '<h2>Meubles</h2>'
        data.forEach(function(furniture){
            output += `
                <ul>
                    <li>${furniture.name}</li>
                    <li><img src=${furniture.imageUrl}></li>
                    <li>${furniture.varnish}</li>
                    <li>${furniture.id}</li>
                    <li>${furniture.description}</li>
                    <li>${furniture.price}
                </ul>
            `;
        });
        document.getElementById("output").innerHTML = output;
    })
}