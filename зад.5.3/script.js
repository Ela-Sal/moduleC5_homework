function useRequest(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  
  xhr.onload = function() {
    if (xhr.status != 200) {
      console.log('Статус ответа: ', xhr.status);
    } else {
      const result = JSON.parse(xhr.response);
      if (callback) {
        callback(result);
      }
    }
  };
  
  xhr.onerror = function(){
    console.log('Ошибка', xhr.status)
  }
  
  xhr.send()
}

const resultNode = document.querySelector('.js-result');
const btnNode = document.querySelector('.j-btn-request');
let value = document.querySelector('.input').value;

function displayResult(apidata){
  resultNode.innerHTML = '';
  let cards = ''
  //console.log('start cards', cards);
  apidata.forEach(item =>{
    const cardblock = `
      <div class = 'card'>
        <img src = "${item.download_url}" class = "card-image">
      </div>
    `;
     cards = cards + cardblock;
    })
  resultNode.innerHTML = cards;
}

btnNode.addEventListener('click', () =>{
  value = document.querySelector('.input').value;
  if (0 < value && value < 11 ) {
    useRequest(`https://picsum.photos/v2/list?limit=${value}`, displayResult);
    
  }else
    resultNode.innerHTML = `<p>число вне диапазона от 1 до 10</p>`
  
})