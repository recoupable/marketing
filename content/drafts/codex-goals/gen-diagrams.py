#!/usr/bin/env python3
"""Generate article diagrams using the Recoup design system."""

from PIL import Image, ImageDraw, ImageFont
import os

# === DESIGN SYSTEM TOKENS ===
BG = "#0a0a0a"
FG = "#ededed"
MUTED = "#151515"
MUTED_FG = "#a0a0a0"
BORDER = "#222222"
SECONDARY = "#1a1a1a"
SUCCESS = "#22c55e"
DESTRUCTIVE = "#ef4444"
INFO = "#0070f3"

# Font paths
FONT_DIR = os.path.expanduser("~/Documents/projects/mono/marketing/design/fonts")
PIXEL = os.path.join(FONT_DIR, "GeistPixel/ttf/GeistPixel-Square.ttf")
GEIST = os.path.join(FONT_DIR, "Geist/ttf/Geist-Regular.ttf")
GEIST_BOLD = os.path.join(FONT_DIR, "Geist/ttf/Geist-Bold.ttf")
GEIST_SEMI = os.path.join(FONT_DIR, "Geist/ttf/Geist-SemiBold.ttf")
JAKARTA = os.path.join(FONT_DIR, "PlusJakartaSans/PlusJakartaSans-Regular.ttf")
JAKARTA_SEMI = os.path.join(FONT_DIR, "PlusJakartaSans/PlusJakartaSans-SemiBold.ttf")
JAKARTA_BOLD = os.path.join(FONT_DIR, "PlusJakartaSans/PlusJakartaSans-Bold.ttf")
INSTRUMENT = os.path.join(FONT_DIR, "Instrument_Serif/InstrumentSerif-Italic.ttf")

def hex_to_rgb(h):
    h = h.lstrip("#")
    return tuple(int(h[i:i+2], 16) for i in (0, 2, 4))

def load_font(path, size):
    try:
        return ImageFont.truetype(path, size)
    except Exception:
        return ImageFont.load_default()

def rounded_rect(draw, xy, fill=None, outline=None, width=1, radius=12):
    """Draw a rounded rectangle."""
    x0, y0, x1, y1 = xy
    if fill:
        draw.rounded_rectangle(xy, radius=radius, fill=fill)
    if outline:
        draw.rounded_rectangle(xy, radius=radius, outline=outline, width=width)

def shadow_border_rect(draw, xy, fill=None, border_color=None, radius=12, border_width=1):
    """Emulate shadow-as-border with a filled rect and thin outline."""
    if fill:
        rounded_rect(draw, xy, fill=fill, radius=radius)
    if border_color:
        rounded_rect(draw, xy, outline=border_color, width=border_width, radius=radius)


