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

# Câu A2 - Data Types & Coercion

## Dự đoán kết quả

### Code

```js
console.log(typeof null);
console.log(typeof undefined);
console.log(typeof NaN);
console.log("5" + 3);
console.log("5" - 3);
console.log("5" * "3");
console.log(true + true);
console.log([] + []);
console.log([] + {});
console.log({} + []);
```

### Dự đoán

| Câu lệnh | Kết quả |
|-----------|----------|
| `typeof null` | `"object"` |
| `typeof undefined` | `"undefined"` |
| `typeof NaN` | `"number"` |
| `"5" + 3` | `"53"` |
| `"5" - 3` | `2` |
| `"5" * "3"` | `15` |
| `true + true` | `2` |
| `[] + []` | `""` (chuỗi rỗng) |
| `[] + {}` | `"[object Object]"` |
| `{} + []` | `0` |

---

## Kết quả thực tế

Sau khi chạy chương trình, kết quả thực tế trùng với dự đoán:

```txt
object
undefined
number
53
2
15
2

[object Object]
0
```

---

## Giải thích

### 1. `typeof null`

```js
typeof null
```

Kết quả:

```txt
"object"
```

Đây là một lỗi lịch sử của JavaScript từ những phiên bản đầu tiên và vẫn được giữ lại để đảm bảo tính tương thích.

---

### 2. `typeof undefined`

```js
typeof undefined
```

Kết quả:

```txt
"undefined"
```

`undefined` là một kiểu dữ liệu riêng trong JavaScript.

---

### 3. `typeof NaN`

```js
typeof NaN
```

Kết quả:

```txt
"number"
```

`NaN` có nghĩa là "Not a Number" nhưng vẫn thuộc kiểu dữ liệu `number`.

---

### 4. `"5" + 3`

```js
"5" + 3
```

Kết quả:

```txt
"53"
```

Toán tử `+` khi gặp chuỗi sẽ thực hiện nối chuỗi. Số `3` được chuyển thành chuỗi `"3"` rồi ghép với `"5"`.

---

### 5. `"5" - 3`

```js
"5" - 3
```

Kết quả:

```txt
2
```

Toán tử `-` không dùng để nối chuỗi nên JavaScript ép `"5"` thành số `5`, sau đó thực hiện phép trừ:

```js
5 - 3
```

Kết quả là:

```txt
2
```

---

### 6. `"5" * "3"`

```js
"5" * "3"
```

Kết quả:

```txt
15
```

Toán tử `*` ép cả hai chuỗi thành số rồi thực hiện phép nhân.

---

### 7. `true + true`

```js
true + true
```

Kết quả:

```txt
2
```

Khi tham gia phép toán số học:

```js
true = 1
false = 0
```

Nên:

```js
1 + 1 = 2
```

---

### 8. `[] + []`

```js
[] + []
```

Kết quả:

```txt
""
```

Hai mảng rỗng được chuyển thành chuỗi rỗng:

```js
"" + ""
```

Kết quả là chuỗi rỗng.

---

### 9. `[] + {}`

```js
[] + {}
```

Kết quả:

```txt
"[object Object]"
```

Mảng rỗng chuyển thành:

```js
""
```

Object chuyển thành:

```js
"[object Object]"
```

Nên:

```js
"" + "[object Object]"
```

Kết quả:

```txt
"[object Object]"
```

---

### 10. `{} + []`

```js
{} + []
```

Kết quả:

```txt
0
```

Khi đứng đầu một dòng lệnh, `{}` được JavaScript hiểu là một block rỗng thay vì object.

Khi đó biểu thức còn lại là:

```js
+[]
```

Mảng rỗng được ép thành số:

```js
Number([]) = 0
```

Nên kết quả là:

```txt
0
```

---

## Vì sao `"5" + 3` và `"5" - 3` cho kết quả khác nhau?

### `"5" + 3`

Toán tử `+` hỗ trợ nối chuỗi.

```js
"5" + 3
```

JavaScript chuyển `3` thành chuỗi `"3"` rồi nối lại:

```js
"5" + "3" = "53"
```

Kết quả:

```txt
"53"
```

---

### `"5" - 3`

Toán tử `-` chỉ dùng cho phép toán số học.

