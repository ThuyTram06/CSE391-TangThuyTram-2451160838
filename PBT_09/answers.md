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
