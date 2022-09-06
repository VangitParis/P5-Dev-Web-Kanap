

//requeter l'api qui doit être personnalisée
const idUrl = new URL(window.location).searchParams.get('id');
const url = 'http://localhost:3000/api/products/' + idUrl;

let product = JSON.parse(localStorage.getItem("product"));
//console.log(product);


let singleProduct = [];
//console.log(singleProduct);

//Creation d'une fetch() pour récupérer l'API des produits
fetch("http://localhost:3000/api/products/" + idUrl)
    //création d'une 'promise' pour la réponse (ok:console.log)
    .then((res) => res.json())
    //réponse pour chaque produit dans le tableau créé à partir de json
    .then((promise) => {
        singleProduct = promise;
        //console.log(singleProduct);

        const kanapChoice = singleProduct;
        //console.log(kanapChoice);


        //création des éléments dans le dom
        let img = document.querySelector(".item__img");
        let h1 = document.querySelector("#title");
        let price = document.querySelector("#price");
        let p = document.querySelector("#description");

        //Récupération de l'élément du DOM qui accueillera l'image 
        let img_item = document.getElementsByClassName("item__img");
        //console.log(img_item);
        //image du produit
        let imgKanapChoice = document.createElement("img");
        imgKanapChoice.src = kanapChoice.imageUrl;
        imgKanapChoice.setAttribute("alt", kanapChoice.altTxt);
        //console.log(imgKanapChoice);
        img.appendChild(imgKanapChoice);

        //nom du kanap
        let nameKanapChoice = document.createElement("h1");
        nameKanapChoice.textContent = kanapChoice.name;
        h1.appendChild(nameKanapChoice);

        //prix du kanap
        let priceKanapchoice = document.createElement('span');
        priceKanapchoice.textContent = kanapChoice.price;
        price.appendChild(priceKanapchoice);
        //console.log(priceKanapchoice);


        // description du kanap
        let descriptionKanapchoice = document.createElement('p');
        descriptionKanapchoice.textContent = kanapChoice.description;
        p.appendChild(descriptionKanapchoice);

        //couleurs du kanap
        let colors = document.querySelector("#colors");

        //console.log(colors)
        let optionColors = kanapChoice.colors;
        //console.log(optionColors)

        let inputValidation = document.getElementById("quantity");
        inputValidation.setAttribute("required", "");



        //boucle pour faire apparaitre les options pour la couleur du kanap
        for (let i = 0; i < optionColors.length; i++) {
            // creation de la variable option pour le choix des couleurs
            let optioncolor = optionColors[i];
            //console.log(colors);

            //récupération du choix des options dans le dom
            let optionColorsKanapChoice = document.createElement("option");
            //console.log(optionColorsKanapChoice);

            // création de la valeur attribuée aux choix des couleurs
            optionColorsKanapChoice.setAttribute = ("value", optioncolor);
            //distinction des couleurs dans le menu déroulant
            optionColorsKanapChoice.textContent = optioncolor;
            //console.log(optioncolor);
            //faire apparaître les couleurs dans le menu déroulant 
            colors.appendChild(optionColorsKanapChoice);





        }
        addProductToCart(singleProduct);
    });

