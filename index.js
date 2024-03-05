const main = document.getElementById("main");
const addUser = document.getElementById("add-user");
const double = document.getElementById("double");
const showMill = document.getElementById("show-millionaires");
const sort = document.getElementById("sort");
const calculateWealth = document.getElementById("calculate-wealth");

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

//fetch random user and add money
async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api/");
  const data = await res.json();

  const user = data.results[0];
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };

  addData(newUser);
}

//Double everyones money
function doubleMoney() {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });

  updateDom();
}

// Sort users by richest
function sortByRichest() {
  data.sort((a, b) => {
    return b.money - a.money;
  });

  updateDom();
}

// Filter Show only Mill
function showTopRich() {
  data = data.filter((user) => {
    return user.money > 1000000;
  });
}

//Calculate Wealth
function calWealth() {
  const wealth = data.reduce((acc, user) => (acc += user.money), 0);

  const wealth_element = document.createElement("div");
  wealth_element.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(
    wealth
  )}</strong></h3>`;
  main.appendChild(wealth_element);
}

// Add new obj to data arr
function addData(obj) {
  data.push(obj);

  updateDom();
}

//Update DOM
function updateDom(provideData = data) {
  //Clear main Div
  main.innerHTML = `<h2><strong>Person</strong> Wealth</h2>`;

  provideData.forEach(function (item) {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
      item.money
    )}`;
    main.appendChild(element);
  });
}

//format number as money
function formatMoney(number) {
  return "₹" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

//Event Listners
addUser.addEventListener("click", getRandomUser);
double.addEventListener("click", doubleMoney);
sort.addEventListener("click", sortByRichest);
showMill.addEventListener("click", showTopRich);
calculateWealth.addEventListener("click", calWealth);
