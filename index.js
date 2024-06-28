var siteName = document.getElementById('siteName')
var siteLink = document.getElementById('siteLink')



var siteContainer=[]
if (localStorage.getItem('site')==null) {
    siteContainer=[];
}
else
{
    siteContainer=JSON.parse(localStorage.getItem('site'));
    displayData();
}

function addSite(){

  if ( regular()) {
    
    var name = siteName.value.trim();
    var Link = siteLink.value.trim();


    const lowerCaseName = name.toLowerCase();

    if (siteContainer.some(site => site.name.toLowerCase() === lowerCaseName)) {
        Swal.fire("A bookmark with the same name  exists");
        return;
    }


    if (!/^https?:\/\//i.test(Link)) {
        Link = 'https://' + Link;
    }
  
    var site ={
    
    name:name,
    Link:Link
   
    
    }
    
    
    siteContainer.push(site);
    
    localStorage.setItem('site',JSON.stringify(siteContainer))
}
    
    displayData();
    clearData();
    console.log(site);
 

}
    

function clearData() {
    siteName.value = null
    siteLink.value = ''
}

    
function displayData(){



    var cartouna='';

// console.log(siteContainer);

 for (let i = 0; i < siteContainer.length; i++) {
    if (siteContainer[i] && siteContainer[i].name && siteContainer[i].Link) {
cartouna+=`<tr>
<td>${i+1}</td>
<td>${siteContainer[i].name}</td>
<td><a href="${siteContainer[i].Link}" target="_blank" class="btn btn-success">Visit</a></td>
<td><button onclick="DeleteSite(${i})" type="button" class="btn btn-danger">Delete</button></td>
</tr>
`
    
 }
}

 document.getElementById('tableBody').innerHTML = cartouna;


}


function regular() {
    var nameRegex = /.{3,}/;
    var linkRegex = /.+\..+/;

    if (!nameRegex.test(siteName.value)) {
        Swal.fire("Site name must be at least 3 char ");
        return false;
    }

    if (!linkRegex.test(siteLink.value)) {
        Swal.fire("Site link wrong");
        return false;
    }

    return true;
}






function DeleteSite(params) {
    siteContainer.splice(params,1)
    displayData();
    localStorage.setItem('site',JSON.stringify(siteContainer))
    }