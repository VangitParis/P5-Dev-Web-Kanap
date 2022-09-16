
//--L.11 -> L.84-// RECUPERER LOCALSTORAGE AVEC LES QUANTITES, INTEGRER LES ELEMENTS DANS LE DOM, 
//--L.88 -> L.97-// RECUPERER LE PRIX PAR SON ID, 
//-L.160 -> L.281-/ ECOUTER LES MODIFS DES QUANTITE , LA SUPPRESSION,
//-L338 ->  L.393-/ FAIRE LE TOTAL DES QUANTITES, FAIRE LE TOTALPRIX DE LA COMMANDE, 
//-L.395 -> L.643-/ RECUPERER LES DONNEES DU FORMULAIRE ET FAIRE LA VALIDATION GRACE AU REGEX,
//-L.646 -> L.729-/ AJOUTER DES ALERTES SI ERREURS, ON STOCKE LES DONNEES DU FORM POUR API, 
//-L.727 -> L.749-/ ON FAIT API POST,
//-L.768 et L.773// ON EFFACE LE PANIER DU LOCALSTORAGE, ON INJECTE L' ID DE LA COMMANDE DANS L' URL
////-L.777---////// ON EFFACE LE FORMULAIRE DE LA PAGE PANIER


//Appel du tableau contenu dans le localStorage 
let local = JSON.parse(localStorage.getItem("product"));
console.log(local);

let confirmCommande = JSON.parse(localStorage.getItem("commandeUser"));

let totalP = document.querySelector("#totalPrice");

let responseByServer;

//Fonction pour sauvegarder le localStorage 
function saveLocalStorage() {
    localStorage.setItem("product", JSON.stringify(local));
    (local = JSON.parse(localStorage.getItem("product")))
}

//Fonction asynchrone pour afficher le panier et attendre la réponse
const cart = async () => {
    //console.log("PANIER");
    if (local) {
        await local;
        //console.log(local);
    }


    for (i = 0; i < local.length; i++) {
        //Création des variables éléments à insérer dans le dom
        //AJOUTER ARTICLE 
        const articleProduct = document.createElement("article");
        articleProduct.setAttribute("class", "cart__item");
        articleProduct.setAttribute("data-id", local[i].id);
        articleProduct.setAttribute("data-color", local[i].color);
        console.log(local[i].color)
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
        console.log(local[i].imageUrl)
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

        //Ajouter p conenant les prix
        fetch(`http://localhost:3000/api/products/${local[i].id}`)
            .then((res) => res.json())
            .then(function (product, local) {
                productsDetails = (product);
                let localPrice = productsDetails.price
                console.log(localPrice)
                const priceProduct = document.createElement("p");
                priceProduct.textContent = `${localPrice}€`;
                divDescription.appendChild(priceProduct);
            })

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



        //console.log(local);
        //Ajouter INPUT 
        const inputQuantity = document.createElement("input");
        inputQuantity.setAttribute("type", "number");
        inputQuantity.setAttribute("class", "itemQuantity");
        inputQuantity.setAttribute("min", 1);
        inputQuantity.setAttribute("max", 100);
        inputQuantity.setAttribute("name", "itemQuantity");
        inputQuantity.setAttribute("value", local[i].quantity);
        //console.log(item.quantity);
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

    }

    //-----------------------Quantité totale--------------------------------------//            

    //les fonctions sont appelées en cas de modif des quantités ou de suprression d'un produit et pour le calcul
    getLocalForInput();
    removeQuantite();
    calculProduct();

}
//enregistrer localstorage
saveLocalStorage();

//on appelle la foction cart() pour afficher le panier
cart();

////////////////---------CIBLER UN ARTICLE DU PANIER ET ECOUTER LES MODIF----------///////////////////


// addProduCt récupère le tableau 'product' qui est dans le localstorage
let addProduct = JSON.parse(localStorage.getItem("product"));
console.log(addProduct);

