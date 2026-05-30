// fizzbuzz.js

// =========================
// Version 1: Classic FizzBuzz
// =========================

console.log("=== Classic FizzBuzz ===");

for (let i = 1; i <= 100; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
        console.log("FizzBuzz");
    } else if (i % 3 === 0) {
        console.log("Fizz");
    } else if (i % 5 === 0) {
        console.log("Buzz");
    } else {
        console.log(i);
    }
}

// =========================
// Version 2: Custom FizzBuzz
// =========================

function customFizzBuzz(n, rules) {
    console.log("\n=== Custom FizzBuzz ===");

    for (let i = 1; i <= n; i++) {
        let result = "";

        for (let j = 0; j < rules.length; j++) {
            if (i % rules[j].divisor === 0) {
                result += rules[j].word;
            }
        }

        console.log(result || i);
    }
}

// Test
customFizzBuzz(30, [
    { divisor: 3, word: "Fizz" },
    { divisor: 5, word: "Buzz" },
    { divisor: 7, word: "Jazz" }
]);

/*
Ví dụ:
15  -> FizzBuzz
21  -> FizzJazz
30  -> FizzBuzz
35  -> BuzzJazz (nếu n >= 35)
105 -> FizzBuzzJazz (nếu n >= 105)
*/
