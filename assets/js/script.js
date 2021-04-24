//------------------------------------------------------------------------------------------------------------------------
// VARIABLES FROM USER INPUT
var userFormEl = document.getElementById('country-form');
var countryInputEl = document.getElementById('country-input');
var monthInputEl = document.getElementById('month');
var dayInputEl = document.getElementById('day');

//------------------------------------------------------------------------------------------------------------------------
// VARIABLES FOR HOLIDAY OUTPUT
var holidayContainer = document.getElementById('holidayOutput');

var learnBtn = document.getElementById('buttonDiv');

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
    buttonDiv.innerHTML = '';
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

  var holidayDate = document.createElement('h2')
  var date = document.createTextNode(data[0].date);
  holidayDate.appendChild(date);
  holidayContainer.appendChild(holidayDate);

  var holidayWeekDay = document.createElement('p')
  var weekDay = document.createTextNode(data[0].week_day);
  holidayWeekDay.appendChild(weekDay);
  holidayContainer.appendChild(holidayWeekDay);

  var holidayType = document.createElement('p')
  var type = document.createTextNode(data[0].type);
  holidayType.appendChild(type);
  holidayContainer.appendChild(holidayType);
  
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
  var Btn = document.createElement('a');
  var text = document.createTextNode('Learn More');
  Btn.setAttribute('href', wikipediaLink);
  Btn.setAttribute('target', '_blank');
  Btn.appendChild(text);
  learnBtn.appendChild(Btn);
  });

};




//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// WIKIPEDIA API



userFormEl.addEventListener('submit', formSubmitHandler);