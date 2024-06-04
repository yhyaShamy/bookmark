var bookName = document.getElementById("bookName");
var webURL = document.getElementById("webURL");
var nameExlm = document.getElementById("nameExlmIcon");
var nameCorrect = document.getElementById("nameCorrectIcon");
var urlExlm = document.getElementById("urlExlmIcon");
var urlCorrect = document.getElementById("urlCorrectIcon");
var validLayer = document.getElementById("validLayer");
var validMessage = document.getElementById("validMessage");

var booksContainer = [];

if (localStorage.getItem("books") != null) {
  getFromLocalStorage();
}

function getBook() {
  var book = {
    name1: bookName.value,
    webUrl: webURL.value,
  };

  // Check of data is valid
  if (!nameInputIsValid() || !urlInputIsValid()) {
    removeIconAfterSubmit();
    openValidMassege();
    return;
  } else if (!bookName.value || !webURL.value) {
    removeIconAfterSubmit();
    openValidMassege();
    return;
  }

  removeIconAfterSubmit();
  // Add Data To Array of object
  booksContainer.push(book);
  console.log(booksContainer);
  // Save Data to the local storage and display data on the table
  SaveToLocalStorage();
  // clear form after submit
  clearForm();
}

// Display Books on the table

function displayBook(arr) {
  var cartona = ``;
  for (var i = 0; i < arr.length; i++) {
    cartona += `
        <tr>
        <td>${i + 1}</td>
        <td>${arr[i].name1}</td>
        <td>
        <a href="${arr[i].webUrl}">
            <button class="btn btn-md btn-success px-3 py-2">
                <i class="fa-solid fa-eye me-2"></i>
                Visit
            </button>
        </a>
        </td>
        <td>
            <button class="btn btn-md btn-danger px-3 py-2" onclick="deleteItem(${i})">
                <i class="fa-solid fa-trash me-2"></i>
                Delete
            </button>
        </td>
    </tr>
        `;
  }

  document.getElementById("tableBody").innerHTML = cartona;
}

// Save to Local Storage

function SaveToLocalStorage() {
  localStorage.setItem("books", JSON.stringify(booksContainer));
  displayBook(booksContainer);
}

// Get data from local storage

function getFromLocalStorage() {
  var books = JSON.parse(localStorage.getItem("books"));
  displayBook(books);
}

// Clear Form after Submit

function clearForm() {
  bookName.value = "";
  webURL.value = "";
}

// Delete item

function deleteItem(i) {
  booksContainer.splice(i, 1);
  SaveToLocalStorage();
}

// REGEX
var nameRegex = /^([A-Z]|[a-z]|[0-9]){3,}$/;
var URLregex =
  /^(([A-Z]|[a-z]|[0-9]){0,})(\.co|\.ht)(([A-Z]|[a-z]|[0-9]){0,})$/;

// Check if name is valid

function nameInputIsValid() {
  if (nameRegex.test(bookName.value) == true) {
    nameCorrect.classList.replace("d-none", "d-block");
    nameExlm.classList.replace("d-block", "d-none");
    return true;
  } else {
    nameExlm.classList.replace("d-none", "d-block");
    nameCorrect.classList.replace("d-block", "d-none");
    return false;
  }
}

// Check if URL is valid
function urlInputIsValid() {
  if (URLregex.test(webURL.value) == true) {
    urlCorrect.classList.replace("d-none", "d-block");
    urlExlm.classList.replace("d-block", "d-none");
    return true;
  } else {
    urlExlm.classList.replace("d-none", "d-block");
    urlCorrect.classList.replace("d-block", "d-none");
    return false;
  }
}

function removeIconAfterSubmit() {
  nameExlm.classList.add("d-none");
  nameCorrect.classList.add("d-none");
  urlCorrect.classList.add("d-none");
  urlExlm.classList.add("d-none");
}

// Not valid massege

function openValidMassege() {
  validLayer.classList.remove("d-none");
  validMessage.classList.remove("d-none");
}

function closeValidMassege() {
  validLayer.classList.add("d-none");
  validMessage.classList.add("d-none");
}
