# Câu A1 - var / let / const

## Đoạn 1

### Code
```js
console.log(x);
var x = 5;
```

### Dự đoán
```
undefined
```

### Kết quả thực tế
```
undefined
```

### Giải thích
Biến `var` được hoisting (đưa phần khai báo lên đầu phạm vi) và được khởi tạo với giá trị `undefined`. Vì vậy khi gọi `console.log(x)` trước khi gán giá trị, kết quả là `undefined`.

---

## Đoạn 2

### Code
```js
console.log(y);
let y = 10;
```

### Dự đoán
```
ReferenceError: Cannot access 'y' before initialization
```

### Kết quả thực tế
```
ReferenceError: Cannot access 'y' before initialization
```

### Giải thích
Biến `let` được hoisting nhưng không được khởi tạo ngay. Từ đầu block đến dòng khai báo, biến nằm trong Temporal Dead Zone (TDZ). Truy cập biến trong giai đoạn này sẽ gây lỗi `ReferenceError`.

---

## Đoạn 3

### Code
```js
const z = 15;
z = 20;
console.log(z);
```

### Dự đoán
```
TypeError: Assignment to constant variable.
```

### Kết quả thực tế
```
TypeError: Assignment to constant variable.
```

### Giải thích
Biến được khai báo bằng `const` phải được gán giá trị ngay khi khai báo và không thể gán lại sau đó. Chương trình dừng tại dòng `z = 20` nên lệnh `console.log(z)` không được thực hiện.

---

## Đoạn 4

### Code
```js
const arr = [1, 2, 3];
arr.push(4);
console.log(arr);
```

### Dự đoán
```
[1, 2, 3, 4]
```

### Kết quả thực tế
```
[1, 2, 3, 4]
```

### Giải thích
`const` không cho phép thay đổi tham chiếu của biến nhưng vẫn cho phép thay đổi nội dung bên trong mảng hoặc object. Phương thức `push()` chỉ thêm phần tử vào mảng nên không gây lỗi.

---

## Đoạn 5

### Code
```js
let a = 1;
{
    let a = 2;
    console.log("Trong block:", a);
}
console.log("Ngoài block:", a);
```

### Dự đoán
```
Trong block: 2
Ngoài block: 1
```

### Kết quả thực tế
```
Trong block: 2
Ngoài block: 1
```

### Giải thích
Biến khai báo bằng `let` có phạm vi block. Biến `a` bên trong khối lệnh `{}` là một biến khác với biến `a` bên ngoài nên thay đổi giá trị bên trong không ảnh hưởng đến bên ngoài.

---

## So sánh var, let và const

| Đặc điểm | var | let | const |
|-----------|-----|-----|-------|
| Phạm vi | Function Scope | Block Scope | Block Scope |
| Hoisting | Có, giá trị ban đầu là `undefined` | Có nhưng nằm trong TDZ | Có nhưng nằm trong TDZ |
| Gán lại giá trị | Có | Có | Không |
| Khai báo lại | Có | Không | Không |

