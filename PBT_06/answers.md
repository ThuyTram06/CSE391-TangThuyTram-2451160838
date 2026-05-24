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


## Câu C1 (10đ) — Tùy biến Bootstrap

### 1. Đổi màu `$primary` từ xanh mặc định sang `#E63946`

Bootstrap được xây dựng bằng **SASS (SCSS)** và sử dụng các biến để quản lý màu sắc.

#### Công cụ cần chuẩn bị

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

#### Bước 1: Tạo file SCSS

Ví dụ tạo file:

```scss
// custom.scss

$primary: #E63946;

@import "bootstrap/scss/bootstrap";
```

---

#### Bước 2: Compile SCSS thành CSS

```bash
sass custom.scss custom.css
```

Sau khi biên dịch sẽ tạo:

```text
custom.css
```

---

#### Bước 3: Import CSS vào HTML

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

### 2. Tại sao KHÔNG nên override trực tiếp?

Ví dụ:

```css
.btn-primary {
    background: red;
}
```

#### Nhược điểm

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

#### Ưu điểm của SASS Variables

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


## Câu C2 (10đ) — So sánh CSS thuần và Bootstrap

### Navbar Responsive bằng CSS thuần

#### HTML

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

#### CSS

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

### Product Card bằng CSS thuần

#### HTML

```html
<div class="card">
    <img src="product.jpg">

    <h3>Product</h3>

    <p>Description</p>

    <button>Buy Now</button>
</div>
```

#### CSS

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

### Bootstrap Version

#### Navbar

```html
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
```

---

#### Product Card

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

### Bảng so sánh

| Tiêu chí | CSS Thuần | Bootstrap |
|-----------|-----------|------------|
| Số dòng CSS cần viết | Nhiều (50-100+ dòng) | Rất ít hoặc không cần |
| Thời gian phát triển | Chậm hơn | Nhanh hơn |
| Responsive | Tự viết Media Query | Có sẵn Breakpoints |
| Component | Tự xây dựng | Có sẵn |
| Tùy biến giao diện | Cao | Trung bình |
| Kích thước file | Nhẹ | Nặng hơn |

---

### Khi nào NÊN dùng Bootstrap?

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

### Khi nào KHÔNG NÊN dùng Bootstrap?

#### Không nên dùng khi:

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

## Câu A1 (10đ) — Utility Classes

### HTML

```html
<div class="flex items-center justify-between p-4 bg-white shadow-md rounded-lg 
            hover:shadow-xl transition-shadow duration-300">
    <img class="w-16 h-16 rounded-full object-cover" src="avatar.jpg" alt="User">
    <div class="ml-4 flex-1">
        <h3 class="text-lg font-semibold text-gray-800 truncate">Nguyễn Văn A</h3>
        <p class="text-sm text-gray-500">Frontend Developer</p>
    </div>
    <button class="px-4 py-2 bg-blue-500 text-white rounded-md 
                   hover:bg-blue-600 focus:ring-2 focus:ring-blue-300">
        Follow
    </button>
</div>
```

### Giải thích từng class

#### Container

- `flex` → `display: flex`
- `items-center` → `align-items: center`
- `justify-between` → `justify-content: space-between`
- `p-4` → `padding: 1rem (16px)`
- `bg-white` → `background-color: white`
- `shadow-md` → đổ bóng mức trung bình
- `rounded-lg` → bo góc lớn (`border-radius: 0.5rem`)
- `hover:shadow-xl` → khi hover tăng bóng lên mức XL
- `transition-shadow` → hiệu ứng chuyển đổi cho thuộc tính shadow
- `duration-300` → thời gian transition 300ms

---

#### Thẻ ảnh (`img`)

- `w-16` → `width: 4rem (64px)`
- `h-16` → `height: 4rem (64px)`
- `rounded-full` → ảnh hình tròn (`border-radius: 9999px`)
- `object-cover` → ảnh tự cắt để phủ kín khung

---

#### Thẻ div chứa nội dung

- `ml-4` → `margin-left: 1rem (16px)`
- `flex-1` → `flex: 1 1 0%` (chiếm toàn bộ khoảng trống còn lại)

---

#### Thẻ h3

- `text-lg` → `font-size: 1.125rem (18px)`
- `font-semibold` → `font-weight: 600`
- `text-gray-800` → màu chữ xám đậm
- `truncate` → cắt nội dung dài và hiển thị dấu `...`

Tương đương:

```css
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
```

---

#### Thẻ p

- `text-sm` → `font-size: 0.875rem (14px)`
- `text-gray-500` → màu chữ xám trung bình

---

#### Button

