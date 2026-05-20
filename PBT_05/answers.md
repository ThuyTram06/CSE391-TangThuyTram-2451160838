# PHẦN A — KIỂM TRA ĐỌC HIỂU (20 điểm)
## Câu A1 — Viewport & Mobile-First

### 1. Thẻ `<meta viewport>` chuẩn
Tài liệu tham chiếu: `tuan_3_css_advanced/13_creating_responsive_layouts.md → 16_sass_scss.md`


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

## Câu A2 — Breakpoints

| Breakpoint | Kích thước | Thiết bị đại diện | Ví dụ lưới sản phẩm |
|---|---|---|---|
| Mobile | `< 576px` | iPhone SE, điện thoại nhỏ | 1 cột |
| Mobile Large | `≥ 576px` | iPhone Plus, điện thoại ngang | 2 cột |
| Tablet | `≥ 768px` | iPad dọc, tablet | 2 cột |
| Desktop | `≥ 992px` | Laptop nhỏ | 3 cột |
| Desktop Large | `≥ 1200px` | Desktop, laptop lớn | 4 cột |
| Desktop XL | `≥ 1400px` | Màn hình lớn, 4K | 5–6 cột |


## Ví dụ Responsive Product Grid

```css
.product-grid{
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
}

/* Mobile Large */
@media (min-width: 576px){
    .product-grid{
        grid-template-columns: repeat(2, 1fr);
    }
}

/* Tablet */
@media (min-width: 768px){
    .product-grid{
        grid-template-columns: repeat(2, 1fr);
    }
}

/* Desktop */
@media (min-width: 992px){
    .product-grid{
        grid-template-columns: repeat(3, 1fr);
    }
}

/* Desktop Large */
@media (min-width: 1200px){
    .product-grid{
        grid-template-columns: repeat(4, 1fr);
    }
}
```

### Giải thích:

- Mobile nhỏ → 1 cột để dễ đọc
- Tablet → 2 cột
- Desktop → 3–4 cột để tận dụng không gian màn hình
- Màn hình lớn → nhiều cột hơn

## Câu A3 — Media Queries

CSS:

```css
.container { width: 100%; padding: 10px; }

@media (min-width: 576px) {
    .container { width: 540px; }
}

@media (min-width: 768px) {
    .container { width: 720px; }
}

@media (min-width: 992px) {
    .container { width: 960px; }
}

@media (min-width: 1200px) {
    .container { width: 1140px; }
}
```


| Chiều rộng màn hình | `.container width` |
|---|---|
| 375px (iPhone SE) | `100%` |
| 600px | `540px` |
| 800px | `720px` |
| 1000px | `960px` |
| 1400px | `1140px` |

---

## Giải thích

- 375px `< 576px`
→ Không media query nào chạy
→ width = `100%`

- 600px `≥ 576px`
→ Media query đầu tiên hoạt động
→ width = `540px`

- 800px `≥ 768px`
→ Query 768px ghi đè query 576px
→ width = `720px`

- 1000px `≥ 992px`
→ width = `960px`

- 1400px `≥ 1200px`
→ width = `1140px`
