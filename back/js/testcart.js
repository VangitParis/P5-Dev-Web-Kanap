
//Appel du tableau contenu dans le localStorage 
let local = JSON.parse(localStorage.getItem("product"));
console.log(local);
//Fonction asynchrone pour afficher le panier et attendre la réponse


    //Fonction pour sauvegarder le localStorage 
    function saveLocalStorage() {
        localStorage.setItem("product", JSON.stringify(local));
        (local = JSON.parse(localStorage.getItem("product")))
    }

    for (const item of local) {
        fetch(`http://localhost:3000/api/products/${item.id}`)

            .then((res) => res.json())
            .then(function (product, local) {
                productDetails = (product);
                console.log(productDetails.price)
                //console.log(productDetails.imageUrl);
                let price = productDetails.price;
                //console.log(product.price);



                //Création des variables éléments à insérer dans le dom




                //AJOUTER ARTICLE 
                const articleProduct = document.createElement("article");
                articleProduct.setAttribute("class", "cart__item");
                articleProduct.setAttribute("data-id", item.id);
                articleProduct.setAttribute("data-color", item.color);
                console.log(item.color)
                cart__items.appendChild(articleProduct);

                // AJOUTER div qui contient l'image
                const divImg = document.createElement("div");
                divImg.setAttribute("class", "cart__item__img");
                //console.log(divImg);
                articleProduct.appendChild(divImg);

                //AJOUTER IMAGE dans la div
                const imgProduct = document.createElement("img");
                //console.log(imgProduct)
                imgProduct.src = productDetails.imageUrl;
                //console.log(productsDetails.imageUrl)
                imgProduct.setAttribute("alt", productDetails.altTxt);
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
                nameProduct.textContent = productDetails.name;
                //console.log(nameProduct);
                divDescription.appendChild(nameProduct);


                //AJOUTER p contenant la couleur 
                const colorProduct = document.createElement("p");
                colorProduct.textContent = item.color;
                //console.log(colorProduct);
                divDescription.appendChild(colorProduct);

                //AJOUTER p contenant la couleur 
                const priceProduct = document.createElement("p");
                priceProduct.textContent = `${productDetails.price}€`;
                console.log(productDetails.price);
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

                // boucle for pour parcourir les éléments

                //console.log(local);
                //Ajouter INPUT 
                const inputQuantity = document.createElement("input");
                inputQuantity.setAttribute("type", "number");
                inputQuantity.setAttribute("class", "itemQuantity");
                inputQuantity.setAttribute("min", 1);
                inputQuantity.setAttribute("max", 100);
                inputQuantity.setAttribute("name", "itemQuantity");
                inputQuantity.setAttribute("value", item.quantity);
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
                //console.log(deleteItem);
                divSettingsDelete.appendChild(deleteItem);


            })




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
                    //console.log(totalArticles);//[10,4]

                    //Additionner les quantités des articles entre elles
                    let sumQuantity = 0;
                    for (let s = 0; s < totalArticles.length; s++) {
                        sumQuantity += totalArticles[s];

                    }
                    //console.log(sumQuantity);
                    //Injecter quantité dans ID totalQuantité

                    let totalQ = document.getElementById("totalQuantity");

                    totalQ.textContent = sumQuantity;//14
                    //console.log(totalQuantity);

                    //les fonctions sont appelées en cas de modif des quantités ou de suprression d'un produit 
                    getLocalForInput();//L199
                    removeQuantite();//L307
                }
                saveLocalStorage();

                //-----------------------------Prix total------------------------------------//

            }




                //Déclaration variable prix total panier
                let totalPrice = [];

                //console.log(data);

                //chercher prix dans panier
                for (let p = 0; p < local.length; p++) {

                    //création de la variable qui va multiplier les quantités aux prix
                    let prixProductInCart = parseInt(productDetails.price) * (local[p].quantity);
                    //recupérer les prix du panier dans 'totalPrice'
                    totalPrice.push(prixProductInCart);
                    console.log(totalPrice)

                    //Additionner les prix présents dans le tableau de la variable 'totalPrice' avec la methode reduce
                    const reducer = (accumulator, currentValue) => accumulator + currentValue;
                    let totalPanier = totalPrice.reduce(reducer);

                    //Injecter prix dans ID totalPrice
                    let totalP = document.getElementById("totalPrice");
                    totalP.textContent = totalPanier;
                    //console.log(totalPanier)


                }
                //enregistrer localstorage
                saveLocalStorage();

            
        //on appelle la foction cart() pour afficher le panier


        ////////////////---------CIBLER UN ARTICLE DU PANIER ET ECOUTER LES MODIF----------///////////////////


        // addProduCt récupère le tableau 'product' qui est dans le localstorage
        let addProduct = JSON.parse(localStorage.getItem("product"));
        //console.log(addProduct);



        //Fonction asynchrone qui attend et récupère le panier 
        //pour faire la compraison après modif des quantités dans le panier
        const getLocalForInput = async (local) => {
            await local;
            //console.log("quantité modifiée par l'utilisateur pour un article");

            //on recherche l'input contenu dans la balise article
            let foundInputOfArticle = document.querySelectorAll('.cart__item');
            //console.log(foundInputOfArticle);

            //on boucle pour écouter les modif avec la métode 'change' qui va écouter la modif quand l'utilisateur 
            //clique sur l'input (flèche haut et bas ou si il modifie en tapant des chiffres dans l'input)
            foundInputOfArticle.forEach((inputChangeByUser) => {
                inputChangeByUser.addEventListener("change", (event) => {
                    //console.log(inputChangeByUser);

                    //On récupère la valeur présente dans l'input avec la variable 
                    const value = document.querySelectorAll('input.itemQuantity');
                    //console.log("tous les articles sont dans le panier");

                    //et le contenu de la valeur avec 'event.target'
                    value.textContent = `${event.target.value}`;
                    //console.log(value.textContent);

                    ///////////////--------Eviter les donnees eronnées envoyées par l'utilisateur-------------/////////

                    //Attention particulière à la saisie des quantités dans la page panier

                    //Si l'utilisateur saisi 0 ou moins (valeurs négatives)
                    if (value.textContent < 1) {
                        console.log(value.textContent);
                        alert(" merci de sélectionner une quantité minimum de 1")

                        //si utilisateur met une valeur <1, on revient à la quantité précedente sauvegardée
                        return (
                            value.textContent == NaN,
                            localStorage.setItem("product", JSON.stringify(addProduct)),
                            location.reload()
                        )
                        //Si l'utilisateur saisi plus de 100 articles
                    } else if (value.textContent > 100) {
                        alert("vous ne pouvez pas choisir plus de 100 articles pour ce produit")

                        //si utilisateur met une valeur >100, on revient à la quantité précedente sauvegardée
                        return (
                            value.textContent == NaN,
                            localStorage.setItem("product", JSON.stringify(addProduct)),
                            location.reload()
                        )
                    }

                    ///////////////------------------------ MISE A JOUR DU PANIER----------------------////////////////////

                    //boucle pour voir tous les produits du tableau addProduct et mettre à jour le panier
                    for (i = 0; i < addProduct.length; i++) {
                        //console.log(addProduct.length);

                        //création de la FONCTION MàJ panier pour l'utiliser plusieurs fois
                        function miseAJourPanier() {
                            //on récupère la valeur de l'input existante dans le panier
                            addProduct[i].quantity = parseInt(`${event.target.value}`),
                                //console.log(`${event.target.value}`),

                                //on récupère le panier existant
                                localStorage.setItem("product", JSON.stringify(addProduct)),

                                //On enregistre qtés saisies dans les qtés contenues dans panier existant 
                                (document.querySelectorAll(".totalQuantity")[i] = addProduct[i].quantity),
                                console.log(addProduct[i].quantity);

                            //on mutiplie le prix par la qtité
                            (document.querySelectorAll(".totalPrice")[i] =
                                `${price * addProduct[i].quantity}`)
                            console.log(price * addProduct[i].quantity);
                        }

                        //si l'utilisateur modifie la quantité d'un produit 
                        if (addProduct[i].id == inputChangeByUser.dataset.id &&
                            addProduct[i].color == inputChangeByUser.dataset.color) {
                            //on demande la mise à jour du prix et de la quantité et on enregistre le localStorage
                            return (
                                //on appele la FONCTION MàJ
                                miseAJourPanier(),
                                //console.log("mise à jour panier : prix et quantité pour produit identique"),
                                localStorage.setItem("product", JSON.stringify(addProduct))
                                //location.reload()
                            )
                            //si l'utilisateur modifie la quantité d'un produit mais que ce produit a un id diff
                            //et une couleur diff 
                        } else if (addProduct[i].id == inputChangeByUser.dataset.id &&
                            addProduct[i].color != inputChangeByUser.dataset.color
                            && addProduct[i].id != inputChangeByUser.dataset.id) {
                            //on demande la mise à jour du prix et de la quantité et on enregistre le localStorage
                            return (
                                //on appele la FONCTION MàJ
                                miseAJourPanier(),
                                //console.log("mise a jour panier : prix et quantité"),
                                localStorage.setItem("product", JSON.stringify(addProduct))
                                //location.reload()
                            );

                        }


                    }
                    //On enregitre le dernier panier reçu dans le localStorage
                    return (local = JSON.parse(localStorage.getItem("product"))),
                        location.reload()
                });
            });
        }
        //////////-----------SUPPRIMER UN PRODUIT ET LE PANIER---------/////////////////

        //Fonction asynchrone qui attend et renvoi le panier local
        const removeQuantite = async (local) => {
            await local;
            //console.log("removeQuantity");

            //création de la variable pour récupérer le bouton supprimer = 'p' du DOM
            let pDeleteItem = document.querySelectorAll(".deleteItem");
            //console.log(pDeleteItem);

            //boucle pour écouter le bouton supprimer au click
            pDeleteItem.forEach((deleteArticle) => {
                deleteArticle.addEventListener("click", () => {
                    //console.log(deleteArticle);

                    //récupérer le nombre de produits dans le panier
                    let totalAddProduct = addProduct.length;
                    //console.log(totalAddProduct);

                    //récupérer les dataset id et color de la balise article avec la méthode closest
                    let productInCart = deleteArticle.closest('article');
                    //console.log(productInCart);

                    //si le panier ne contient qu'un seul article, alors efface le panier 
                    if (totalAddProduct == 1) {
                        return (
                            localStorage.removeItem("product"),
                            location.reload(),
                            console.log("panier supprimé")
                        )
                        // s'il reste des produits dans le panier et qu'is sont diff renvoi moi le panier      
                    } else {
                        //récupérer le nombre d'artciles restants dans le panier
                        productInCartAfterDelete = addProduct.filter((el => {
                            //si les produits n'ont pas le meme id ni la meme couleur = true
                            if (productInCart.dataset.id != el.id ||
                                productInCart.dataset.color != el.color) {
                                return true;
                            }
                        })
                        )
                    }
                    //Enregistrement du nouveau panier 
                    //console.log(productInCartAfterDelete);
                    localStorage.setItem("product", JSON.stringify(productInCartAfterDelete));
                    location.reload()
                    console.log("produit supprimé");
                })
            })
            return;
        };
    






    