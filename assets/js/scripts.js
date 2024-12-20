document
  .getElementById("generateBtn")
  .addEventListener("click", generateRandom);

let usedNumbers = [];
let lastResult = null;
let allNumbers = [];

function initializeTable(min, max) {
  const tableContainer = document.getElementById("tableContainer");
  allNumbers = [];
  tableContainer.innerHTML = "";

  const table = document.createElement("table");
  const headerRow = document.createElement("tr");
  headerRow.innerHTML = "<th>Số trong khoảng</th>";
  table.appendChild(headerRow);

  for (let i = min; i <= max; i++) {
    const row = document.createElement("tr");
    row.setAttribute("data-number", i);
    row.innerHTML = `<td>${i}</td>`;
    table.appendChild(row);
    allNumbers.push(i);
  }

  tableContainer.appendChild(table);
}

function generateRandom() {
  const min = parseInt(document.getElementById("min").value);
  const max = parseInt(document.getElementById("max").value);

  if (isNaN(min) || isNaN(max)) {
    Swal.fire({
      icon: "error",
      title: "Lỗi đầu vào",
      text: "Vui lòng nhập số hợp lệ cho Min và Max.",
    });
    return;
  }

  if (min >= max) {
    Swal.fire({
      icon: "warning",
      title: "Khoảng không hợp lệ",
      text: "Giá trị Min phải nhỏ hơn Max.",
    });
    return;
  }

  if (allNumbers.length === 0) {
    initializeTable(min, max);
  }

  const range = max - min + 1;

  if (usedNumbers.length >= range) {
    Swal.fire({
      icon: "info",
      title: "Đã random hết số",
      text: "Tất cả các số trong khoảng đã được tạo.",
      confirmButtonText: "Tải lại trang",
      showCancelButton: false,
    }).then((result) => {
      if (result.isConfirmed) {
        location.reload();
      }
    });
    return;
  }

  let randomNumber;
  do {
    randomNumber = Math.floor(Math.random() * range) + min;
  } while (usedNumbers.includes(randomNumber));

  usedNumbers.push(randomNumber);
  lastResult = randomNumber;

  const rowToDelete = document.querySelector(
    `tr[data-number="${randomNumber}"]`
  );
  if (rowToDelete) {
    rowToDelete.remove();
    allNumbers = allNumbers.filter((num) => num !== randomNumber);
  }

  Swal.fire({
    icon: "success",
    title: "Kết quả",
    text: `Số random: ${randomNumber}`,
  });

  console.log(usedNumbers);
}
