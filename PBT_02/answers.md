# PHẦN A — KIỂM TRA ĐỌC HIỂU (25 điểm)
## Câu A1 (5đ) — Input Types
1. `type="text"` → Ô nhập văn bản một dòng → Không có validation tự động → Dùng nhập họ tên, tên sản phẩm
2. `type="email"` → Ô nhập text có định dạng email → Tự kiểm tra có ký tự `@` và đúng format email → Dùng cho đăng ký tài khoản
3. `type="password"` → Ô nhập bị ẩn ký tự (••••) → Không có validation sẵn (trừ khi thêm minlength/pattern) → Dùng nhập mật khẩu
4. `type="number"` → Ô nhập số có nút tăng/giảm → Chỉ cho nhập số, có thể dùng min/max → Dùng nhập số lượng sản phẩm
5. `type="tel"` → Ô nhập số điện thoại → Không validate mạnh nhưng hỗ trợ bàn phím số trên mobile → Dùng nhập SĐT giao hàng
6. `type="date"` → Hiển thị lịch để chọn ngày → Giới hạn bằng min/max → Dùng chọn ngày sinh hoặc ngày giao hàng
7. `type="radio"` → Nút chọn 1 trong nhiều lựa chọn → Chỉ chọn được 1 trong cùng name → Dùng chọn phương thức thanh toán
8. `type="checkbox"` → Ô tick chọn nhiều lựa chọn → Không có validation (trừ required) → Dùng chọn đồng ý điều khoản hoặc nhiều dịch vụ
9. `type="range"` → Thanh trượt → Giới hạn bằng min/max/step → Dùng chọn số lượng, mức giá, thời gian giao hàng
10. `type="file"` → Nút upload file → Có thể giới hạn loại file bằng accept → Dùng upload ảnh sản phẩm hoặc avatar
## Câu A2 (5đ) — Validation Attributes
### Dự đoán kết quả khi bấm Submit

**Trường hợp 1**
`<input type="text" required value="">`
→ Không submit được
→ Trình duyệt báo lỗi “Please fill out this field”
→ Vì `required` bắt buộc phải nhập, nhưng value đang rỗng

**Trường hợp 2**
`<input type="email" value="abc">`
→ Không submit được
→ Báo lỗi định dạng email không hợp lệ
→ Vì `type="email"` yêu cầu có dạng `something@domain`

**Trường hợp 3**
`<input type="number" min="1" max="10" value="15">`
→ Không submit được
→ Báo lỗi vượt quá giá trị tối đa
→ Vì `15 > max="10"`

**Trường hợp 4**
`<input type="text" pattern="[0-9]{10}" value="abc123">`
→ Không submit được
→ Báo lỗi không đúng định dạng
→ Vì pattern yêu cầu đúng **10 chữ số**, nhưng "abc123" chứa chữ và không đủ độ dài

**Trường hợp 5**
`<input type="password" minlength="8" value="123">`
→ Không submit được
→ Báo lỗi “Please lengthen this text…”
→ Vì độ dài < 8 ký tự
## Câu A3 (5đ) — Accessibility
### 1. Vì sao `<label for="email">` quan trọng?
`<label for="email">` giúp **liên kết trực tiếp giữa label và input** thông qua `id`.
Với người dùng **screen reader**, khi focus vào ô input, thiết bị sẽ đọc:
→ “Email, edit text”
 Nếu không có `<label>`, screen reader chỉ đọc:
→ “edit text” (không biết nhập gì)
Ngoài ra:
* Click vào label → tự động focus vào input ✔️
* Tăng khả năng sử dụng (usability) cho mọi người dùng

### 2. Khi nào dùng `<fieldset>` + `<legend>`?
Dùng khi cần **nhóm các input liên quan với nhau**.
 Ví dụ:

```html
<fieldset>
    <legend>Phương thức thanh toán</legend>

    <input type="radio" id="cod" name="payment">
    <label for="cod">COD</label>

    <input type="radio" id="bank" name="payment">
    <label for="bank">Chuyển khoản</label>
</fieldset>
```

 Lợi ích:

