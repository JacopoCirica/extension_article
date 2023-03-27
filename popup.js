const startButton = document.getElementsByClassName('activation-button')[0];
const stopButton = document.getElementsByClassName('deactivation-button')[0];
const languageSelect = document.getElementsByClassName('language-select')[0];
const errorMessage = document.getElementsByClassName('error-message')[0];
const Button = document.getElementsByClassName('button-23')[0];
const Url = document.getElementsByClassName('url')[0];
var jacopo='ciaone'
var title=false
var body=false
var url_article='ciao'
const checkBox = document.getElementById("myCheck");
const checkBox1 = document.getElementById("myCheck1");


checkBox.addEventListener('click',function(){
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    if (body===false){
    body=true
    url_article=Url.value
    chrome.tabs.sendMessage(tabs[0].id, {type: "headline",data:{url:url_article, toggle: 'selected'}}, function(response) {});
    }
    else if (body === true){
      body=false
      url_article=Url.value
      chrome.tabs.sendMessage(tabs[0].id, {type: "headline",data:{url:url_article, toggle: 'unselected'}}, function(response) {});
    }
  });

})

checkBox1.addEventListener('click',function(){
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    if (title===false){
    title=true
    url_article=Url.value
    chrome.tabs.sendMessage(tabs[0].id, {type: "body",data:{url:url_article, toggle: 'selected'}}, function(response) {});
    }
    else if (title === true){
      title=false
      url_article=Url.value
      chrome.tabs.sendMessage(tabs[0].id, {type: "body",data:{url:url_article, toggle: 'unselected'}}, function(response) {});
    }
  });

})


Button.addEventListener('click', function (){
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {type: "button",data:jacopo}, function(response) {});
  });
})

/*funzione per selezionare il linguaggio */
languageSelect.addEventListener('change', function (event) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {type:"cambio",data: event.target.value}, function(response) {});
  });
});

/*funzione per cliccare sul bottone */
startButton.addEventListener('click', function () {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    //mandiamo non solo il dato start, ma anche il valore della lingua che ci servirà come risposta
    chrome.tabs.sendMessage(tabs[0].id, {type:"start",data: languageSelect.children[0].value}, function(response) {});
    
  });
});

/*funzione per stoppare il bottone */
stopButton.addEventListener('click', function () {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {type: "stop"}, function(response) {});
  });
});


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.error){
    errorMessage.textContent = request.error
    //modificabile perchè non funziona
  }else if (request.type==='chiusura'){
    errorMessage.textContent = request.error
  }else if (request.type==='apertura'){
    errorMessage.textContent = request.data
  }
});
//da rivedere
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "apertura") {
    errorMessage.textContent = request.data
  }
});
/*Funzione per inviare la lingua selezionata*/ 
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "language") {
    var firstOption = document.querySelector(".language-select option:first-child");
    var linguavalore = firstOption.value 
    //Inviare al content.js il language value
    chrome.runtime.sendMessage({type: "languagevalue", data: linguavalore}, function(response) {});
  }
});
// creiamo il button sotto a tutto 

const Btn=document.createElement('img');
Btn.src=chrome.runtime.getUrl('bookmark.png');
Btn.className='btn';
Btn.title='Click to pop up'
let gmailbar=document.getElementsByClassName('btC');
gmailbar.appendChild('Btn')



