const personnes = [
    { id : 1 ,nom:'thioro', prenom: 'faye' , telephone : '785830419', email : 'faye@gmail.com',
    photo :'https://images.unsplash.com/photo-1602233158242-3ba0ac4d2167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=436&q=80',
     transactions: [{numero: '1' , date: '31/01/2022',sens: '1', montant: 3000 , },
             {numero: '2' , date: '31/01/2022',sens: '-1', montant: 1000 ,},
            //  {numero: 3 , date: '31/01/2022',sens: 1, montant: 100},
            //  {numero: 5 , date: '31/01/2022',sens: 1, montant: 2000},

      ]  
     },

    { id : 2, nom:'diarra', prenom: 'diop', telephone : '785641231', email : 'diop@gmail.com',
     photo :'https://images.unsplash.com/photo-1606814893907-c2e42943c91f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
     transactions: [{numero: '6' , date: '31/07/2022',sens: '1', montant: 3000 ,},
            //   {numero: 3, date: '31/07/2022',sens: 1, montant: 1000,  },
            //   {numero: 4, date: '31/07/2022',sens: -1, montant: 2000 ,},
            //   {numero: 5, date: '31/07/2022',sens: 1, montant: 3000},      
      ]
      } ,

    { id : 3, nom:'julien', prenom: 'diatta', telephone : '775623231', email : 'julien@gmail.com' , 
    photo :'https://images.unsplash.com/photo-1485875437342-9b39470b3d95?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=873&q=80', 
    transactions: [{numero: '10' , date: '01/01/2023',sens: '1', montant: 8000 , },
            //   {numero: 6, date: '01/01/2023',sens: -1, montant: 2000 , },
            //   {numero: 7, date: '01/01/2023',sens: 1, montant: 1000 , },
      ]
      },

    { id : 4, nom:'babacar', prenom: 'ndaye', telephone : '767541211', email : 'ndiaye@gmail.com',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80,' ,
     transactions: [{numero: '7' , date: '12/09/2022',sens: '1', montant: 100 ,}] },

    { id : 5, nom:'moustapha', prenom: 'dione', telephone : '771119878', email : 'mousdione@gmail.com,',
    photo: 'https://images.unsplash.com/photo-1508341591423-4347099e1f19?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
      transactions: [{numero: '6' , date: '31/01/2023',sens: '1', montant: 1000 , },
        ]  
     },     
];

const suivant=document.querySelector('.next');
const plus = document.querySelector('.btn-detail');
const form = document.querySelector('.form');
const enregistrer = document.querySelector('button');
const code = document.querySelector('code');
const erreur = document.querySelector('.erreur');
const num = document.querySelector('#numero-tel');
const rechercheInput = document.querySelector('#results-input');
const inputNum = document.querySelector('.input-num');
const montant = document.getElementById('mnt');


const notif = document.querySelector('.notif');
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
    const tbody=document.querySelector('tbody');
   
    let photo=new Image();
    photo.src =personne.photo;
    // console.dir(photo);
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
        tbody.innerHTML="";
        personne.transactions.forEach(trans=>{
            tbody.innerHTML+=` <tr>
            <td>${trans.numero}</td>
            <td>${trans.date}</td>
            <td>${trans.sens=='1'?'depot':'retrait'}</td>
            <td>${trans.montant}</td>
        </tr>`
        
        });
        code.innerHTML=personne.transactions.length;
        solde.innerHTML = calculeSolde(personne.transactions);
     }
}
function randomPos(max) {
    return Math.floor(Math.random()*max);
}
// printpersonne(tabpersonne[posCourant]);

afficherPersonne(personnes[posCourant]);

suivant.addEventListener('click',()=>{
    posCourant=randomPos(tailleTab);
    // console.log(posCourant);
    afficherPersonne(personnes[posCourant]);
    // tabpersonne[posCourant].transactions.push(newElement)
});
function calculeSolde(personnes) {
    let solde = 0;
    personnes.forEach(personne => {
      solde += personne.montant * personne.sens ;
    });
    return solde;
  }

function recherNumero(tableau, numero)
{
   return  tableau.findIndex(table => table.telephone == numero);  
}
//  let le = recherNumero(personnes, '785643421');
// console.log(le);

function afficherNotif(message)
{
    notif.innerHTML = message;
    notif.style.display = 'block';
    setTimeout(() => {
        notif.style.display = 'none';
    }, 3000);
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

});