- `px-4` → `padding-left/right: 1rem (16px)`
- `py-2` → `padding-top/bottom: 0.5rem (8px)`
- `bg-blue-500` → nền màu xanh dương mức 500
- `text-white` → chữ màu trắng
- `rounded-md` → bo góc vừa (`border-radius: 0.375rem`)
- `hover:bg-blue-600` → khi hover đổi sang xanh đậm hơn
- `focus:ring-2` → khi focus xuất hiện viền sáng dày 2px
- `focus:ring-blue-300` → màu viền focus là xanh mức 300

---

### Kết quả giao diện

```text
 ----------------------------------------------------
|  (Avatar)   Nguyễn Văn A                [Follow]   |
|             Frontend Developer                     |
 ----------------------------------------------------
```

#### Đặc điểm

- Layout Flexbox nằm ngang.
- Avatar hiển thị hình tròn.
- Thông tin người dùng nằm ở giữa.
- Nút Follow nằm bên phải.
- Card có bóng đổ và bo góc.
- Hover vào card sẽ tăng shadow.
- Hover vào nút sẽ đổi màu xanh đậm hơn.


## Câu A2 (10đ) — Responsive & States

### 1. Giải thích Responsive Prefix

TailwindCSS sử dụng breakpoint prefix để áp dụng CSS theo kích thước màn hình.

| Prefix | Breakpoint | Kích thước |
|---------|-------------|-------------|
| `sm:` | Small | ≥ 640px |
| `md:` | Medium | ≥ 768px |
| `lg:` | Large | ≥ 1024px |
| `xl:` | Extra Large | ≥ 1280px |
| `2xl:` | 2X Large | ≥ 1536px |

---

### Ví dụ

```html
md:grid-cols-2 lg:grid-cols-4
```

### Ý nghĩa

- `md:grid-cols-2`
  → từ màn hình Medium (≥768px), grid có 2 cột.

- `lg:grid-cols-4`
  → từ màn hình Large (≥1024px), grid có 4 cột.

---

### Minh họa Responsive

#### Mobile (<768px)

```text
[1 cột]
```

#### Tablet (≥768px)

```text
[2 cột]
```

#### Desktop (≥1024px)

```text
[4 cột]
```

---

### Ví dụ hoàn chỉnh

```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
```

### Kết quả

| Kích thước | Số cột |
|-------------|---------|
| Mobile | 1 |
| Tablet | 2 |
| Desktop | 4 |

---

## 2. Giải thích State Modifiers

Tailwind hỗ trợ pseudo-class bằng modifier.

---

### `hover:`

Áp dụng khi rê chuột vào phần tử.

Ví dụ:

```html
<button class="bg-blue-500 hover:bg-blue-700">
```

Ý nghĩa:

```text
Bình thường: xanh nhạt
Hover: xanh đậm
```

---

### `focus:`

Áp dụng khi phần tử được focus.

Ví dụ:

```html
<input class="focus:ring-2 focus:ring-blue-400">
```

Ý nghĩa:

```text
Khi click/input được chọn sẽ hiện viền sáng.
```

---

### `active:`

Áp dụng khi phần tử đang được nhấn.

Ví dụ:

```html
<button class="active:scale-95">
```

Ý nghĩa:

```text
Khi nhấn nút sẽ thu nhỏ nhẹ.
```

---

### `group-hover:`

Cho phép phần tử con thay đổi khi hover phần tử cha.

Ví dụ:

```html
<div class="group">
    <p class="group-hover:text-red-500">
        Text
    </p>
</div>
```

Ý nghĩa:

```text
Hover vào div cha → text đổi sang màu đỏ.
```

---

## 3. Class Tailwind tương đương `d-none d-md-flex`

### Bootstrap

```html
d-none d-md-flex
```

Ý nghĩa:

```text
Ẩn trên mobile
Hiện dạng flex từ tablet trở lên
```

---

### TailwindCSS tương đương

```html
hidden md:flex
```

---

### Giải thích

- `hidden`
  → `display: none`

- `md:flex`
  → từ màn hình ≥768px sẽ chuyển thành:

```css
display: flex;
```

---

## Kết quả Responsive

| Kích thước | Hiển thị |
|-------------|-----------|
| Mobile | Ẩn |
| Tablet | Flex |
| Desktop | Flex |

---

## Ví dụ hoàn chỉnh

```html
<div class="hidden md:flex">
    Responsive Content
</div>
```

### Hoạt động

#### Mobile (<768px)

```text
[ẨN]
```

#### Tablet/Desktop (≥768px)

```text
[Hiển thị dạng Flex]
```
