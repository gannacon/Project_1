//------------------------------------------------------------------------------------------------------------------------
// VARIABLES FROM USER INPUT
var userFormEl = document.getElementById('country-form');
var countryInputEl = document.getElementById('country-input');
var monthInputEl = document.getElementById('month');
var dayInputEl = document.getElementById('day');

//------------------------------------------------------------------------------------------------------------------------
// VARIABLES FOR HOLIDAY OUTPUT
var holidayContainer = document.getElementById('holidayOutput');
var buttonsContainer = document.getElementById('buttonDiv');
var favoritesContainer = document.getElementById('favorites');
var favoriteHolidays = [];

//------------------------------------------------------------------------------------------------------------------------
/* FORM SUBMIT HANDLER. ON SUBMIT BUTTON CLICK IT WILL TAKE THE USERS INPUT AND IF
IT IS VALID IT WILL PUSH INTO THE holiday search FUNCTION
*/
var formSubmitHandler = function(event) {
  event.preventDefault();

  var country = countryInputEl.value.trim();
  var month = monthInputEl.value;
  var day = dayInputEl.value;

  if (countryInputEl) {
    holidaySearch(country, month, day); 
  } 
}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// HOLIDAYS API

  //------------------------------------------------------------------------------------------------------------------------
  /* FUNCTION RUNS AFTER THE SUBMIT BUTTON IS CLICKED. READS THE USER INPUT AND PLACES IT INTO THE API.
  */
  function holidaySearch(country, month, day){
    holidayContainer.innerHTML = '';
    buttonsContainer.innerHTML = '';
    var holiday = 'https://holidays.abstractapi.com/v1/?api_key=f434f86341544e5fa48dcd16db5f12d5&country=' + country + '&year=2020&month=' + month + '&day=' + day;
    fetch(holiday)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      if (data[0] != null){
        renderData(data);
      }else{
        holidayContainer.innerHTML = 'No holidays on this day!'
        document.getElementById("buttonDiv").style.display = "none";
        return;
        }
      });
    };

function renderData(data){

  var holidayName = document.createElement('h1')
  var name = document.createTextNode(data[0].name);
  holidayName.appendChild(name);
  holidayContainer.appendChild(holidayName);
  holidayName.setAttribute('style','margin-bottom: 2%; font-weight: bold;')

  var holidayDate = document.createElement('h2')
  var date = document.createTextNode(data[0].date);
  holidayDate.appendChild(date);
  holidayContainer.appendChild(holidayDate);
  holidayDate.setAttribute('style', 'margin: 1%;')

  var holidayWeekDay = document.createElement('p')
  var weekDay = document.createTextNode('Day of the week: ' + data[0].week_day);
  holidayWeekDay.appendChild(weekDay);
  holidayContainer.appendChild(holidayWeekDay);
  holidayWeekDay.setAttribute('style', 'margin: 1%;')

  var holidayType = document.createElement('p')
  var type = document.createTextNode('Type of Holiday: ' + data[0].type);
  holidayType.appendChild(type);
  holidayContainer.appendChild(holidayType);
  holidayType.setAttribute('style', 'margin: 1%;')
  
  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  // WIKIPEDIA API
  var wikipedia = 'https://en.wikipedia.org//w/api.php?action=opensearch&format=json&origin=*&search=' + data[0].name + '&limit=1';
  fetch(wikipedia)
  .then(function(response){
    return response.json();
  })
  .then(function (data){
  document.getElementById("buttonDiv").style.display = "block";
  console.log(data);
  var wikipediaLink = data[3];
  console.log(wikipediaLink);
  var learnBtn = document.createElement('a');
  var learnText = document.createTextNode('Learn More');
  learnBtn.setAttribute('href', wikipediaLink);
  learnBtn.setAttribute('target', '_blank');
  learnBtn.appendChild(learnText);
  buttonsContainer.appendChild(learnBtn);
  learnBtn.setAttribute('style', 'background-color: #E5E5E5; text-decoration: none; margin: 1%; color: black; border: 1px solid black;')
});

// CREATE SAVE BUTTON
var saveBtn = document.createElement('button');
saveBtn.dataset.name = data[0].name;
saveBtn.dataset.country = data[0].country;
saveBtn.dataset.date_day = data[0].date_day;
saveBtn.dataset.date_month = data[0].date_month;
// more here
//create an array of objects (contains the three values above)
var saveBtnText = document.createTextNode('Save');
saveBtn.appendChild(saveBtnText);
buttonsContainer.appendChild(saveBtn);
saveBtn.setAttribute('style', 'margin: 1%;')
};


function saveHoliday(event){
  console.log('Saved!');
  var target = event.target;
  if (target.matches('button')){
    var favoriteHoliday = document.createElement('button');
    var favoriteHolidayText = document.createTextNode(target.dataset.name);
    favoriteHoliday.appendChild(favoriteHolidayText);
    favoritesContainer.appendChild(favoriteHoliday);
  }
};

//another function that will load saved holidays and render to the screen. 
buttonsContainer.addEventListener('click', saveHoliday);
userFormEl.addEventListener('submit', formSubmitHandler);