# =========================================================
# DIAGRAM 1: PROMPTS vs GOALS
# =========================================================
def gen_prompt_vs_goal():
    W, H = 3200, 1800
    img = Image.new("RGB", (W, H), hex_to_rgb(BG))
    d = ImageDraw.Draw(img)

    # Fonts
    f_title = load_font(PIXEL, 80)
    f_subtitle = load_font(GEIST, 36)
    f_section_title = load_font(PIXEL, 52)
    f_section_sub = load_font(GEIST, 28)
    f_label = load_font(JAKARTA_SEMI, 28)
    f_body = load_font(GEIST, 30)
    f_body_sm = load_font(GEIST, 26)
    f_accent = load_font(PIXEL, 24)
    f_big_num = load_font(PIXEL, 64)
    f_stat_label = load_font(GEIST, 24)
    f_vs = load_font(PIXEL, 48)

    fg = hex_to_rgb(FG)
    muted_fg = hex_to_rgb(MUTED_FG)
    border = hex_to_rgb(BORDER)
    secondary = hex_to_rgb(SECONDARY)
    destructive = hex_to_rgb(DESTRUCTIVE)
    success = hex_to_rgb(SUCCESS)
    info = hex_to_rgb(INFO)

    # Title
    d.text((W//2, 80), "PROMPTS VS GOALS", font=f_title, fill=fg, anchor="mt")
    d.text((W//2, 170), "Two ways to work with AI agents", font=f_subtitle, fill=muted_fg, anchor="mt")

    # Divider
    for y in range(220, 1750, 16):
        d.line([(W//2, y), (W//2, y+8)], fill=border, width=2)

    # LEFT: Prompt-based
    shadow_border_rect(d, (60, 220, 1540, 1740), fill=secondary, border_color=border, radius=16)

    d.text((800, 270), "PROMPT-BASED", font=f_section_title, fill=destructive, anchor="mt")
    d.text((800, 335), "Turn-based: you're the bottleneck", font=f_section_sub, fill=hex_to_rgb("#6b4444"), anchor="mt")

    # Flow boxes
    steps = [
        ("YOU", '"Rewrite this function"', True),
        ("AI", "Rewrites function. Waits.", False),
        ("YOU", '"Ok, what\'s next?"', True),
        ("AI", "Suggests next step. Waits.", False),
        ("YOU", '"Do it."', True),
    ]
    
    y_start = 400
    box_w, box_h = 520, 100
    x_center = 500
    
    for i, (role, text, is_human) in enumerate(steps):
        bx = x_center - box_w//2
        by = y_start + i * 140
        
        role_color = destructive if is_human else muted_fg
        border_c = hex_to_rgb("#331111") if is_human else border
        
        shadow_border_rect(d, (bx, by, bx+box_w, by+box_h), 
                          fill=hex_to_rgb("#111111"), border_color=border_c, radius=12)
        
        icon = "👤" if is_human else "🤖"
        d.text((bx+24, by+20), role, font=f_label, fill=role_color)
        d.text((bx+24, by+58), text, font=f_body_sm, fill=fg)
        
        if i < len(steps) - 1:
            arrow_y = by + box_h + 10
            d.polygon([(x_center-8, arrow_y), (x_center+8, arrow_y), 
                       (x_center, arrow_y+20)], fill=destructive)
    
    # "repeat" text
    d.text((x_center, y_start + 5*140 - 20), "∞ repeat until done...", 
           font=f_body, fill=hex_to_rgb("#553333"), anchor="mt")

    # Problem box
    prob_x, prob_y = 900, 500
    shadow_border_rect(d, (prob_x, prob_y, prob_x+560, prob_y+340), 
                      fill=hex_to_rgb("#111111"), border_color=border, radius=12)
    d.text((prob_x+280, prob_y+32), "THE PROBLEM", font=f_accent, fill=destructive, anchor="mt")
    
    problems = [
        "Requires constant attention",
        "Work stops when you leave",
        "You manage every step",
        "Doesn't scale with complexity",
    ]
    for j, prob in enumerate(problems):
        d.text((prob_x+40, prob_y+90+j*56), f"• {prob}", font=f_body_sm, fill=muted_fg)

    # RIGHT: Goal-based
    shadow_border_rect(d, (1660, 220, 3140, 1740), fill=secondary, border_color=border, radius=16)

    d.text((2400, 270), "GOAL-BASED", font=f_section_title, fill=success, anchor="mt")
    d.text((2400, 335), "Outcome-driven: AI drives toward done", font=f_section_sub, fill=hex_to_rgb("#2a5e4e"), anchor="mt")

    # Goal flow — centered in right panel
    goal_x = 2400
    gbox_w = 600
    
    # Step 1: Define goal (human)
    gy = 400
    shadow_border_rect(d, (goal_x-gbox_w//2, gy, goal_x+gbox_w//2, gy+140),
                      fill=hex_to_rgb("#111111"), border_color=success, radius=12)
    d.text((goal_x-gbox_w//2+24, gy+18), "YOU (once)", font=f_label, fill=success)
    d.text((goal_x-gbox_w//2+24, gy+56), '"P95 latency below 200ms.', font=f_body_sm, fill=fg)
    d.text((goal_x-gbox_w//2+24, gy+86), 'Verify with checkout benchmark.', font=f_body_sm, fill=fg)
    d.text((goal_x-gbox_w//2+24, gy+116), 'Keep correctness suite green."', font=f_body_sm, fill=fg)
    
    # Arrow
    d.polygon([(goal_x-8, gy+150), (goal_x+8, gy+150), (goal_x, gy+170)], fill=success)

    # Step 2: Execute
    gy2 = 580
    shadow_border_rect(d, (goal_x-gbox_w//2, gy2, goal_x+gbox_w//2, gy2+80),
                      fill=hex_to_rgb("#111111"), border_color=border, radius=12)
    d.text((goal_x-gbox_w//2+24, gy2+26), "Execute — plan approach, make changes", font=f_body_sm, fill=fg)
    
    d.polygon([(goal_x-8, gy2+90), (goal_x+8, gy2+90), (goal_x, gy2+110)], fill=success)

    # Step 3: Verify
    gy3 = 700
    shadow_border_rect(d, (goal_x-gbox_w//2, gy3, goal_x+gbox_w//2, gy3+80),
                      fill=hex_to_rgb("#111111"), border_color=border, radius=12)
    d.text((goal_x-gbox_w//2+24, gy3+26), "Verify — run benchmark, check tests", font=f_body_sm, fill=fg)
    
    d.polygon([(goal_x-8, gy3+90), (goal_x+8, gy3+90), (goal_x, gy3+110)], fill=success)

    # Step 4: Decide
    gy4 = 820
    shadow_border_rect(d, (goal_x-gbox_w//2, gy4, goal_x+gbox_w//2, gy4+80),
                      fill=hex_to_rgb("#111111"), border_color=border, radius=12)
    d.text((goal_x-gbox_w//2+24, gy4+26), "Decide — met criteria? Next step?", font=f_body_sm, fill=fg)
    
    # Loop arrow back to Execute
    loop_x = goal_x + gbox_w//2 + 50
    loop_top = gy2 + 40
    loop_bot = gy4 + 40
    d.line([(loop_x, loop_bot), (loop_x, loop_top)], fill=success, width=3)
    d.line([(loop_x, loop_top), (goal_x + gbox_w//2 + 5, loop_top)], fill=success, width=3)
    ax = goal_x + gbox_w//2 + 5
    d.polygon([(ax, loop_top-8), (ax, loop_top+8), (ax-15, loop_top)], fill=success)
    d.text((loop_x+15, (loop_top+loop_bot)//2), "LOOP", font=f_accent, fill=success, anchor="lm")

    # Arrow to Goal Met
    d.polygon([(goal_x-8, gy4+90), (goal_x+8, gy4+90), (goal_x, gy4+110)], fill=success)

    # Goal Met pill
    met_y = 940
    met_w = 360
    shadow_border_rect(d, (goal_x-met_w//2, met_y, goal_x+met_w//2, met_y+80),
                      fill=hex_to_rgb("#0a1a14"), border_color=success, radius=40, border_width=2)
    d.text((goal_x, met_y+40), "GOAL MET", font=f_label, fill=success, anchor="mm")

    # Arrow to review
    d.polygon([(goal_x-8, met_y+90), (goal_x+8, met_y+90), (goal_x, met_y+110)], fill=success)
    
    # Review
    rev_y = met_y + 120
    shadow_border_rect(d, (goal_x-gbox_w//2, rev_y, goal_x+gbox_w//2, rev_y+80),
                      fill=hex_to_rgb("#111111"), border_color=success, radius=12)
    d.text((goal_x-gbox_w//2+24, rev_y+26), "Review final result", font=f_body, fill=fg)

    # Result stat — positioned below the review box, not overlapping
    stat_x = 1740
    stat_y_top = 600
    shadow_border_rect(d, (stat_x, stat_y_top, stat_x+220, stat_y_top+340),
                      fill=hex_to_rgb("#111111"), border_color=border, radius=12)
    d.text((stat_x+110, stat_y_top+30), "RESULT", font=f_accent, fill=success, anchor="mt")
    d.text((stat_x+110, stat_y_top+100), "2x", font=f_big_num, fill=success, anchor="mt")
    d.text((stat_x+110, stat_y_top+190), "attention", font=f_stat_label, fill=muted_fg, anchor="mt")
    d.text((stat_x+110, stat_y_top+220), "needed", font=f_stat_label, fill=muted_fg, anchor="mt")
    d.text((stat_x+110, stat_y_top+270), "define +", font=f_stat_label, fill=hex_to_rgb("#444444"), anchor="mt")
    d.text((stat_x+110, stat_y_top+300), "review", font=f_stat_label, fill=hex_to_rgb("#444444"), anchor="mt")

    # Bottom comparison
    shadow_border_rect(d, (160, 1480, 640, 1660), 
                      fill=hex_to_rgb("#111111"), border_color=hex_to_rgb("#331111"), radius=12)
    d.text((400, 1530), "Dozens of prompts", font=f_label, fill=destructive, anchor="mt")
    d.text((400, 1580), "Hours of supervision", font=f_body_sm, fill=muted_fg, anchor="mt")

    d.text((W//2, 1570), "VS", font=f_vs, fill=hex_to_rgb("#333333"), anchor="mm")

    shadow_border_rect(d, (2160, 1480, 2640, 1660),
                      fill=hex_to_rgb("#111111"), border_color=hex_to_rgb("#113322"), radius=12)
    d.text((2400, 1530), "One goal", font=f_label, fill=success, anchor="mt")
    d.text((2400, 1580), "Walk away for 6 hours", font=f_body_sm, fill=muted_fg, anchor="mt")

    out = os.path.expanduser("~/.openclaw/workspace/drafts/codex-goals-screenshots/web-images/08-prompt-vs-goal-v2.png")
    img.save(out, "PNG")
    print(f"Saved: {out}")


# =========================================================
# DIAGRAM 2: 6-PART GOAL FRAMEWORK
# =========================================================
def gen_goal_framework():
    W, H = 3200, 1800
    img = Image.new("RGB", (W, H), hex_to_rgb(BG))
    d = ImageDraw.Draw(img)

    f_title = load_font(PIXEL, 72)
    f_subtitle = load_font(GEIST, 34)
    f_num = load_font(PIXEL, 48)
    f_part_title = load_font(JAKARTA_BOLD, 36)
    f_desc = load_font(GEIST, 28)
    f_example = load_font(INSTRUMENT, 26)
    f_quote = load_font(JAKARTA_SEMI, 32)
    f_quote_body = load_font(GEIST, 28)
    f_section = load_font(JAKARTA_SEMI, 30)
    f_bullet = load_font(GEIST, 26)
    f_accent = load_font(PIXEL, 22)

    fg = hex_to_rgb(FG)
    muted_fg = hex_to_rgb(MUTED_FG)
    border = hex_to_rgb(BORDER)

    # Title
    d.text((W//2, 70), "WRITING A GOOD GOAL", font=f_title, fill=fg, anchor="mt")
    d.text((W//2, 155), "The 6-part framework — it's an OKR for your AI agent", font=f_subtitle, fill=muted_fg, anchor="mt")

    # 6 cards in 3×2 grid
    # Each card gets a top accent line color from the design system functional palette
    # Using only achromatic + functional colors (no warm colors per design system rules)
    card_colors = [
        fg,                        # 1 - white accent
        hex_to_rgb(INFO),          # 2 - info blue
        hex_to_rgb(DESTRUCTIVE),   # 3 - red
        hex_to_rgb(SUCCESS),       # 4 - green
        hex_to_rgb(INFO),          # 5 - blue
        fg,                        # 6 - white
    ]
    
    parts = [
        ("1", "OUTCOME", "What should be true when done?",
         ['"P95 checkout latency below 200ms"', '"All bulk emails categorized and labeled"']),
        ("2", "VERIFICATION", "How do you test it?",
         ['"Run the checkout benchmark suite"', '"Count uncategorized emails = 0"']),
        ("3", "CONSTRAINTS", "What can't break?",
         ['"Keep the correctness suite green"', '"Don\'t delete important emails"']),
        ("4", "BOUNDARIES", "What tools and files are in scope?",
         ['"Only modify files in /src/checkout/"', '"Use Gmail MCP plugin, no external APIs"']),
        ("5", "ITERATION POLICY", "How should AI decide what to try next?",
         ['"Profile first, then optimize hottest path"', '"Process newest emails first"']),
        ("6", "STOP CONDITION", "When should it give up and ask for help?",
         ['"After 3 failed approaches, ask for help"', '"Flag emails that need human judgment"']),
    ]

    card_w = 960
    card_h = 300
    gap = 40
    start_x = (W - 3*card_w - 2*gap) // 2
    start_y = 220

    for i, (num, title, desc, examples) in enumerate(parts):
        col = i % 3
        row = i // 3
        x = start_x + col * (card_w + gap)
        y = start_y + row * (card_h + gap)
        
        color = card_colors[i]
        
        # Card bg
        shadow_border_rect(d, (x, y, x+card_w, y+card_h),
                          fill=hex_to_rgb(SECONDARY), border_color=border, radius=12)
        # Top accent line
        d.rounded_rectangle((x, y, x+card_w, y+8), radius=4, fill=color)
        
        # Number circle
        cx, cy = x+50, y+70
        d.ellipse((cx-28, cy-28, cx+28, cy+28), outline=color, width=2)
        d.text((cx, cy), num, font=f_num, fill=color, anchor="mm")
        
        # Title
        d.text((cx+45, cy), title, font=f_part_title, fill=color, anchor="lm")
        
        # Description
        d.text((x+30, y+120), desc, font=f_desc, fill=fg)
        
        # Examples (italic)
        for j, ex in enumerate(examples):
            d.text((x+30, y+170+j*42), ex, font=f_example, fill=muted_fg)

    # Bottom insight box
    box_y = start_y + 2*(card_h+gap) + 20
    shadow_border_rect(d, (320, box_y, 2880, box_y+180),
                      fill=hex_to_rgb(SECONDARY), border_color=border, radius=16)
    
    d.text((W//2, box_y+45), "This is a spec, not a chat message.", 
           font=f_quote, fill=fg, anchor="mt")
    d.text((W//2, box_y+95), "Writing good goals is closer to writing good tickets than writing good prompts.", 
           font=f_quote_body, fill=muted_fg, anchor="mt")
    d.text((W//2, box_y+135), "Product managers already know this — it's an OKR for an AI agent.", 
           font=f_quote_body, fill=muted_fg, anchor="mt")

    # When to use: two boxes
    when_y = box_y + 220
    
    # Full framework
    shadow_border_rect(d, (120, when_y, 1540, when_y+300),
                      fill=hex_to_rgb(SECONDARY), border_color=hex_to_rgb(DESTRUCTIVE), 
                      radius=12, border_width=1)
    d.text((160, when_y+30), "USE ALL 6 PARTS WHEN:", font=f_section, fill=hex_to_rgb(DESTRUCTIVE))
    bullets_left = [
        "Complex problems with many failure modes",
        "Multiple things could break",
        "Success isn't obvious to verify",
    ]
    for j, b in enumerate(bullets_left):
        d.text((160, when_y+85+j*45), f"• {b}", font=f_bullet, fill=fg)
    d.text((160, when_y+240), 'Example: "Eliminate all errors on /api/chat/v2 endpoint"', 
           font=f_example, fill=muted_fg)

    # Simple goal
    shadow_border_rect(d, (1660, when_y, 3080, when_y+300),
                      fill=hex_to_rgb(SECONDARY), border_color=hex_to_rgb(SUCCESS), 
                      radius=12, border_width=1)
    d.text((1700, when_y+30), "A SENTENCE WORKS WHEN:", font=f_section, fill=hex_to_rgb(SUCCESS))
    bullets_right = [
        "The finish line is obvious",
        "Natural stopping point exists",
        "Hard to break anything important",
    ]
    for j, b in enumerate(bullets_right):
        d.text((1700, when_y+85+j*45), f"• {b}", font=f_bullet, fill=fg)
    d.text((1700, when_y+240), 'Example: "Categorize all emails. Unsubscribe from junk."', 
           font=f_example, fill=muted_fg)

    out = os.path.expanduser("~/.openclaw/workspace/drafts/codex-goals-screenshots/web-images/09-goal-framework-v2.png")
    img.save(out, "PNG")
    print(f"Saved: {out}")


# =========================================================
# DIAGRAM 3: EMAIL EXPERIMENT
# =========================================================
def gen_email_results():
    W, H = 3200, 1800
    img = Image.new("RGB", (W, H), hex_to_rgb(BG))
    d = ImageDraw.Draw(img)

    f_title = load_font(PIXEL, 72)
    f_subtitle = load_font(GEIST, 34)
    f_accent = load_font(PIXEL, 24)
    f_label = load_font(JAKARTA_SEMI, 28)
    f_body = load_font(GEIST, 30)
    f_goal = load_font(INSTRUMENT, 34)
    f_big = load_font(PIXEL, 80)
    f_stat_num = load_font(PIXEL, 72)
    f_stat_label = load_font(GEIST, 26)
    f_stat_sub = load_font(GEIST, 22)
    f_insight = load_font(JAKARTA_SEMI, 30)
    f_insight_body = load_font(GEIST, 28)

    fg = hex_to_rgb(FG)
    muted_fg = hex_to_rgb(MUTED_FG)
    border = hex_to_rgb(BORDER)
    success = hex_to_rgb(SUCCESS)
    destructive = hex_to_rgb(DESTRUCTIVE)
    info = hex_to_rgb(INFO)

    # Title
    d.text((W//2, 70), "THE EMAIL EXPERIMENT", font=f_title, fill=fg, anchor="mt")
    d.text((W//2, 155), "One goal. One sentence. 3 hours and 52 minutes.", font=f_subtitle, fill=muted_fg, anchor="mt")

    # Goal quote box
    shadow_border_rect(d, (300, 220, 2900, 350), 
                      fill=hex_to_rgb(SECONDARY), border_color=success, radius=12)
    d.text((340, 250), "THE GOAL:", font=f_accent, fill=success)
    d.text((340, 295), '"Categorize all bulk/promotion/spam emails. Unsubscribe from unnecessary emails', 
           font=f_goal, fill=fg)

    # Before bar — achromatic with functional color accent
    bar_y = 420
    d.text((200, bar_y), "BEFORE", font=f_accent, fill=fg)
    
    # Full-width bar for 3900 — uses foreground (white) on secondary bg
    bar_w = 2600
    d.rounded_rectangle((200, bar_y+40, 200+bar_w, bar_y+140), radius=12, fill=hex_to_rgb("#1a1a1a"))
    d.rounded_rectangle((200, bar_y+40, 200+bar_w, bar_y+46), radius=3, fill=fg)  # top accent line
    d.text((200+bar_w//2, bar_y+92), "3,900 EMAILS", font=f_big, fill=fg, anchor="mm")

    # Arrow
    d.text((W//2, bar_y+180), "↓", font=f_big, fill=success, anchor="mt")

    # After bar
    after_y = bar_y + 280
    d.text((200, after_y), "AFTER", font=f_accent, fill=success)
    
    # Tiny bar for 68
    after_bar_w = int(bar_w * 68 / 3900)  # proportional
    d.rounded_rectangle((200, after_y+40, 200+after_bar_w, after_y+140), radius=12, fill=success)
    d.text((200+after_bar_w+30, after_y+90), "68 EMAILS", font=f_big, fill=success, anchor="lm")

    # Stats row
    stat_y = after_y + 220
    stats = [
        ("98.3%", "emails processed", "automatically", fg),
        ("3H 52M", "total runtime", "zero human involvement", info),
        ("~6M", "tokens consumed", "via Gmail MCP plugin", muted_fg),
        ("68", "needed human", "judgment", success),
    ]
    
    stat_w = 680
    stat_gap = 40
    stat_start_x = (W - 4*stat_w - 3*stat_gap) // 2
    
    for i, (num, label, sub, color) in enumerate(stats):
        sx = stat_start_x + i * (stat_w + stat_gap)
        shadow_border_rect(d, (sx, stat_y, sx+stat_w, stat_y+240),
                          fill=hex_to_rgb(SECONDARY), border_color=border, radius=12)
        d.text((sx+stat_w//2, stat_y+40), num, font=f_stat_num, fill=color, anchor="mt")
        d.text((sx+stat_w//2, stat_y+140), label, font=f_stat_label, fill=muted_fg, anchor="mt")
        d.text((sx+stat_w//2, stat_y+180), sub, font=f_stat_sub, fill=hex_to_rgb("#444444"), anchor="mt")

    # Bottom insight
    ins_y = stat_y + 300
    shadow_border_rect(d, (300, ins_y, 2900, ins_y+160),
                      fill=hex_to_rgb(SECONDARY), border_color=border, radius=16)
    d.text((W//2, ins_y+40), "No 6-part framework needed. A sentence and a half worked because the", 
           font=f_insight_body, fill=fg, anchor="mt")
    d.text((W//2, ins_y+85), "finish line was obvious: count uncategorized emails → when count is low enough, you're done.", 
           font=f_insight, fill=success, anchor="mt")

    out = os.path.expanduser("~/.openclaw/workspace/drafts/codex-goals-screenshots/web-images/10-email-results-v2.png")
    img.save(out, "PNG")
    print(f"Saved: {out}")


if __name__ == "__main__":
    gen_prompt_vs_goal()
    gen_goal_framework()
    gen_email_results()
    print("All diagrams generated.")
