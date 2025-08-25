// ...existing code...

let students = [];
let editingIndex = -1;

// Add or Update Student
function addStudent(event) {
  event.preventDefault();

  let id = document.getElementById("studentId").value;
  let name = document.getElementById("studentName").value;
  let age = document.getElementById("studentAge").value;
  let grade = document.getElementById("studentGrade").value;

  if (!id || !name || !age || !grade) {
    alert("Please fill all fields!");
    return;
  }

  let student = { id, name, age, grade };

  if (editingIndex === -1) {
    students.push(student);
  } else {
    students[editingIndex] = student;
    editingIndex = -1;
  }

  saveStudents();
  document.getElementById("studentForm").reset();
  displayStudents();
}

// Display Students in Table
function displayStudents(list = students) {
  let tbody = document.querySelector("#studentTable tbody");
  tbody.innerHTML = "";

  list.forEach((student, index) => {
    let row = `<tr>
      <td>${student.id}</td>
      <td>${student.name}</td>
      <td>${student.age}</td>
      <td>${student.grade}</td>
      <td>
        <button onclick="editStudent(${index})">Edit</button>
        <button onclick="deleteStudent(${index})">Delete</button>
      </td>
    </tr>`;
    tbody.innerHTML += row;
  });
}

// Edit Student
function editStudent(index) {
  let student = students[index];
  document.getElementById("studentId").value = student.id;
  document.getElementById("studentName").value = student.name;
  document.getElementById("studentAge").value = student.age;
  document.getElementById("studentGrade").value = student.grade;
  editingIndex = index;
}

// Delete Student
function deleteStudent(index) {
  if (confirm("Are you sure you want to delete this record?")) {
    students.splice(index, 1);
    saveStudents();
    displayStudents();
  }
}

// Search Student
function searchStudent() {
  let query = document.getElementById("searchInput").value.toLowerCase();
  let filtered = students.filter(student =>
    student.id.toLowerCase().includes(query) ||
    student.name.toLowerCase().includes(query)
  );
  displayStudents(filtered);
}

// Save to localStorage
function saveStudents() {
  localStorage.setItem('students', JSON.stringify(students));
}

// Load from localStorage
function loadStudents() {
  let data = localStorage.getItem('students');
  if (data) {
    students = JSON.parse(data);
    displayStudents();
  }
}

// Save to file
function saveToFile() {
  const dataStr = JSON.stringify(students, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "students.json";
  a.click();
  URL.revokeObjectURL(url);
}

// Load from file
function loadFromFile(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      students = JSON.parse(e.target.result);
      saveStudents();
      displayStudents();
    } catch (err) {
      alert("Invalid file format!");
    }
  };
  reader.readAsText(file);
}

// Form submit event
document.getElementById("studentForm").addEventListener("submit", addStudent);

// Initial load
window.onload = loadStudents;

// ...existing code...