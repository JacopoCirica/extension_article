


function send(text) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, text, function (response) {
        console.log('prova');
        console.log(tabs[0].id)
    });
    });
}

//send the request to scrape title
chrome.runtime.onMessage.addListener((request,sender,sendResponse)=>{
  if(request.type === "scrape"){
    console.log(request.data)
    fetch("https://rewriter.herokuapp.com/?recipient=Jacopo&subject=" + request.data, {
    method: "POST",
    headers: {
        "Content-Type": "application/json;charset=UTF-8"
      }
    })
    .then(response => response.json())
    .then(data => {
    console.log(data.how_answer)
    send(data)
  
})
}
})

//send the request to scrape body
chrome.runtime.onMessage.addListener((request,sender,sendResponse)=>{
  if(request.type === "body"){
    console.log(request.data)
    fetch("https://rewriter.herokuapp.com/text?recipient=Jacopo&subject=" + request.data, {
    method: "POST",
    headers: {
        "Content-Type": "application/json;charset=UTF-8"
      }
    })
    .then(response => response.json())
    .then(data => {
    console.log(data.text_answer)
    send(data)
  
})
}
})
///////
