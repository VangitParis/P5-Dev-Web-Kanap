
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


        //Création des variables éléments à insérer dans le dom
        let a = document.getElementById("items");
        //console.log(a) 

        let article = document.querySelector("#items a");
        //console.log(article)

        let img = document.querySelector("#items a article");
        //console.log(img)
        let altTxt = document.querySelector("img")

        let h3 = document.querySelector("#items a article");
        //console.log(h3)

        let p = document.querySelector("#items a article");

        

        //création des éléments (liens, images, alt, h3,p ) dans le dom
        // boucle for pour parcourir les éléments
        for (let i = 0; i < products.length; i++) {

            // Récupération de l'élément du DOM qui accueillera les cartes produits
            const card_item = document.getElementById("items");

            //AJOUTER LA BALISE a dans la section id=items         
            const linkCard = document.createElement("a");
            //console.log(linkCard)
            linkCard.href = `./product.html?id=${kanaps[i]._id}`;
            //console.log(linkCard);


            //AJOUTER ARTICLE dans la balise a
            const articleProduct = document.createElement("article");
            //console.log(articleProduct)
            

            //AJOUTER IMAGE dans l'article
            const imgProduct = document.createElement("img");
            //console.log(imgProduct)
            imgProduct.src = kanaps[i].imageUrl;
            //console.log( products[imageUrl])
            imgProduct.setAttribute("alt", kanaps[i].altTxt);
            //console.log(altTxt)

            //AJOUTER H3 dans l'article
            const nameProduct = document.createElement("h3");
            nameProduct.setAttribute("class", "productName");
            nameProduct.textContent = kanaps[i].name;
            //console.log(titleProduct);

            //AJOUTER p dans l'article
            const descriptionProduct = document.createElement("p");
            descriptionProduct.setAttribute("class", "productDescription");
            descriptionProduct.textContent = kanaps[i].description;
            //console.log(descriptionProduct);



            //ajout des éléments dans le dom (sur les parents) = AFFICHAGE SUR LA PAGE
            card_item.appendChild(linkCard);
            linkCard.appendChild(articleProduct);
            articleProduct.appendChild(imgProduct);
            imgProduct.appendChild(altTxt);
            articleProduct.appendChild(nameProduct);
            articleProduct.appendChild(descriptionProduct);


        
        }

    });

   