const btn = document.querySelector(".display");
const gridsContainer = document.querySelector(".grids");

// File input event
document.getElementById("csvFile").addEventListener("change", function (e) {
  var file = e.target.files[0];
  if (file) {
    var reader = new FileReader();
    reader.onload = function (event) {
      var csvData = event.target.result;

      // Parse CSV to JSON
      var jsonData = Papa.parse(csvData, {
        header: true,
        skipEmptyLines: true,
      }).data;

      // Function to generate a unique ID
      const generateUniqueID = () => {
        return Math.floor(100000 + Math.random() * 900000);
      };

      // document.querySelector(".group").addEventListener("submit", (e) => {
      //   e.preventDefault();
      // });

      btn.addEventListener("click", () => {
        gridsContainer.innerHTML = "";

        jsonData.forEach((item) => {
          // Generate a new unique ID for each student
          const uniqueID = generateUniqueID();
          const htmlData = `
              <div class="grid">
          <div class="header">
            <div class="img-container"><img src="img/logo.jpg" alt="" /></div>
            <div class="header-content">
              <h2>Landmark Metropolitan University</h2>
              <p><b>Tel:</b> <span>672 339 570 | 698 642 593</span></p>
              <p>
                <a href="info@landmarkmetropolitanuniversity.com"
                  >info@landmarkmetropolitanuniversity.com</a
                >
              </p>
            </div>
          </div>
          <hr />
          <div class="student-details">
            <div class="details-group col-one highlight">
              <p class="field">Name:</p>
              <p class="value name">${item.Name}</p>
            </div>

            <div class="details-group col-two">
              <div class="item highlight">
                <p class="field">Specialty:</p>
                <p class="value">${item.Specialty}</p>
              </div>
              <div class="item highlight">
                <p class="field">Level:</p>
                <p class="value">${item.Level}</p>
              </div>
            </div>
            <hr />

            <h2>Fee status: <span class="fees_status">Completed</span></h2>

            <div class="details-group col-one highlight">
              <p class="field">Expected Fees:</p>
              <p class="value">${item.Expected_Fees}</p>
            </div>

            <!-- two  -->
            <div class="details-group col-two">
              <div class="item highlight">
                <p class="field">Amount Paid:</p>
                <p class="value">${item.Amount_Paid}</p>
              </div>
              <div class="item highlight">
                <p class="field">Scholarship:</p>
                <p class="value">${item.Scholarship}</p>
              </div>
            </div>

            <!-- two  -->
            <div class="details-group col-two">
              <div class="item highlight bold_borders">
                <p class="field">Total Paid</p>
                <p class="value">${item.Total_Paid}</p>
              </div>
              <div class="item highlight bold_borders">
                <p class="field">Balance</p>
                <p class="value">${item.Balance}</p>
              </div>
            </div>
          </div>

          <!-- clause -->
          <div class="clause">
            <p>
              Please be informed that the final deadline to complete payment of school fees for the <b>2024/2025</b> academic year is 30th March 2025. Ensure all fees are settled by this date to avoid any disruptions to your academic activities. Payments can be made at the Bank. For any inquiries or payment plans, contact the finance department at any of our two campuses. Let’s stay on track for a successful academic year!
            </p>
        </div>

        <!-- sign -->
        <div class="sign">
          <div class="sign-group">
            <p>Finance Department</p>
            <p>Landmark Metropolitan University</p>
          </div>

          <div class="border"></div>
        </div>
      </div>`;
          // Append each generated HTML block to the grids container
          gridsContainer.innerHTML += htmlData;
          const feeStatus = document.querySelectorAll(".fees_status");

          feeStatus.forEach((status) => {
            if (item.balance === 0) {
              status.textContent = "Completed";
            } else {
              status.textContent = "Incomplete";
            }
          });

          if (
            !item.Name ||
            !item.Specialty ||
            !item.Level ||
            !item.Expected_Fees ||
            !item.Amount_Paid ||
            !item.Scholarship ||
            !item.Total_Paid ||
            !item.Balance
          ) {
            alert("Some Fields are Missing  ");
          }
          // console.log(item.Amount_Paid);
        });
      });
    };
    reader.readAsText(file);
  }
});

// print
document.querySelector(".print").addEventListener("click", () => {
  print();
});
