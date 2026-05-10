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


