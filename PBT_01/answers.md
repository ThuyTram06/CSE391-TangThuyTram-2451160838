# PBT_01
# PHẦN A — KIỂM TRA ĐỌC HIỂU
## Câu A1 (5đ) — HTTP & Browser
### 1.Khi gõ https://shopee.vn vào trình duyệt và nhấn Enter, thứ tự ít nhất 5 bước xảy ra (từ DNS lookup đến render) là:
*Nguồn tham chiếu: tuan_1_html5/01_introduction_html_universe.md/1.WEB HOẠT ĐỘNG NHƯ THẾ NÀO?
*B1.Phân tích URL (URL Parsing): Trình duyệt tách URL thành các thành phần: giao thức (https), tên miền (shopee.vn), đường dẫn (/).Xác định cần dùng giao thức HTTPS để kết nối.
*B2.Tra cứu DNS (DNS Lookup): Trình duyệt cần biết địa chỉ IP của shopee.vn.Nó kiểm tra cache cục bộ, nếu không có thì hỏi hệ điều hành, router, hoặc DNS server (ví dụ Google DNS 8.8.8.8).DNS server trả về địa chỉ IP (ví dụ: 93.184.216.34).
*B3.Thiết lập kết nối TCP và TLS Handshake: Trình duyệt khởi tạo kết nối TCP với server qua cơ chế “three-way handshake” (SYN → SYN-ACK → ACK).Vì dùng HTTPS, sẽ có thêm bước TLS handshake: kiểm tra chứng chỉ SSL/TLS, thỏa thuận khóa mã hóa để đảm bảo dữ liệu truyền đi an toàn.
*B4.Gửi HTTP Request: Trình duyệt gửi yêu cầu HTTP (thường là GET / HTTP/1.1) đến server Shopee.Yêu cầu có thể kèm theo header, cookies, thông tin user-agent.
*B5.Server xử lý và trả về HTTP Response: Server Shopee nhận yêu cầu, xử lý logic (truy vấn database, gọi dịch vụ khác nếu cần).Trả về phản hồi HTTP với status code (ví dụ 200 OK), header (loại nội dung, cache), và body (HTML, CSS, JS).
*B6. Trình duyệt phân tích và render: Trình duyệt bắt đầu parse HTML, xây dựng DOM tree.Gặp các liên kết đến CSS, JS, hình ảnh → tải thêm các tài nguyên này.Kết hợp DOM + CSSOM → tạo Render Tree.Thực thi JavaScript, áp dụng style, layout, và cuối cùng hiển thị giao diện cho người dùng.
### 2.
*Nguồn tham chiếu: tuan_1_html5/01_introduction_html_universe.md/4.3. Developer Tools (F12) — "Kính hiển vi" cho website
Tab Network hiển thị danh sách tất cả các tài nguyên được tải xuống để hiển thị trang web. Các thông tin chính bao gồm:
*Name: Tên của file hoặc tài nguyên.
*Status: Mã trạng thái HTTP (để biết yêu cầu thành công hay thất bại).
*Type: Loại tài nguyên (ví dụ: document, script, stylesheet, png, fetch).
*Initiator: Đối tượng hoặc dòng mã nào đã khởi tạo yêu cầu này.
*Size: Kích thước của file được tải về.
*Time: Tổng thời gian từ lúc gửi yêu cầu đến khi nhận được dữ liệu.
*Waterfall: Biểu đồ trực quan về thời gian thực hiện của từng giai đoạn trong một yêu cầu.
**Mã trạng thái của yêu cầu đầu tiên và Tổng thời gian tải trang**
<img width="1915" height="939" alt="Screenshot 2026-04-28 225802" src="https://github.com/user-attachments/assets/9b9953b7-0752-40cd-8f5e-4983e38fdb33" />
**Một yêu cầu trả về file CSS**
<img width="1908" height="923" alt="Screenshot 2026-04-28 225938" src="https://github.com/user-attachments/assets/78279d2b-ded8-46f1-891a-64801d1c0e06" />
## Câu A2 (5đ) — Semantic HTML
*Nguồn tham chiếu: tuan_1_html5/04_visible_part_html.md
**Vì sao trang web bị Google đánh giá SEO thấp?**
*Toàn bộ cấu trúc chỉ dùng <div> → gọi là “Div Soup”, Google khó hiểu nội dung.
*Không có thẻ semantic để mô tả rõ ràng header, nav, main, article, footer.
*Thiếu alt text cho ảnh → Google không đọc được nội dung hình ảnh.
*Tiêu đề sản phẩm chỉ là <div> thay vì heading (<h2>)
**Ít nhất 4 lỗi:**
1.<div class="header"> → nên dùng <header>.
2.<div class="menu"> → nên dùng <nav>.
3.<div class="title"> → nên dùng <h2> cho tiêu đề sản phẩm.
4.<div class="image"><img src="iphone.jpg"></div> → nên dùng <figure> + <figcaption> và thêm alt cho ảnh.
**Phiên bản sửa lại:**
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
**Vì sao hiển thị như vậy?**
*`<div>` → block
→ giống “cái hộp”, chiếm cả dòng → mình vẽ bằng khung
*`<span>`, `<strong>` → inline
→ nằm cùng dòng, không tạo khối riêng
*`<strong>` chỉ làm in đậm “Text D”, nên trong text art không thấy khác biệt (vì không có style)
## Câu A4 (5đ) — Table
Sự khác nhau giữa , , và . Ba thẻ này dùng để phân nhóm nội dung trong một bảng (`<table>`), giúp trình duyệt và các công cụ tìm kiếm hiểu được cấu trúc dữ liệu:
*`<thead>` (Table Header): Chứa các hàng tiêu đề của bảng. Nội dung: Thường chứa các thẻ `<th>` để đặt tên cho các cột (như "Sản phẩm", "Giá", "Số lượng"). Đặc điểm: Khi in một bảng dài ra giấy, một số trình duyệt sẽ tự động lặp lại phần `<thead>` ở mỗi đầu trang mới.
*`<tbody>` (Table Body): Là phần "thân", chứa nội dung dữ liệu chính của bảng. Nội dung: Chứa các thẻ `<td>` hiển thị thông tin thực tế. Đặc điểm: Một bảng có thể có nhiều `<tbody>` nếu bạn muốn phân nhóm các tập dữ liệu khác nhau. -`<tfoot>` (Table Footer): Chứa nội dung tổng kết hoặc chú thích cuối bảng. Nội dung: Thường dùng để hiển thị tổng số hàng, tổng tiền hoặc các ghi chú chung. Đặc điểm: Dù nằm ở cuối, nhưng trong mã nguồn HTML cũ, nó thường được viết trước `<tbody>` để trình duyệt có thể render (hiển thị) phần tổng kết ngay cả khi dữ liệu thân bảng quá dài chưa tải xong. Tại sao KHÔNG NÊN dùng bảng để tạo bố cục trang web?
*SEO kém (Search Engine Optimization): Google và các bộ máy tìm kiếm sử dụng các thuật toán để đọc hiểu nội dung web. Khi bạn dùng bảng để dàn trang, cấu trúc mã nguồn sẽ trở nên cực kỳ phức tạp với hàng tầng thẻ `<tr>`, `<td>` lồng nhau. Google sẽ khó xác định đâu là nội dung chính, đâu là menu, dẫn đến việc xếp hạng website của bạn bị thấp.
*Không linh hoạt trên thiết bị di động (Responsive): Bảng có tính chất "cứng nhắc", nó luôn cố gắng giữ đúng số cột và hàng. Trên màn hình máy tính (rộng) thì có thể đẹp, nhưng khi xem trên điện thoại (hẹp), bảng sẽ bị tràn ra ngoài hoặc co lại đến mức không đọc được. Với CSS hiện đại (Flexbox/Grid), chúng ta có thể dễ dàng chuyển từ 3 cột trên máy tính thành 1 cột trên điện thoại, điều mà `<table>` làm rất khó khăn.
*Tốc độ tải trang chậm và khó bảo trì: Trình duyệt thường phải đợi tải xong toàn bộ mã nguồn của thẻ `<table>` thì mới bắt đầu hiển thị bảng đó ra màn hình. Nếu trang web của bạn lồng quá nhiều bảng để dàn trang, người dùng sẽ thấy một màn hình trắng trong thời gian dài. Ngoài ra, khi bạn muốn thay đổi vị trí một cái menu, bạn phải sửa lại toàn bộ cấu trúc hàng/cột của bảng, việc này cực kỳ tốn thời gian và dễ gây lỗi code.
# PHẦN B — THỰC HÀNH CODE (60 điểm)
## Bài B3 (15đ) — Debug HTML
**Liệt kê lỗi:**
Lỗi 1: Dòng 1 — `<!DOCTYPE>` thiếu html — Sửa thành `<!DOCTYPE html>`
Lỗi 2: Dòng 4 — `<title>` không đóng — Thêm `</title>`
Lỗi 3: Dòng 5 — charset sai (`utf8`) — Sửa thành `UTF-8`
Lỗi 4: Dòng 9 — `<h1>` không đóng đúng — Sửa `</h1>`
Lỗi 5: Dòng 13 — thẻ `<a>` không đóng — thêm `</a>`
Lỗi 6: Dòng 20 — `<img>` thiếu dấu ngoặc kép và alt — thêm `src="..." alt="..."`
Lỗi 7: Dòng 22 — sai thứ tự đóng thẻ `<b>` và `<p>` — sửa thành `<p><b>...</b></p>`
Lỗi 8: Dòng 28 — bảng dùng `<td>` cho header — sửa thành `<th>`
Lỗi 9: Dòng 38 — dùng 2 thẻ `<main>` — thay cái thứ 2 bằng `<aside>`
Lỗi 10: Dòng 43 — `<p>` trong footer không đóng — thêm `</p>`
Lỗi 11: Thiếu thuộc tính `lang` trong `<html>` — thêm `lang="vi"`
Lỗi 12: Semantic chưa đúng (`h3` không có `h1-h2` trước) — đổi thành `<h2>`
