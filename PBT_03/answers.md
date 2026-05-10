# PHẦN A — KIỂM TRA ĐỌC HIỂU (25 điểm)
## Câu A1 (5đ) — 3 Cách nhúng CSS
Tài liệu tham chiếu `CCC_Frontend_2026/tuan_2_css_core/08_introduction_css.md`

**3 cách nhúng CSS vào HTML:**

**1. Inline CSS (trong thẻ HTML)**
* VD: `<h1 style="color: red; font-size: 24px;">Tiêu đề</h1>`
* Ưu điểm: Nhanh, tiện test/debug, áp dụng trực tiếp cho 1 phần tử
* Nhược điểm: Khó bảo trì (code rối), không tái sử dụng được, vi phạm nguyên tắc tách biệt HTML & CSS
* Khi nào nên dùng: debug nhanh, test style tạm thời
**2. Internal CSS (trong thẻ `<style>`)**
* VD:
```html
<head>
    <style>
        h1 {
            color: red;
            font-size: 24px;
        }
    </style>
</head>
```
* Ưu điểm: Dễ quản lý hơn inline, áp dụng cho toàn bộ trang
* Nhược điểm: Chỉ dùng được cho 1 trang, không tái sử dụng giữa nhiều file
* Khi nào nên dùng: Prototype, bài tập nhỏ, demo nhanh
**3. External CSS (file riêng)**
* VD:
```html
<head>
    <link rel="stylesheet" href="styles.css">
</head>
```
File `styles.css`:
```css
h1 {
    color: red;
    font-size: 24px;
}
```
* Ưu điểm: Tách biệt rõ HTML & CSS, tái sử dụng cho nhiều trang, dễ bảo trì, chuẩn production
* Nhược điểm: Cần thêm file riêng, load thêm request (nhưng thực tế không đáng kể)
* Khi nào nên dùng: Dự án thực tế (100%), website nhiều trang
**Câu hỏi thêm**
Thứ tự ưu tiên (độ mạnh CSS):
Inline CSS > Internal CSS > External CSS
Giải thích:
* Style “gần” phần tử hơn → mạnh hơn
* Inline nằm ngay trong thẻ → ưu tiên cao nhất
* Internal và External phụ thuộc thứ tự load, nhưng vẫn thua inline
## Câu A2 (8đ) — CSS Selectors — Dự đoán kết quả
1. `h1` → Chọn:  **ShopTLU**
2. `.price` → Chọn:  
**25.990.000đ**  
**45.990.000đ**
3. `#app header` → Chọn toàn bộ nội dung trong header:  
**ShopTLU, Home, Products, About**
4. `nav a:first-child` → Chọn:  **Home**
5. `.product.featured h2` → Chọn:  **MacBook Pro**
6.  `article > p` → Chọn tất cả thẻ `p` là con trực tiếp của `article`:  
**25.990.000đ**  
**Mô tả sản phẩm...**  
**45.990.000đ**  
**Mô tả sản phẩm...**
7.  `a[href="/"]` → Chọn:  **Home**
8.  `.top-bar.dark h1` → Chọn:  **ShopTLU**

Ảnh screenshot:
<img width="1901" height="539" alt="Screenshot 2026-05-10 163739" src="https://github.com/user-attachments/assets/de2876cd-7ce0-47cb-906b-e2e1c1b9eb27" />

## Câu A3 (7đ) — Box Model — Tính toán kích thước
Tài liệu : `tuan_2_css_core/11_box_model.md`
**Trường hợp 1: content-box (mặc định)**
```css
.box-1 {
    width: 400px;
    padding: 20px;
    border: 5px solid black;
    margin: 10px;
}
```
* Chiều rộng hiển thị = width + padding×2 + border×2 = 400 + 40 + 10 = 450px
* Không gian chiếm trên trang = chiều rộng hiển thị + margin×2 = 450 + 20 = 470px
**Trường hợp 2: border-box**
```css
.box-2 {
    box-sizing: border-box;
    width: 400px;
    padding: 20px;
    border: 5px solid black;
    margin: 10px;
}
```
* Chiều rộng hiển thị = 400px (không đổi)
* Kích thước content thực tế = width - padding×2 - border×2 = 400 - 40 - 10 = 350px
* Không gian chiếm trên trang = width + margin×2 = 400 + 20 = 420px
**Trường hợp 3: Margin Collapse**
* Khoảng cách giữa 2 box = 40px
* Giải thích: Margin dọc không cộng dồn; CSS lấy giá trị lớn hơn; Nên: max(25, 40) = 40px (không phải 65px)
**Nâng cao (margin âm)**
```css
.box-a { margin-bottom: -10px; }
.box-b { margin-top: 40px; }
```
* Khoảng cách thực tế = 40 + (-10) = 30px
* Giải thích: Khi có margin âm → CSS cộng đại số; 40px kéo xuống, -10px kéo lên → còn 30px