//Fonction asynchrone qui attend et récupère le panier 
//pour faire la comparaison après modif des quantités dans le panier
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
            value.textContent = `${eval(event.target.value)}`;
            console.log(value.textContent);


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
                    calculProduct(),
                    location.reload()
                )
                //Si l'utilisateur saisi plus de 100 articles
            } else if (value.textContent > 100) {
                alert("vous ne pouvez pas choisir plus de 100 articles pour ce produit")

                //si utilisateur met une valeur >100, on revient à la quantité précedente sauvegardée
                return (
                    value.textContent == NaN,
                    localStorage.setItem("product", JSON.stringify(addProduct)),
                    calculProduct(),
                    location.reload()
                )
            }




            ///////////////------------------------ MISE A JOUR DU PANIER----------------------////////////////////


            //boucle pour voir tous les produits du tableau addProduct et mettre à jour le panier
            for (i = 0; i < addProduct.length; i++) {
                console.log(addProduct.length);

                //création de la FONCTION MàJ panier pour l'utiliser plusieurs fois
                function miseAJourPanier() {
                    //on récupère la valeur de l'input existante dans le panier
                    addProduct[i].quantity = parseInt(`${eval(event.target.value)}`),
                        //console.log(`${event.target.value}`),
                        //on récupère le panier existant
                        localStorage.setItem("product", JSON.stringify(addProduct)),
                        //on récupère la fonction de calculs produits pour 
                        //charger les quantités et prix dynamiquement, On enregistre qtés saisies dans les qtés contenues dans panier existant
                        calculProduct()
                    
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
            return (local = JSON.parse(localStorage.getItem("product")))
            //location.reload()
        });
    }
    )
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
            location.reload();
            console.log("produit supprimé");

        })
    })

    return;
};
//////////---------------CALCUL QUANTITE TOTALE ET PRIX TOTAL PANIER-------------/////////////////////////

//Fonction qui attend le panier et les fonctions précédentes pour être à jour
const calculProduct = async (local, getLocalForInput, removeQuantite) => {
    await local
    await getLocalForInput
    await removeQuantite
    console.log("calcul des produits");
    //tableau vide recevant les prix des produits sélectionner
    let priceProduct = [];
    //tableau vide recevant les quantités des produits sélectionner et modifiés ou non 
    let quantityTotalProduct = [];
    //création d'un nouveau panier reprenant les éléments du panier
    let newTableau = JSON.parse(localStorage.getItem("product"));
    console.log(newTableau);
    //variable qui appelle la span totalQuantity
    let returnQuantity = document.querySelectorAll("#totalQuantity")
    console.log(returnQuantity);

    //Boucle dans le nouveau tableau pour rechercher les prix et les quantités depuis le panier
    newTableau.forEach((productInCart) => {
        //on cherche le prix et la quantité des produits avec fetch et l'id
        fetch(`http://localhost:3000/api/products/${productInCart.id}`)
            .then((res) => res.json())
            .then(function (product) {
                productsDetails = (product);
                //console.log("les prix sont ici");
                //on push dans le tableau précedent le prix * quantités trouvées
                priceProduct.push(productsDetails.price * productInCart.quantity),
                    //on push les quantités totales des artciles
                    quantityTotalProduct.push(productInCart.quantity)

                //on crée une variable qui récupère la span quantité et on injecte le tableau dans le dom
                //en additionnant les quantités totales par article
                let totalArticles = document.querySelector("#totalQuantity");
                totalArticles.textContent = `${eval(quantityTotalProduct.join("+"))}`;
                //console.log(totalArticles);


                //Injecter prix dans ID totalPrice de la même façon que les quantités
                //let totalP = document.querySelector("#totalPrice");
                totalP.textContent = `${eval(priceProduct.join("+"))}`;
                //console.log(totalP)

            })
        //Enregistrement du nouveau panier 
        localStorage.setItem("product", JSON.stringify(newTableau));

        //console.log(priceProduct);
        //console.log(quantityTotalProduct);


    })
    return;

}

///////////////////////////////---------------FORMULAIRE ------------//////////////////////////////////////
//Récupération des données  ID dans le dom 
const prenom = document.getElementById("firstName");
const nom = document.getElementById("lastName");
const adresse = document.getElementById("address");
const ville = document.getElementById("city");
const email = document.getElementById("email");

