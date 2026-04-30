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

