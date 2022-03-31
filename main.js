// Suerte! :)
loadAll();
async function loadAll() {
    let response = await fetch("https://restcountries.com/v3.1/all");
    let json= await response.json();


    json = Object.values(json)

    let inputContent = document.querySelector(".search-input").value;
    let region = document.querySelector("#regions").value;

    if (inputContent!="") {
        json = json.filter(country => country.name.common.includes(inputContent));
    }
    if (region!="all") {
        json = json.filter(country => country.region==region);
    }
    console.log(json); 

    printCountries(json);    
}

//country.region
async function printCountries(countryList) {
    document.querySelector(".cards").innerHTML="";
    countryList.forEach(country => {
        let printCountry = `<div class="card card-{country.name}">
        <img class="flag" src="${country.flags.png}" alt="${country.name.common} flag" />
        <div class="content">
          <h3 class="name">${country.name.common}</h3>
          <div><span class="country-info">Population: </span><span class="population">${country.population}</span></div>
          <div><span class="country-info">Region: </span><span class="region">${country.region}</span></div>      
          <div><span class="country-info">Capital: </span><span class="capital">${country.capital}</span></div>
        </div></div>`;    
     
        document.querySelector(".cards").innerHTML=document.querySelector(".cards").innerHTML+printCountry;
      
    });
}

document.querySelector("#regions").addEventListener("change",loadAll);

document.querySelector(".search-input").addEventListener("input",loadAll);

