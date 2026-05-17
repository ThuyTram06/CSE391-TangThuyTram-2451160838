# PHẦN A — KIỂM TRA ĐỌC HIỂU (20 điểm)
## Câu A1 (10đ) — 5 Loại Positioning

| Position | Vẫn chiếm chỗ trong flow? | Tham chiếu vị trí | Cuộn theo trang? | Use case |
|---|---|---|---|---|
| `static` |  Có | Không dùng `top/right/bottom/left` |  Có | Layout mặc định |
| `relative` |  Có | Vị trí gốc của chính nó |  Có | Làm anchor cho `absolute`, dịch nhẹ element |
| `absolute` |  Không | Cha gần nhất có `position ≠ static` |  Có | Badge, tooltip, dropdown |
| `fixed` |  Không | Viewport (màn hình) |  Không | Chat button, cookie banner |
| `sticky` |  Ban đầu có → khi dính thì giống fixed | Viewport khi đạt ngưỡng `top/left/...` |  Khi đã “dính” | Sticky header, sticky sidebar |

### Câu hỏi thêm

#### Khi nào `absolute` tham chiếu `body`?

Khi KHÔNG tìm thấy ancestor nào có:

```css
position: relative;
position: absolute;
position: fixed;
position: sticky;
```

Ví dụ:

```css
.parent {
    position: static;
}

.child {
    position: absolute;
    top: 0;
    left: 0;
}
```

→ `.child` sẽ tiếp tục “leo lên” DOM tree.  
→ Nếu toàn bộ ancestor đều `static` → cuối cùng bám vào `<html>/<body>`.

---

#### Khi nào `absolute` tham chiếu `parent`?

Khi parent có:

```css
position: relative;
```

(hoặc `absolute/fixed/sticky`)

Ví dụ:

```css
.parent {
    position: relative;
}

.child {
    position: absolute;
    top: 0;
    right: 0;
}
```

→ `.child` tính tọa độ từ `.parent`.

---

#### “Nearest Positioned Ancestor” là gì?

Là:

> Ancestor gần nhất có `position ≠ static`

`absolute` sẽ dùng element đó làm hệ tọa độ.

Ví dụ:

```html
<div class="grandparent">
    <div class="parent">
        <div class="child"></div>
    </div>
</div>
```

```css
.grandparent {
    position: relative;
}

.parent {
    position: static;
}

.child {
    position: absolute;
    top: 0;
    left: 0;
}
```

→ `.child` KHÔNG bám `.parent` vì `.parent` là `static`.

→ `.child` sẽ bám `.grandparent` vì đó là “nearest positioned ancestor”.

## Câu A2 (10đ) — Flexbox vs Grid

### Trường hợp 1

```css
.container { display: flex; }
.item { flex: 1; }
```

- `display: flex` → các item nằm ngang trên cùng 1 hàng
- `flex: 1` → tất cả item chia đều chiều rộng

→ 4 items = 1 hàng, 4 cột bằng nhau

Sơ đồ:

```text
| Item 1 | Item 2 | Item 3 | Item 4 |
```

---

### Trường hợp 2

```css
.container { display: flex; flex-wrap: wrap; }
.item { width: 45%; margin: 2.5%; }
```

- `flex-wrap: wrap` → item được xuống hàng
- `width: 45%`
- `margin: 2.5%`

→ Mỗi item chiếm khoảng:

```text
45% + 2.5% + 2.5% = 50%
```

→ Mỗi hàng chứa 2 item

→ 6 items = 3 hàng × 2 cột

Sơ đồ:

```text
| Item 1 | Item 2 |
| Item 3 | Item 4 |
| Item 5 | Item 6 |
```

---

### Trường hợp 3

```css
.container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
```

- `justify-content: space-between`
  → item đầu sát trái
  → item cuối sát phải
  → item giữa nằm ở giữa với khoảng cách đều

- `align-items: center`
  → căn giữa theo chiều dọc

→ 3 item nằm ngang, cách đều nhau

Sơ đồ:

```text
|Item 1                Item 2                Item 3|
```

---

### Trường hợp 4

```css
.container {
    display: grid;
    grid-template-columns: 200px 1fr 200px;
    gap: 20px;
}
```

- Grid có 3 cột:
  - cột 1 = 200px
  - cột 2 = chiếm phần còn lại (`1fr`)
  - cột 3 = 200px

→ 3 item nằm trên 1 hàng

Sơ đồ:

```text
| 200px |      flexible      | 200px |
| Item1 |       Item2        | Item3 |
```

---

### Trường hợp 5

```css
.container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
}
```

- `repeat(3, 1fr)` → grid có 3 cột bằng nhau
- 7 items sẽ tự xuống hàng

Tính số hàng:

