document
  .getElementById("generateBtn")
  .addEventListener("click", generateRandom);

let usedNumbers = []; // Lưu trữ các số đã random
let lastResult = null; // Kết quả random trước đó

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

  const range = max - min + 1;

  // Nếu tất cả các số trong khoảng đã được random
  if (usedNumbers.length >= range) {
    Swal.fire({
      icon: "info",
      title: "Đã random hết số",
      text: "Tất cả các số trong khoảng đã được tạo.",
      confirmButtonText: "Tải lại trang",
      showCancelButton: false,
    }).then((result) => {
      if (result.isConfirmed) {
        location.reload(); // Reload lại trang
      }
    });
    return;
  }

  let randomNumber;
  do {
    randomNumber = Math.floor(Math.random() * range) + min;
  } while (usedNumbers.includes(randomNumber));

  usedNumbers.push(randomNumber); // Thêm số vào danh sách các số đã random
  lastResult = randomNumber;

  Swal.fire({
    icon: "success",
    title: "Kết quả",
    text: `Số random: ${randomNumber}`,
  });

  console.log(usedNumbers); // Debug: Xem danh sách số đã random
}