* Screen reader sẽ đọc:
  → “Phương thức thanh toán, nhóm lựa chọn”
* Giúp người dùng hiểu **context của các input**
* Tăng tính semantic và accessibility

### 3. `aria-label` dùng khi nào?
Dùng khi:
 **Không có nội dung text hiển thị nhưng vẫn cần mô tả**
Ví dụ:

```html
<button aria-label="Tìm kiếm">🔍</button>
```

 Vì icon 🔍 không có chữ → cần `aria-label`

---

### Vì sao KHÔNG nên dùng `aria-label` khi đã có `<label>`?

* `<label>` đã cung cấp **semantic chuẩn** 
* Screen reader ưu tiên `<label>` 
* Dùng thêm `aria-label` có thể:

  * Gây **trùng lặp thông tin**
  * Làm **xung đột hoặc khó hiểu**

 Nguyên tắc:

*  Có `<label>` → KHÔNG cần `aria-label`
*  Không có text → mới dùng `aria-label`
## Câu A4 (5đ) — Media
### 1. `loading="lazy"` là gì? Cải thiện gì?
`loading="lazy"` trên thẻ `<img>` giúp trì hoãn việc tải ảnh cho đến khi ảnh đó gần xuất hiện trong viewport (vùng nhìn thấy của người dùng).
Lợi ích:
* Tăng tốc độ tải trang ban đầu
* Giảm băng thông (không tải ảnh chưa cần)
* Cải thiện trải nghiệm trên mobile
Khi **KHÔNG nên dùng**:
* Ảnh above-the-fold (ảnh xuất hiện ngay khi mở trang)
* Ảnh quan trọng như:

  * logo
  * banner chính
    → Vì sẽ gây delay hiển thị

### 2. Vì sao cần nhiều `<source>` trong `<video>`?
Không phải trình duyệt nào cũng hỗ trợ cùng một định dạng video.
Cung cấp nhiều `<source>` giúp:
* Tăng khả năng tương thích (cross-browser)
* Trình duyệt tự chọn format phù hợp
* Tránh lỗi không phát được video
Ví dụ:

```html
<video controls>
    <source src="video.mp4" type="video/mp4">
    <source src="video.webm" type="video/webm">
</video>
```
3 format phổ biến:
* `.mp4`
* `.webm`
* `.ogg`

### 3. Thuộc tính `alt` trên `<img>` dùng để làm gì?
`alt` cung cấp mô tả nội dung ảnh khi:
* Ảnh không load được
* Người dùng dùng screen reader
Giúp:
* Accessibility
* SEO

### Viết alt cho từng trường hợp
**Ảnh sản phẩm iPhone 16:**

```html
alt="iPhone 16 màu đen, mặt trước và sau"
```

**Ảnh trang trí (decorative):**
```html
alt=""
```
**Ảnh biểu đồ doanh thu Q1/2026:**

```html
alt="Biểu đồ doanh thu quý 1 năm 2026 tăng dần từ tháng 1 đến tháng 3"
```
## Câu A5 (5đ) — So sánh `<figure>` vs `<img>`
### Khi nào dùng Cách 1 (`<img>` đơn lẻ)?
Dùng khi:
* Ảnh **chỉ mang tính hiển thị đơn giản**, không cần chú thích
* Nội dung ảnh đã đủ rõ qua `alt` hoặc context xung quanh
* Không cần liên kết ảnh với mô tả riêng biệt
Ví dụ thực tế:
1. Ảnh icon sản phẩm trong danh sách (thumbnail nhỏ trong trang category)
2. Ảnh logo thương hiệu ở header

### Khi nào dùng Cách 2 (`<figure>` + `<figcaption>`)?
Dùng khi:
* Ảnh cần **chú thích đi kèm** để giải thích rõ hơn
* Ảnh là **nội dung độc lập, có ý nghĩa riêng**
* Muốn nhóm ảnh + mô tả thành một khối semantic
Ví dụ thực tế:
1. Trang chi tiết sản phẩm: ảnh sản phẩm + giá + mô tả ngắn
2. Bài blog/landing page: ảnh minh họa + caption giải thích nội dung

