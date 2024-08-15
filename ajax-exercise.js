import axios from 'axios';

// PART 1: Show Dog Photo

// function showDogPhoto(evt) {
//   // TODO: get a random photo from the Dog API and show it in the #dog-image div
  
//   // .then() method
//   axios.get("https://dog.ceo/api/breeds/image/random") .then((response) => {
//     document.querySelector("#dog-image").innerHTML = `<img src="${response.data.message}" />`
//   });
// };

async function showDogPhoto(evt) {
  // async await method
    const response = await axios.get("https://dog.ceo/api/breeds/image/random")
    document.querySelector("#dog-image").innerHTML = `<img src="${response.data.message}" />`
}

document.querySelector('#get-dog-image').addEventListener('click', showDogPhoto);

// PART 2: Show Weather

async function showWeather(evt) {
  const zipcode = document.querySelector('#zipcode-field').value;
  

  const response = await axios.get(`/weather.txt?zipcode=${zipcode}`);

  
  // TODO: request weather with that URL and show the forecast in #weather-info
  document.querySelector("#weather-info").innerText = response.data;
}

document.querySelector('#weather-button').addEventListener('click', showWeather);

// PART 3: Order Cookies

async function orderCookies(evt) {
  // TODO: Need to preventDefault here, because we're listening for a submit event!
  // TODO: show the result message after your form
  // TODO: if the result code is ERROR, make it show up in red (see our CSS!)
  evt.preventDefault();

  const formData = {
    cookieType: document.querySelector("#cookie-type-field").value,
    qty: document.querySelector("#qty-field").value,
  }

  const response = await axios.post("/order-cookies.json", formData);
  // console.log(response.data.resultCode);

  const orderStatusDiv = document.querySelector("#order-status");
  orderStatusDiv.innerText = response.data.message;
  
  if (response.data.resultCode === "ERROR") {
    orderStatusDiv.classList.add('order-error');
  } else {
    orderStatusDiv.classList.remove('order-error');
  }

}
document.querySelector('#order-form').addEventListener('submit', orderCookies);

// PART 4: iTunes Search

async function iTunesSearch(evt) {
  evt.preventDefault();
  const searchTerm = document.querySelector("#search-term").value;

  // construct a query string so that the API doesn't have any problems reading 
  // the user input.

  const formData = {'term': searchTerm};
  const queryString = new URLSearchParams(formData).toString();
  const url = `https://itunes.apple.com/search?${queryString}`;

  // make an Axios call to the iTunes API
  const response = await axios.get(url);
  // set variable results to be used in the for loop later
  const results = response.data.results;
  
  // me parsing through the data I received as a response from the API
  // console.log(response.data.results);
  // console.log(response.data.results[0]);
  // console.log(response.data.results[0].artistName);

  // set info variable to an empty string
  let info = "";

  // loop through the array of results.
  for (const result of results) {
    // declare variables in for loop
    const artistName = result.artistName;
    const trackName = result.trackName;

    // for each result, concatenate a <li> containing the artists name 
    // and track to the info string using this syntax 
    // `Artist: ${artistName} Song: ${trackName}`
    info +=  `<li>Artist: ${artistName} Song: ${trackName}</li>`;
  }
  // display the string inside the #itunes-results list.
  document.querySelector("#itunes-results").innerHTML = info;

}
document.querySelector('#itunes-search-form').addEventListener('submit', iTunesSearch);
