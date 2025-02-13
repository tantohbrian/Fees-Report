// Getting all elements
const form = document.querySelector(".form");
const studentName = document.getElementById("name");
const category = document.getElementById("category");
const specialty = document.getElementById("specialty");
const level = document.getElementById("level");
const errorElement = document.querySelector(".error");

studentName.value = "";
specialty.value = "";
level.value = "";
category.value = "";
let studentData = [];

// Function to generate a unique ID
const generateUniqueID = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

// Form submission logic
form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Clear previous error messages
  errorElement.innerHTML = "";
  errorElement.classList.remove("opened");

  // Validate form inputs
  let messages = [];
  if (!studentName.value) messages.push(`<p>User name is required</p>`);
  if (!specialty.value) messages.push(`<p>Specialty is required</p>`);
  if (!level.value) messages.push(`<p>Level is required</p>`);
  if (!category.value) messages.push(`<p>Category is required</p>`);

  // Check if all fields are empty
  if (
    !studentName.value &&
    !specialty.value &&
    !level.value &&
    !category.value
  ) {
    messages = [`<p>All fields are required</p>`]; // Override other messages
  }

  if (messages.length > 0) {
    // Display error messages
    errorElement.innerHTML = messages.join(" ");
    errorElement.classList.add("opened");
    setTimeout(() => {
      errorElement.innerHTML = "";
      errorElement.classList.remove("opened");
    }, 2000);
  } else {
    // Create a new student object with a unique ID
    const newStudent = {
      ID: generateUniqueID(), // Generate a unique ID for each student
      Name: studentName.value,
      Category: category.value,
      Specialty: specialty.value,
      Level: level.value,
    };

    // Check for duplicates
    const isDuplicate = studentData.some(
      (student) =>
        student.Name === newStudent.Name &&
        student.Specialty === newStudent.Specialty &&
        student.Level === newStudent.Level &&
        student.Category === newStudent.Category
    );

    if (!isDuplicate) {
      // Add new student to the array
      studentData.push(newStudent);
      // Display updated data
      displayData();
      // Clear form fields
      form.reset();
    } else {
      errorElement.innerHTML = "Duplicate entry detected.";
      errorElement.classList.add("opened");
      setTimeout(() => {
        errorElement.innerHTML = "";
        errorElement.classList.remove("opened");
      }, 2000);
    }
  }
});

// Function to display student data
function displayData() {
  // Clear existing content
  gridsContainer.innerHTML = "";

  // Append each student to the grid container
  studentData.forEach((item) => {
    const htmlData = `
      <div class="grid">
        <div class="header">
          <div class="img-container"><img src="img/logo.jpg" alt="" /></div>
          <div class="header-content">
            <h2>Landmark Metropolitan University</h2>
            <div class="verified">Verified ✔</div>
          </div>
        </div>
        <div class="student-details">
          <div class="student-name" contenteditable="">${item.Name}</div>
          <div class="level" contenteditable="">${item.Level}</div>
          <div class="Specialty" contenteditable="">${item.Specialty}</div>
          <div class="id" ><img src="img/qr.png"/> ${item.ID}</div>
        </div>
        <div class="footer">
          <div class="category">${item.Category}</div>
          <div class="signature"><p>Sign here</p> <div class="line"></div></div>
        </div>
      </div>`;
    gridsContainer.innerHTML += htmlData;
  });
  studentName.value = "";
  specialty.value = "";
  level.value = "";
  category.value = "";
}
