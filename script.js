const personnes = [
    { id : 1 ,nom:'thioro', prenom: 'faye' , telephone : '785830419', email : 'faye@gmail.com',
    photo :'https://images.unsplash.com/photo-1602233158242-3ba0ac4d2167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=436&q=80',
     transactions: [{numero: '1' , date: '31/01/2022',sens: '1', montant: 3000 , },
             {numero: '2' , date: '31/01/2022',sens: '-1', montant: 1000 ,},
      ]  
     },

    { id : 2, nom:'diarra', prenom: 'diop', telephone : '785641231', email : 'diop@gmail.com',
     photo :'https://images.unsplash.com/photo-1606814893907-c2e42943c91f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
     transactions: [{numero: '6' , date: '31/07/2022',sens: '1', montant: 3000 ,},  ]
      } ,

    { id : 3, nom:'julien', prenom: 'diatta', telephone : '775623231', email : 'julien@gmail.com' , 
    photo :'https://images.unsplash.com/photo-1485875437342-9b39470b3d95?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=873&q=80', 
    transactions: [{numero: '10' , date: '01/01/2023',sens: '1', montant: 8000 , },]
      },

    { id : 4, nom:'babacar', prenom: 'ndaye', telephone : '767541211', email : 'ndiaye@gmail.com',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80,' ,
     transactions: [{numero: '7' , date: '12/09/2022',sens: '1', montant: 100 ,}] },

    { id : 5, nom:'moustapha', prenom: 'dione', telephone : '771119878', email : 'mousdione@gmail.com',
    photo: 'https://images.unsplash.com/photo-1508341591423-4347099e1f19?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
      transactions: [
        {numero: '6' , date: '31/01/2023',sens: '1', montant: 1000 , },]  
    },     
];

const suivant=document.querySelector('.next');
const plus = document.querySelector('.btn-detail');
const form = document.querySelector('.form');
const enregistrer = document.querySelector('.enregister');
const code = document.querySelector('code');
const erreur = document.querySelector('.erreur');
const num = document.querySelector('#numero-tel');
const rechercheInput = document.querySelector('#results-input');
const inputNum = document.querySelector('.input-num');
const montant = document.getElementById('mnt');
const recherche = document.querySelector('#search');
const resultatsRecherche = document.querySelector('#results-search');
const inputRecherche = document.querySelector('.input-search');
const fermeForm = document.querySelector('.fermer-form');
const fermeRecherche = document.querySelector('.fermer-recherche');
const fermerDetail =document.querySelector('.fermer-detail');

const ajouter = document.querySelector('#ajouter');
const annuler = document.querySelector('#annuler')
const addUser = document.querySelector('.add-user');
const modal = document.querySelector('.modal-add-user');
const addNom =document.querySelector('#add-nom');
const addPrenom =document.querySelector('#add-prenom');
const addTelephone =document.querySelector('#add-tel');
const addEmail =document.querySelector('#add-email');
const addprofil =document.querySelector('#add-profil');

const oui = document.querySelector('.oui');
const non = document.querySelector('.non');
const supCondition = document.querySelector('.sup-condition');
const supprime = document.querySelectorAll('.sup');
const supTransfere = document.querySelector('.sup-transfere');

const notif = document.querySelector('.notif');
const detail= document.querySelector('.detail');
const tailleTab=personnes.length;
let posCourant=randomPos(tailleTab);

