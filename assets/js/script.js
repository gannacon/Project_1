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
var favoriteHolidayArray = [];
var FAVORITE_HOLIDAY_KEY = 'savedHoliday';

//------------------------------------------------------------------------------------------------------------------------
// INITIAL FUNCTION FOR WHEN PAGE FIRST RENDERS TO GET ALL PREVIOUSLY SAVED HOLIDAYS

function init(){
renderFavorites();
};

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

  var holidayLocation = document.createElement('h2')
  var date = document.createTextNode(data[0].location);
  holidayLocation.appendChild(date);
  holidayContainer.appendChild(holidayLocation);
  holidayLocation.setAttribute('style', 'margin: 1%;')

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
  learnBtn.setAttribute('id', 'LearnBtn');
});

// CREATE SAVE BUTTON
var saveBtn = document.createElement('button');
saveBtn.dataset.name = data[0].name;
saveBtn.dataset.country = data[0].country;
saveBtn.dataset.date_day = data[0].date_day;
saveBtn.dataset.date_month = data[0].date_month;

var saveBtnText = document.createTextNode('Save');
saveBtn.appendChild(saveBtnText);
buttonsContainer.appendChild(saveBtn);
saveBtn.setAttribute('id', 'SaveBtn');

};

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// CREATE BUTTON ONCE BUTTON "SAVE" IS CLICKED AND NAME THE BUTTON THE NAME OF THE HOLIDAY AND COUNTRY
function saveHoliday(event){
  console.log('Saved!');
  var target = event.target;
  if (target.matches('button')){
    
    var favoriteObject = {
      holidayName: target.dataset.name,
      country: target.dataset.country,
      month: target.dataset.date_month,
      day: target.dataset.date_day
    }

      favoriteHolidayArray.push(favoriteObject);
      console.log(favoriteHolidayArray)
      localStorage.setItem(FAVORITE_HOLIDAY_KEY, JSON.stringify(favoriteHolidayArray));
      renderFavorites();

  }
};

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// RENDERING BUTTONS FROM LOCAL STORAGE
function renderFavorites(){
  favoriteHolidayArray = JSON.parse(localStorage.getItem(FAVORITE_HOLIDAY_KEY));
  if (favoriteHolidayArray === null){
    favoriteHolidayArray = [];
  }
  favoritesContainer.innerHTML = '';
  for (var i = 0; i<favoriteHolidayArray.length; i++){
    var holiday = favoriteHolidayArray[i];
    var favoriteHoliday = document.createElement('button');
    favoriteHoliday.dataset.country = holiday.country;
    favoriteHoliday.dataset.date_month = holiday.month;
    favoriteHoliday.dataset.date_day = holiday.day;
    var favoriteHolidayText = document.createTextNode(holiday.country + '-' + holiday.holidayName);
    favoriteHoliday.appendChild(favoriteHolidayText);
    favoriteHoliday.setAttribute('id', 'favoriteBtn');
    favoritesContainer.appendChild(favoriteHoliday);
  }
};

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// PASSING THE VALUES FORM OUR LOCAL STORAGE
function fetchSavedHoliday(event){

  var target = event.target;
  if (target.matches('button')){
    
  var country = target.dataset.country
  var month = target.dataset.date_month
  var day = target.dataset.date_day
    
  holidaySearch(country, month, day);
  }

};

favoritesContainer.addEventListener('click', fetchSavedHoliday);
buttonsContainer.addEventListener('click', saveHoliday);
userFormEl.addEventListener('submit', formSubmitHandler);

init();