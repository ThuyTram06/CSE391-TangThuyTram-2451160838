# Câu A1 - Sync vs Async

## Code

```js
console.log("1 - Start");

setTimeout(() => console.log("2 - Timeout 0ms"), 0);

Promise.resolve().then(() => console.log("3 - Promise"));

console.log("4 - End");

setTimeout(() => console.log("5 - Timeout 100ms"), 100);

Promise.resolve().then(() => {
    console.log("6 - Promise 2");

    setTimeout(() =>
        console.log("7 - Nested timeout"), 0
    );
});
```

---

# Dự đoán output

```text
1 - Start
4 - End
3 - Promise
6 - Promise 2
2 - Timeout 0ms
7 - Nested timeout
5 - Timeout 100ms
```

---

# Giải thích từng bước

## Bước 1: Thực thi Call Stack (Sync code)

JavaScript chạy toàn bộ code đồng bộ trước.

```js
console.log("1 - Start");
```

Output:

```text
1 - Start
```

---

```js
setTimeout(..., 0);
```

Không chạy ngay.

Đưa callback vào:

```text
Macrotask Queue
```

---

```js
Promise.resolve().then(...)
```

Đưa callback vào:

```text
Microtask Queue
```

---

```js
console.log("4 - End");
```

Output:

```text
4 - End
```

---

```js
setTimeout(..., 100);
```

Chờ 100ms rồi mới được đưa vào:

```text
Macrotask Queue
```

---

```js
Promise.resolve().then(...)
```

Thêm callback thứ hai vào:

```text
Microtask Queue
```

---

## Lúc này

### Call Stack

```text
(empty)
```

### Microtask Queue

```text
3 - Promise
6 - Promise 2
```

### Macrotask Queue

```text
2 - Timeout 0ms
```

---

# Bước 2: Event Loop xử lý Microtask

Quy tắc:

```text
Microtask chạy hết
↓
mới đến Macrotask
```

---

### Chạy Promise đầu tiên

```js
console.log("3 - Promise");
```

Output:

```text
3 - Promise
```

---

### Chạy Promise thứ hai

```js
console.log("6 - Promise 2");
```

Output:

```text
6 - Promise 2
```

---

Trong callback này:

```js
setTimeout(
    () => console.log("7 - Nested timeout"),
    0
);
```

Được thêm vào cuối:

```text
Macrotask Queue
```

---

## Lúc này

### Macrotask Queue

```text
2 - Timeout 0ms
7 - Nested timeout
```

---

# Bước 3: Chạy Macrotask đầu tiên

```js
console.log("2 - Timeout 0ms");
```

Output:

```text
2 - Timeout 0ms
```

---

# Bước 4: Chạy Macrotask tiếp theo

```js
console.log("7 - Nested timeout");
```

Output:

```text
7 - Nested timeout
```

---

# Bước 5: Sau khoảng 100ms

Timer này hoàn thành:

```js
setTimeout(() =>
    console.log("5 - Timeout 100ms"),
100);
```

Được đưa vào Macrotask Queue và chạy.

Output:

```text
5 - Timeout 100ms
```

---

# Event Loop là gì?

Event Loop là cơ chế giúp JavaScript xử lý các tác vụ bất đồng bộ.

Nó liên tục kiểm tra:

```text
Call Stack rỗng chưa?
```

Nếu rỗng:

```text
Microtask Queue
↓
Macrotask Queue
```

---

# Microtask Queue

Chứa:

```js
Promise.then()
catch()
finally()

queueMicrotask()

MutationObserver
```

Ví dụ:

```js
Promise.resolve()
.then(() => console.log("A"));
```

---

# Macrotask Queue

Chứa:

```js
setTimeout()
setInterval()

DOM Events

Network Events

Message Events
```

Ví dụ:

```js
setTimeout(() => {
    console.log("B");
}, 0);
```

---

# Quy tắc quan trọng

```text
1. Chạy Sync code

2. Chạy TẤT CẢ Microtasks

3. Chạy 1 Macrotask

4. Quay lại bước 2
```

---

# Sơ đồ Event Loop

```text
Call Stack
    ↓
Microtask Queue
(Promise.then)

    ↓

Macrotask Queue
(setTimeout)

    ↓

Event Loop
```

---

# Kết luận

Output cuối cùng:

```text
1 - Start
4 - End
3 - Promise
6 - Promise 2
2 - Timeout 0ms
7 - Nested timeout
5 - Timeout 100ms
```

Vì:

```text
Sync code
→ Microtasks (Promises)
→ Macrotasks (setTimeout)
```

và Microtask Queue luôn được ưu tiên trước Macrotask Queue.

# Câu A2 - Fetch API

## Đoạn code

```js
async function getData() {
    try {
        const response = await fetch("https://api.example.com/data");

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();

        return data;

    } catch (error) {

        console.error(
            "Failed:",
            error.message
        );

        return null;
    }
}
```

---

# Giải thích từng dòng

## 1.

```js
async function getData() {
```

Khai báo hàm bất đồng bộ (asynchronous function).

Cho phép sử dụng:

```js
await
```

