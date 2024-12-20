document
  .getElementById("generateBtn")
  .addEventListener("click", generateRandom);

let lastResult = null; // Lưu trữ kết quả trước đó

function generateRandom() {
  const min = parseInt(document.getElementById("min").value);
  const max = parseInt(document.getElementById("max").value);

  if (isNaN(min) || isNaN(max)) {
    alert("Please enter valid numbers for Min and Max.");
    return;
  }

  if (min >= max) {
    alert("Min should be less than Max.");
    return;
  }

  const range = max - min + 1; // Tổng số kết quả có thể xảy ra

  if (range === 1) {
    alert(
      "The range only contains one number, so it cannot generate unique random numbers."
    );
    return;
  }

  // Random không trùng
  let randomNumber;
  do {
    randomNumber = Math.floor(Math.random() * range) + min;
  } while (randomNumber === lastResult && range > 1);

  lastResult = randomNumber; // Cập nhật kết quả trước đó
  console.log(lastResult);

  document.getElementById(
    "result"
  ).innerText = `Random Number: ${randomNumber}`;
}
