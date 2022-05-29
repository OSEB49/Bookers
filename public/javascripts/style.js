const service = [
    {
        name:'Hydraulik',
        services: ['Przygotowanie instalacji centralnego ogrzewania','Biały montaż urządzeń sanitarnych','Drobne prace serwisowe i naprawcze'],
    },
    {
        name:'Elektryk',
        services: ['Serwis instalacji elektrycznych','Montaż instalacji Elektrycznych','Montaż instalacji Odgromowych'],
    },
    {
    name:'Ogrodnik',
    services: ['Projektowanie ogrodów','Zakładanie ogrodów','Zakładanie ogrodów'],
    }   
];
const app = document.querySelector('#app');
const personCont = document.querySelector('.text');
const listTargets = [...document.querySelectorAll('li')];
const personImg = document.querySelector('.personImg');
let i=0;
let j;
 function slider(){
    personCont.textContent = service[i].name;
    let currPerson = service[i];
    
    for(j=0; j<=listTargets.length-1; j++)
    { console.log(j)
       listTargets[j].textContent = currPerson.services[j];
       console.log(listTargets[j], currPerson.services[j])
       
    } 
    personImg.setAttribute('src', `../images/p${i+1}.png`)
    app.classList.remove(...app.classList);
    app.classList.add(`slider${i}`);


    i++;
    if(i>=3)
    {
        i=0;
    }
 }
 slider();

 setInterval(slider,2000);
