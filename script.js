let selectedRow = null;

const livres = JSON.parse(localStorage.getItem('livres')) || [];
livres.forEach(function(book){
  insertNew(book)
});

function save() {
  localStorage.setItem('livres', JSON.stringify(livres));
}


function onFormSubmit() {
  const formdata = readData();

  if (selectedRow === null) {
    insertNew(formdata);      
    livres.push(formdata);
    save();
  } else {
    updateRow(formdata);
    const rowIndex = Array.from(selectedRow.parentElement.rows).indexOf(selectedRow);
    livres[rowIndex] = formdata;
    save();
  }

  resetForm();
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

function onEdit(link) {
  selectedRow = link.closest("tr");
  const cells = selectedRow.cells;
  document.getElementById("namee").value = cells[0].textContent;
  document.getElementById("cat").value = cells[1].textContent;
  document.getElementById("assz").value = cells[2].textContent;
  document.getElementById("addz").value = cells[3].textContent;
  document.getElementById("attz").value = cells[4].textContent;
  document.getElementById("ammz").value = cells[5].textContent;

  document.querySelector('input[type="submit"]').value = "Update";
}

function updateRow(data) {
  const cells = selectedRow.cells;
  cells[0].textContent = data.title;
  cells[1].textContent = data.genre;
  cells[2].textContent = data.author;
  cells[3].textContent = data.year;
  cells[4].textContent = data.status;
  cells[5].textContent = data.description;
}

function onDelete(link) {
  const row = link.closest("tr");

  if (confirm("Delete this book?")) {
    if (row === selectedRow) resetForm();
    const rowIndex = Array.from(row.parentElement.rows).indexOf(row);
    livres.splice(rowIndex, 1);
    row.remove();
    save();
  }
}

function resetForm() {
  document.querySelector("form").reset();
  selectedRow = null;
  document.querySelector('input[type="submit"]').value = "Submit";
}


