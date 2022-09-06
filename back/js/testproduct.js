// création de la fonction pour l'ajout au panier 
const addProductToCart = () => {

    //Ajouter le bouton dans le localstorage grâce à son id dans le dom
    let btnAddToCart = document.getElementById("addToCart");
    //console.log(btnAddToCart);

    //ajout d'un suivi au click du bouton
    btnAddToCart.addEventListener("click", () => {

        //fonction pour assigner les détails du produit (id, quantité, et couleur)
        let product = {
            id: `${singleProduct._id}`,
            color: `${colors.value}`,
            quantity: `${quantity.value}`
        };
        //console.log(product);


        //produits enregistrés dans le localstorage sous forme de tableau
        let local = JSON.parse(localStorage.getItem("product"));
        //console.log(local)

        //Fonction : ajouter un produit dans le localstorage
        const ajouterProduit = () => {
            //.push pour ajouter le produit dans le tableau vide
            local.push(product);
            localStorage.setItem("product", JSON.stringify(local));
        };

        //Lorsqu’on ajoute un produit au panier, si celui-ci n'était pas déjà
        //présent dans le panier, on ajoute un nouvel élément dans l’array.
        if (local) { //true
            // appel de la fonction pour ajouter le produit au tableau
            ajouterProduit();
        } else  {
            local = [];
            ajouterProduit()
        
        }
        //Lorsqu’on ajoute un produit au panier, si celui-ci était déjà présent
        //dans le panier (même id + même couleur), on incrémente
        //simplement la quantité du produit correspondant dans l’array.
     if (product) {
            for (i = 0; i < local.length; i++) {
                console.log("test")

                if (local[i].id == singleProduct._id && local[i].color == colors.value) {
                    //console.log(colors.value);  
                    return(
                        
                        local[i].quantity++,
                        console.log("quantity++"),
                        localStorage.setItem("product", JSON.stringify(local)),
                        (local = JSON.parse(localStorage.getItem("product")))
                    
    )
                }
            };
        };

        return (local = JSON.parse(localStorage.getItem("product")))
        
     

    });

};
//Lorsqu’on ajoute un produit au panier, si celui-ci était déjà présent
        //dans le panier (même id + même couleur), on incrémente
        //simplement la quantité du produit correspondant dans l’array.
        if (local) {
            for (i = 0; i < local.length; i++) {
                console.log("test");

                if ((local[i]).id && (local[i].color == colors.value)) {
                
                    //console.log((local[i]).id);  

                    return (
                        (`${quantity.value}` + (local[i]).quantity),
                        console.log("quantity++"),
                        localStorage.setItem("product", JSON.stringify(local)),
                        (local = JSON.parse(localStorage.getItem("product")))
                    )
                } else {
                    local.push(product);
                    localStorage.setItem("product", JSON.stringify(local));
                }


            }
            return (local = JSON.parse(localStorage.getItem("product")));
        };