```js
"5" - 3
```

JavaScript chuyển `"5"` thành số:

```js
5 - 3 = 2
```

Kết quả:

```txt
2
```

# Câu A3 - So sánh == và ===

## Dự đoán kết quả

### Code

```js
console.log(5 == "5");
console.log(5 === "5");
console.log(null == undefined);
console.log(null === undefined);
console.log(NaN == NaN);
console.log(0 == false);
console.log(0 === false);
console.log("" == false);
```

### Dự đoán

| Câu lệnh | Kết quả |
|-----------|----------|
| `5 == "5"` | `true` |
| `5 === "5"` | `false` |
| `null == undefined` | `true` |
| `null === undefined` | `false` |
| `NaN == NaN` | `false` |
| `0 == false` | `true` |
| `0 === false` | `false` |
| `"" == false` | `true` |

---

## Kết quả thực tế

Sau khi chạy chương trình, kết quả thực tế:

```txt
true
false
true
false
false
true
false
true
```

Kết quả thực tế trùng với dự đoán.

---

## Giải thích

### 1. `5 == "5"`

```js
5 == "5"
```

Kết quả:

```txt
true
```

Toán tử `==` cho phép ép kiểu tự động.

JavaScript chuyển chuỗi `"5"` thành số `5`:

```js
5 == 5
```

Kết quả là `true`.

---

### 2. `5 === "5"`

```js
5 === "5"
```

Kết quả:

```txt
false
```

Toán tử `===` so sánh cả giá trị và kiểu dữ liệu.

```js
5      // number
"5"    // string
```

Khác kiểu dữ liệu nên kết quả là `false`.

---

### 3. `null == undefined`

```js
null == undefined
```

Kết quả:

```txt
true
```

Đây là một quy tắc đặc biệt của JavaScript.

Khi dùng `==`, `null` và `undefined` được coi là bằng nhau.

---

### 4. `null === undefined`

```js
null === undefined
```

Kết quả:

```txt
false
```

Hai giá trị có kiểu dữ liệu khác nhau:

```js
null        // object (đặc biệt)
undefined   // undefined
```

Nên `===` trả về `false`.

---

### 5. `NaN == NaN`

```js
NaN == NaN
```

Kết quả:

```txt
false
```

`NaN` là giá trị đặc biệt.

Theo chuẩn JavaScript, `NaN` không bằng bất kỳ giá trị nào, kể cả chính nó.

Muốn kiểm tra `NaN` nên dùng:

```js
Number.isNaN(value)
```

---

### 6. `0 == false`

```js
0 == false
```

Kết quả:

```txt
true
```

JavaScript ép kiểu:

```js
false → 0
```

Sau đó:

```js
0 == 0
```

Nên kết quả là `true`.

---

### 7. `0 === false`

```js
0 === false
```

Kết quả:

```txt
false
```

Hai giá trị khác kiểu dữ liệu:

```js
0        // number
false    // boolean
```

Nên `===` trả về `false`.

---

### 8. `"" == false`

```js
"" == false
```

Kết quả:

```txt
true
```

JavaScript ép kiểu:

```js
""      → 0
false   → 0
```

Sau đó:

```js
0 == 0
```

Nên kết quả là `true`.

---

## So sánh == và ===

| Toán tử | So sánh giá trị | So sánh kiểu dữ liệu |
|----------|----------------|----------------------|
| `==` | Có | Không |
| `===` | Có | Có |

---

## Nên dùng == hay ===?

Nên sử dụng:

```js
===
```

trong hầu hết các trường hợp.

### Lý do

- Không tự động ép kiểu.
- Dễ đọc và dễ hiểu hơn.
- Tránh các lỗi khó phát hiện do JavaScript tự chuyển đổi kiểu dữ liệu.
- Là quy tắc được khuyến nghị trong JavaScript hiện đại.

Ví dụ:

```js
0 == false      // true
"" == false     // true
```

Các kết quả trên có thể gây nhầm lẫn.

Trong khi:

```js
0 === false     // false
"" === false    // false
```

rõ ràng và chính xác hơn.

# Câu A4 - Truthy & Falsy

## Tất cả giá trị Falsy trong JavaScript

