# TRACK A — BOOTSTRAP 5
## Câu A1 (10đ) — Grid System

### HTML

```html
<div class="container">
    <div class="row">
        <div class="col-12 col-md-6 col-lg-3">Box 1</div>
        <div class="col-12 col-md-6 col-lg-3">Box 2</div>
        <div class="col-12 col-md-6 col-lg-3">Box 3</div>
        <div class="col-12 col-md-6 col-lg-3">Box 4</div>
    </div>
</div>
```

### Bảng kết quả

| Kích thước | < 768px | 768px - 991px | ≥ 992px |
|------------|----------|---------------|----------|
| Số cột mỗi box chiếm | 12/12 cột | 6/12 cột | 3/12 cột |
| Số box trên 1 hàng | 1 box | 2 box | 4 box |
| Box layout | 4 hàng × 1 cột | 2 hàng × 2 cột | 1 hàng × 4 cột |

---

### Layout minh họa

#### 1. Màn hình nhỏ (< 768px)

```text
+-------------+
|    Box 1    |
+-------------+

+-------------+
|    Box 2    |
+-------------+

+-------------+
|    Box 3    |
+-------------+

+-------------+
|    Box 4    |
+-------------+
```

**Giải thích:**  
Mỗi box sử dụng `col-12` nên chiếm toàn bộ chiều rộng của hàng.

---

#### 2. Màn hình trung bình (768px - 991px)

```text
+-------------+ +-------------+
|    Box 1    | |    Box 2    |
+-------------+ +-------------+

+-------------+ +-------------+
|    Box 3    | |    Box 4    |
+-------------+ +-------------+
```

**Giải thích:**  
Mỗi box sử dụng `col-md-6` nên chiếm 6/12 cột (50% chiều rộng). Một hàng chứa được 2 box.

---

#### 3. Màn hình lớn (≥ 992px)

```text
+---------+ +---------+ +---------+ +---------+
|  Box 1  | |  Box 2  | |  Box 3  | |  Box 4  |
+---------+ +---------+ +---------+ +---------+
```

**Giải thích:**  
Mỗi box sử dụng `col-lg-3` nên chiếm 3/12 cột (25% chiều rộng). Một hàng chứa được 4 box.

---

### Câu hỏi thêm

#### col-md-6 nghĩa là gì?

`col-md-6` nghĩa là:

- `md` (Medium): áp dụng từ màn hình có chiều rộng **768px trở lên**.
- `6`: phần tử chiếm **6 trên 12 cột** của Bootstrap Grid.

Vì vậy:

```html
<div class="col-md-6">
```

sẽ chiếm:

```text
6/12 = 50%
```

chiều rộng của hàng khi màn hình từ 768px trở lên.

---

#### Tại sao không cần viết `col-sm-12`?

Bootstrap hoạt động theo nguyên tắc **Mobile First**.

Trong đoạn code đã có:

```html
col-12
```

Điều này có nghĩa:

- Mặc định mọi màn hình đều sử dụng `col-12`.
- Khi màn hình đạt breakpoint `md` (≥ 768px), `col-md-6` sẽ ghi đè.
- Khi màn hình đạt breakpoint `lg` (≥ 992px), `col-lg-3` sẽ tiếp tục ghi đè.

Do đó:

```html
col-sm-12
```

là không cần thiết vì:

```html
col-12
```

đã đảm nhận vai trò hiển thị trên màn hình nhỏ.

## Câu A2 (10đ) — Utilities & Components

### 1. Giải thích class `d-none d-md-block`

```html
<div class="d-none d-md-block">
    Nội dung
</div>
```

#### Ý nghĩa

- `d-none`: ẩn phần tử (`display: none`)
- `d-md-block`: từ breakpoint `md` (≥ 768px) trở lên sẽ hiển thị dưới dạng `display: block`

#### Khi nào hiển thị, khi nào ẩn?

| Kích thước màn hình | Hiển thị |
|---------------------|----------|
| < 768px | ❌ Ẩn |
| 768px - 991px | ✅ Hiện |
| ≥ 992px | ✅ Hiện |

#### Minh họa

```text
Mobile (<768px)
[ẨN]

Tablet (≥768px)
[NỘI DUNG]

Desktop (≥992px)
[NỘI DUNG]
```

