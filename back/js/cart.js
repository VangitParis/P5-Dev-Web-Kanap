
let local = JSON.parse(localStorage.getItem("product"));
//console.log(local);



//Fonction afficher mon panier
const cart = async () => {
    console.log("PANIER");
    if (local) {
        await local;
        //console.log(local);
    }
};
cart();


//Création des variables éléments à insérer dans le dom
// boucle for pour parcourir les éléments
for (let i = 0; i < local.length; i++) {
    //console.log(local)
    //AJOUTER ARTICLE 
    const articleProduct = document.createElement("article");
    articleProduct.setAttribute("class", "cart__item");
    articleProduct.setAttribute("data-id", local[i].id);
    articleProduct.setAttribute("data-color", local[i].color);
    //console.log(articleProduct)
    cart__items.appendChild(articleProduct);

    // AJOUTER div qui contient l'image
    const divImg = document.createElement("div");
    divImg.setAttribute("class", "cart__item__img");
    //console.log(divImg);
    articleProduct.appendChild(divImg);

    //AJOUTER IMAGE dans la div
    const imgProduct = document.createElement("img");
    //console.log(imgProduct)
    imgProduct.src = local[i].imageUrl;
    //console.log( local[i].imageUrl)
    imgProduct.setAttribute("alt", local[i].altTxt);
    //console.log(altTxt)
    divImg.appendChild(imgProduct);


    //AJOUTER la div qui contient la div avec h2 et p
    const divContent = document.createElement("div");
    divContent.setAttribute("class", "cart__item__content");
    //console.log(divContent);
    articleProduct.appendChild(divContent);

    //AJOUTER la div qui contient h2,p 'couleur' et p 'prix'
    const divDescription = document.createElement("div");
    divDescription.setAttribute("class", "cart__item__content__description");
    //console.log(divDescription);
    divContent.appendChild(divDescription);

    //AJOUTER H2 dans la div description
    const nameProduct = document.createElement("h2");
    nameProduct.textContent = local[i].nom;
    //console.log(nameProduct);
    divDescription.appendChild(nameProduct);


    //AJOUTER p contenant la couleur 
    const colorProduct = document.createElement("p");
    colorProduct.textContent = local[i].color;
    //console.log(colorProduct);
    divDescription.appendChild(colorProduct);

    //AJOUTER p contenant la couleur 
    const priceProduct = document.createElement("p");
    priceProduct.textContent = `${local[i].price}€`;
    //console.log(priceProduct);
    divDescription.appendChild(priceProduct);

    //AJOUTER la div settings
    const divSettings = document.createElement("div");
    divSettings.setAttribute("class", "cart__item__content__settings");
    //console.log(divSettings);
    divContent.appendChild(divSettings);

    //AJOUTER la div settings quantity
    const divSettingsQuantity = document.createElement("div");
    divSettingsQuantity.setAttribute("class", "cart__item__content__settings__quantity");
    //console.log(divSettingsQuantity);
    divSettings.appendChild(divSettingsQuantity);

    //AJOUTER p contenant la couleur 
    const quantityProduct = document.createElement("p");
    quantityProduct.textContent = "Qté :";
    //console.log(quantityProduct);
    divSettingsQuantity.appendChild(quantityProduct);

    //Ajouter INPUT 
    const inputQuantity = document.createElement("input");
    inputQuantity.setAttribute("type", "number");
    inputQuantity.setAttribute("class", "itemQuantity");
    inputQuantity.setAttribute("min", 1);
    inputQuantity.setAttribute("max", 100);
    inputQuantity.setAttribute("name", "itemQuantity");
    inputQuantity.setAttribute("value", local[i].quantity);
    divSettingsQuantity.appendChild(inputQuantity);

    //AJOUTER div settings delete
    const divSettingsDelete = document.createElement("div");
    divSettingsDelete.setAttribute("class", "cart__item__content__settings__delete");
    //console.log(divSettingsDelete);
    divSettings.appendChild(divSettingsDelete);

    //Ajouter p de settings delete
    const deleteItem = document.createElement("p");
    deleteItem.setAttribute("class", "deleteItem");
    deleteItem.textContent = "Supprimer";
    deleteItem.setAttribute('onclick', "")
    //console.log(deleteItem);
    divSettingsDelete.appendChild(deleteItem);

}

//-----------------------Quantité totale--------------------------------------//            


//-------------Modifier la quantité d'un produit au niveau du panier-----------//

