# PBT_01

# PHẦN A — KIỂM TRA ĐỌC HIỂU

## Câu A1 (5đ) — HTTP & Browser

### 1. Khi gõ https://shopee.vn vào trình duyệt và nhấn Enter

**Nguồn tham chiếu:**
`tuan_1_html5/01_introduction_html_universe.md/1. WEB HOẠT ĐỘNG NHƯ THẾ NÀO?`

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
`tuan_1_html5/01_introduction_html_universe.md\4.3. Developer Tools (F12) — "Kính hiển vi" cho website`

**Thông tin hiển thị:**

* **Name:** Tên file
* **Status:** Mã trạng thái
* **Type:** Loại tài nguyên
* **Initiator:** Nguồn gọi
* **Size:** Kích thước
* **Time:** Thời gian
* **Waterfall:** Timeline
**Mã trạng thái của yêu cầu đầu tiên và Tổng thời gian tải trang**
  <img width="1915" height="939" alt="Screenshot 2026-04-28 225802" src="https://github.com/user-attachments/assets/9b9953b7-0752-40cd-8f5e-4983e38fdb33" />
**Một yêu cầu trả về file CSS**
  <img width="1908" height="923" alt="Screenshot 2026-04-28 225938" src="https://github.com/user-attachments/assets/78279d2b-ded8-46f1-891a-64801d1c0e06" />

## Câu A2 (5đ) — Semantic HTML
* Nguồn tham chiếu: `tuan_1_html5/04_visible_part_html.md`
**Vì sao trang web bị Google đánh giá SEO thấp?**
* Dùng toàn `<div>` → “div soup”
* Không có semantic (`header`, `nav`, `main`, ...)
* Thiếu `alt` cho ảnh
* Không dùng heading (`h1`, `h2`)

**Lỗi:**
1. `<div class="header">` → `<header>`
2. `<div class="menu">` → `<nav>`
3. `<div class="title">` → `<h2>`
4. `<img>` thiếu `alt` + thiếu `figure`

**Bản sửa:**

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

* `<div>` → block → giống “cái hộp”, chiếm cả dòng → mình vẽ bằng khung 
* `<span>`, `<strong>` → inline → nằm cùng dòng, không tạo khối riêng
* `<strong>` chỉ làm in đậm “Text D”, nên trong text art không thấy khác biệt (vì không có style)

---

## Câu A4 (5đ) — Table

