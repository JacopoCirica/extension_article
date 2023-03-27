
var headline=''
var body=''
var headline_response=''
var body_response=''
var url_article=''
chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
  if(request.type === "headline"){
    headline=request.data.toggle
    url_article=request.data.url
    console.log(headline)
    console.log(url_article)
    
  }
});
chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
  if(request.type === "body"){
    body=request.data.toggle
    url_article=request.data.url
    console.log(body)
    console.log(url_article)
    
  }
});
chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
  if (request.type === 'button' && headline === 'selected' && body == 'selected'){
    console.log('insieme')
    var body_text2=document.querySelector('.is-root-container.is-layout-flow.wp-block-post-content.block-editor-block-list__layout')
  const body_text1=document.querySelector('.block-editor-default-block-appender__content')
  body_text2.innerHTML='<p role="document" aria-multiline="true" aria-label="Blocco del paragrafo" tabindex="0" class="block-editor-rich-text__editable block-editor-block-list__block wp-block is-selected wp-block-paragraph rich-text" id="block-a16a6666-e58d-41a5-a00d-baee0ee66527" data-block="a16a6666-e58d-41a5-a00d-baee0ee66527" data-type="core/paragraph" data-title="Paragrafo" data-empty="false" contenteditable="true" style="white-space: pre-wrap; min-width: 1px;" data-dl-input-translation="true">ciao bello</p>'
  const body_text=document.querySelector(".block-editor-rich-text__editable.block-editor-block-list__block.wp-block.wp-block-paragraph.rich-text")
  body_text.innerText='Loading...'
    var url=window.location.href
    var wordpress='wp-admin/post.php?post'
    
    chrome.runtime.sendMessage({type: "scrape", data: url_article}, function(response) {})
    chrome.runtime.sendMessage({type: "body", data: url_article}, function(response) {})
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.type == "how") {
        
        headline_response=request.how_answer
        console.log(headline_response)
        const titolone=document.querySelector('.wp-block.wp-block-post-title.block-editor-block-list__block.editor-post-title.editor-post-title__input.rich-text')
        titolone.innerText=headline_response
        headline='unselected'
      }
    });
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.type == "text") {
        const body_text=document.querySelector('.block-editor-rich-text__editable.block-editor-block-list__block.wp-block.is-selected.wp-block-paragraph.rich-text')
        body_text.innerHTML='Loading...'
        //const body_text1=document.querySelector('.block-editor-default-block-appender__content')
        //body_text1.innerHTML='ciaone'
        body_response=request.text_answer
        console.log(body_response)
        body_text.innerText=body_response
        body='unselected'
      }
    });

  }
  else if(request.type === "button" && headline==='selected'){
    var url=window.location.href
    var wordpress='wp-admin/post.php?post'
    chrome.runtime.sendMessage({type: "scrape", data: url_article}, function(response) {})
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.type == "how") {
        
        headline_response=request.how_answer
        console.log(headline_response)
        const titolone=document.querySelector('.wp-block.wp-block-post-title.block-editor-block-list__block.editor-post-title.editor-post-title__input.rich-text')
        titolone.innerText=headline_response
      }
    });

} 
else if (request.type === "button" && body ==='selected') {
  var url=window.location.href
  var wordpress='wp-admin/post.php?post'
  var body_text2=document.querySelector('.is-root-container.is-layout-flow.wp-block-post-content.block-editor-block-list__layout')
  const body_text1=document.querySelector('.block-editor-default-block-appender__content')
  body_text2.innerHTML='<p role="document" aria-multiline="true" aria-label="Blocco del paragrafo" tabindex="0" class="block-editor-rich-text__editable block-editor-block-list__block wp-block is-selected wp-block-paragraph rich-text" id="block-a16a6666-e58d-41a5-a00d-baee0ee66527" data-block="a16a6666-e58d-41a5-a00d-baee0ee66527" data-type="core/paragraph" data-title="Paragrafo" data-empty="false" contenteditable="true" style="white-space: pre-wrap; min-width: 1px;" data-dl-input-translation="true">ciao bello</p>'
  const body_text=document.querySelector(".block-editor-rich-text__editable.block-editor-block-list__block.wp-block.wp-block-paragraph.rich-text")
  body_text.innerText='Loading...'
  chrome.runtime.sendMessage({type: "body", data: url_article}, function(response) {})
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type == "text") {
      const body_text=document.querySelector('.block-editor-rich-text__editable.block-editor-block-list__block.wp-block.is-selected.wp-block-paragraph.rich-text')
      body_text.innerHTML='Loading...'
      //const body_text1=document.querySelector('.block-editor-default-block-appender__content')
      //body_text1.innerHTML='ciaone'
      body_response=request.text_answer
      console.log(body_response)
      body_text.innerText=body_response
    }
  });
 
  }
});