// =========================les fonctions=========================================
function afficherPersonne(personne)
{
    // const img=document.querySelector('img');
    const nom = document.querySelector('#lastname');
    const prenom = document.querySelector('#firstname');
    const telephone = document.querySelector('#phone');
    const email = document.querySelector('#email');
    const spinner = document.querySelector('.spinner');
    const photoEl=document.querySelector('.photo');
    let photo=new Image();
    photo.src =personne.photo;
    photoEl.innerHTML=photo.outerHTML;
    //charger les spinners
    photo.onload=()=>{
        // desactiver le spinner
        spinner.style.display="none";
        //afficher les informations du personne
        nom.innerHTML=personne.nom;
        prenom.innerHTML=personne.prenom;
        telephone.innerHTML=personne.telephone;
        email.innerHTML=personne.email;
        // afficher les transactions
        afficherTransactions(personne.transactions);
        code.innerHTML=personne.transactions.length;
        solde.innerHTML = calculeSolde(personne.transactions);
     }
}
function randomPos(max) {
    return Math.floor(Math.random()*max);
}
function afficherTransactions(transactions)
{
    const tbody=document.querySelector('tbody');
    tbody.innerHTML="";
    transactions.forEach(trans=>{
        let sens = getTransactionType(trans.sens);
        tbody.innerHTML+=` <tr >
        <td>${trans.numero}</td>
        <td>${trans.date}</td>
        <td>${sens}</td>
        <td>${trans.montant}</td>
    </tr>` 
    });
}
supprime.forEach(sup => {
    sup.addEventListener('click', ()=>{
         supTransfere.style.display = 'block';
        personnes[posCourant].transactions.forEach(trans=>{
            let sens = getTransactionType(trans.sens);
            if(sens == 'Retrait' || sens == 'transfere annuler' || sens == 'Dépôt')
            {
                supCondition.innerHTML = "vous ne pouvez annuler qu'un transfert"
            }
            if(sens== `transfere au ${num.value}`)
            {
                supCondition.innerHTML = '';
                oui.addEventListener('click' ,()=>{
                    numero=personnes[posCourant].transactions.length + 1 ; 
                    date = dater();
                    mont = montant.value;
                    let objet = {
                                numero: numero, date: date,  sens:sens , montant: mont 
                                }
                    let objet2 = {...objet}
                    objet2.sens='4';
                    personnes[posCourant].transactions.push(objet2);
                    code.innerHTML=personnes[posCourant].transactions.length;
                    solde.innerHTML = calculeSolde(personnes[posCourant].transactions);
                    afficherPersonne(personnes[posCourant]);
                   let  indice=recherNumero(personnes, num.value)
                    if (indice !=-1) {
                        let objet1 = {...objet}
                        objet1.sens='5';
                        objet1.numero= personnes[indice].transactions.length + 1 ;
                        personnes[indice].transactions.push(objet1); 
                        supTransfere.style.display = 'none'; 
                    }
                } )
            }
        });
    }) 
});
non.addEventListener('click' , ()=>supTransfere.style.display = 'none')
function getTransactionType(sens)
 {
    if (sens == 1) 
      return 'Dépôt';
     else if (sens == -1) 
      return 'Retrait';
     else if(sens == 2) 
      return  `transfere au ${num.value}`;
     else if(sens == 3) 
       return 'transfere annuler'
       else if(sens == 4) 
       {
        return  `transfere rembouser`;
       }
       else if(sens == 5) 
       {
        return  `<del>cette transfere a été annuler</del> `;
       }
}
afficherPersonne(personnes[posCourant]);
suivant.addEventListener('click',()=>{
    posCourant=randomPos(tailleTab);
    afficherPersonne(personnes[posCourant]);
    // console.log(supprime.length);
});
function calculeSolde(personnes) 
{
    let solde = 0;
    personnes.forEach(personne => {
        let mont  = +personne.montant
        if (personne.sens == 1 || personne.sens == 3 || personne.sens == 4 )  // Si sens = 1, on ajoute le montant
        solde += mont;
        if (personne.sens == -1 || personne.sens == 2 ||  personne.sens == 5)
            solde -= mont;
    });
    return solde;
}
function recherNumero(tableau, numero)
{
   return  tableau.findIndex(table => table.telephone == numero);  
}
function afficherNotif(message)
{
    notif.innerHTML = message;
    notif.style.display = 'block';
    setTimeout(() => {
        notif.style.display = 'none';
    }, 5000);
}
// si la saisie est un alphanumerique
function EmailValide(inputText)
{
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(inputText.match(mailformat))
      return true;
    else
      return false;
}  
// =============================================== les evenements ============================
plus.addEventListener('click', () => {
    form.style =
    `
    position: absolute;
    padding: 10px;
    top: 0;
    left: 100%;
    background-color: #27566B;
    /* width: 100px;
    height: 100px; */
    background-color: #06293D;
    display : block; `
    montant.value ="";
    num.value = "";
    erreur.innerHTML='';
});
fermeForm.addEventListener('click', ()=> form.style.display ='none');
enregistrer.addEventListener('click', () =>{
    const transa = document.getElementById('trans');
    const solde=document.querySelector('#solde'); 
    if( montant.value == '')
       erreur.innerHTML =  'il faut entrer une montant'
    else if(+montant.value <= 0)
      erreur.innerHTML = 'il faut entrer une montant valide' 
    else if (+montant.value < 500)
        erreur.innerHTML = 'votre montant doit etre superieur ou égal à 500'
    else
    {
        solde.innerHTML = calculeSolde(personnes[posCourant].transactions);
        let sol = solde.innerHTML;
        if ( transa.value == "r" && +montant.value  > sol)
                erreur.innerHTML = 'le montant est supérieur au solde';
        else if (transa.value == "d" && +montant.value > 200001)
                erreur.innerHTML = 'Vous avez atteint votre planfond';
        else
            {
                if(num.value == "" )
                {
                    if(transa.value == "d")
                        sens = 1;
                    if(transa.value == "r")
                        sens = -1;
                    erreur.innerHTML = '';
                    numero=personnes[posCourant].transactions.length + 1 ; 
                        date = dater();
                        mont = montant.value;
                    let objet = {
                                numero: numero, date: date,  sens: sens, montant: mont 
                            };
                    personnes[posCourant].transactions.push(objet); 
                    console.log(personnes[posCourant]);

                    code.innerHTML=personnes[posCourant].transactions.length;
                    solde.innerHTML = calculeSolde(personnes[posCourant].transactions);
                    afficherPersonne(personnes[posCourant]);
                    form.style.display = 'none'; 
                }
                else
                {
                    erreur.innerHTML = '';
                    let indice = recherNumero(personnes , num.value)
                    if(indice == -1)
                    {
                        erreur.innerHTML = "le numero n'existe pas "; 
                        if(transa.value == "r")
                                sens = 2;
                            erreur.innerHTML = '';
                            numero=personnes[posCourant].transactions.length + 1 ; 
                            date = dater();
                            mont = montant.value;
                            let objet = {
                                        numero: numero, date: date,  sens:sens , montant: mont 
                                        }
                            personnes[posCourant].transactions.push(objet);
                            code.innerHTML=personnes[posCourant].transactions.length;
                            solde.innerHTML = calculeSolde(personnes[posCourant].transactions);
                            afficherPersonne(personnes[posCourant]);
                            setTimeout(() => {
                            if(transa.value == "r")
                                sens = 3;
                            erreur.innerHTML = '';
                            numero=personnes[posCourant].transactions.length + 1 ; 
                            date = dater();
                            mont = montant.value;
                            let objet = {
                                        numero: numero, date: date,  sens:sens , montant: mont 
                                        }
                            personnes[posCourant].transactions.push(objet);
                            code.innerHTML=personnes[posCourant].transactions.length;
                            solde.innerHTML = calculeSolde(personnes[posCourant].transactions);
                            afficherPersonne(personnes[posCourant]);
                            form.style.display = 'none';
                            
                        }, 3000);
                        erreur.innerHTML = "le numero n'existe pas "; 
                    }
                    else if( indice == posCourant )
                    erreur.innerHTML = "vous ne pouvez pas faire un retrait sur vous-meme ";
                    else
                    {
                        if (transa.value == "d")
                            erreur.innerHTML = 'tu ne peux faire que des retraits';
                        else
                        {
                            if(transa.value == "r")
                                sens = 2;
                            erreur.innerHTML = '';
                            numero=personnes[posCourant].transactions.length + 1 ; 
                            date = dater();
                            mont = montant.value;
                            let objet = {
                                        numero: numero, date: date,  sens:sens , montant: mont 
                                        }
                            personnes[posCourant].transactions.push(objet);
                            code.innerHTML=personnes[posCourant].transactions.length;
                            solde.innerHTML = calculeSolde(personnes[posCourant].transactions);
                            afficherPersonne(personnes[posCourant]);
                            let objet1 = {...objet}
                            objet1.sens='1';
                            objet1.numero= personnes[indice].transactions.length + 1 ;
                            personnes[indice].transactions.push(objet1); 
                            form.style.display = 'none';
                            detail.style.display = 'block';
                            const montTrans= document.querySelector('.montTrans');
                            const numTrans= document.querySelector('.numTrans');
                            const dateTrans = document.querySelector('.dateTrans');
                            const soldeAc= document.querySelector('.soldeAc');
                            montTrans.innerHTML = `${mont}`;
                            numTrans.innerHTML = `${num.value}`;
                            dateTrans.innerHTML= dater();
                            soldeAc.innerHTML = `${calculeSolde(personnes[posCourant].transactions)}`
                        }
                    }
                } 
            }
      }
  });
