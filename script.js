let selectedBook = null;

const livres = JSON.parse(localStorage.getItem('livres')) || [];
sortBooks();

function save() {
  localStorage.setItem('livres', JSON.stringify(livres));
}


function onFormSubmit() {
  const formdata = readData();
  if (!validate(formdata)) return;

  if (selectedBook === null) {
    livres.push(formdata);
  } else {
    const bookIndex = livres.indexOf(selectedBook);
    if (bookIndex !== -1) livres[bookIndex] = formdata;
  }

  sortBooks();
  resetForm();
}

function validate(data) {
  if (data.title.trim() === "" || data.author.trim() === "") {
    alert("Title and author are required.");
    return false;
  }
  return true;
}

function readData() {
  return {
    title: document.getElementById("namee").value,
    genre: document.getElementById("cat").value,
    author: document.getElementById("assz").value,
    year: document.getElementById("addz").value,
    description: document.getElementById("ammz").value,
    status: document.getElementById("attz").value,
  };
}


function insertNew(data) {
  const tbody = document.querySelector("#greatlist tbody");
  const newRow = tbody.insertRow(-1);

  [data.title, data.genre, data.author, data.year, data.status, data.description].forEach(
    (value, i) => {
      newRow.insertCell(i).textContent = value;
    }
  );

  newRow.insertCell(6).innerHTML =
    '<a onclick="onEdit(this)">Edit</a> <a onclick="onDelete(this)">Delete</a>';
}

function renderBooks() {
  const tbody = document.querySelector("#greatlist tbody");
  tbody.innerHTML = "";
  livres.forEach(insertNew);
  searchBooks();
}

function sortBooks() {
  const [field, direction] = document.getElementById("sort").value.split("-");
  livres.sort(function (a, b) {
    const result = String(a[field] || "").localeCompare(String(b[field] || ""), undefined, {
      sensitivity: "base",
      numeric: true,
    });
    return direction === "desc" ? -result : result;
  });
  save();
  renderBooks();
}

function onEdit(link) {
  const row = link.closest("tr");
  const rowIndex = Array.from(row.parentElement.rows).indexOf(row);
  selectedBook = livres[rowIndex];
  const cells = row.cells;
  document.getElementById("namee").value = cells[0].textContent;
  document.getElementById("cat").value = cells[1].textContent;
  document.getElementById("assz").value = cells[2].textContent;
  document.getElementById("addz").value = cells[3].textContent;
  document.getElementById("attz").value = cells[4].textContent;
  document.getElementById("ammz").value = cells[5].textContent;

  document.querySelector('input[type="submit"]').value = "Update";
}

function onDelete(link) {
  const row = link.closest("tr");

  if (confirm("Delete this book?")) {
    const rowIndex = Array.from(row.parentElement.rows).indexOf(row);
    const deletedBook = livres[rowIndex];
    if (deletedBook === selectedBook) resetForm();
    livres.splice(rowIndex, 1);
    save();
    renderBooks();
  }
}

function resetForm() {
  document.querySelector("form").reset();
  selectedBook = null;
  document.querySelector('input[type="submit"]').value = "Submit";
}


function searchBooks() {
  const query = document.getElementById("search").value.toLowerCase();
  const rows = document.querySelectorAll("#greatlist tbody tr");

  rows.forEach(function (row) {
    const text = Array.from(row.cells)
      .slice(0, 6)
      .map(function (cell) { return cell.textContent; })
      .join(" ")
      .toLowerCase();

    row.style.display = text.includes(query) ? "" : "none";
  });
}

document.getElementById("sort").addEventListener("change", sortBooks);
