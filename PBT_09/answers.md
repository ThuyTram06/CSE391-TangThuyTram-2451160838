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

# Câu C1 - Debug DOM Code

## Các lỗi trong chương trình

---

### Lỗi 1: Sai event name ở nút Decrement

#### Code lỗi

```js
document.querySelector("#decrementBtn")
.addEventListener("onclick", function() {
```

#### Vấn đề

`addEventListener()` nhận tên sự kiện là `"click"`, không phải `"onclick"`.

#### Sửa

```js
document.querySelector("#decrementBtn")
.addEventListener("click", function() {
```

---

### Lỗi 2: Không cập nhật lịch sử khi Decrement

#### Code hiện tại

```js
count--;
countDisplay.innerHTML = count;
```

#### Vấn đề

Increment có lưu history nhưng Decrement không lưu.

#### Sửa

```js
count--;

countDisplay.textContent = count;

const li = document.createElement("li");
li.textContent = "Count changed to " + count;

li.addEventListener("click", function () {
    deleteHistory(this);
});

historyList.appendChild(li);
```

---

### Lỗi 3: Gán sai cho countDisplay trong Reset

#### Code lỗi

```js
countDisplay = count;
```

#### Vấn đề

`countDisplay` là DOM element.

Dòng trên đang cố gán:

```js
HTMLElement = Number
```

và còn gây lỗi vì biến được khai báo bằng `const`.

#### Sửa

```js
countDisplay.textContent = count;
```

---

### Lỗi 4: Xóa history bằng innerHTML = null

#### Code lỗi

```js
historyList.innerHTML = null;
```

#### Vấn đề

`innerHTML` mong đợi chuỗi.

#### Sửa

```js
historyList.innerHTML = "";
```

---

### Lỗi 5: item.remove không được gọi

#### Code lỗi

```js
items.forEach(item => {
    item.remove;
});
```

#### Vấn đề

Thiếu dấu `()`.

Hiện tại chỉ tham chiếu tới hàm chứ không thực thi.

#### Sửa

```js
items.forEach(item => {
    item.remove();
});
```

---

### Lỗi 6: Load count từ localStorage trả về String

#### Code lỗi

```js
count = localStorage.getItem("count");
```

#### Vấn đề

`localStorage` luôn trả về String.

Ví dụ:

```js
count = "5";
```

Sau đó:

```js
count++;
```

có thể gây lỗi logic hoặc ép kiểu ngoài ý muốn.

#### Sửa

```js
count = Number(
    localStorage.getItem("count")
) || 0;
```

---

### Lỗi 7: Không load lại lịch sử từ localStorage

#### Code hiện tại

```js
window.addEventListener("load", () => {
    count = localStorage.getItem("count");
    countDisplay.textContent = count;
});
```

#### Vấn đề

Đã lưu:

```js
localStorage.setItem(
    "history",
    historyList.innerHTML
);
```

nhưng khi load lại không khôi phục history.

#### Sửa

```js
historyList.innerHTML =
    localStorage.getItem("history") || "";
```

---

### Lỗi 8 (ẩn): Click vào history sau khi reload không hoạt động

#### Nguyên nhân

Khi lưu:

```js
historyList.innerHTML
```

và load lại:

```js
historyList.innerHTML = ...
```

thì các event listener cũ bị mất.

Ví dụ:

```js
li.addEventListener(...)
```

không còn tồn tại sau khi refresh.

#### Sửa

Dùng Event Delegation:

```js
historyList.addEventListener(
    "click",
    function (e) {

        if (
            e.target.tagName === "LI"
        ) {
            deleteHistory(e.target);
        }
    }
);
```

Lúc này không cần gắn listener cho từng `<li>`.

---

### Lỗi 9: Dùng innerHTML để hiển thị số đếm

#### Code hiện tại

```js
countDisplay.innerHTML = count;
```

#### Vấn đề

Không cần render HTML.

Nên dùng:

```js
countDisplay.textContent = count;
```

An toàn và hiệu năng tốt hơn.

---

## Phiên bản sửa hoàn chỉnh

```js
const countDisplay =
    document.querySelector(".count");

const historyList =
    document.getElementById("history");

let count = 0;

// Event Delegation cho history
historyList.addEventListener(
    "click",
    function (e) {

        if (e.target.tagName === "LI") {
            deleteHistory(e.target);
        }
    }
);

// Increment
document
.querySelector("#incrementBtn")
.addEventListener("click", function () {

    count++;

    countDisplay.textContent = count;

    const li =
        document.createElement("li");

    li.textContent =
        "Count changed to " + count;

    historyList.appendChild(li);
});

// Decrement
document
.querySelector("#decrementBtn")
.addEventListener("click", function () {

    count--;

    countDisplay.textContent = count;

    const li =
        document.createElement("li");

    li.textContent =
        "Count changed to " + count;

    historyList.appendChild(li);
});

// Reset
document
.querySelector("#resetBtn")
.addEventListener("click", () => {

    count = 0;

    countDisplay.textContent = count;

    historyList.innerHTML = "";
});

// Delete History
function deleteHistory(element) {

    element.remove();
}

// Clear History
document
.querySelector("#clearHistory")
.addEventListener("click", () => {

    const items =
        historyList.querySelectorAll("li");

    items.forEach(item => {
        item.remove();
    });
});

// Save
window.addEventListener(
    "beforeunload",
    () => {

        localStorage.setItem(
            "count",
            count
        );

        localStorage.setItem(
            "history",
            historyList.innerHTML
        );
    }
);

// Load
window.addEventListener(
    "load",
    () => {

        count = Number(
            localStorage.getItem("count")
        ) || 0;

        countDisplay.textContent =
            count;

        historyList.innerHTML =
            localStorage.getItem("history")
            || "";
    }
);
```

