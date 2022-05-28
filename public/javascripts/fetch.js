

const deleteButtons = [...document.querySelectorAll('.delete')];
const editButtons = [...document.querySelectorAll('.edit')];
const nameInput = document.querySelector('#editName');
const priceInput = document.querySelector('#editPrice');
const confirmEdit = document.querySelector('#editConfirm');
let text,price;


deleteButtons.forEach(btn=>{
    btn.addEventListener("click",(e)=>{
        const element = btn.value;
        deleteElement(element)
    })
})
function deleteElement(element){
    fetch(`/admin/electrician/${element}`,{
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
        getData(element)
    })
    
})
function getData(element)
{
    fetch(`/admin/electrician/${element}`,{
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


async function edit(element,text,price){
   await fetch(`/admin/electrician/${element}`,{
        method: 'PATCH',
        headers:{
            Accept: 'application/json',
            'Content-Type': 'application/json'},
        body: JSON.stringify({
            name:text,
            price:price
        })
        
        
    }).then(r=>r.json())
      .then(data=>{
          console.log(text,price, data);
          location.reload();
      })
      .catch(err=>{
          console.log(err);
      })
}
confirmEdit.addEventListener("click", (btn)=>{
  const element = btn.currentTarget.value;
  text = nameInput.value;
  price = priceInput.value;
  console.log(text,price)
  edit(element,text,price)
  
})