//Déclaration total articles dans localstorage
let totalArticles = [];
//chercher dans local les quantités de produits ajoutés
for (let n = 0; n < local.length; n++) {
    let quantitéProductsInCart = local[n].quantity;

    //console.log(quantitéProductsInCart);
    //récupérer la quantité des produits dans totalArticles
    totalArticles.push(quantitéProductsInCart);
    console.log(totalArticles);//[10,4]

    //Additionner les quantités des articles entre elles
    let sumQuantity = 0;
    for (let s = 0; s < totalArticles.length; s++) {
        sumQuantity += totalArticles[s];

    }
    console.log(sumQuantity);
    //Injecter quantité dans ID totalQuantité

    let totalQ = document.getElementById("totalQuantity");

    totalQ.textContent = sumQuantity;//14
    //console.log(totalQuantity);

    localStorage.setItem("product", JSON.stringify(local)),
        //enregistrement dans le localStorage
        (local = JSON.parse(localStorage.getItem("product")))


}

//-----------------------------Prix total------------------------------------//


//Déclaration variable prix total panier
let totalPrice = [];

//chercher prix dans panier
for (let p = 0; p < local.length; p++) {
    //création de la variable qui va multiplier les quantités aux prix
    let prixProductInCart = local[p].price * local[p].quantity;
    //console.log(prixProductInCart);
    //recupérer les prix du panier dans 'totalPrice'
    totalPrice.push(prixProductInCart);
    //console.log(totalPrice)

    //Additionner les prix présents dans le tableau de la variable 'totalPrice' avec la methode reduce
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    let totalPanier = totalPrice.reduce(reducer);

    //Injecter prix dans ID totalPrice
    let totalP = document.getElementById("totalPrice");
    totalP.textContent = totalPanier;
    console.log(totalPanier)


}



/// ---------CIBLER UN ARTICLE DU PANIER ET ECOUTER LES MODIF----------///



//recherche input     
let input = document.querySelector('.itemQuantity');

//et sa valeur
let value = document.getElementsByTagName('input.itemQuantity');

//utilisation de la methode addeventlistenner change pour voir le changement de la valeur dans la console
input.addEventListener('change', function (e) {

    
    //Utiliser methode Element.closest() pour cibler le produit à modifier ou à supprimer
    const changeArticle = e.target.closest('.cart__item');


    //recherche l'id de l'article ciblé
    let idProduct = document.querySelector(".cart__item");
    idProduct = changeArticle.dataset['id'];
    console.log(idProduct);

    //recherche la couleur de l'article ciblé
    let clrProduct = document.querySelector(".cart__item");
    clrProduct = changeArticle.dataset['color'];
    console.log(clrProduct);

    // constante qui reprend la valeur du produit ciblé
    const quantityProd = parseInt(input.value);
    console.log(quantityProd);//----!!!!!!! SI 2 EME ARTICLE S ARRETE ICI !!!!!!!!-------------

    // boucle pour ajouter la quantité sélectionnée par utilisateur dans le panier 
    for (i = 0; i < local.length; i++) {
        //Attention particulière à la saisie des quantités dans la page panier
        //Si l'utilisateur saisi 0 ou moins (valeurs négatives)
        if (input.value < 1) {
            alert(" merci de sélectionner une quantité minimum de 1")
            input.value = 1;
            return (
                input.value == NaN
            )
        //Si l'utilisateur saisi plus de 100 articles
        } else if (input.value > 100) {
            alert("vous ne pouvez pas choisir plus de 100 articles pour ce produit")
            input.value = 100

            return (
                input.value == NaN
            )

        };
        //Si l'utilisateur saisi un article et que celui-ci est déjà présent et que le calcul renvoi >100 empêcher l'ajout d'articles
        if ((idProduct) && (clrProduct)) {
            //console.log((idProduct); 
            //empecher d'ajouter des articles au dessus de 100
            if (input.value > 100) {
                console.log("empecher l'ajout d'article identique >100");
                alert("vous ne pouvez pas choisir plus de 100 articles pour ce produit")
                input.value = 100;
                return (
                    input.value == NaN
                )
            };

            //on récupère la réponse retournée par la condition et on ajoute 
            //la quantité sélectionnée depuis la page panier
            return (
                local[i].quantity = quantityProd,
                //console.log(local),
                //console.log("valeur input ajoutée"),
                localStorage.setItem("product", JSON.stringify(local)),
                //enregistrement dans le localStorage
                (local = JSON.parse(localStorage.getItem("product")))
                //location.reload()

            );
        }
    }


})
  
