$(document).ready(function () {
  let usedNumbers = [];
  let lastResult = null;
  let allNumbers = [];

  $("#generateBtn").click(generateRandom);

  function initializeTable(min, max) {
    const $tableContainer = $("#tableContainer");
    allNumbers = [];
    $tableContainer.empty();

    for (let i = min; i <= max; i++) {
      const $cell = $("<div></div>", {
        class: "grid-item",
        "data-number": i,
        text: i,
      });
      $tableContainer.append($cell);
      allNumbers.push(i);
    }
  }

  function generateRandom() {
    const min = parseInt($("#min").val());
    const max = parseInt($("#max").val());

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

      $(".result-card").fadeOut(500);
      return;
    }

    let randomNumber;
    do {
      randomNumber = Math.floor(Math.random() * range) + min;
    } while (usedNumbers.includes(randomNumber));

    usedNumbers.push(randomNumber);
    lastResult = randomNumber;

    const $cellToDelete = $(`.grid-item[data-number="${randomNumber}"]`);
    if ($cellToDelete.length) {
      $cellToDelete.fadeOut(500, function () {
        $(this).remove();
      });

      allNumbers = allNumbers.filter((num) => num !== randomNumber);
    }

    $(".result-card").fadeIn(500);
    Swal.fire({
      icon: "success",
      title: "Kết quả",
      text: `Số random: ${randomNumber}`,
    });

    // console.log(usedNumbers);
  }
});
