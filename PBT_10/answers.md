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
