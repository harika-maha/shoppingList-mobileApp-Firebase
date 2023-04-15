import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL:
    "https://shoppinglist-35735-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const values = ref(database, "items");

var input = document.getElementById("input");
var submitBtn = document.getElementById("submitBtn");

submitBtn.addEventListener("click", () => {
  let inputValue = input.value;

  push(values, inputValue);
  console.log(`${inputValue} added to database`);
  // appendListElem(inputValue);
  clear();

  onValue(values, function (snapshot) {
    // console.log(snapshot.val());
    var itemsArray = Object.values(snapshot.val());
    clearListEl();
    for (let i = 0; i < itemsArray.length; i++) {
      appendListElem(itemsArray[i]);
      console.log(itemsArray[i]);
    }
  });
});

function clearListEl() {
  document.getElementById("shopList").innerHTML = "";
}

function clear() {
  input.value = "";
}
function appendListElem(inputVal) {
  document
    .getElementById("shopList")
    .insertAdjacentHTML("afterbegin", `<li>${inputVal}</li>`);
}
