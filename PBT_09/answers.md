# Câu A1 - DOM Tree

## 1. DOM Tree

```text
div#app
├── header
│   ├── h1
│   │   └── "Todo App"
│   └── nav
│       ├── a.active
│       │   └── "All"
│       ├── a
│       │   └── "Active"
│       └── a
│           └── "Completed"
│
└── main
    ├── form#todoForm
    │   ├── input#todoInput
    │   └── button
    │       └── "Add"
    │
    └── ul#todoList
        ├── li.todo-item
        │   └── "Learn HTML"
        │
        └── li.todo-item.completed
            └── "Learn CSS"
```

---

## 2. Query Selector

### Chọn thẻ `<h1>`

```js
document.querySelector("h1");
```

---

### Chọn input trong form

```js
document.querySelector("#todoForm input");
```

Hoặc:

```js
document.querySelector("form input");
```

---

### Chọn tất cả `.todo-item`

```js
document.querySelectorAll(".todo-item");
```

---

### Chọn link đang active

```js
document.querySelector("a.active");
```

Hoặc:

```js
document.querySelector(".active");
```

---

### Chọn `<li>` đầu tiên trong `#todoList`

```js
document.querySelector("#todoList li:first-child");
```

---

### Chọn tất cả `<a>` bên trong `<nav>`

```js
document.querySelectorAll("nav a");
```

---

## Tổng hợp

| Yêu cầu | Query Selector |
|----------|----------------|
| Chọn thẻ `<h1>` | `document.querySelector("h1")` |
| Chọn input trong form | `document.querySelector("#todoForm input")` |
| Chọn tất cả `.todo-item` | `document.querySelectorAll(".todo-item")` |
| Chọn link đang active | `document.querySelector("a.active")` |
| Chọn `<li>` đầu tiên trong `#todoList` | `document.querySelector("#todoList li:first-child")` |
| Chọn tất cả `<a>` bên trong `<nav>` | `document.querySelectorAll("nav a")` |

# Câu A2 - innerHTML vs textContent

## 1. Sự khác nhau giữa innerHTML và textContent

| innerHTML | textContent |
|------------|------------|
| Đọc/ghi nội dung HTML bên trong phần tử | Đọc/ghi nội dung văn bản thuần |
| HTML sẽ được trình duyệt phân tích và render | HTML được coi là text bình thường |
| Có thể tạo thẻ HTML động | Không tạo được thẻ HTML |
| Chậm hơn do phải parse HTML | Nhanh hơn |
| Có nguy cơ XSS nếu dữ liệu từ người dùng | An toàn hơn với dữ liệu người dùng |

---

## 2. Ví dụ innerHTML

### HTML

```html
<div id="demo"></div>
```

### JavaScript

```js
document.querySelector("#demo").innerHTML =
    "<h2>Hello World</h2>";
```

### Kết quả

```html
<h2>Hello World</h2>
```

Trình duyệt sẽ tạo ra thẻ `<h2>` thực sự.

---

## 3. Ví dụ textContent

### HTML

```html
<div id="demo"></div>
```

### JavaScript

```js
document.querySelector("#demo").textContent =
    "<h2>Hello World</h2>";
```

### Kết quả hiển thị

```text
<h2>Hello World</h2>
```

Chuỗi được hiển thị nguyên văn, không tạo thẻ HTML.

---

## 4. Khi nào dùng innerHTML?

Dùng khi cần tạo hoặc cập nhật HTML động.

Ví dụ:

```js
const card = `
    <div class="product">
        <h3>iPhone 17</h3>
        <p>Giá: 30.000.000đ</p>
    </div>
`;

document.querySelector("#products").innerHTML = card;
```

---

## 5. Khi nào dùng textContent?

Dùng khi hiển thị dữ liệu người dùng nhập vào hoặc nội dung văn bản.

Ví dụ:

```js
const username = "Trâm";

document.querySelector("#welcome").textContent =
    `Xin chào ${username}`;
```

---

# Bảo mật - XSS

## XSS là gì?

XSS (Cross-Site Scripting) là lỗ hổng cho phép kẻ tấn công chèn mã JavaScript hoặc HTML độc hại vào trang web.

Nếu trang web hiển thị dữ liệu người dùng bằng `innerHTML`, trình duyệt sẽ thực thi đoạn mã đó.

---

## Ví dụ nguy hiểm

Người dùng nhập:

```html
<img src=x onerror="alert('Hacked!')">
```

Code:

