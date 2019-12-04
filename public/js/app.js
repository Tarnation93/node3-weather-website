
// console.log('aaaaa')
// fetch('http://localhost:3001/weather?adress=kragujevac').then(resp=> resp.json()).then(data=> {
//     if(data.error) {
//         console.log(data.error)
//     }else{
//         console.log(data.location)
//         console.log(data.forecast)
//     }

// })

const weatherForm = document.querySelector('form');
const inputVal = document.querySelector('input')
const messageOne = document.getElementById('message-1')
const messageTwo = document.getElementById('message-2')


weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const location = inputVal.value
  messageOne.textContent = "loading"
  messageTwo.textContent = ''
  fetch(`/weather?adress=${location}`).then(resp => resp.json()).then(data => {
    if (data.error) {
      messageOne.textContent = data.error
    } else {
      messageOne.textContent = data.location
      messageTwo.textContent = data.forecast
    }

  })
})