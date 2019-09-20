
$('document').ready(()=>{
    $('#new_list').submit((e) =>{     
    e.preventDefault();
    let propertyname = $('#propertyname').val();
    let propertyprice = $('#propertyprice').val();
    let propertydesc = $('#propertydesc').val();
    let propertyimage = $('#propertyimage');
    
    $.ajax({
        url : 'http://localhost:3000/listing',
        method: 'post',
        data: {
            propertyname,
            propertyprice,
            propertydesc,
            propertyimage
            
            
        }
    }).done((res) =>{
        console.log(res)
    })
})

    $.ajax({
        'url': "http://localhost:3000/listing",
        'method': 'get'
    })
    .done((res) => {
        console.log('get data');
        console.log(res)
        res.forEach((elem, index)=>{
            $('#cardCarList').append(
                `
                    <div class="col-md-4 col-sm-6 col-xs-12  text-center mt-3">
                <div class="card">
                    <div class="card-body mt-5">
                    <div class="card-title"><h4>${elem.propertyname}</h4></div>
                        <div class="card-img">
                            <img src="img/${elem.propertyimage}" alt="flat0.jpge" class="img-responsive">
                        </div>
                        
                        <p>N${elem.propertyprice}</p>
                        <p>${elem.propertydesc} km</p>
                         <p>${elem.propertyimage} yr</p>
                       
                          
                <span class="btn btn-primary form-control" onclick="(individual(${index+1}))">view</span>          
                    </div>
                </div>
            </div>
                `
                // <a href="#" onclick="single(${index+1})"> ${elem.propertyname} ${elem.propertyprice}</a>
                // `
            )

        })
    }).catch((err) => console.log(err))
})

$.ajax({
    'url': "http://localhost:3000/listing",
    'method': 'delete'
})
    
function single(i){

    $.ajax({
        'url': 'http://localhost:3000/listing/'+i,
        'method' : 'get'
    })
    .done((res) => {
        console.log(res.propertyprice, res.propertyname)

        $('#displayData').html(
            // `<div> ${res.propertyprice}, ${res.propertyname} </div>`
            `<input type="text" id="propertyname" value="${res.propertyname}">
            <input type="text" id="propertyprice" value="${res.propertyprice}">
            <input type="text" id="propertydesc" value="${res.propertydesc}">
            <input type="hidden" value="${res.id}">
            <input type="button"  value="update" onclick="update(${res.id})">
                `
        );
    })
}


function update(i){
    let propertyname = $('#propertyname').val();
    let propertyprice = $('#propertyprice').val();
    let propertydesc = $('#propertydesc').val();
        // let propertyimage = $('#propertyimage');   
    $.ajax({
        url : 'http://localhost:3000/listing/'+i,
        method: 'put',
        data: {
            propertyname,
            propertyprice,
            propertydesc,
            propertyimage
            
        }
    }).done((res) =>{
        console.log(res)
    })
}
function deleteData(i){
    $.ajax({
        url : 'http://localhost:3000/listing/'+i,
        method : 'delete'
    })
    .done((res) => alert("the car is successfully deleted"))
    .catch((err)=> console.log(err))
}

function individual(i){
    $.ajax({
        'url': 'http://localhost:3000/listing/'+i,
        'method' : 'get'
    })
    .done((res) => {
        console.log(res.propertyprice, res.propertyname, i)
        localStorage.setItem('singleId', i);
        window.location = 'single.html'
    }).catch((err) => console.log(err))

    
}