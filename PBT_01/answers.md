# PBT_01

# PHẦN A — KIỂM TRA ĐỌC HIỂU

## Câu A1 (5đ) — HTTP & Browser

### 1. Khi gõ https://shopee.vn vào trình duyệt và nhấn Enter

**Nguồn tham chiếu:**
`tuan_1_html5/01_introduction_html_universe.md`

**Các bước:**

* **B1. Phân tích URL (URL Parsing):**
  Trình duyệt tách URL thành: giao thức (https), tên miền (shopee.vn), đường dẫn (/).

* **B2. Tra cứu DNS (DNS Lookup):**
  Tìm địa chỉ IP của `shopee.vn` qua cache hoặc DNS server (ví dụ: 8.8.8.8).

* **B3. Kết nối TCP + TLS Handshake:**
  Thiết lập kết nối và mã hóa HTTPS.

* **B4. Gửi HTTP Request:**
  Trình duyệt gửi request (GET) đến server.

* **B5. Server trả về HTTP Response:**
  Bao gồm status code, header, body (HTML, CSS, JS).

* **B6. Render:**
  Parse HTML → DOM → CSSOM → Render Tree → hiển thị.

---

### 2. Tab Network

**Nguồn tham chiếu:**
`tuan_1_html5/... Developer Tools`

**Thông tin hiển thị:**

* **Name:** Tên file
* **Status:** Mã trạng thái
* **Type:** Loại tài nguyên
* **Initiator:** Nguồn gọi
* **Size:** Kích thước
* **Time:** Thời gian
* **Waterfall:** Timeline

---

## Câu A2 (5đ) — Semantic HTML

### Vì sao SEO thấp?

* Dùng toàn `<div>` → “div soup”
* Không có semantic (`header`, `nav`, `main`, ...)
* Thiếu `alt` cho ảnh
* Không dùng heading (`h1`, `h2`)

### Lỗi:

1. `<div class="header">` → `<header>`
2. `<div class="menu">` → `<nav>`
3. `<div class="title">` → `<h2>`
4. `<img>` thiếu `alt` + thiếu `figure`

### Bản sửa:

```html
<header>
    <h1 class="logo">ShopTLU</h1>
    <nav>
        <a href="/">Trang chủ</a>
        <a href="/products">Sản phẩm</a>
    </nav>
</header>

<main>
    <article class="product">
        <h2>iPhone 16 Pro</h2>
        <p class="price">25.990.000đ</p>
        <figure>
            <img src="iphone.jpg" alt="iPhone 16 Pro">
            <figcaption>iPhone 16 Pro - 25.990.000đ</figcaption>
        </figure>
    </article>
</main>

<footer>© 2026 ShopTLU</footer>
```

---

## Câu A3 (5đ) — Block vs Inline

```
+----------------------+
| Hộp 1                |
+----------------------+

Text A Text B

+----------------------+
| Hộp 2                |
+----------------------+

Text C Text D

+----------------------+
| Hộp 3                |
+----------------------+
```

**Giải thích:**

* `<div>` → block (xuống dòng)
* `<span>`, `<strong>` → inline (cùng dòng)

---

## Câu A4 (5đ) — Table

### Phân biệt:

* `<thead>`: tiêu đề bảng
* `<tbody>`: dữ liệu chính
* `<tfoot>`: tổng kết

### Không nên dùng table để layout:

* SEO kém
* Không responsive
* Khó bảo trì

---

# PHẦN B — THỰC HÀNH CODE

## Bài B3 (15đ) — Debug HTML

### Liệt kê lỗi:

* **Lỗi 1:** Dòng 1 — `<!DOCTYPE>` thiếu `html` → `<!DOCTYPE html>`
* **Lỗi 2:** Dòng 4 — thiếu `</title>`
* **Lỗi 3:** Dòng 5 — `utf8` → `UTF-8`
* **Lỗi 4:** Dòng 9 — sai `</h1>`
* **Lỗi 5:** Dòng 13 — `<a>` chưa đóng
* **Lỗi 6:** Dòng 20 — `<img>` thiếu `"` và `alt`
* **Lỗi 7:** Dòng 22 — sai thứ tự `<b>` và `<p>`
* **Lỗi 8:** Dòng 28 — dùng `<td>` thay vì `<th>`
* **Lỗi 9:** Dòng 38 — 2 thẻ `<main>` → đổi thành `<aside>`
* **Lỗi 10:** Dòng 43 — `<p>` chưa đóng
* **Lỗi 11:** Thiếu `lang="vi"`
* **Lỗi 12:** Dùng `<h3>` sai cấp → đổi `<h2>`