**Kết luận:**  
Element sẽ bị ẩn trên màn hình nhỏ và chỉ hiển thị từ kích thước Medium (md) trở lên.

---

### 2. Liệt kê 5 Spacing Utilities (Margin/Padding)

Bootstrap sử dụng cú pháp:

```text
{property}{side}-{size}
```

Trong đó:

- `m` = margin
- `p` = padding
- `t` = top
- `b` = bottom
- `s` = start (left)
- `e` = end (right)
- `x` = trái + phải
- `y` = trên + dưới

#### 1. `mt-3`

```html
<div class="mt-3"></div>
```

- Margin Top = cấp độ 3
- Tạo khoảng cách phía trên phần tử.

---

#### 2. `mb-auto`

```html
<div class="mb-auto"></div>
```

- Margin Bottom = auto
- Bootstrap tự tính khoảng cách dưới.

---

#### 3. `px-4`

```html
<div class="px-4"></div>
```

- Padding Left + Right = cấp độ 4
- Tăng khoảng đệm bên trong theo chiều ngang.

---

#### 4. `py-2`

```html
<div class="py-2"></div>
```

- Padding Top + Bottom = cấp độ 2
- Tăng khoảng đệm trên và dưới.

---

#### 5. `ms-5`

```html
<div class="ms-5"></div>
```

- Margin Start = cấp độ 5
- Tạo khoảng cách bên trái phần tử (trong ngôn ngữ viết từ trái sang phải).

---

#### Tóm tắt

| Utility | Ý nghĩa |
|----------|----------|
| `mt-3` | Margin top |
| `mb-auto` | Margin bottom auto |
| `px-4` | Padding trái + phải |
| `py-2` | Padding trên + dưới |
| `ms-5` | Margin bên trái |

---

### 3. Sự khác nhau giữa `.container`, `.container-fluid`, `.container-md`

#### a. `.container`

```html
<div class="container">
```

- Có chiều rộng tối đa (max-width) thay đổi theo từng breakpoint.
- Căn giữa trang.
- Không chiếm toàn bộ màn hình.

```text
|    Container    |
```

Thường dùng cho hầu hết website.

---

#### b. `.container-fluid`

```html
<div class="container-fluid">
```

- Luôn rộng 100% màn hình.
- Không giới hạn chiều rộng.

```text
|---------------------------|
|      Full Width           |
|---------------------------|
```

Thường dùng cho banner, hero section hoặc layout toàn màn hình.

---

#### c. `.container-md`

```html
<div class="container-md">
```

- Trước breakpoint `md` (<768px): rộng 100%.
- Từ `md` trở lên: hoạt động giống `.container`.

```text
Mobile:
|-----------------------|

Tablet/Desktop:
|      Container      |
```

---

### Bảng so sánh

| Class | <768px | ≥768px |
|---------|---------|---------|
| `.container` | Có max-width theo Bootstrap | Có max-width theo Bootstrap |
| `.container-fluid` | 100% chiều rộng | 100% chiều rộng |
| `.container-md` | 100% chiều rộng | Giống `.container` |


# Câu C1 (10đ) — Tùy biến Bootstrap

## 1. Đổi màu `$primary` từ xanh mặc định sang `#E63946`

Bootstrap được xây dựng bằng **SASS (SCSS)** và sử dụng các biến để quản lý màu sắc.

### Công cụ cần chuẩn bị

- Node.js
- Bootstrap Source Files
- Sass Compiler

Cài Sass:

```bash
npm install -g sass
```

Hoặc:

```bash
npm install sass
```

---

### Bước 1: Tạo file SCSS

Ví dụ tạo file:

```scss
// custom.scss

$primary: #E63946;

@import "bootstrap/scss/bootstrap";
```

---

### Bước 2: Compile SCSS thành CSS

```bash
sass custom.scss custom.css
```

Sau khi biên dịch sẽ tạo:

```text
custom.css
```

---

### Bước 3: Import CSS vào HTML

```html
<link rel="stylesheet" href="custom.css">
```

Lúc này toàn bộ thành phần Bootstrap sử dụng màu Primary sẽ chuyển sang:

```text
#E63946
```

Ví dụ:

