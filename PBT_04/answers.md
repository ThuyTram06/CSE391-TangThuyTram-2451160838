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