enregistrer.addEventListener('click', () =>{
    const table = document.querySelector('.content table');
    newRow = table.insertRow(table.length );
  
    cell1 = newRow.insertCell(0);
    cell2 = newRow.insertCell(1);
    cell3 = newRow.insertCell(2);
    cell4 = newRow.insertCell(3);
  
    const transa = document.getElementById('trans');
    const solde=document.querySelector('#solde');
    // const num = document.querySelector('#numero-tel'); 
    if( montant.value == '')
    {
       erreur.innerHTML =  'il faut entrer une montant'
    //    afficherNotif('il faut entrer une montant')
    }
    else if(+montant.value <= 0)
    {
      erreur.innerHTML = 'il faut entrer une montant valide'
    } 
    else if (+montant.value < 1000)
    {
        erreur.innerHTML = 'votre montant doit etre superieur ou égal à 1000'
    }
    else
    {
        solde.innerHTML = calculeSolde(personnes[posCourant].transactions);

        let sol = solde.innerHTML;

        if ( transa.value == "r"  && montant.value  > sol)
            {
                erreur.innerHTML = 'le montant est supérieur au solde';
            }
        else if (transa.value == "d" && montant.value > 2000000)
            {
                erreur.innerHTML = 'Vous ne pouvez pas envoyer cette somme';
            }
        else
            {
                if(num.value == "" )
                {
                    erreur.innerHTML = 'entrez un numero'; 
                }
                else
                {
                    erreur.innerHTML = '';
                    let indice = recherNumero(personnes , num.value)
                    if(indice == -1)
                    erreur.innerHTML = "le numero n'existe pas ";
                    else if( indice == posCourant )
                    {
                            if(transa.value == "d")
                            {
                                cell3.innerHTML = 1;
                            }
                            if(transa.value == "r")
                            {
                                cell3.innerHTML = -1;
                            }
                            erreur.innerHTML = '';
                            cell1.innerHTML=personnes[posCourant].transactions.length + 1 ; 
                            cell2.innerHTML = new Date().toLocaleDateString();
                            cell4.innerHTML = montant.value;
                            let  mont = cell4.innerHTML;
                            let  num =  cell1.innerHTML;
                            let  date = cell2.innerHTML;
                            let  sens = cell3.innerHTML;
                            let objet = {
                                        numero: num, date: date,  sens: sens, montant: mont 
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
                        if (transa.value == "d")
                        {
                            erreur.innerHTML = 'tu ne peux faire que des retraits';

                        }
                        else
                        {
                            if(transa.value == "d")
                            {
                                cell3.innerHTML = 1;
                            }
                            if(transa.value == "r")
                            {
                                cell3.innerHTML = -1;
                                // console.log(cell4.innerHTML);
                            }
                            erreur.innerHTML = '';
                            cell1.innerHTML=personnes[posCourant].transactions.length + 1 ; 
                            cell2.innerHTML = new Date().toLocaleDateString();
                            cell4.innerHTML = montant.value;
                            let  mont = cell4.innerHTML;
                            let  num =  cell1.innerHTML;
                            let  date = cell2.innerHTML;
                            let  sens = cell3.innerHTML;
                            // sens.innerHTML = 'envoie'
                            let objet = {
                                        numero: num, date: date,  sens: sens, montant: mont 
                                        }
                            personnes[posCourant].transactions.push(objet);
                            
                            code.innerHTML=personnes[posCourant].transactions.length;
                            solde.innerHTML = calculeSolde(personnes[posCourant].transactions);
                            afficherPersonne(personnes[posCourant]);
                            console.log(objet);
                            console.log(personnes[posCourant]);
                            
                            let objet1 = {...objet}
                            objet1.sens='1';
                            
                            let taille = personnes[indice].transactions.length - 1;

                            objet1.num= personnes[indice].transactions[taille].numero + 1 ;
                            console.log(objet.num);
                            
                            personnes[indice].transactions.push(objet1); 
                            // console.log(objet1);
                            console.log(personnes[indice]);
                           
                            form.style.display = 'none';
                        }
                    }
                }
                    
              
            }
      }
  });

num.addEventListener('input', (event)=>{

    inputNum.style.display = 'block';

    rechercheInput.innerHTML = '';

    const rechercheValeur = event.target.value;

    const filteredPersonnes = personnes.filter(personne => personne.telephone.startsWith(rechercheValeur)) ;

    filteredPersonnes.forEach(personne => {
        const li = document.createElement('li');
      
        li.textContent = `Nom: ${personne.nom} Téléphone: ${personne.telephone}`;
       li.addEventListener('click', ()=>{
        num.value = personne.telephone;
        inputNum.style.display = 'none';

       });
       rechercheInput.appendChild(li) 
    });
});

 
  
  
