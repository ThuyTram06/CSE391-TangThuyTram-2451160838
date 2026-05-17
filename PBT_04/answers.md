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
