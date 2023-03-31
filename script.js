const personnes = [
    { id : 1 ,nom:'thioro', prenom: 'faye' , telephone : '785643421', email : 'faye@gmail.com',
    photo :'https://images.unsplash.com/photo-1602233158242-3ba0ac4d2167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=436&q=80',
     transactions: [{numero: 1 , date: '31/01/2022',sens: 1, montant: 3000 , },
             {numero: 2 , date: '31/01/2022',sens: -1, montant: 1000 ,},
            //  {numero: 3 , date: '31/01/2022',sens: 1, montant: 100},
            //  {numero: 5 , date: '31/01/2022',sens: 1, montant: 2000},

      ]  
     },

    { id : 2, nom:'diarra', prenom: 'diop', telephone : '785641231', email : 'diop@gmail.com',
     photo :'https://images.unsplash.com/photo-1606814893907-c2e42943c91f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
     transactions: [{numero: 2 , date: '31/07/2022',sens: 1, montant: 3000 ,},
            //   {numero: 3, date: '31/07/2022',sens: 1, montant: 1000,  },
            //   {numero: 4, date: '31/07/2022',sens: -1, montant: 2000 ,},
            //   {numero: 5, date: '31/07/2022',sens: 1, montant: 3000},      
      ]
      } ,

    { id : 3, nom:'julien', prenom: 'diatta', telephone : '785641231', email : 'julien@gmail.com' , 
    photo :'https://images.unsplash.com/photo-1485875437342-9b39470b3d95?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=873&q=80', 
    transactions: [{numero: 5 , date: '01/01/2023',sens: 1, montant: 8000 , },
            //   {numero: 6, date: '01/01/2023',sens: -1, montant: 2000 , },
            //   {numero: 7, date: '01/01/2023',sens: 1, montant: 1000 , },
      ]
      },

    { id : 4, nom:'babacar', prenom: 'ndaye', telephone : '767541211', email : 'ndiaye@gmail.com',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80,' ,
     transactions: [{numero: 7 , date: '12/09/2022',sens: 1, montant: 100 ,}] },

    { id : 5, nom:'moustapha', prenom: 'dione', telephone : '771119878', email : 'mousdione@gmail.com,',
    photo: 'https://images.unsplash.com/photo-1508341591423-4347099e1f19?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
      transactions: [{numero: 6 , date: '31/01/2023',sens:1, montant: 1000 , },
        ]  
     },     
];

const suivant=document.querySelector('.next');
const plus = document.querySelector('.btn-detail');
const form = document.querySelector('.form');
const enregistrer = document.querySelector('button');
const code = document.querySelector('code');

const tailleTab=personnes.length;
let posCourant=randomPos(tailleTab);

function afficherPersonne(personne)
{
    // const img=document.querySelector('img');
    const nom = document.querySelector('#lastname');
    const prenom = document.querySelector('#firstname');
    const telephone = document.querySelector('#phone');
    const email = document.querySelector('#email');
    const spinner = document.querySelector('.spinner')
 
    const photoEl=document.querySelector('.photo');
    const tbody=document.querySelector('tbody');
   
    let photo=new Image();
    photo.src =personne.photo;
    // console.dir(photo);
    photoEl.innerHTML=photo.outerHTML;
    //charger les spinners
    photo.onload=()=>{
        spinner.style.display="none";
        // desactiver le spinner
        // alert('image chargée')
        //afficher les informations du personne
        nom.innerHTML=personne.nom;
        prenom.innerHTML=personne.prenom;
        telephone.innerHTML=personne.telephone;
        email.innerHTML=personne.email;
        
// 
        // afficher les transactions
        tbody.innerHTML="";
        personne.transactions.forEach(trans=>{
            tbody.innerHTML+=` <tr>
            <td>${trans.numero}</td>
            <td>${trans.date}</td>
            <td>${trans.sens=='1'?'envoie':'retrait'}</td>
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
    console.log(posCourant);
    afficherPersonne(personnes[posCourant]);
    // tabpersonne[posCourant].transactions.push(newElement)
});

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
});
const erreur = document.querySelector('.erreur');



enregistrer.addEventListener('click', () =>{
    const table = document.querySelector('.content table');
    newRow = table.insertRow(table.length );
  
    cell1 = newRow.insertCell(0);
    cell2 = newRow.insertCell(1);
    cell3 = newRow.insertCell(2);
    cell4 = newRow.insertCell(3);
  
    const montant = document.getElementById('mnt');
    const transa = document.getElementById('trans');
    const solde=document.querySelector('#solde');
   
    
    if( montant.value == '')
    {
       erreur.innerHTML =  'il faut entrer une montant'
    }
    else if(+montant.value <= 0)
    {
      erreur.innerHTML = 'il faut entrer une montant valide'
    } 
    else
    {
        let sol = solde.innerHTML;
        if ( transa.value == "r"  && montant.value  > sol)
            {
                erreur.innerHTML = 'le montant est supérieur au solde';
            }
        else if (transa.value == "d" && montant.value > 15000)
            {
                erreur.innerHTML = 'Vous ne pouvez pas envoyer cette somme';
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
      }
  });

  function calculeSolde(personnes) {
    let solde = 0;
    personnes.forEach(personne => {
      solde += personne.montant * personne.sens ;
    });
    return solde;
  }