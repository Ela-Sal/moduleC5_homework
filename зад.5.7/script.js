const resultNode = document.querySelector('.js-result');
const btnNode = document.querySelector('.j-btn-request');

  
const useRequest = (page, limit) =>{
  const url = `https://picsum.photos/v2/list?page=${page}&limit=${limit}`;
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Ошибка HTTP: ' + response.status);
      }
    })
  .catch(() => {console.log('error')})
}


function displayContent(json){  
    resultNode.innerHTML = '' ; 
    json.forEach(item => {
      
      const img = item.download_url;
         resultNode.innerHTML += `<img class="card-image" src = "${img}">`;
    });
    resultNode.innerHTML = cards;
}



btnNode.addEventListener('click', async() =>{
  const page = document.querySelector('.first_input').value;
  const limit = document.querySelector('.second_input').value;
  
  localStorage.setItem('page', page);
  localStorage.setItem('limit', limit);
  
  
  
  if ((1 <= page && page <= 10) && (1 <= limit && limit <= 10)){
    
    const json = await useRequest(page, limit);
    localStorage.setItem('lastJson', JSON.stringify(json));
    displayContent(json);
    
  } else {
    
      if ( (isNaN(Number(page)) || 1 > page || page > 10 ) && (isNaN(Number(limit)) || 1 > limit || limit > 10 )   ) {
        resultNode.innerHTML = `<p>Номер страницы и лимит вне диапазона от 1 до 10"</p>`;
      } else if (isNaN(Number(page)) || 1 > page || page > 10 ) {
        resultNode.innerHTML = `<p>Номер страницы вне диапазона от 1 до 10"</p>`;
      } else if (isNaN(Number(limit)) || 1 > limit || limit > 10 ) {
        resultNode.innerHTML = `<p>Лимит вне диапазона от 1 до 10"</p>`;
      }
    
  }
    
})


if (localStorage.lastJson){
    const json = JSON.parse(localStorage.getItem('lastJson'));
    displayContent(json);
}