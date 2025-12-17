#!/usr/bin/env python3
"""
Create MH5 Icon Logo (M in square) as PNG with transparent background
"""

from PIL import Image, ImageDraw, ImageFont
import os

def create_mh5_icon():
    # Create a transparent image
    # Square icon like in navigation
    size = 512
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Try to use Oswald Bold font (matches homepage titles)
    try:
        import urllib.request
        
        font_paths = [
            '/System/Library/Fonts/Supplemental/Oswald-Bold.ttf',
            '/Library/Fonts/Oswald-Bold.ttf',
            '/System/Library/Fonts/Helvetica.ttc',
            '/System/Library/Fonts/Arial Bold.ttf',
            'C:/Windows/Fonts/arialbd.ttf',
        ]
        
        font = None
        
        # Try system fonts first
        for path in font_paths[:2]:
            if os.path.exists(path):
                try:
                    font = ImageFont.truetype(path, 280)
                    break
                except:
                    continue
        
        # Try downloading Oswald if not found
        if font is None:
            try:
                oswald_path = os.path.join(os.path.dirname(__file__), 'Oswald-VariableFont_wght.ttf')
                if not os.path.exists(oswald_path):
                    urllib.request.urlretrieve(
                        'https://github.com/google/fonts/raw/main/ofl/oswald/Oswald%5Bwght%5D.ttf',
                        oswald_path
                    )
                font = ImageFont.truetype(oswald_path, 280)
            except:
                for path in font_paths[2:]:
                    if os.path.exists(path):
                        try:
                            font = ImageFont.truetype(path, 280)
                            break
                        except:
                            continue
        
        if font is None:
            font = ImageFont.load_default()
    except:
        font = ImageFont.load_default()
    
    # Draw white square background
    square_size = 400
    square_x = (size - square_size) / 2
    square_y = (size - square_size) / 2
    draw.rectangle(
        [square_x, square_y, square_x + square_size, square_y + square_size],
        fill=(255, 255, 255, 255)  # White square
    )
    
    # Draw "M" text in black (centered in square)
    text = "M"
    text_color = (0, 0, 0, 255)  # Black
    
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    
    x = (size - text_width) / 2 - bbox[0]
    y = (size - text_height) / 2 - bbox[1]
    
    draw.text((x, y), text, fill=text_color, font=font)
    
    # Save as PNG
    output_path = os.path.join(os.path.dirname(__file__), '..', 'public', 'images', 'mh5-icon.png')
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    img.save(output_path, 'PNG')
    
    print(f"✅ Icon logo created: {output_path}")
    print(f"   Size: {size}x{size}px")
    print(f"   Format: PNG with transparent background")
    
    return output_path

if __name__ == '__main__':
    create_mh5_icon()