// création de la fonction pour l'ajout au panier 
const addProductToCart = () => {

    //Ajouter le bouton dans le localstorage grâce à son id dans le dom
    let btnAddToCart = document.getElementById("addToCart");
    //console.log(btnAddToCart);


    //ajout d'un suivi au click du bouton
    btnAddToCart.addEventListener("click", () => {

        //produits enregistrés dans le localstorage sous forme de tableau
        let local = JSON.parse(localStorage.getItem("product"));
        //console.log(local)//null




        //fonction pour assigner les détails du produit (id, quantité, et couleur)  
        let product = {
            id: `${singleProduct._id}`,
            color: `${colors.value}`,
            quantity: parseInt(quantity.value),
            imageUrl: `${singleProduct.imageUrl}`,
            altTxt: `${singleProduct.altTxt}`,
            description: `${singleProduct.description}`,
            nom: `${singleProduct.name}`,
            price: `${singleProduct.price}`
        };

        console.log(product.price)
        //Fonction : ajouter un produit dans le localstorage
        const ajouterProduit = () => {
            //.push pour ajouter le produit dans le tableau vide
            local.push(product);
            localStorage.setItem("product", JSON.stringify(local));

        };

        //Attention particulière à la saisie des quantités dans la page produit

        //Si l'utilisateur saisi 0 ou moins (valeurs négatives)
        if (quantity.value < 1) {
            alert(" merci de sélectionner une quantité minimum de 1")
            quantity.value = 1;
            return (
                quantity.value == NaN
            )
            //Si l'utilisateur saisi plus de 100 articles
        } else if (quantity.value > 100) {
            alert("vous ne pouvez pas choisir plus de 100 articles pour ce produit")
            quantity.value = 100

            return (
                quantity.value == NaN
            )

        };


        //Lorsqu’on ajoute un produit au panier, si celui-ci n'était pas déjà
        //présent dans le panier, on ajoute un nouvel élément dans l’array.

        //si le tableau local renvoi null on exécute la condition
        if (local == null) {
            //on crée un tableau local vide
            local = [];
            //on injecte le produit et on enregistre dans le localstorage
            ajouterProduit();
            console.log(local);


            //Lorsqu’on ajoute un produit au panier, si celui-ci était déjà présent
            //dans le panier (même id + même couleur), on incrémente
            //simplement la quantité du produit correspondant dans l’array.

            //si le tableau n'est pas null ( non vide)
        } else if (local != null) {
            //on parcoure le tableau avec une boucle pour savoir si le produit est bien dans le tableau local
            for (i = 0; i < local.length; i++) {
                console.log("test1");

                // on vérifie si le produit qui est dans le tableau a le même id et la  même couleur
                if (((local[i]).id == singleProduct._id) && (local[i].color == colors.value)) {
                    //console.log((local[i]).id); 
                    //éviter la redondance du panier pour une quantité supérieure à 100 pour le même produit
                    if (local[i].quantity >=100) {
                        console.log("empecher l'ajout d'article identique >100");
                        alert("vous ne pouvez pas choisir plus de 100 articles pour ce produit")
                    
                        return (
                            local[i].quantity == NaN
                        )
                    };
                    //on récupère la réponse retournée par la condition et on ajoute 
                    //la quantité choise si le produit est déjà présent
                    return (
                        local[i].quantity += parseInt(quantity.value),
                        //parseInt permet de récupérer la quantité de l'input
                        console.log("quantité choise ajoutée"),
                        localStorage.setItem("product", JSON.stringify(local)),
                        //enregistrement dans le localStorage
                        (local = JSON.parse(localStorage.getItem("product")))
                        //location.reload()

                    );


                }

            }
            //pour savoir s'il trouve un produit avec un id et une couleur diff 
            //ou s'il trouve un id diff et une couleur diff (=nouveau produit)
            //on crée une boucle pour parcourir le tableau 
            for (i = 0; i < local.length; i++) {

                if (
                    //id et couleur diff
                    ((local[i]).id == singleProduct._id) && ((local[i]).color != colors.value)
                    //id diff ou couleur diff
                    || ((local[i]).id != singleProduct._id)
                )

                //on récupère la réponse retournée par la condition et 
                //on ajoute le nouveau produit dans le tableau
                {
                    return (
                        console.log("nouveauproduitinjecté"),
                        ajouterProduit(),
                        //enregistrement dans le localStorage
                        local = JSON.parse(localStorage.getItem("product")),
                        location.reload()
                    );
                }
            }
        }

    });

    //enregistrement du localStorage
    return (local = JSON.parse(localStorage.getItem("product")));

};