## Tổng kết lỗi tìm được

| STT | Lỗi |
|------|------|
| 1 | `"onclick"` → `"click"` |
| 2 | Decrement không lưu history |
| 3 | `countDisplay = count` |
| 4 | `innerHTML = null` |
| 5 | `item.remove` thiếu `()` |
| 6 | localStorage trả về String |
| 7 | Không load history |
| 8 | Event listener bị mất sau reload |
| 9 | Dùng innerHTML thay vì textContent |

Tổng cộng: **9 lỗi (trong đó có lỗi ẩn về event listener/localStorage và lỗi var logic khi reload dữ liệu).**

# Câu C2 - Performance

## 1. Tại sao bind event lên 1000 elements riêng lẻ là BAD PRACTICE?

Ví dụ:

```js
const items = document.querySelectorAll(".item");

items.forEach(item => {
    item.addEventListener("click", () => {
        console.log("Clicked");
    });
});
```

Nếu có 1000 phần tử:

```txt
1000 phần tử
→ 1000 event listeners
```

---

### Vấn đề 1: Tốn bộ nhớ (Memory)

Mỗi listener là một object được lưu trong bộ nhớ.

```txt
1000 elements
→ 1000 listeners
→ nhiều RAM hơn
```

Số lượng phần tử càng lớn thì càng tốn tài nguyên.

---

### Vấn đề 2: Khởi tạo chậm

Trình duyệt phải chạy:

```js
addEventListener(...)
```

1000 lần.

Điều này làm thời gian render ban đầu tăng lên.

---

### Vấn đề 3: Phần tử thêm động không hoạt động

Ví dụ:

```js
const newItem =
    document.createElement("div");

document.body.appendChild(newItem);
```

Item mới không có listener.

Phải bind lại:

```js
newItem.addEventListener(...)
```

rất bất tiện.

---

# 2. Event Delegation giải quyết thế nào?

Thay vì:

```txt
1000 phần tử
→ 1000 listeners
```

Ta dùng:

```txt
1 phần tử cha
→ 1 listener
```

Ví dụ:

```js
const list =
    document.querySelector("#list");

list.addEventListener("click", (e) => {

    if (e.target.classList.contains("item")) {
        console.log("Clicked");
    }

});
```

HTML:

```html
<div id="list">
    <div class="item">A</div>
    <div class="item">B</div>
    <div class="item">C</div>
</div>
```

---

### Cơ chế

Nhờ Event Bubbling:

```txt
item
 ↑
parent
 ↑
document
```

Khi click:

```txt
item → parent
```

Parent nhận được event và xử lý.

---

### Lợi ích

- Ít listener hơn
- Tiết kiệm RAM
- Render nhanh hơn
- Hỗ trợ phần tử tạo động
- Code gọn hơn

---

# 3. Vấn đề trong đoạn code

Code hiện tại:

```js
for (let i = 0; i < 1000; i++) {

    const div =
        document.createElement("div");

    div.textContent = `Item ${i}`;

    document.body.appendChild(div);
}
```

---

## Điều gì xảy ra?

Mỗi lần:

```js
appendChild()
```

trình duyệt phải cập nhật DOM.

```txt
append 1
→ layout

append 2
→ layout

append 3
→ layout

...
```

Lặp:

```txt
1000 lần append
→ 1000 lần tính toán layout
→ nhiều reflow/repaint
```

Hiệu năng giảm đáng kể.

---

# 4. Refactor bằng DocumentFragment

```js
const fragment =
    document.createDocumentFragment();

for (let i = 0; i < 1000; i++) {

    const div =
        document.createElement("div");

    div.textContent = `Item ${i}`;

    fragment.appendChild(div);
}

document.body.appendChild(fragment);
```

---

# 5. Tại sao nhanh hơn?

## Cách cũ

```txt
create div
append DOM

create div
append DOM

create div
append DOM

...
1000 lần
```

Trình duyệt phải liên tục:

```txt
Layout
Paint
Layout
Paint
Layout
Paint
...
```

---

## Cách mới

`DocumentFragment` là DOM tạm trong bộ nhớ.

```txt
create div
append fragment

create div
append fragment

create div
append fragment
...
```

Trong giai đoạn này:

```txt
KHÔNG render
KHÔNG reflow
KHÔNG repaint
```

Sau cùng:

```js
document.body.appendChild(fragment);
```

chỉ cập nhật DOM một lần.

---

## So sánh

### Không dùng Fragment

```txt
1000 lần append
≈ 1000 lần reflow
```

### Dùng Fragment

```txt
1000 lần append vào bộ nhớ
+
1 lần append vào DOM

≈ 1 lần reflow
```

---

# Kết luận

### Event Delegation

```txt
1000 listeners
↓
1 listener
```

Giảm bộ nhớ, tăng hiệu năng và hỗ trợ phần tử động.

---

### DocumentFragment

```txt
1000 lần cập nhật DOM
↓
1 lần cập nhật DOM
```

Giảm số lần reflow/repaint nên render nhanh hơn đáng kể, đặc biệt khi tạo danh sách lớn.