```text
7 items / 3 cột
= 2 hàng đầy + 1 item dư
```

→ Tổng = 3 hàng

Sơ đồ:

```text
| Item 1 | Item 2 | Item 3 |
| Item 4 | Item 5 | Item 6 |
| Item 7 |         |         |
```

→ Item 7 nằm ở:
- hàng 3
- cột 1

# PHẦN C — SUY LUẬN (20 điểm)
## Câu C1 — Flexbox vs Grid: Khi nào dùng gì?

| Tình huống | Nên dùng | Giải thích |
|---|---|---|
| 1. Navigation bar ngang (logo + menu + buttons) | Flexbox | Navbar là layout 1 chiều theo hàng ngang. Flexbox rất phù hợp để căn trái - giữa - phải và align-items:center dễ dàng. |
| 2. Lưới ảnh Instagram (3 cột đều nhau, số ảnh không biết trước) | Grid | Đây là layout 2 chiều (hàng + cột). Grid giúp tạo các cột đều nhau bằng repeat(3, 1fr) và tự động xuống hàng khi thêm ảnh mới. |
| 3. Layout blog: main content + sidebar | Grid | Layout có nhiều vùng lớn theo cột nên Grid phù hợp hơn. Có thể dùng grid-template-columns: 1fr 300px để chia content và sidebar rõ ràng. |
| 4. Footer với 4 cột thông tin | Grid hoặc Flexbox | Có thể dùng cả hai, nhưng Grid tốt hơn nếu muốn 4 cột đều nhau và responsive dễ hơn. Flexbox cũng dùng được nếu layout đơn giản. |
| 5. Card sản phẩm (ảnh trên, text giữa, nút dưới — nút luôn dính đáy) | Flexbox | Card là layout 1 chiều theo cột. Dùng flex-direction: column và margin-top: auto để đẩy nút xuống đáy card. |

### Kết luận ngắn:

- Flexbox → tốt cho layout 1 chiều (row hoặc column)
- Grid → tốt cho layout 2 chiều (rows + columns)
- Thực tế thường kết hợp cả hai:
  - Grid cho layout tổng
  - Flexbox cho component nhỏ bên trong
 
## Câu C2 — Debug Flexbox

---

# Lỗi 1: Cards không đều chiều cao — nút "Mua" bị nhảy lên/xuống

## Nguyên nhân

Các card có lượng text khác nhau nên chiều cao mỗi card khác nhau.  
Nút `.btn` nằm ngay sau nội dung nên vị trí nút bị lệch giữa các card.

---

## Code lỗi

```css
.card-container {
    display: flex;
    flex-wrap: wrap;
}

.card {
    width: 30%;
    margin: 1.5%;
}

.card img {
    width: 100%;
}

.card h3 {
    font-size: 18px;
}

.card .btn {
    padding: 10px;
}
```

---

## Cách sửa

Dùng Flexbox theo chiều dọc cho card và đẩy nút xuống đáy bằng `margin-top: auto`.

---

## Code sửa

```css
.card-container {
    display: flex;
    flex-wrap: wrap;
}

.card {
    width: 30%;
    margin: 1.5%;

    display: flex;
    flex-direction: column;
}

.card img {
    width: 100%;
}

.card h3 {
    font-size: 18px;
}

.card .btn {
    padding: 10px;

    margin-top: auto;
}
```

---


# Lỗi 2: Items không nằm giữa màn hình

## Nguyên nhân

Container `.hero` đã dùng `display: flex` nhưng chưa có:
- `justify-content`
- `align-items`

Nên item mặc định nằm góc trái trên.

---

## Code lỗi

```css
.hero {
    height: 100vh;
    display: flex;
}

.hero-content {
    text-align: center;
}
```

---

## Cách sửa

Dùng:
- `justify-content: center`
- `align-items: center`

để căn giữa ngang và dọc.

---

## Code sửa

```css
.hero {
    height: 100vh;

    display: flex;

    justify-content: center;

    align-items: center;
}

.hero-content {
    text-align: center;
}
```

---

# Lỗi 3: Sidebar bị co lại khi content quá dài

## Nguyên nhân

Flexbox mặc định cho phép item co lại (`flex-shrink: 1`).

Khi `.content` quá dài, sidebar bị ép nhỏ lại.

---

## Code lỗi

```css
.layout {
    display: flex;
}

.sidebar {
    width: 250px;
}

.content {
    flex: 1;
}
```

---

## Cách sửa

Thêm:

```css
flex-shrink: 0;
```

để sidebar không bị co.

---

## Code sửa

```css
.layout {
    display: flex;
}

.sidebar {
    width: 250px;

    flex-shrink: 0;
}

.content {
    flex: 1;
}
```