## So sánh nhanh
* `<img>`: đơn giản, dùng cho ảnh nhỏ, không cần mô tả thêm
* `<figure>`: semantic hơn, dùng khi ảnh có caption hoặc cần nhấn mạnh nội dung
# PHẦN C — PHÂN TÍCH & SUY LUẬN (20 điểm)
## Câu C1 (10đ) — Debug Form
### Liệt kê lỗi và cách sửa
**Lỗi 1: Dòng 2** — Input "Tên" không có `<label for="...">`, vi phạm accessibility
Sửa:

```html
<label for="name">Tên:</label>
<input type="text" id="name" name="name" required>
```

**Lỗi 2: Dòng 4** — Input email không có `<label>`
Sửa:

```html
<label for="email">Email:</label>
<input type="email" id="email" name="email" placeholder="Email của bạn" required>
```

**Lỗi 3: Dòng 6-7** — Password không có `<label>`
Sửa:

```html
<label for="password">Mật khẩu:</label>
<input type="password" id="password" name="password" placeholder="Mật khẩu" required minlength="8">
```


**Lỗi 4: Dòng 7** — Ô "Nhập lại mật khẩu" không có label và không phân biệt với password chính
Sửa:

```html
<label for="confirm">Nhập lại mật khẩu:</label>
<input type="password" id="confirm" name="confirm" placeholder="Nhập lại mật khẩu" required minlength="8">
```


**Lỗi 5: Dòng 9** — Phone dùng `type="text"` không đúng semantic
Sửa:

```html
<label for="phone">Phone:</label>
<input type="tel" id="phone" name="phone" pattern="[0-9]{10}" placeholder="0901234567">
```

**Lỗi 6: Dòng 9** — Không nên dùng `value` mặc định cho số điện thoại
Sửa:

```html
<input type="tel" id="phone" name="phone" placeholder="0901234567">
```


**Lỗi 7: Dòng 11** — `<select>` không có `<label>`
Sửa:

```html
<label for="city">Thành phố:</label>
<select id="city" name="city">
    <option>Hà Nội</option>
    <option>TP.HCM</option>
</select>
```

**Lỗi 8: Dòng 15** — Checkbox không có input đi kèm `<label>` và không có `for`
Sửa:

```html
<input type="checkbox" id="agree" required>
<label for="agree">Tôi đồng ý điều khoản</label>
```
## Câu C2 (10đ) — Thiết kế chiến lược Validation
**Regex pattern:**

* CMND/CCCD (12 chữ số):

```html
pattern="[0-9]{12}"
```

* Số tài khoản (10–15 chữ số):

```html
pattern="[0-9]{10,15}"
```

**HTML5 validation có đủ an toàn cho ứng dụng ngân hàng không?**
Không đủ an toàn. HTML5 validation chỉ chạy ở phía trình duyệt (client-side), người dùng có thể dễ dàng bypass bằng cách tắt validation, sửa request hoặc dùng công cụ như DevTools/Postman. Vì vậy, nó chỉ giúp kiểm tra nhanh và cải thiện UX, không đảm bảo bảo mật. Ứng dụng ngân hàng bắt buộc phải có validation ở backend để kiểm soát dữ liệu thực sự.

**3 loại validation HTML5 không làm được (cần JavaScript):**

1. So sánh giữa các field (ví dụ: confirm PIN phải trùng PIN)
2. Kiểm tra logic phức tạp (ví dụ: tuổi ≥ 18 dựa trên ngày sinh)
3. Kiểm tra dữ liệu từ server (ví dụ: email hoặc số tài khoản đã tồn tại chưa)

**2 rủi ro nếu chỉ validate Frontend:**

1. Người dùng gửi dữ liệu sai/độc hại trực tiếp lên server (bỏ qua validation) → gây lỗi hệ thống hoặc tấn công
2. Dữ liệu không hợp lệ vẫn được lưu vào database → ảnh hưởng tính toàn vẹn và bảo mật hệ thống

**Kết luận:**
HTML5 validation chỉ nên dùng để hỗ trợ trải nghiệm người dùng, còn bảo mật bắt buộc phải xử lý ở backend.