//Stocker les données que l'utilisateur va taper dans l'INPUT
let textPrenom;
let textNom;
let textAdresse;
let textVille;
let textEmail;

//créer des ecoute au click des INPUT avec addEventListenner

//-------------ecoute du champ Prenom
prenom.addEventListener("input", function (e) {
    //prenom.value = e.target.value
    //console.log(prenom.value);
    textPrenom;
    const errorPrenom = document.getElementById("firstNameErrorMsg");
    //cibler le texte et renvoyer les données 
    //si le champ est vide renvoi null ou erreur car la 'value de l'input' est vide 
    if (e.target.value.length == 0) {
        console.log("vide");
        //Erreur si le champ est vide
        errorPrenom.innerHTML = "";
        //null pour récupérer la valeur valide du prénom par la suite
        textPrenom = null;
        console.log(textPrenom);


    }//vérifier que le prénom est bien compris entre 3 et 30 si ce n'est pas le cas => affiche l'erreur
    else if (e.target.value.length < 3 || e.target.value.length > 30) {
        errorPrenom.innerHTML = "Saisir un prénom entre 3 et 30 caractères";
        //renvoyer une valeur null pour ne pas valider le champ
        textPrenom = null;
        console.log("erreur dans le champ prénom = trop court ou trop long");
    }
    //si le champ n'est pas vide on vérifie qu'il est valide avec les Regex MAJ, 
    //min et compris entre 3 et 30 caractères, sont acceptés les -,. et ' ; 
    //les autres caractères sont exclus : chiffres symboles etc
    if (e.target.value.match(/^[a-z A-Z 'éèëç-]{3,30}$/)) {
        //on déclare la constante errorPrenom et on la récupère dans le dom

        //string vide car pas d'erreurs pour cette condition
        errorPrenom.innerHTML = "";
        //cibler la valeur du champ
        textPrenom = e.target.value;
        console.log("ç'est bon pour le prenom");
        console.log(textPrenom);
    }
    //vérifier les caractères spéciaux non compris dans la regex et envoyer 
    //une erreur si ils sont bien dans l'intervalle 3,30 caractères et donc "match et != de e.target.value"
    if (  //IMPORTANT !e
        !e.target.value.match(/^[a-z A-Z 'éèëç-]{3,30}$/) &&
        e.target.value.length > 3 &&
        e.target.value.length < 30)
    //On envoie l'erreur au cas où des chiffres ou autres caractères spéciaux sont envoyés dans le champ
    {
        errorPrenom.innerHTML = "Le prénom ne doit pas contenir de chiffres ou de caractères spéciaux "
        textPrenom = null
        console.log("erreur dans le champ prénom = chiffres ou caract spec présents");
    }


});

//--------ecoute du champ Nom
nom.addEventListener("input", function (e) {
    //nom.value = e.target.value
    //console.log(nom.value);
    textNom;
    //on déclare la constante errorNom et on la récupère dans le dom
    const errorNom = document.getElementById("lastNameErrorMsg");
    //cibler le texte et renvoyer les données 
    //si le champ est vide renvoi null ou erreur car la 'value de l'input' est vide 
    if (e.target.value.length == 0) {
        console.log("vide");
        //Erreur si le champ est vide
        errorNom.innerHTML = "";
        //null pour récupérer la valeur valide du nom par la suite
        textNom = null;
        console.log(textNom);


    }//vérifier que le nom est bien compris entre 2 et 30 si ce n'est pas le cas => affiche l'erreur
    else if (e.target.value.length < 2 || e.target.value.length > 30) {
        errorNom.innerHTML = "Saisir un nom entre 2 et 30 caractères";
        //renvoyer une valeur null pour ne pas valider le champ
        textNom = null;
        console.log("erreur dans le champ Nom = trop court ou trop long");
    }
    //si le champ n'est pas vide on vérifie qu'il est valide avec les Regex MAJ, 
    //min et compris entre 3 et 30 caractères, sont acceptés les -,. et ' ; 
    //les autres caractères sont exclus : chiffres symboles etc
    if (e.target.value.match(/^[a-z A-Z 'éèëç-]{2,30}$/)) {
        //string vide car pas d'erreurs pour cette condition
        errorNom.innerHTML = "";
        //cibler la valeur du champ
        textNom = e.target.value;
        console.log("ç'est bon pour le Nom");
        console.log(textNom);
    }
    //vérifier les caractères spéciaux non compris dans la regex et envoyer 
    //une erreur si ils sont bien dans l'intervalle 3,30 caractères et donc "match et != de e.target.value"
    if (  //IMPORTANT !e
        !e.target.value.match(/^[a-z A-Z 'éèëç-]{2,30}$/) &&
        e.target.value.length > 2 &&
        e.target.value.length < 30)
    //On envoie l'erreur au cas où des chiffres ou autres caractères spéciaux sont envoyés dans le champ
    {
        errorNom.innerHTML = "Le nom ne doit pas contenir de chiffres ou de caractères spéciaux "
        textNom = null
        console.log("erreur dans le champ nom = chiffres ou caract spec présents");
    }


});

//-------ecoute du champ Adresse
adresse.addEventListener("input", function (e) {
    //adresse.value = e.target.value
    //console.log(adresse.value);
    textAdresse;
    //on déclare la constante errorAdresse et on la récupère dans le dom
    const errorAdresse = document.getElementById("addressErrorMsg");
    //cibler le texte et renvoyer les données 
    //si le champ est vide renvoi null ou erreur car la 'value de l'input' est vide 
    if (e.target.value.length == 0) {
        console.log("vide");
        //Erreur si le champ est vide
        errorAdresse.innerHTML = "";
        //null pour récupérer la valeur valide de l'adresse par la suite
        textAdresse = null;
        console.log(textAdresse);


    }//vérifier que l'adresse est bien comprise entre 10 et 40 si ce n'est pas le cas => affiche l'erreur
    else if (e.target.value.length < 10 || e.target.value.length > 40) {
        errorAdresse.innerHTML = "Saisir une Adresse valide comprise entre 3 et 40 caractères";
        //renvoyer une valeur null pour ne pas valider le champ
        textAdresse = null;
        console.log("erreur dans le champ adresse = trop court ou trop long");
    }
    //si le champ n'est pas vide on vérifie qu'il est valide avec les Regex MAJ, 
    //min et compris entre 10 et 40 caractères, sont acceptés les -,. et ' et les chiffres contenus entre 1 et 3 caract  ; 
    //les autres caractères sont exclus : symboles etc
    if (e.target.value.match(/^[0-9]{1,3} [a-z A-Z 'éèëç-]{10,40}$/)) {
        //string vide car pas d'erreurs pour cette condition
        errorAdresse.innerHTML = "";
        //cibler la valeur du champ
        textAdresse = e.target.value;
        console.log("ç'est bon pour l'adresse");
        console.log(textAdresse);
    }
    //vérifier les caractères spéciaux non compris dans la regex et envoyer 
    //une erreur si ils sont bien dans l'intervalle 10,40 caractères et donc "match et != de e.target.value"
    if (  //IMPORTANT !e
        !e.target.value.match(/^[0-9]{1,3} [a-z A-Z 'éèëç-]{10,40}$/) &&
        e.target.value.length > 10 &&
        e.target.value.length < 40)
    //On envoie l'erreur au cas où des chiffres ou autres caractères spéciaux sont envoyés dans le champ
    {
        errorAdresse.innerHTML = "Saisir votre adresse en commençant par les numéros et ne doit pas contenir de caractères spéciaux"
        textAdresse = null
        console.log("erreur dans le champ Adresse = chiffres ou caract spec présents");
    }
});

//--------ecoute du champ Ville
ville.addEventListener("input", function (e) {
    //ville.value = e.target.value
    //console.log(ville.value);
    textVille;
    //on déclare la constante errorVille et on la récupère dans le dom
    const errorVille = document.getElementById("cityErrorMsg");
    //cibler le texte et renvoyer les données 
    //si le champ est vide renvoi null ou erreur car la 'value de l'input' est vide 
    if (e.target.value.length == 0) {
        console.log("vide");
        //Erreur si le champ est vide
        errorVille.innerHTML = "";
        //null pour récupérer la valeur valide de la ville par la suite
        textVille = null;
        console.log(textVille);


    }//vérifier que la ville est bien comprise entre 3 et 30 si ce n'est pas le cas => affiche l'erreur
    else if (e.target.value.length < 3 || e.target.value.length > 30) {
        errorVille.innerHTML = "Saisir un nom entre 3 et 30 caractères";
        //renvoyer une valeur null pour ne pas valider le champ
        textVille = null;
        console.log("erreur dans le champ ville = trop court ou trop long");
    }
    //si le champ n'est pas vide on vérifie qu'il est valide avec les Regex MAJ, 
    //min et compris entre 3 et 30 caractères, sont acceptés les -,. et ' ; 
    //les autres caractères sont exclus : chiffres symboles etc
    if (e.target.value.match(/^[a-z A-Z 'éèëç.-]{3,30}$/)) {
        //string vide car pas d'erreurs pour cette condition
        errorVille.innerHTML = "";
        //cibler la valeur du champ
        textVille = e.target.value;
        console.log("ç'est bon pour la Ville");
        console.log(textVille);
    }
    //vérifier les caractères spéciaux non compris dans la regex et envoyer 
    //une erreur si ils sont bien dans l'intervalle 3,30 caractères et donc "match et != de e.target.value"
    if (  //IMPORTANT !e
        !e.target.value.match(/^[a-z A-Z 'éèëç-]{3,30}$/) &&
        e.target.value.length > 3 &&
        e.target.value.length < 30)
    //On envoie l'erreur au cas où des chiffres ou autres caractères spéciaux sont envoyés dans le champ
    {
        errorVille.innerHTML = "L'adresse ne doit pas contenir de chiffres ou de caractères spéciaux "
        textVille = null
        console.log("erreur dans le champ ville = chiffres ou caract spec présents");
    }


});
//--------ecoute du champ Email
email.addEventListener("input", (e) => {
    textEmail;
    const errorEmail = document.getElementById("emailErrorMsg");

    if (e.target.value.length == 0) {
        errorEmail.innerHTML = "";
        //revenir au texte précédent si champ null
        textEmail = null;
        console.log(textEmail);

    }//utiliser une regex pour valider le champ email : mot . @ chiffres et . avec 2 ou 4 lettres après
    else if (e.target.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
        errorEmail.innerHTML = "";
        textEmail = e.target.value;
        console.log(textEmail);
    }//si la valeur du champ est differente de null et que le champ n'est pas valide dans la regex = erreur
    if (
        !e.target.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/) &&
        !e.target.value.length == 0) {
        errorEmail.innerHTML = "Veuillez saisir une adresse E-mail correcte ex: marie@orange.fr";
        textEmail = null;
        console.log("l'adresse email n'est pas correcte");
        console.log(textEmail);
    }
});

//////////////////////----------------ENVOYER LE FORMULAIRE DANS L API SI VALIDATION DE CELUI-CI --------------////////////////////////////////
//<form method="get" class="cart__order__form">
//<div class="cart__order__form__submit">
//<input type="submit" value="Commander !" id="order"></input>


//récupérer la class de form : class="cart__order__form"
const form = document.querySelector(".cart__order__form");

//ecouter l'évenement a l'envoi du formulaire = 
form.addEventListener("submit", (e) => {
    //arreter l'envoi du formulaire par défaut sinon les données ne sont pas redirigées vers la page confirmation
    e.preventDefault();
    console.log("stop envoi formulaire");

    //envoi du formulaire après validation
    //stocker les valeurs du formulaire seulement si elles ne sont pas null
    if (
        textPrenom != null &&
        textNom != null &&
        textEmail != null &&
        textVille != null &&
        textAdresse != null) {
        console.log("Le formulaire est valide pour l'envoi ");
        alert("La commande est validée")

       
        //récupérer le panier enregistré dans le localstorage
        const validationCommande = JSON.parse(localStorage.getItem("product"));

        //Tableau vide pour la commande qui va contenir les id des produits
        let productID = [];
        console.log(validationCommande);
        console.log(productID);

        //Aleter si le formulaire est rempli mais que le panier ne contient aucun produit
        if (validationCommande == null) {
            console.log(validationCommande);
            alert("Attention le panier est vide")
        }

        //injecter le panier dans la validation de la commande
        validationCommande.forEach((confirmation) => {
            //on push l'id des produits qui sont dans la validation de la commande
            productID.push(confirmation.id);

        });
        console.log(productID);
        //////---------info back-end conntroller/product.js à recopier pour l'utiliser-----------////////////
                          /**
                             *
                             * Expects request to contain:
                             * contact: {
                             *   firstName: string,
                             *   lastName: string,
                             *   address: string,
                             *   city: string,
                             *   email: string
                             * }
                             * products: [string] <-- array of product _id
                             *
                             */
         ///////////----------------------------------------------------------------------------//////////
        
        //stocker le formulaire et les données enregistrees pour l'envoyer à l'API 
        const données = {
            //objet contact contenant les données
            contact: {
                firstName: textPrenom,
                lastName: textNom,
                address: textAdresse,
                city: textVille,
                email: textEmail,

            },
            //ajouter le tableau des produits aux données 
            products: productID,
        };

        console.log(données);


        //////////////////----------------REQUETE POST API---------------/////////////////

//route trouvée dans le back-end = router.post('/order', productCtrl.orderProducts) pour la requête post


        //fetch API avec l'adresse des produits et ajouter '/order'
        fetch("http://localhost:3000/api/products/order", {
            //ajouter la methode post et headers 
            method: "POST",
            headers: { "Content-Type": "application/json;charset=utf-8" },
            //ajouter contact et productsID et transformer les données en string
            body: JSON.stringify(données),
        })
            .then((res) => res.json())
            .then((promise) => {
                //réponse émise dans le server 
                responseByServer = promise;
                //console.log(responseByServer);


                //récupérer les données de la commande avec  order à l'intérieur de la réponse du serveur
                //const donnéesContact = responseByServer.contact;
                const orderId = responseByServer.orderId;

            /*    //si il n'y a pas de commande déjà enregistrée dans localStorage (variable confirmCommande parsée plus haut)
                if (confirmCommande == null) {
                    confirmCommande = []
                    confirmCommande.push(donnéesContact);
                    console.log(confirmCommande);
                    localStorage.setItem("commandeUser", JSON.stringify(confirmCommande));
                }
                // si la commande existe dejà dans le localStorage on push la dernière commande
                else if (confirmCommande != null) {
                    confirmCommande.push(donnéesContact);
                    localStorage.setItem("commandeUser", JSON.stringify(confirmCommande));
                }
                console.log(confirmCommande);*/



                //supprimer le panier des produits du localStorage après avoir passé la commande
                localStorage.removeItem("product");

                //on redirige l'utilisateur sur la page Confirmation quand il clique sur le bouton Commander, 
                //on passe l'ID : 'id=' de la commande dans l'Url en injectant orderId grâce à '?' = SEARCH 
                // pour le récupérer dans la page confirmation
                window.location = `confirmation.html?id=${orderId}`

            })

        //Effacer le formulaire après avoir passé la commande sinon celui-ci reste stocké dans la page panier
        prenom.value = "";
        nom.value = "";
        adresse.value = "";
        ville.value = "";
        email.value = "";
        textPrenom = null;
        textNom = null;
        textAdresse = null;
        textVille = null;
        textEmail = null;


    // Si le formulaire n'est pas rempli ou que une des valeurrs est null = alerte remplir le formulaire correctement
    } else {
        alert("Le formulaire n'est pas rempli correctement");
    }

})
//appel de la fonction pour l'afficher
console.log(confirmCommande)
