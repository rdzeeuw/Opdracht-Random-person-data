//Deel 1: filter countries alphabetical, without duplication ------------------------------------------
const sortCountries = (randomPersonData) => {
   return randomPersonData.sort((person1, person2) => {
    return (person1.region > person2.region) ? 1 : -1
   }).map(person => person.region);
}

const uniqueCountries = [...new Set(sortCountries(randomPersonData))];

//function to add countries to DOM
const makeCountryList = (uniqueCountries) => {
    //remove old items from list
    const myNode = document.getElementById("list");
    while (myNode.firstChild) {
    myNode.removeChild(myNode.lastChild);
    }

    uniqueCountries.forEach(country => {
    //creating elements
        const textNode = document.createTextNode(country);
        const li = document.createElement('li');
        const list = document.getElementById('list');
    //appending elements
        li.appendChild(textNode);
        list.appendChild(li);
    });
}

// Deel 2: filter capricorn ladies (first name,last name, photo, sorted by first) ------------------------------------------

//Selecting capricorn women
const getWomenOverThirty = randomPersonData.filter(person => 
    person.gender == "female" && person.age > 30 
);

const getWomenJan = getWomenOverThirty.filter(person => 
    person.birthday.mdy.split("/")[0] == 01 && 
    person.birthday.dmy.split("/")[0] <= 19
);

const getWomenDec = getWomenOverThirty.filter(person => 
    person.birthday.mdy.split("/")[0] == 12 &&
    person.birthday.dmy.split("/")[0] >= 22
);

const filteredWomen = getWomenDec.concat(getWomenJan);
const filteredWomenResult = filteredWomen.sort(filteredWomen.name);


//function to add women to DOM
const makeWomenList = (filteredWomenResult) => {
    //remove old items from list
    const myNode = document.getElementById("list");
    while (myNode.firstChild) {
    myNode.removeChild(myNode.lastChild);
    }
    
    filteredWomenResult.forEach(woman => {
        //creating elements
        const textNode = document.createTextNode(woman.name + woman.surname);
        const img = document.createElement('img');
        const li = document.createElement('li');
        const list = document.getElementById('list');
        //filling elements
        img.setAttribute("src", woman.photo);
        img.setAttribute("alt", woman.name + woman.surname);
        //appending elements
        li.appendChild(textNode);
        li.appendChild(img);
        list.appendChild(li);
    });
}

   
//Deel 3 - Creditcards sorted by expiration date ------------------------------------------
const today = new Date();
const month = today.getMonth() + 1;
const year = today.getFullYear() - 2000;

//filter adults by age, expiration date this year
const adults = randomPersonData.filter(person => 
    person.age >= 18 &&
    person.credit_card.expiration.split("/")[0] >= month 
    && person.credit_card.expiration.split("/")[1] == year
    )
  
//sort adults by expiration date
const sortedByExpirationDate = adults.slice().sort((a, b) => 
    (parseInt(a.credit_card.expiration.split("/")[0]) > parseInt(b.credit_card.expiration.split("/")[0])) ? 1 : -1)

//function to add expiration dates to list
 const makeExpirationDateList = (sortedByExpirationDate) => {
    //remove old items from list
    const myNode = document.getElementById("list");
    while (myNode.firstChild) {
    myNode.removeChild(myNode.lastChild);
    }

    sortedByExpirationDate.forEach(person => {
       //creating elements
        const textNode = document.createTextNode('Name: ' + person.name + ' ' + person.surname + ', Phone: ' + person.phone + ', Creditcard number: ' + person.credit_card.number + ', expiration date: ' + person.credit_card.expiration);
        const li = document.createElement('li');
        const list = document.getElementById('list');
    //appending elements
        li.appendChild(textNode);
        list.appendChild(li);
    });
}


//Deel 4: make a list of inhabitants per country, top to bottom ------------------------ (not finished yet)-------------

const countryList = (randomPersonData) => {
    return randomPersonData.map(person => person.region);
 }

let count = {};

countryList(randomPersonData).forEach(function(i) { count[i] = (count[i]||0) + 1;});

const ordered = Object.keys(count).sort().reduce(
    (obj, key) => { 
      obj[key] = count[key]; 
      return obj;
    }, 
    {}
  );
  
  console.log(JSON.stringify(ordered));


//function to add country inhabitants to list
const makeHabitantsList = (uniqueCountries) => {
    //remove old items from list
    const myNode = document.getElementById("list");
    while (myNode.firstChild) {
    myNode.removeChild(myNode.lastChild);
    }

    uniqueCountries.forEach(country => {
    //creating elements
        const textNode = document.createTextNode(country + ': ' + count[country]);
        const li = document.createElement('li');
        const list = document.getElementById('list');
    //appending elements
        li.appendChild(textNode);
        list.appendChild(li);
    });
}


//switch statement - event listener/handler ---------------------------------------------------
const buttons = document.getElementsByName("button");

buttons.forEach(btn => {
    addEventListener('click', handleOnChange)})
     
function handleOnChange(event) {

        const target = event.target;
        
        switch (target.id) {
            case 'countries':
                makeCountryList(uniqueCountries);
                break;
            case 'capricorn':
                makeWomenList(filteredWomenResult);
                break;
            case 'creditcard':
                makeExpirationDateList(sortedByExpirationDate);
                break;
                case 'inhabitants':
                    makeHabitantsList(uniqueCountries);
                break;
        }
    } 







