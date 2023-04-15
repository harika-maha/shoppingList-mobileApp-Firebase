import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
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
});

onValue(values, function (snapshot) {
  if (snapshot.exists()) {
    // console.log(snapshot.val());
    var itemsArray = Object.entries(snapshot.val());
    clearListEl();
    for (let i = 0; i < itemsArray.length; i++) {
      var currentItem = itemsArray[i];
      var currentItemID = currentItem[0];
      var currentItemValue = currentItem[1];
      appendListElem(currentItem);
    }
  } else {
    document.getElementById("shopList").innerHTML = "no more entries!";
  }
});

function clearListEl() {
  document.getElementById("shopList").innerHTML = "";
}

function clear() {
  input.value = "";
}
function appendListElem(inputVal) {
  // document
  //   .getElementById("shopList")
  //   .insertAdjacentHTML("afterbegin", `<li>${inputVal}</li>`);

  let itemID = inputVal[0];
  let itemValue = inputVal[1];
  let newEl = document.createElement("li");
  newEl.textContent = itemValue;

  newEl.addEventListener("click", function () {
    let itemLocation = ref(database, `items/${itemID}`);
    remove(itemLocation);
  });

  document.getElementById("shopList").append(newEl);
}