Các giá trị Falsy là những giá trị khi được chuyển sang kiểu Boolean sẽ cho kết quả là `false`. :contentReference[oaicite:0]{index=0}

Danh sách đầy đủ:

```js
false
0
-0
0n
""
''
``
null
undefined
NaN
```

Ngoài các giá trị trên, mọi giá trị khác đều là Truthy. :contentReference[oaicite:1]{index=1}

---

## Dự đoán kết quả

### Code

```js
if ("0") console.log("A");
if ("") console.log("B");
if ([]) console.log("C");
if ({}) console.log("D");
if (null) console.log("E");
if (0) console.log("F");
if (-1) console.log("G");
if (" ") console.log("H");
```

### Dự đoán

| Điều kiện | Truthy/Falsy | In ra |
|------------|-------------|--------|
| `"0"` | Truthy | A |
| `""` | Falsy | Không |
| `[]` | Truthy | C |
| `{}` | Truthy | D |
| `null` | Falsy | Không |
| `0` | Falsy | Không |
| `-1` | Truthy | G |
| `" "` | Truthy | H |

---

## Kết quả thực tế

```txt
A
C
D
G
H
```

---

## Giải thích từng trường hợp

### 1. `"0"`

```js
if ("0")
```

In:

```txt
A
```

Vì `"0"` là chuỗi có 1 ký tự nên là Truthy. Chỉ chuỗi rỗng `""` mới là Falsy. :contentReference[oaicite:2]{index=2}

---

### 2. `""`

```js
if ("")
```

Không in gì.

Vì chuỗi rỗng là một giá trị Falsy. :contentReference[oaicite:3]{index=3}

---

### 3. `[]`

```js
if ([])
```

In:

```txt
C
```

Mảng rỗng vẫn là một object nên là Truthy. :contentReference[oaicite:4]{index=4}

---

### 4. `{}`

```js
if ({})
```

In:

```txt
D
```

Object rỗng vẫn là Truthy. :contentReference[oaicite:5]{index=5}

---

### 5. `null`

```js
if (null)
```

Không in gì.

`null` nằm trong danh sách Falsy. :contentReference[oaicite:6]{index=6}

---

### 6. `0`

```js
if (0)
```

Không in gì.

`0` là giá trị Falsy. :contentReference[oaicite:7]{index=7}

---

### 7. `-1`

```js
if (-1)
```

In:

```txt
G
```

Mọi số khác `0` đều là Truthy. :contentReference[oaicite:8]{index=8}

---

### 8. `" "` (dấu cách)

```js
if (" ")
```

In:

```txt
H
```

Đây không phải chuỗi rỗng mà là chuỗi chứa một ký tự khoảng trắng, nên là Truthy. :contentReference[oaicite:9]{index=9}

# Câu A5 - Template Literals

## Cách 1

### Code gốc

```js
var greeting = "Xin chào " + name + "! Bạn " + age + " tuổi.";
```

### Dùng Template Literal

```js
var greeting = `Xin chào ${name}! Bạn ${age} tuổi.`;
```

---

## Cách 2

### Code gốc

```js
var url = "https://api.example.com/users/" + userId + "/orders?page=" + page;
```

### Dùng Template Literal

```js
var url = `https://api.example.com/users/${userId}/orders?page=${page}`;
```

---

## Cách 3

### Code gốc

```js
var html = "<div class=\"card\">" +
    "<h2>" + title + "</h2>" +
    "<p>" + description + "</p>" +
    "<span>Giá: " + price + "đ</span>" +
    "</div>";
```

### Dùng Template Literal

```js
var html = `
<div class="card">
    <h2>${title}</h2>
    <p>${description}</p>
    <span>Giá: ${price}đ</span>
</div>
`;
```

---

## Ưu điểm của Template Literals

- Không cần dùng toán tử `+` để nối chuỗi.
- Chèn biến trực tiếp bằng cú pháp `${variable}`.
- Hỗ trợ chuỗi nhiều dòng dễ đọc hơn.
- Giúp code HTML dài trở nên rõ ràng và dễ bảo trì.

### Ví dụ

```js
const name = "Trâm";
const age = 20;

console.log(`Xin chào ${name}! Bạn ${age} tuổi.`);
```

Kết quả:

```txt
Xin chào Trâm! Bạn 20 tuổi.
```
