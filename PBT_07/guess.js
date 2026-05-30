// Random số từ 1 đến 100
const secretNumber = Math.floor(Math.random() * 100) + 1;

const guessedNumbers = [];
const maxAttempts = 7;

let attempts = 0;
let guessedCorrectly = false;

while (attempts < maxAttempts) {
    let input = prompt(
        `Lần đoán ${attempts + 1}/${maxAttempts}\nNhập số từ 1 đến 100:`
    );

    // Người dùng bấm Cancel
    if (input === null) {
        alert("Bạn đã thoát trò chơi.");
        break;
    }

    const guess = Number(input);

    // Validate input
    if (
        input.trim() === "" ||
        isNaN(guess) ||
        guess < 1 ||
        guess > 100
    ) {
        alert("Vui lòng nhập một số từ 1 đến 100!");
        continue;
    }

    // Kiểm tra đoán trùng
    if (guessedNumbers.includes(guess)) {
        alert("Bạn đã đoán số này rồi!");
        continue;
    }

    guessedNumbers.push(guess);
    attempts++;

    if (guess === secretNumber) {
        alert(`Đúng rồi! Bạn đoán đúng sau ${attempts} lần!`);
        guessedCorrectly = true;
        break;
    } else if (guess < secretNumber) {
        alert("Cao hơn");
    } else {
        alert("Thấp hơn");
    }
}

// Hết lượt
if (!guessedCorrectly && attempts === maxAttempts) {
    alert(
        `Bạn đã hết 7 lượt đoán!\nĐáp án là: ${secretNumber}`
    );
}
