const inputName = document.getElementById("name");
const batch = document.getElementById("batch");
const age = document.getElementById("age");
const score = document.getElementById("score");

const searchInput = document.getElementById("searchInput");
const sortByAge = document.getElementById("sortByAge");
const sortByScore = document.getElementById("sortByScore");
const submitBtn = document.getElementById("submitBtn");
const tableBody = document.getElementById("tableBody");

let students = [];

function renderTable(data) {
  tableBody.innerHTML = "";
  data.forEach((student, index) => {
    const tr = document.createElement("tr");
    const highlight = student.score > 80 ? "style='background: #d4edda;'" : "";
    tr.innerHTML = `
      <td ${highlight}>${student.name}</td>
      <td>${student.batch}</td>
      <td>${student.age}</td>
      <td>${student.score}</td>
      <td>
        <button class="editBtn" data-index="${index}">Edit</button>
        <button class="deleteBtn" data-index="${index}">Delete</button>
      </td>
    `;
    tableBody.appendChild(tr);
  });
}

submitBtn.addEventListener("click", function (e) {
  e.preventDefault();

  if (
    inputName.value.trim() === "" ||
    batch.value.trim() === "" ||
    age.value.trim() === "" ||
    score.value.trim() === ""
  ) {
    alert("Please fill all fields");
    return;
  }

  const ageValue = Number(age.value);
  const scoreValue = Number(score.value);

  if (ageValue <= 0) {
    alert("Age must be positive");
    return;
  }

  if (scoreValue < 0 || scoreValue > 100) {
    alert("Score must be between 0 and 100");
    return;
  }

  const student = {
    name: inputName.value.trim(),
    batch: batch.value.trim(),
    age: ageValue,
    score: scoreValue,
  };

  students.push(student);
  renderTable(students);

  inputName.value = "";
  batch.value = "";
  age.value = "";
  score.value = "";
});

tableBody.addEventListener("click", function (e) {
  if (e.target.classList.contains("deleteBtn")) {
    const index = e.target.dataset.index;
    students.splice(index, 1);
    renderTable(students);
  }

  if (e.target.classList.contains("editBtn")) {
    const index = e.target.dataset.index;
    const student = students[index];

    inputName.value = student.name;
    batch.value = student.batch;
    age.value = student.age;
    score.value = student.score;

    students.splice(index, 1);
    renderTable(students);
  }
});

searchInput.addEventListener("input", function () {
  const query = searchInput.value.trim().toLowerCase();
  const filtered = students.filter((s) =>
    s.name.toLowerCase().includes(query)
  );
  renderTable(filtered);
});

sortByAge.addEventListener("click", function () {
  const sorted = [...students].sort((a, b) => a.age - b.age);
  renderTable(sorted);
});

sortByScore.addEventListener("click", function () {
  const sorted = [...students].sort((a, b) => b.score - a.score);
  renderTable(sorted);
});




