//////---------RECUPERER API DES PRODUITS, CREER LES ELEMENTS DOM DES ARTICLES--------///////////

//variable qui reprend le tableau à parcourir
let products = [];

//Creation d'une fetch() pour récupérer l'API des produits
fetch("http://localhost:3000/api/products")
    //création d'une 'promise' pour la réponse (ok:console.log)
    .then((res) => res.json())
    //réponse pour chaque produit dans le tableau créé à partir de j.son
    .then((promise) => {
        products = promise;
        //console.log(products);

        //récupération de la réponse 
        const kanaps = products;
        //console.log(kanaps);

        //Création des variables éléments à insérer dans le dom
        let altTxt = document.querySelector("img")
        //console.log(altTxt)

        //création des éléments (liens, images, alt, h3,p ) dans le dom
        // boucle for pour parcourir les éléments
        for (let i = 0; i < products.length; i++) {

            // Récupération de l'élément du DOM qui accueillera les cartes produits
            const card_item = document.getElementById("items");
            //ajout des éléments dans le dom (sur les parents) = AFFICHAGE SUR LA PAGE
            
            //AJOUTER LA BALISE a dans la section id=items         
            const linkCard = document.createElement("a");
            //console.log(linkCard)
            linkCard.href = `./product.html?id=${kanaps[i]._id}`;
            //console.log(linkCard);
            card_item.appendChild(linkCard);
            

            //AJOUTER ARTICLE dans la balise a
            const articleProduct = document.createElement("article");
            //console.log(articleProduct)
            linkCard.appendChild(articleProduct);

            //AJOUTER IMAGE dans l'article
            const imgProduct = document.createElement("img");
            //console.log(imgProduct)
            imgProduct.src = kanaps[i].imageUrl;
            imgProduct.setAttribute("alt", kanaps[i].altTxt);
            articleProduct.appendChild(imgProduct);
            imgProduct.appendChild(altTxt);

            //AJOUTER H3 dans l'article
            const nameProduct = document.createElement("h3");
            nameProduct.setAttribute("class", "productName");
            nameProduct.textContent = kanaps[i].name;
            //console.log(nameProduct);
            articleProduct.appendChild(nameProduct);

            //AJOUTER p dans l'article
            const descriptionProduct = document.createElement("p");
            descriptionProduct.setAttribute("class", "productDescription");
            descriptionProduct.textContent = kanaps[i].description;
            //console.log(descriptionProduct);
            articleProduct.appendChild(descriptionProduct);

        }

    });

   