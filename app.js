document.querySelector('.get-jokes').addEventListener('click', getJokes);
document.querySelector('.clear').addEventListener('click', clearJoke);

//create getJokes function
function getJokes(e) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `https://api.chucknorris.io/jokes/random`, true);
 
  xhr.onload = function () {
    if (this.status === 200) {
      const response = JSON.parse(this.responseText);
      //console.log(response);
      const joke = document.querySelector('.joke');
      const col = document.createElement('li');
      joke.appendChild(col);
      col.appendChild(document.createTextNode(response.value));
      
    }
  
}
  xhr.send();

  e.preventDefault();
  
}
//create clearJokes
function clearJoke() {
  col.remove();
}
