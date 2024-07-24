// const url="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
  const url="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";


const dropdowns=document.querySelectorAll(".dropdown select");// selecting all selectin class dropdown
const btn=document.querySelector(" form button");
const fromCurr=document.querySelector(".from select");

const toCurr=document.querySelector(".to select");
const message=document.querySelector(".message");

for(let select of dropdowns){
    for (let Ccode in countryList){
        // create a new element in which we will be adding our currency codes and append it to existing one
        let newOption=document.createElement("option");
        newOption.innerText=Ccode
        newOption.value=Ccode;
        // To show USD and INR initially on page.
        if(select.name==="from"&& Ccode==="USD"){
            newOption.selected="selected";
        }else
        if(select.name==="to" && Ccode==="INR"){
            newOption.selected="selected";
        }


        select.append(newOption);
    }
    select.addEventListener("change",(event)=>{
        udpdateFlag(event.target);
    });
    
}

// to change the rates
const exchangeRate=async()=>{
    let amount=document.querySelector(".amount input");
    let amountvalue=amount.value;
    // if user enter value less than 1 or empty 
    if(amountvalue===""|| amountvalue<1){
        amountvalue=1;
        amount.value="1";
    }
    console.log(fromCurr.value,toCurr.value)
    const newURL=`${url}/${fromCurr.value.toLowerCase()}.json`;
    let response= await fetch(newURL);
    console.log(response);
    let data= await response.json();
    console.log(data);
    let from=fromCurr.value.toLowerCase();
    console.log(from);
    let to= toCurr.value.toLowerCase();
    console.log(to);
    let rate = data[from][to];
    console.log(rate);


    let finalAmount = amountvalue * rate;
    message.innerText = `${amountvalue} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;

};

// to change flag on selecting currency code

const udpdateFlag=(element)=>{
let Ccode=element.value;
console.log(Ccode);
let countryCode= countryList[Ccode];
let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
let img=element.parentElement.querySelector("img");
img.src=newSrc;
};
    // onclick of button the exchange rate should change
    btn.addEventListener("click",(e)=>{
        e.preventDefault();// to prevent page refresh
        exchangeRate();
    });
    
// when the page load for first time function get call

window.addEventListener("load",()=>{
    exchangeRate();
});




// toggle icon
const navToggle = document.querySelector('.nav-toggle');
const navContainer = document.querySelector('.nav-container');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  navContainer.classList.toggle('active');
  navLinks.classList.toggle('active');
});