fermerDetail.addEventListener('click',()=>detail.style.display = 'none')

function dater() {
    let date = new Date();
    // Options de localisation pour la date et l'heure
    let options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false
    };

    // Obtenir la date et l'heure locale avec les options de localisation
    let dateLocale = date.toLocaleString('fr-FR', options);

    // Afficher la date et l'heure locale
    // console.log(dateLocale);
    return dateLocale
}
let  dta = dater();
console.log(dta);
num.addEventListener('input', (event)=>{
    inputNum.style.display = 'block';
    rechercheInput.innerHTML = '';
    const rechercheValeur = event.target.value;
    if (rechercheValeur.length >= 2)  
    {
        const filteredPersonnes = personnes.filter(personne => personne.telephone.startsWith(rechercheValeur)) ;
        filteredPersonnes.forEach(personne => {
        const li = document.createElement('li');
        li.textContent = `${personne.nom} ${personne.prenom}: ${personne.telephone}`;
        li.addEventListener('click', ()=>{
        num.value = personne.telephone;
        inputNum.style.display = 'none';
        });
        rechercheInput.appendChild(li) 
    });
    }
});
 recherche.addEventListener('input', ()=>{
    inputRecherche.style.display = 'block';
    resultatsRecherche.innerHTML = '';
    // Récupérer la valeur saisie par l'utilisateur
    const valeurRecherche = recherche.value.trim().toLowerCase();
     // Rechercher tous les personnes dont le nom ou le numéro de téléphone commence par les 3 premiers caractères de la recherche
     const resultats = personnes.filter(personne => 
        personne.nom.toLowerCase().startsWith(valeurRecherche) ||
        personne.telephone.startsWith(valeurRecherche)||
        personne.prenom.toLowerCase().startsWith(valeurRecherche) );
      resultats.forEach(personne => {
        const element = document.createElement("li");
        element.textContent = `${personne.nom} ${personne.prenom}: ${personne.telephone}`;
        element.addEventListener('click', () => {
            let rech = recherNumero(personnes , personne.telephone);
            if(rech != -1)
                afficherPersonne(personnes[rech]);
                recherche.value = '';
                inputRecherche.style.display = 'none';
            })
        resultatsRecherche.appendChild(element);
      });
 });
