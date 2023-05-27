const resultNode = document.querySelector('.js-result');
const btnNode = document.querySelector('.j-btn-request');
let inputWeight = document.querySelector('.first_input').value;
let inputHeight = document.querySelector('.second_input').value;


btnNode.addEventListener('click', async() =>{
  inputWeight = document.querySelector('.first_input').value;
  inputHeight = document.querySelector('.second_input').value;
  if ((100 <= inputWeight && inputWeight <= 300) && (100 <= inputHeight && inputHeight <= 300)){
    const inputNumber = await useRequest(inputWeight, inputHeight)
    resultNode.innerHTML = `<img src = "${inputNumber}">`;
  } else {
    if (
      (isNaN(Number(inputWeight)) || 100 > inputWeight || inputWeight > 300) || (isNaN(Number(inputHeight)) || 100 > inputHeight || inputHeight > 300)
      )
     {
      resultNode.innerHTML = `<p>одно из чисел вне диапазона от 100 до 300</p>`
    }
  }
})

const useRequest = () =>{
  const url = `https://picsum.photos/${inputWeight}/${inputHeight}`;
  //console.log(url);
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.url;
      } else {
        throw new Error('Ошибка HTTP: ' + response.status);
      }
    })
  .catch(() => {console.log('error')})
}