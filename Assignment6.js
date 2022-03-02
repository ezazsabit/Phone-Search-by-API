//------------function for fetch  the selected item
const showOutout=searchItem=>{
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchItem}`)
    .then(res=>res.json())
    .then(data=>showCards(data.data))}

//---function for showing others
const others=values=>{
   if(values==undefined)
   {
       //console.log('no data')
       return 'no data found'
   }
   else{
    const othersArray=[];
    for(const [key,value] of Object.entries(values))
    {
        othersArray.push(`${key} = ${value}`)
    }
    return (othersArray.join(' || '))
   }
}

//validity check
const validItem=item=>{
  
    if(item==undefined || item==null || item=='')
    {
        return 'no data found'
    }
    else{
        return item;
    }
}


 //-------------function for showing the details of an item 
 const showDetail=item=>{
     
const detailsection=document.getElementById('detail-item');
    const div=document.createElement('div');
    detailsection.textContent='';
    document.getElementById('spinner').setAttribute("class", "d-flex justify-content-center d-block");
    div.innerHTML=`<div class="card container " >
   <div class="d-flex justify-content-center justify-content-center"> <img src="${item.data.image}" class="card-img-top img-fluid d-flex  h-50 w-50" alt="..."></div>
    <div class="card-body d-flex flex-column ">
      
        <h3 class="card-title d-flex justify-content-center">${validItem(item.data.name)}</h3>
        
     
        <ul class="list-group list-group-flush">
        <li class="list-group-item"><h5>Realease date :</h5> ${validItem(item.data.releaseDate)}</li>
        <li class="list-group-item"><h5>Sensors:</h5> ${validItem(item.data.mainFeatures.sensors.join(','))}</li>
        
        <li class="list-group-item"><h5>Others: </h5>${others(item.data.others)
        }</li>
        
        </ul>
    </div>

    
  </div>`
  document.getElementById('spinner').setAttribute("class", "d-none");
   detailsection.appendChild(div)  
 } 

 
 
//--------- functon for showing the product in cards-
const showCards=items=>{
    // console.log(item)
    
    if(items.length===0)
    {
        
        const Section=document.getElementById('cardsItem');
        document.getElementById('cardsItem').textContent='';
        
        const div=document.createElement('div');
        div.innerHTML=`<h3>No item matched...</h3>`
        div.setAttribute("style", "display: flex; justify-content: center;");
        document.getElementById('spinner').setAttribute("class", "d-none");

        Section.appendChild(div)
    }
    else{
    document.getElementById('cardsItem').textContent='';
    
    for(const item of items.slice(0,20))
    {
        
        const Section=document.getElementById('cardsItem');
        const div=document.createElement('div');
        div.classList.add('col-10')
        div.classList.add('col-lg-4')
        div.classList.add('col-md-6')
        div.innerHTML=` <div class="card mt-5 mx-auto  rounded w-100 ms-3" style="width: 18rem; background-color:rgb(240, 195, 195);">
        <img src="${item.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h3 class="card-title">${item.phone_name}</h3>
          <h6 class="card-title">${item.brand}</h6>
        
          <p id="${item.slug}"  class="btn btn-secondary">Details</p>
         
          
        </div>
      </div>`;
      document.getElementById('spinner').setAttribute("class", "d-none");

      Section.appendChild(div)
     
      document.getElementById(`${item.slug}`).addEventListener('click',function(){
          scrollTop();
         
        fetch(`https://openapi.programming-hero.com/api/phone/${item.slug}`)
        .then(response=>response.json())
        .then(details=>showDetail(details)) 
      })
    }
    if(items.length>20)
    {
        
        document.getElementById('see-more').setAttribute('class','d-flex justify-content-end d-block')
    }}
}
//scroll to the top
var scrollTop = function() {
    window.scrollTo(0, 0);
};

 //see more option
 const seeMOre=items=>{
 if(items.length>20)
 {
     
     //document.getElementById('see-more').setAttribute('class','d-flex justify-content-end')
 }
}





//----main operation
document.getElementById('searchButton').addEventListener('click',function(){
    document.getElementById('detail-item').textContent='';
    document.getElementById('cardsItem').textContent='';
    document.getElementById('see-more').setAttribute('class','d-flex justify-content-end d-none')
    document.getElementById('spinner').setAttribute("class", "d-flex justify-content-center d-block");
    const searchItem=(document.getElementById('searchInput').value.toLowerCase());//case sensitivity solve
    showOutout(searchItem);
    document.getElementById('searchInput').value='';
   
})




