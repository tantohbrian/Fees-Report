const btn = document.querySelector(".display");
const gridsContainer = document.querySelector(".grids");

document.getElementById("csvFile").addEventListener("change", function (e) {
  var file = e.target.files[0];
  if (file) {
    var reader = new FileReader();
    reader.onload = function (event) {
      var csvData = event.target.result;

      var jsonData = Papa.parse(csvData, {
        header: true,
        skipEmptyLines: true,
      }).data;

      const generateHighlight = (value) => {
        return value ? value : '<span class="missing-field">Missing</span>';
      };

      btn.addEventListener("click", () => {
        gridsContainer.innerHTML = "";

        jsonData.forEach((item) => {
          const htmlData = `
              <div class="grid">
                <div class="header">
                  <div class="img-container"><img src="img/logo.jpg" alt="" /></div>
                  <div class="header-content">
                    <h2>Landmark Metropolitan University</h2>
                    <p><b>Tel:</b> <span>672 339 570 | 698 642 593</span></p>
                    <p>
                      <a href="info@landmarkmetropolitanuniversity.com">info@landmarkmetropolitanuniversity.com</a>
                    </p>
                  </div>
                </div>
                <hr />
                <div class="student-details">
                  <div class="details-group col-one highlight">
                    <p class="field">Name:</p>
                    <p class="value name">${generateHighlight(item.Name)}</p>
                  </div>

                  <div class="details-group col-two">
                    <div class="item highlight">
                      <p class="field">Specialty:</p>
                      <p class="value">${generateHighlight(item.Specialty)}</p>
                    </div>
                    <div class="item highlight">
                      <p class="field">Level:</p>
                      <p class="value">${generateHighlight(item.Level)}</p>
                    </div>
                  </div>
                  <hr />

                  <h2>Fee status: <span class="fees_status">Completed</span></h2>

                  <div class="details-group col-one highlight">
                    <p class="field">Expected Fees:</p>
                    <p class="value">${generateHighlight(
                      item.Expected_Fees
                    )}</p>
                  </div>

                  <div class="details-group col-two">
                    <div class="item highlight">
                      <p class="field">Amount Paid:</p>
                      <p class="value">${generateHighlight(
                        item.Amount_Paid
                      )}</p>
                    </div>
                    <div class="item highlight">
                      <p class="field">Scholarship:</p>
                      <p class="value">${generateHighlight(
                        item.Scholarship
                      )}</p>
                    </div>
                  </div>

                  <div class="details-group col-two">
                    <div class="item highlight bold_borders">
                      <p class="field">Total Paid</p>
                      <p class="value">${generateHighlight(item.Total_Paid)}</p>
                    </div>
                    <div class="item highlight bold_borders">
                      <p class="field">Balance</p>
                      <p class="value">${generateHighlight(item.Balance)}</p>
                    </div>
                  </div>
                </div>
              </div>`;

          gridsContainer.innerHTML += htmlData;

          const feeStatus = document.querySelectorAll(".fees_status");
          feeStatus.forEach((status) => {
            if (item.Balance == 0) {
              status.textContent = "Completed";
            } else {
              status.textContent = "Incomplete";
            }
          });
        });
      });
    };
    reader.readAsText(file);
  }
});

document.querySelector(".print").addEventListener("click", () => {
  print();
});
