//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// HOLIDAYS API
fetch('https://holidays.abstractapi.com/v1/?api_key=f434f86341544e5fa48dcd16db5f12d5&country=US&year=2020&month=12&day=25')
  .then(response => response.json())
  .then(data => console.log(data));


// fetch('https://holidays.abstractapi.com/v1/?api_key=f434f86341544e5fa48dcd16db5f12d5&country=' + country + '&year=' + year + '&month=' + month + '&day=' + day)
//   .then(response => response.json())
//   .then(data => console.log(data));


//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// WIKIPEDIA API

fetch('https://en.wikipedia.org//w/api.php?action=opensearch&format=json&origin=*&search=javascript&limit=1')
  .then(response => response.json())
  .then(data => console.log(data));


//   fetch('https://en.wikipedia.org//w/api.php?action=opensearch&format=json&origin=*&search=' + holiday.name + '&limit=1')
//   .then(response => response.json())
//   .then(data => console.log(data));