Sự khác nhau giữa , , và . Ba thẻ này dùng để phân nhóm nội dung trong một bảng (`<table>`), giúp trình duyệt và các công cụ tìm kiếm hiểu được cấu trúc dữ liệu:
* `<thead>` (Table Header): Chứa các hàng tiêu đề của bảng. Nội dung: Thường chứa các thẻ <th> để đặt tên cho các cột (như "Sản phẩm", "Giá", "Số lượng"). Đặc điểm: Khi in một bảng dài ra giấy, một số trình duyệt sẽ tự động lặp lại phần `<thead>` ở mỗi đầu trang mới.
* `<tbody>` (Table Body): Là phần "thân", chứa nội dung dữ liệu chính của bảng. Nội dung: Chứa các thẻ `<td>` hiển thị thông tin thực tế. Đặc điểm: Một bảng có thể có nhiều `<tbody>` nếu bạn muốn phân nhóm các tập dữ liệu khác nhau. -`<tfoot>` (Table Footer): Chứa nội dung tổng kết hoặc chú thích cuối bảng. Nội dung: Thường dùng để hiển thị tổng số hàng, tổng tiền hoặc các ghi chú chung. Đặc điểm: Dù nằm ở cuối, nhưng trong mã nguồn HTML cũ, nó thường được viết trước <tbody> để trình duyệt có thể render (hiển thị) phần tổng kết ngay cả khi dữ liệu thân bảng quá dài chưa tải xong. Tại sao KHÔNG NÊN dùng bảng để tạo bố cục trang web?
* SEO kém (Search Engine Optimization): Google và các bộ máy tìm kiếm sử dụng các thuật toán để đọc hiểu nội dung web. Khi bạn dùng bảng để dàn trang, cấu trúc mã nguồn sẽ trở nên cực kỳ phức tạp với hàng tầng thẻ <tr>, <td> lồng nhau. Google sẽ khó xác định đâu là nội dung chính, đâu là menu, dẫn đến việc xếp hạng website của bạn bị thấp.
* Không linh hoạt trên thiết bị di động (Responsive): Bảng có tính chất "cứng nhắc", nó luôn cố gắng giữ đúng số cột và hàng. Trên màn hình máy tính (rộng) thì có thể đẹp, nhưng khi xem trên điện thoại (hẹp), bảng sẽ bị tràn ra ngoài hoặc co lại đến mức không đọc được. Với CSS hiện đại (Flexbox/Grid), chúng ta có thể dễ dàng chuyển từ 3 cột trên máy tính thành 1 cột trên điện thoại, điều mà <table> làm rất khó khăn.
* Tốc độ tải trang chậm và khó bảo trì: Trình duyệt thường phải đợi tải xong toàn bộ mã nguồn của thẻ <table> thì mới bắt đầu hiển thị bảng đó ra màn hình. Nếu trang web của bạn lồng quá nhiều bảng để dàn trang, người dùng sẽ thấy một màn hình trắng trong thời gian dài. Ngoài ra, khi bạn muốn thay đổi vị trí một cái menu, bạn phải sửa lại toàn bộ cấu trúc hàng/cột của bảng, việc này cực kỳ tốn thời gian và dễ gây lỗi code.

---

# PHẦN B — THỰC HÀNH CODE

## Bài B3 (15đ) — Debug HTML

**Liệt kê lỗi:**

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
## Bài B4 (15đ) — Phân tích trang web thật
### 1. Phân tích Semantic HTML (tab Elements)

![Semantic Screenshot](screenshots/semantic.png)

### 3 thẻ semantic HTML5:

* `<section>`
  → Dùng để chia các khu vực nội dung như: sản phẩm nổi bật, gợi ý hôm nay.

* `<header>`
  → Đại diện phần đầu trang (logo, thanh tìm kiếm).

* `<nav>`
  → Khu vực menu điều hướng (danh mục sản phẩm, liên kết).

### 2 điểm chưa dùng semantic tốt:

* Dùng nhiều `<div>` thay vì `<article>` cho từng sản phẩm
  → Làm giảm ý nghĩa nội dung và SEO.

* Không sử dụng `<main>` rõ ràng
  → Nội dung chính không được phân vùng semantic chuẩn.

### 2. Phân tích Table

![Table Screenshot](screenshots/table.png)

### Table hiển thị nội dung:

* Thông tin chi tiết sản phẩm (ví dụ: thương hiệu, xuất xứ, loại pin...)

### Nhận xét:

* Không sử dụng thẻ `<table>` thật
* Không có `<thead>`, `<tbody>`

→ Thay vào đó dùng nhiều `<div>` để giả lập bảng.

### 3. Phân tích Form (ô tìm kiếm)

![Form Screenshot](screenshots/form.png)

### Thuộc tính form:

* **action:** `/search`
* **method:** `get`

### Các input sử dụng:

* `<input type="text">` → nhập từ khóa tìm kiếm
* `<input type="hidden">` → dữ liệu ẩn
* `<button type="submit">` → gửi form

## Kết luận

* Shopee có sử dụng một số thẻ semantic nhưng chưa tối ưu hoàn toàn
* Lạm dụng `<div>` thay vì semantic HTML
* Không dùng `<table>` cho dữ liệu dạng bảng
* Form hoạt động đúng chuẩn với phương thức GET

→ Website ưu tiên UI/UX và hiệu năng hơn là semantic HTML
