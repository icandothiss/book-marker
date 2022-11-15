const siteInput = document.getElementById("siteName");
const URLInput = document.getElementById("siteURL");
const submitForm = document.getElementById("submit");
const form = document.getElementById("myForm");
const resultContainer = document.getElementById("second-container");
let savedItems = JSON.parse(localStorage.getItem("bookmarks"));
console.log(savedItems);
let elements = [];
//event listeners
form.addEventListener("submit", formSubmit);
resultContainer.addEventListener("click", deleteButton);
document.addEventListener("DOMContentLoaded", getBookmarks);

//functions
function formSubmit(e) {
  e.preventDefault();
  //url is valid check
  if (siteInput.value === "") {
    alert("please fill in the form");
    return;
  } else if (!isValidUrl(URLInput.value)) {
    alert("valid plz");
  }

  // create div
  const container = document.createElement("div");
  container.innerText = siteInput.value;
  container.setAttribute("id", "result-container");
  container.classList.add("result-container");
  const visitButton = document.createElement("a");
  visitButton.classList.add("visit-button");
  visitButton.innerText = "Visit";
  visitButton.setAttribute("hre", URLInput.value);
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  deleteButton.classList.add("delete-button");
  container.appendChild(visitButton);
  container.appendChild(deleteButton);
  resultContainer.appendChild(container);
  let urlName = {
    name: siteInput.value,
    url: URLInput.value,
  };
  saveLocalTodos(urlName);
}

//function to check if url is valid
const isValidUrl = (urlString) => {
  var inputElement = document.createElement("input");
  inputElement.type = "url";
  inputElement.value = urlString;

  if (!inputElement.checkValidity()) {
    return false;
  } else {
    return true;
  }
};

function deleteButton(e) {
  if (e.target.classList.contains("delete-button")) {
    for (let i = 0; i < resultContainer.children.length; i++) {
      if (e.target.parentElement === resultContainer.children[i]) {
        savedItems.splice(i, 1);
        localStorage.setItem("bookmarks", JSON.stringify(savedItems));
        e.target.parentElement.remove();
        console.log(i);
      }
    }
  }
}

function saveLocalTodos(url) {
  if (localStorage.getItem("bookmarks") === null) {
    var bookmarks = [];
    bookmarks.push(url);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  } else {
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    bookmarks.push(url);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }
}

function getBookmarks() {
  savedItems.forEach((element) => {
    const container = document.createElement("div");
    container.innerText = element.name;
    container.setAttribute("id", "result-container");
    container.classList.add("result-container");
    const visitButton = document.createElement("a");
    visitButton.classList.add("visit-button");
    visitButton.innerText = "Visit";
    visitButton.setAttribute("hre", element.url);
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.classList.add("delete-button");
    container.appendChild(visitButton);
    container.appendChild(deleteButton);
    resultContainer.appendChild(container);
  });
}
//savedItems.pop();
//console.log(savedItems);
//localStorage.setItem("bookmarks", JSON.stringify(savedItems));
