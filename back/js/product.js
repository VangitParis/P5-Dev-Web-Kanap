/////----------REQUETER API POUR RECUPERER LES ID DES PRODUITS INDIVUDELLEMENT------//////////


//requeter l'api qui doit être personnalisée
const idUrl = new URL(window.location).searchParams.get('id');
const url = 'http://localhost:3000/api/products/' + idUrl;

//récupérer le localStorage 
//let product = JSON.parse(localStorage.getItem("product"));
//console.log(product);

//Créer un Tableau vide pour y mettre 
let singleProduct = [];
//console.log(singleProduct);

//Creation d'une fetch() pour récupérer l'API des produits
fetch("http://localhost:3000/api/products/" + idUrl)
    //création d'une 'promise' pour la réponse (ok:console.log)
    .then((res) => res.json())
    //réponse pour chaque produit dans le tableau créé à partir de json
    .then((promise) => {
        singleProduct = promise;
        //singleProduct.price = data.price;
        //console.log(singleProduct._id);


        const kanapChoice = singleProduct;
        //console.log(kanapChoice);


        //création des éléments dans le dom
        let img = document.querySelector(".item__img");
        let h1 = document.querySelector("#title");
        let price = document.querySelector("#price");
        let p = document.querySelector("#description");

        //Récupération de l'élément du DOM qui accueillera l'image 
        //let img_item = document.getElementsByClassName("item__img");
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


        };

        addProductToCart(singleProduct);
    });

// création de la fonction pour l'ajout au panier 
const addProductToCart = () => {

    //Ajouter le bouton dans le localstorage grâce à son id dans le dom
    let btnAddToCart = document.getElementById("addToCart");
    //console.log(btnAddToCart);

    //ajout d'un suivi au click du bouton Ajouter au panier
    btnAddToCart.addEventListener("click", () => {


        //produits enregistrés dans le localstorage sous forme de tableau
        let local = JSON.parse(localStorage.getItem("product"));
        //console.log(local)//null


        localStorage.setItem("product", JSON.stringify(local));
        //fonction pour assigner les détails du produit (id, quantité, et couleur)  
        let productDetails = {
            id: `${singleProduct._id}`,
            color: `${colors.value}`,
            quantity: parseInt(quantity.value),
            imageUrl: `${singleProduct.imageUrl}`,
            altTxt: `${singleProduct.altTxt}`,
            nom: `${singleProduct.name}`,
        };
        console.log(`${colors.value}`);

        //Fonction : ajouter un produit dans le localstorage
        function ajouterProduit() {
            //.push pour ajouter le produit dans le tableau vide
            local.push(productDetails);
            localStorage.setItem("product", JSON.stringify(local));
            (local = JSON.parse(localStorage.getItem("product")))
        }

        //Attention particulière à la non saisie des couleurs
        //Si l'utilisateur ne choisit pas de couleurs
        if (colors.value == 0) {
            console.log(colors.value);
            //création d'une div pour envoyer un message html en cas de non-choix de la couleur
            let requiredColors = document.createElement("div")
            let divColors = document.querySelector(".item__content__settings__color")
            requiredColors.setAttribute("id", "texte")
            requiredColors.setAttribute("style", "color:#fbbcbc")
            divColors.appendChild(requiredColors);
            //msg si l'utilisateur ne choisit pas de couleurs
            requiredColors.textContent = ("Merci de sélectionner une couleur")

            //fonction effacer les div suivantes avec display
            function removeDivs() {
                divMsg = document.getElementById('texte');

                if (requiredColors.style.display == 'block') {
                    requiredColors.style.display = 'none'

                }
                else
                    requiredColors.style.display = 'block';

            }
            removeDivs();
            //delai pour que le message disparaisse
            setTimeout((removeDivs), 2000)
            //console.log(divMsg);
            
            return (
                colors.value == NaN
            )


        };

        //Attention particulière à la saisie des quantités dans la page produit
        let requiredQuantity = document.createElement("div");
        let divMinQuantity = document.querySelector(".item__content__settings__quantity");
        requiredQuantity.setAttribute("id", "texte");
        requiredQuantity.setAttribute("style", "color:#fbbcbc");
        divMinQuantity.appendChild(requiredQuantity);

        //fonction effacer les div suivantes avec display
        function removeDivs() {

            if (requiredQuantity.style.display == 'block') {
                requiredQuantity.style.display = 'none'

            }
            else
                requiredQuantity.style.display = 'block';

        }
        removeDivs();
        //delai pour que le message disparaisse
        setTimeout((removeDivs), 2000)

        //Si l'utilisateur saisi 0 ou moins (valeurs négatives)
        if (quantity.value < 1) {
            //msg si l'utilisateur choisit une quantité < 1
            requiredQuantity.textContent = ("Merci de sélectionner une quantité minimum de 1")
            quantity.value = 1;
            return (
                quantity.value == NaN
            )

            //Si l'utilisateur saisi plus de 100 articles
        } else if (quantity.value > 100) {
            requiredQuantity.textContent = ("Vous ne pouvez pas choisir plus de 100 articles pour ce produit")
            //alert("Vous ne pouvez pas choisir plus de 100 articles pour ce produit")
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
            alert("Ajouté au panier");
            //console.log(local);

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
                    if (local[i].quantity >= 100) {
                        requiredQuantity.textContent = ("Attention, la quantité maximale pour ce produit a été atteinte")

                        return (
                            local[i].quantity == NaN
                            //local[i].quantity += parseInt(quantity.value) == NaN
                        )


                        //Si la quantité totale dépasse 100 ne pas ajouter le produit
                    } else if (local[i].quantity + parseInt(quantity.value) >= 100) {

                        requiredQuantity.textContent = ("Attention, la quantité maximale pour ce produit a été atteinte")

                        return (
                            local[i].quantity == NaN
                            //local[i].quantity += parseInt(quantity.value) == NaN
                        )

                    };

                    //on récupère la réponse retournée par la condition et on ajoute 
                    //la quantité choise si le produit est déjà présent
                    return (
                        local[i].quantity += parseInt(quantity.value),
                        //parseInt permet de récupérer la quantité de l'input
                        console.log("quantité choise ajoutée"),

                        alert("Ajouté au panier"),

                        localStorage.setItem("product", JSON.stringify(local)),
                        //enregistrement dans le localStorage
                        (local = JSON.parse(localStorage.getItem("product")))


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
                        alert("Ajouté au panier"),
                        //enregistrement dans le localStorage
                        local = JSON.parse(localStorage.getItem("product"))
                        //location.reload()
                    );
                }
            }
        }

    });

    //enregistrement du localStorage
    return (local = JSON.parse(localStorage.getItem("product")));

};












