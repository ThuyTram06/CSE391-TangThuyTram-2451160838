# PHẦN A — KIỂM TRA ĐỌC HIỂU (20 điểm)
## Câu A1 — Viewport & Mobile-First

### 1. Thẻ `<meta viewport>` chuẩn

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

### 2. Giải thích từng thuộc tính

| Thuộc tính | Ý nghĩa |
|---|---|
| `name="viewport"` | Khai báo thiết lập viewport cho thiết bị mobile |
| `width=device-width` | Chiều rộng trang web bằng đúng chiều rộng màn hình thiết bị |
| `initial-scale=1.0` | Mức zoom ban đầu = 100% |


### 3. Nếu thiếu thẻ viewport thì chuyện gì xảy ra?

Nếu thiếu thẻ này, iPhone sẽ giả định trang web rộng khoảng 980px như desktop.

Kết quả:

- Toàn bộ trang bị thu nhỏ lại
- Chữ rất nhỏ
- Nút bấm khó nhấn
- Người dùng phải zoom để đọc
- Layout responsive hoạt động sai

→ UX rất tệ trên mobile.


## 4. Mobile-First vs Desktop-First

| Mobile-First | Desktop-First |
|---|---|
| Viết CSS cho mobile trước | Viết CSS cho desktop trước |
| Dùng `min-width` | Dùng `max-width` |
| Progressive enhancement | Thu nhỏ dần layout |
| Được khuyên dùng hiện nay | Cách cũ |


## 5. Ví dụ Mobile-First (breakpoint 768px)

```css
/* Mobile mặc định */
.container{
    display: flex;
    flex-direction: column;
}

/* Tablet/Desktop */
@media (min-width: 768px){
    .container{
        flex-direction: row;
    }
}
```

### Giải thích:
- Mobile dùng layout dọc
- Khi màn hình ≥ 768px → đổi sang layout ngang


## 6. Ví dụ Desktop-First (breakpoint 768px)

```css
/* Desktop mặc định */
.container{
    display: flex;
    flex-direction: row;
}

/* Mobile */
@media (max-width: 768px){
    .container{
        flex-direction: column;
    }
}
```

### Giải thích:
- Desktop dùng layout ngang
- Khi màn hình ≤ 768px → đổi sang layout dọc


## 7. Tại sao Mobile-First được khuyên dùng?

### Mobile-First tốt hơn vì:

- Mobile tải ít CSS hơn
- Tối ưu performance trên điện thoại
- Buộc developer ưu tiên nội dung quan trọng
- Phù hợp với Mobile-First Indexing của Google
- Responsive dễ quản lý hơn khi mở rộng lên tablet/desktop

→ Đây là cách viết responsive hiện đại được dùng phổ biến hiện nay.
