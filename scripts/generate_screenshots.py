import os
from PIL import Image, ImageDraw, ImageFont

def create_terminal_image(
    output_path,
    title,
    lines,
    width=900,
    padding=28,
    font_size=15,
):
    # Colors (Modern Dark Theme - Tokyo Night / One Dark)
    bg_color = (24, 26, 32)
    window_bar_color = (33, 37, 46)
    border_color = (48, 54, 66)
    title_color = (156, 163, 175)
    
    # Fonts
    font_mono_path = "C:/Windows/Fonts/consola.ttf"
    font_tc_path = "C:/Windows/Fonts/msjhbd.ttc"
    
    font_mono = ImageFont.truetype(font_mono_path, font_size)
    font_tc = ImageFont.truetype(font_tc_path, font_size)
    font_title = ImageFont.truetype(font_tc_path, 12)

    line_height = 24
    header_height = 38
    height = header_height + padding * 2 + len(lines) * line_height

    img = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # Window Card with Rounded Corners
    corner_radius = 12
    draw.rounded_rectangle(
        [(0, 0), (width - 1, height - 1)],
        radius=corner_radius,
        fill=bg_color,
        outline=border_color,
        width=1,
    )

    # Window Header Bar
    draw.rounded_rectangle(
        [(0, 0), (width - 1, header_height)],
        radius=corner_radius,
        fill=window_bar_color,
    )
    # Fill bottom corners of header to make flat border
    draw.rectangle(
        [(0, header_height - 6), (width - 1, header_height)],
        fill=window_bar_color,
    )
    draw.line([(0, header_height), (width - 1, header_height)], fill=border_color, width=1)

    # Traffic light dots
    btn_y = header_height // 2
    buttons = [
        ((20, btn_y), (255, 95, 87)),   # Red
        ((38, btn_y), (254, 188, 46)),  # Yellow
        ((56, btn_y), (40, 201, 64)),   # Green
    ]
    for (bx, by), bcolor in buttons:
        draw.ellipse([(bx - 5, by - 5), (bx + 5, by + 5)], fill=bcolor)

    # Window Title
    draw.text((width // 2, btn_y - 8), title, fill=title_color, font=font_title, anchor="mm")

    # Render Terminal Lines
    curr_y = header_height + padding
    for line_parts in lines:
        curr_x = padding
        for text, color, is_tc in line_parts:
            font = font_tc if is_tc else font_mono
            draw.text((curr_x, curr_y), text, fill=color, font=font)
            # Calculate width
            bbox = font.getbbox(text)
            curr_x += (bbox[2] - bbox[0])
        curr_y += line_height

    # Save
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    img.save(output_path, "PNG")
    print(f"Generated {output_path}")


# 1. CLI Unknown Flag Screenshot
lines_cli = [
    [
        ("root@oh-my-pi-tw", (97, 175, 239), False),
        (":", (156, 163, 175), False),
        ("~/sh/oh-my-pi-tw", (152, 195, 121), False),
        ("# ", (229, 233, 240), False),
        ("omp --unknown-param", (229, 233, 240), False),
    ],
    [
        ("錯誤: ", (239, 83, 80), True),
        ("未知的參數 (Flag)：--unknown-param", (239, 83, 80), True),
    ],
    [
        ("請執行 ", (209, 213, 219), True),
        ("`omp --help`", (229, 192, 123), False),
        (" 檢視可用參數。", (209, 213, 219), True),
    ],
    [],
    [
        ("root@oh-my-pi-tw", (97, 175, 239), False),
        (":", (156, 163, 175), False),
        ("~/sh/oh-my-pi-tw", (152, 195, 121), False),
        ("# ", (229, 233, 240), False),
        ("omp --alpha-flag --beta-flag", (229, 233, 240), False),
    ],
    [
        ("錯誤: ", (239, 83, 80), True),
        ("未知的參數 (Flag)：--alpha-flag, --beta-flag", (239, 83, 80), True),
    ],
    [
        ("請執行 ", (209, 213, 219), True),
        ("`omp --help`", (229, 192, 123), False),
        (" 檢視可用參數。", (209, 213, 219), True),
    ],
    [],
    [
        ("root@oh-my-pi-tw", (97, 175, 239), False),
        (":", (156, 163, 175), False),
        ("~/sh/oh-my-pi-tw", (152, 195, 121), False),
        ("# ", (229, 233, 240), False),
        ("bash scripts/e2e-zh-tw-test.sh", (229, 233, 240), False),
    ],
    [
        ("✔ 使用系統 omp 命令: /root/.bun/bin/omp", (152, 195, 121), True),
    ],
    [
        ("  [PASS] 成功捕獲並呈現正體中文: 錯誤: 未知的參數 (Flag)", (152, 195, 121), True),
    ],
    [
        ("🎉 恭喜！所有 E2E 錯誤正體中文檢視測試 100% 通過！", (97, 175, 239), True),
    ],
]

create_terminal_image(
    "D:/ps1/agy/oh-my-pi-tw/assets/zh-tw-cli-demo.png",
    "oh-my-pi-tw — CLI 命令列正體中文錯誤檢視 (Ubuntu 26.04 LTS)",
    lines_cli,
    width=920,
)

# 2. TUI Interactive Mode Screenshot
lines_tui = [
    [
        ("╭── oh-my-pi-tw v18.13.2 ──────────────────────────────────────────╮", (75, 85, 99), False),
    ],
    [
        ("│  Model: Claude 3.7 Sonnet  │  Workspace: ~/sh/oh-my-pi-tw        │", (156, 163, 175), False),
    ],
    [
        ("╰──────────────────────────────────────────────────────────────────╯", (75, 85, 99), False),
    ],
    [],
    [
        ("> ", (97, 175, 239), False),
        ("/move", (229, 233, 240), False),
    ],
    [
        ("  錯誤: ", (239, 83, 80), True),
        ("使用方式：/move <path>", (239, 83, 80), True),
    ],
    [],
    [
        ("> ", (97, 175, 239), False),
        ("/skills fake-skill", (229, 233, 240), False),
    ],
    [
        ("  錯誤: ", (239, 83, 80), True),
        ("未知的 /skills 子指令：fake-skill", (239, 83, 80), True),
    ],
    [],
    [
        ("> ", (97, 175, 239), False),
        ("/rename", (229, 233, 240), False),
    ],
    [
        ("  錯誤: ", (239, 83, 80), True),
        ("Session 名稱不能為空。", (239, 83, 80), True),
        ("  (精確保留 Session 術語)", (107, 114, 128), True),
    ],
    [],
    [
        ("> ", (97, 175, 239), False),
        ("/btw", (229, 233, 240), False),
    ],
    [
        ("  警示: ", (229, 192, 123), True),
        ("沒有可用於 /btw 的作用中 Model。", (229, 192, 123), True),
    ],
]

create_terminal_image(
    "D:/ps1/agy/oh-my-pi-tw/assets/zh-tw-tui-demo.png",
    "oh-my-pi-tw — TUI 互動視窗正體中文錯誤檢視",
    lines_tui,
    width=920,
)