```js
const userInput =
    document.querySelector("#search").value;

document.querySelector("#result").innerHTML =
    userInput;
```

---

## Điều gì xảy ra?

Trình duyệt tạo ra:

```html
<img src="x" onerror="alert('Hacked!')">
```

Ảnh không tồn tại nên sự kiện `onerror` chạy.

Kết quả:

```text
alert("Hacked!")
```

được thực thi.

Đây chính là một cuộc tấn công XSS.

---

## Ví dụ XSS khác

Người dùng nhập:

```html
<script>
    alert("Bạn đã bị hack");
</script>
```

Nếu dữ liệu được chèn bằng `innerHTML`, trình duyệt có thể thực thi mã độc.

---

# Cách sửa

## Cách 1: Dùng textContent (khuyến nghị)

```js
const userInput =
    document.querySelector("#search").value;

document.querySelector("#result").textContent =
    userInput;
```

---

## Kết quả

Người dùng nhập:

```html
<img src=x onerror="alert('Hacked!')">
```

Trang sẽ hiển thị:

```text
<img src=x onerror="alert('Hacked!')">
```

Chỉ là văn bản, không chạy mã JavaScript.

---

## Cách 2: Sanitization

Nếu bắt buộc phải dùng HTML:

```js
const cleanHtml = DOMPurify.sanitize(userInput);

document.querySelector("#result").innerHTML =
    cleanHtml;
```

Thư viện DOMPurify sẽ loại bỏ các đoạn mã nguy hiểm.

---

# Kết luận

- `innerHTML` dùng để đọc/ghi HTML.
- `textContent` dùng để đọc/ghi văn bản thuần.
- Dữ liệu từ người dùng **không nên đưa trực tiếp vào innerHTML**.
- Sử dụng `textContent` hoặc thư viện sanitize như DOMPurify để tránh XSS.
- Với dữ liệu người dùng nhập vào, `textContent` là lựa chọn an toàn nhất.

# Câu A3 - Event Bubbling

## Code

```js
document.querySelector("#outer").addEventListener("click", () => {
    console.log("OUTER");
});

document.querySelector("#inner").addEventListener("click", () => {
    console.log("INNER");
});

document.querySelector("#btn").addEventListener("click", (e) => {
    console.log("BUTTON");
    // e.stopPropagation();
});
```

```html
<div id="outer">
    <div id="inner">
        <button id="btn">Click me</button>
    </div>
</div>
```

---

# Trường hợp 1: Không dùng stopPropagation()

Khi click vào button:

```txt
BUTTON
INNER
OUTER
```

---

## Giải thích

JavaScript sử dụng cơ chế Event Bubbling.

Sự kiện bắt đầu tại phần tử được click trước:

```txt
button
```

sau đó nổi bọt (bubble) lên các phần tử cha:

```txt
button
→ inner
→ outer
→ document
```

Thứ tự thực thi:

### 1. Button

```js
console.log("BUTTON");
```

In:

```txt
BUTTON
```

---

### 2. Inner

```js
console.log("INNER");
```

In:

```txt
INNER
```

---

### 3. Outer

```js
console.log("OUTER");
```

In:

```txt
OUTER
```

---

## Sơ đồ

```text
outer
└── inner
    └── button ← click

BUTTON
   ↑
INNER
   ↑
OUTER
```

---

# Trường hợp 2: Bỏ comment stopPropagation()

Code:

```js
document.querySelector("#btn").addEventListener("click", (e) => {
    console.log("BUTTON");
    e.stopPropagation();
});
```

---

## Output

```txt
BUTTON
```

---

## Giải thích

`stopPropagation()` ngăn sự kiện tiếp tục nổi bọt lên các phần tử cha.

Quá trình:

```text
button
✖ inner
✖ outer
```

Sau khi chạy:

```js
e.stopPropagation();
```

sự kiện dừng ngay tại button.

Vì vậy:

```txt
BUTTON
```

được in ra và kết thúc.

---

# So sánh

| Trường hợp | Output |
|------------|---------|
| Không dùng `stopPropagation()` | `BUTTON → INNER → OUTER` |
| Có `stopPropagation()` | `BUTTON` |

---

# Kết luận

Khi click button:

### Không dùng stopPropagation()

```txt
BUTTON
INNER
OUTER
```

### Có stopPropagation()

```txt
BUTTON
```

`stopPropagation()` được dùng khi muốn phần tử con xử lý sự kiện mà không cho các phần tử cha nhận được sự kiện đó.