bên trong hàm.

Hàm async luôn trả về:

```js
Promise
```

---

## 2.

```js
const response = await fetch(
    "https://api.example.com/data"
);
```

Gửi HTTP request đến API.

---

### fetch() trả về gì?

`fetch()` trả về:

```js
Promise<Response>
```

Ví dụ:

```js
Promise {
    <pending>
}
```

---

### Tại sao cần await?

Nếu không dùng:

```js
const response = fetch(url);
```

thì:

```js
response
```

là Promise chứ chưa phải dữ liệu thật.

Ví dụ:

```js
console.log(response);
```

Output:

```js
Promise { <pending> }
```

Dùng:

```js
await fetch(...)
```

sẽ chờ request hoàn thành.

Sau đó:

```js
response
```

trở thành object:

```js
Response
```

---

## 3.

```js
if (!response.ok)
```

Kiểm tra request có thành công hay không.

---

### response.ok là gì?

`response.ok`

```js
true
```

khi status:

```txt
200 - 299
```

Ví dụ:

```txt
200 OK
201 Created
204 No Content
```

---

### Khi nào false?

Nếu status nằm ngoài:

```txt
200-299
```

Ví dụ:

### 404

```txt
404 Not Found
```

---

### 500

```txt
500 Internal Server Error
```

---

### 403

```txt
403 Forbidden
```

---

## 4.

```js
throw new Error(
    `HTTP ${response.status}`
);
```

Tự tạo exception.

Ví dụ:

```txt
HTTP 404
```

hoặc

```txt
HTTP 500
```

để nhảy xuống:

```js
catch
```

---

## 5.

```js
const data =
    await response.json();
```

Chuyển dữ liệu JSON thành object JavaScript.

---

### Tại sao cần await lần nữa?

Nhiều người nghĩ:

```js
response.json()
```

trả object.

Thực tế:

```js
response.json()
```

trả:

```js
Promise
```

---

Ví dụ:

```js
const data =
    response.json();

console.log(data);
```

Output:

```js
Promise { <pending> }
```

---

Phải dùng:

```js
await response.json()
```

để đợi quá trình parse JSON hoàn thành.

Ví dụ:

JSON:

```json
{
    "name":"An",
    "age":20
}
```

Sau khi parse:

```js
{
    name: "An",
    age: 20
}
```

---

## 6.

```js
return data;
```

Trả dữ liệu đã parse.

Ví dụ:

```js
{
    id: 1,
    title: "Hello"
}
```

---

## 7.

```js
catch (error)
```

Bắt lỗi xảy ra trong khối try.

---

## 8.

```js
console.error(
    "Failed:",
    error.message
);
```

In lỗi ra console.

Ví dụ:

```txt
Failed: HTTP 404
```

---

## 9.

```js
return null;
```

Nếu lỗi xảy ra:

```js
null
```

được trả về thay vì làm chương trình crash.

---

# try...catch bắt được những lỗi nào?

## 1. Network Error

Ví dụ:

```txt
Mất mạng
```

hoặc:

```txt
DNS lỗi
```

hoặc:

```txt
Server không truy cập được
```

Ví dụ:

```js
fetch("https://abc.xyz.invalid")
```

=> Fetch reject

=> Catch chạy.

---

## 2. JSON Parse Error

Ví dụ server trả:

```txt
Hello World
```

thay vì JSON.

Khi:

```js
await response.json()
```

sẽ lỗi.

Ví dụ:

```txt
Unexpected token H
```

Catch sẽ bắt được.

---

## 3. Lỗi do throw thủ công

Ví dụ:

```js
throw new Error("HTTP 404");
```

Catch sẽ bắt được.

---

# 404 có vào catch không?

Nhiều người nhầm là:

```txt
404 → catch
```

❌ Sai.

Ví dụ:

```js
const response =
    await fetch("/not-found");
```

Request vẫn thành công ở mức mạng.

Fetch nhận được phản hồi:

```txt
404 Not Found
```

nên Promise vẫn resolve.

---

Khi đó:

```js
response.ok === false
```

và phải tự xử lý:

```js
if (!response.ok) {
    throw new Error(...);
}
```

---

# Tóm tắt

| Thành phần | Ý nghĩa |
|------------|----------|
| `fetch()` | Gửi HTTP request |
| `fetch()` trả về | `Promise<Response>` |
| `await fetch()` | Chờ request hoàn thành |
| `response.ok` | true nếu status 200-299 |
| `response.json()` | Parse JSON |
| `await response.json()` | Chờ parse JSON hoàn tất |
| `try...catch` | Bắt lỗi bất đồng bộ |
| Network Error | ✅ Catch |
| JSON Parse Error | ✅ Catch |
| `throw new Error()` | ✅ Catch |
| HTTP 404 | ❌ Không tự vào catch |
| HTTP 404 + throw | ✅ Catch |

## Luồng thực thi

```text
fetch()
      ↓
Response
      ↓
response.ok ?
      ↓
true
      ↓
response.json()
      ↓
JavaScript Object
      ↓
return data

false
      ↓
throw Error
      ↓
catch
      ↓
return null
```