fermeRecherche.addEventListener('click', ()=>{
    recherche.value = '';
    inputRecherche.style.display = 'none';
});
addUser.addEventListener('click', ()=>{
    modal.style.display = 'block'; 
    addNom.value='' ;
    addPrenom.value='' ;
    addTelephone.value='' ;
    addEmail.value='' ;
    addprofil.value='' ;
} );
annuler.addEventListener('click',()=>modal.style.display = 'none');
ajouter.addEventListener('click', ()=>{
     const  nom = addNom.value;
    const  prenom = addPrenom.value;
    const  telephone = addTelephone.value;
    const  email = addEmail.value;
    const  profil = addprofil.value;
    let isvalid =  EmailValide(email);
   let  existe = recherNumero(personnes , telephone)
   if (nom == ""|| prenom == ""|| telephone == ""|| email == "" 
        || profil=="") 
     afficherNotif('Il faut remplir tous les champs');
   else if (telephone.length != 9)
    afficherNotif("La longueur d'un numero est de 9 chiffres  ");
   else if (!isvalid)
    afficherNotif("Veuillez saisir uniquement des lettres et des chiffres et L'adresse email n'est pas valide , il doit contenir @gmail.com .");
   else if (existe!= -1)
     afficherNotif("Cet numéro de téléphone existe déjà");
   else
   {
        const ajoutPersonne = {
            id :personnes[personnes.length - 1].id + 1,
            nom: nom,
            prenom: prenom,
            telephone: telephone,
            email: email,
            photo: profil,
            solde: 0,
            transactions: []
        }
        personnes.push(ajoutPersonne);
        let indice = recherNumero(personnes , telephone);
        if(indice != -1)
        afficherPersonne(personnes[indice]);
        posCourant =  personnes.length - 1;
         console.log(personnes);
        modal.style.display = 'none';
        console.log(personnes[posCourant]);
   }
});



// annuler transfere





    



