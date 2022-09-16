
/////----------------------------RECUPERER ID DE L URL, VIDER LE LOCALSTORAGE--------////////////////////////


//Constante qui va récupérer l'id de commande dans l'url de la page avec la méthode URLSEARCHPARAM
const confirmationCommande = new URL(window.location).searchParams.get('id');
//console.log(confirmationCommande);

 
//Injecter le numero de commande dans la span qui a pour Id:"orderId"
 let numOrder = document.getElementById ("orderId");
 numOrder.textContent = `${confirmationCommande}`;
 //console.log(numOrder);
   
 
 //Effacer le localStorage
 localStorage.removeItem("commandeUser");
   

