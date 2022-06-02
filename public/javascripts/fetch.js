

const deleteButtons = [...document.querySelectorAll('.delete')];
const editButtons = [...document.querySelectorAll('.edit')];
const nameInput = document.querySelector('#editName');
const priceInput = document.querySelector('#editPrice');
const confirmEdit = document.querySelector('#editConfirm');
let text,price;


deleteButtons.forEach(btn=>{
    btn.addEventListener("click",(e)=>{
        const element = e.currentTarget.value;
        const person = e.currentTarget.dataset.person;
        deleteElement(element,person);
        
    })
})
function deleteElement(element, person){
    fetch(`/admin/${person}/${element}`,{
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
            
          },
    })
      .then(data=>{
          console.log(data);
          location.reload();
      })
      .catch(err=>{
          console.log(err);
      })
}

nameInput.addEventListener("keyup",(btn)=>{
    nameInput.setAttribute('value', btn.currentTarget.value) 
})
priceInput.addEventListener("keyup",(btn)=>{
    priceInput.setAttribute('value', btn.currentTarget.value) 
   
    
})



editButtons.forEach(btn=>{
    btn.addEventListener('click',()=>{
        const element = btn.value;
        confirmEdit.value = btn.value;
        const edit = document.getElementById('edit');
        edit.classList.toggle('hidden')
        const person = btn.dataset.person;
        confirmEdit.setAttribute('data-person', person)
        
        getData(element,person)
    })
    
})
confirmEdit.addEventListener("click", (btn)=>{
    const element = btn.currentTarget.value; 
    const person = btn.currentTarget.dataset.person;
    console.log(element,person)
    text = nameInput.value;
    price = priceInput.value;
    edit(element,text,price ,person)
    
  })
  
function getData(element,person)
{
    fetch(`/admin/${person}/${element}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
            
          },
    }).then((res)=>res.json())
      .then(data=>{
          console.log(data.name);
          nameInput.value = data.name
          priceInput.value =data.price;
      })
      .catch(err=>{
          console.log(err, "blad");
      })
}


 function edit(element,text,price,person){
    fetch(`/admin/${person}/${element}`,{
        method: 'PATCH',
        headers:{
            Accept: 'application/json',
            'Content-Type': 'application/json'},
        body: JSON.stringify({
            name:text,
            price:price
        })
        
        
    })
      .then(data=>{
          console.log(text,price, data);
          location.reload();
      })
      .catch(err=>{
          console.log(err);
      })
}
const username = document.querySelector('.name');
const email = document.querySelector('.email');