- btn-primary
- bg-primary
- text-primary
- border-primary
- alert-primary
- link-primary

đều tự động đổi màu.

---

## 2. Tại sao KHÔNG nên override trực tiếp?

Ví dụ:

```css
.btn-primary {
    background: red;
}
```

### Nhược điểm

- Chỉ ảnh hưởng đến `.btn-primary`
- Không đổi màu cho:
  - bg-primary
  - text-primary
  - alert-primary
  - border-primary
  - badge-primary
- Khó bảo trì khi dự án lớn
- Dễ xung đột với các bản cập nhật Bootstrap

---

### Ưu điểm của SASS Variables

Ví dụ:

```scss
$primary: #E63946;
```

Bootstrap sẽ tự sinh lại toàn bộ hệ thống màu.

Ưu điểm:

- Đồng bộ toàn bộ giao diện
- Dễ bảo trì
- Dễ mở rộng
- Tuân theo kiến trúc Bootstrap

---

### Kết luận

Nên sử dụng:

```scss
$primary: #E63946;
```

thay vì:

```css
.btn-primary {
    background:red;
}
```

vì SASS Variables giúp thay đổi toàn bộ hệ thống màu một cách nhất quán và dễ bảo trì.

---

# Câu C2 (10đ) — So sánh CSS thuần và Bootstrap

## Navbar Responsive bằng CSS thuần

### HTML

```html
<nav class="navbar">
    <div class="logo">Shop</div>

    <ul class="menu">
        <li>Home</li>
        <li>Products</li>
        <li>Contact</li>
    </ul>
</nav>
```

### CSS

```css
.navbar{
    display:flex;
    justify-content:space-between;
    align-items:center;
    background:#333;
    color:white;
    padding:15px;
}

.menu{
    display:flex;
    gap:20px;
    list-style:none;
}

@media(max-width:768px){
    .navbar{
        flex-direction:column;
    }

    .menu{
        flex-direction:column;
    }
}
```

---

## Product Card bằng CSS thuần

### HTML

```html
<div class="card">
    <img src="product.jpg">

    <h3>Product</h3>

    <p>Description</p>

    <button>Buy Now</button>
</div>
```

### CSS

```css
.card{
    border:1px solid #ddd;
    border-radius:10px;
    padding:15px;
    width:300px;
}

.card img{
    width:100%;
}

.card button{
    background:#0d6efd;
    color:white;
    border:none;
    padding:10px 20px;
}
```

---

## Bootstrap Version

### Navbar

```html
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
```

---

### Product Card

```html
<div class="card">
    <img class="card-img-top">

    <div class="card-body">
        <h5 class="card-title"></h5>

        <p class="card-text"></p>

        <button class="btn btn-primary">
            Buy Now
        </button>
    </div>
</div>
```

---

## Bảng so sánh

| Tiêu chí | CSS Thuần | Bootstrap |
|-----------|-----------|------------|
| Số dòng CSS cần viết | Nhiều (50-100+ dòng) | Rất ít hoặc không cần |
| Thời gian phát triển | Chậm hơn | Nhanh hơn |
| Responsive | Tự viết Media Query | Có sẵn Breakpoints |
| Component | Tự xây dựng | Có sẵn |
| Tùy biến giao diện | Cao | Trung bình |
| Kích thước file | Nhẹ | Nặng hơn |

---

## Khi nào NÊN dùng Bootstrap?

### Nên dùng khi:

- Làm prototype nhanh
- Dự án nhỏ hoặc vừa
- Landing Page
- Dashboard Admin
- Website doanh nghiệp
- Deadline ngắn
- Muốn responsive nhanh

Ví dụ:

```text
Landing Page
Portfolio
Admin Dashboard
Website bán hàng
```

---

## Khi nào KHÔNG NÊN dùng Bootstrap?

### Không nên dùng khi:

- Thiết kế UI quá đặc biệt
- Website yêu cầu nhận diện thương hiệu mạnh
- Cần tối ưu hiệu năng tối đa
- Muốn kiểm soát hoàn toàn CSS

Ví dụ:

```text
Facebook
Shopee
YouTube
Netflix
Spotify
```

Các hệ thống lớn thường xây dựng Design System riêng thay vì phụ thuộc hoàn toàn vào Bootstrap.

