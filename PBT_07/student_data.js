// student_data.js

const students = [
    { name: "An", math: 8, physics: 7, cs: 9, gender: "M" },
    { name: "Bình", math: 6, physics: 9, cs: 7, gender: "F" },
    { name: "Chi", math: 9, physics: 6, cs: 8, gender: "F" },
    { name: "Dũng", math: 5, physics: 5, cs: 6, gender: "M" },
    { name: "Em", math: 10, physics: 8, cs: 9, gender: "F" },
    { name: "Phong", math: 3, physics: 4, cs: 5, gender: "M" },
    { name: "Giang", math: 7, physics: 7, cs: 7, gender: "F" },
    { name: "Huy", math: 4, physics: 6, cs: 3, gender: "M" },
];

// Thống kê
let gioi = 0;
let kha = 0;
let trungBinh = 0;
let yeu = 0;

let highestStudent = null;
let lowestStudent = null;

let totalMath = 0;
let totalPhysics = 0;
let totalCs = 0;

let maleTotal = 0;
let femaleTotal = 0;
let maleCount = 0;
let femaleCount = 0;

console.log("| STT | Tên    | TB   | Xếp loại    |");
console.log("|-----|--------|------|-------------|");

for (let i = 0; i < students.length; i++) {
    const student = students[i];

    const avg =
        student.math * 0.4 +
        student.physics * 0.3 +
        student.cs * 0.3;

    student.avg = avg;

    let rank = "";

    if (avg >= 8.0) {
        rank = "Giỏi";
        gioi++;
    } else if (avg >= 6.5) {
        rank = "Khá";
        kha++;
    } else if (avg >= 5.0) {
        rank = "Trung bình";
        trungBinh++;
    } else {
        rank = "Yếu";
        yeu++;
    }

    console.log(
        `| ${i + 1} | ${student.name} | ${avg.toFixed(1)} | ${rank} |`
    );

    if (highestStudent === null || avg > highestStudent.avg) {
        highestStudent = student;
    }

    if (lowestStudent === null || avg < lowestStudent.avg) {
        lowestStudent = student;
    }

    totalMath += student.math;
    totalPhysics += student.physics;
    totalCs += student.cs;

    if (student.gender === "M") {
        maleTotal += avg;
        maleCount++;
    } else {
        femaleTotal += avg;
        femaleCount++;
    }
}

console.log("\n=== Thống kê xếp loại ===");
console.log("Giỏi:", gioi);
console.log("Khá:", kha);
console.log("Trung bình:", trungBinh);
console.log("Yếu:", yeu);

console.log("\n=== Sinh viên điểm TB cao nhất ===");
console.log(
    `${highestStudent.name} - ${highestStudent.avg.toFixed(1)}`
);

console.log("\n=== Sinh viên điểm TB thấp nhất ===");
console.log(
    `${lowestStudent.name} - ${lowestStudent.avg.toFixed(1)}`
);

console.log("\n=== Điểm trung bình từng môn ===");
console.log(
    "Math:",
    (totalMath / students.length).toFixed(2)
);
console.log(
    "Physics:",
    (totalPhysics / students.length).toFixed(2)
);
console.log(
    "CS:",
    (totalCs / students.length).toFixed(2)
);

console.log("\n=== Điểm TB theo giới tính ===");
console.log(
    "Nam:",
    (maleTotal / maleCount).toFixed(2)
);
console.log(
    "Nữ:",
    (femaleTotal / femaleCount).toFixed(2)
);
