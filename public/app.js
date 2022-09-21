
let title = document.getElementById('url-shortner');
function fetchurl() {
  title.innerHTML = '';
  let links = localStorage.getItem('data');
  let linkobject = JSON.parse(links) || [];
  linkobject.forEach((links) => {
    let Urlcontainer = `
        <div class="link-box">
        <div style="background-color: white;"><p>${links.url}</p></div>
        <div class="small-u" style="background-color: white;"><p>${links.shortURL}</p> <button class="btn-book-a-table ty">Copy</button></div>
      </div>`;
      
    title.innerHTML += Urlcontainer;
  });
}
fetchurl();
let urlform = document.getElementById('form-url');

urlform.addEventListener('submit', async (e) => {
  let data = {
    url: document.getElementById('text').value,
  };
  console.log(data)
  e.preventDefault();
  let response = await fetch('/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  let url = await response.json();
  // fetch the urls from localstorage
  let urls = JSON.parse(localStorage.getItem('data')) || [];
  // update the urls with the server's response
  urls.push(url);
  // store urls in localstorage
  localStorage.setItem('data', JSON.stringify(urls));
  fetchurl();
});
var copyText = document.getElementById('copy_link');
function myCopy() {}

title.addEventListener('click', (e) => {
  if (e.target.classList.contains('ty')) {
    navigator.clipboard.writeText(e.target.previousElementSibling.textContent)
      .then(
        () => {
          console.log('copied to clipboard');
        },
        () => {
          console.log('error');
        }
      );

    e.target.textContent = 'copied!';
  }
});
