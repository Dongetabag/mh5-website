#!/usr/bin/env python3
"""
Create MH5 Logo as PNG with transparent background
"""

from PIL import Image, ImageDraw, ImageFont
import os

def create_mh5_logo():
    # Create a transparent image
    # Use high resolution for quality
    width, height = 800, 800
    img = Image.new('RGBA', (width, height), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Try to use Oswald Bold font (matches homepage titles)
    try:
        # Try to download Oswald font from Google Fonts, or use system fonts
        import urllib.request
        
        # Try common Oswald font locations
        font_paths = [
            # macOS Oswald locations
            '/System/Library/Fonts/Supplemental/Oswald-Bold.ttf',
            '/Library/Fonts/Oswald-Bold.ttf',
            # Try downloading from Google Fonts
            'https://github.com/google/fonts/raw/main/ofl/oswald/Oswald%5Bwght%5D.ttf',
            # Fallback to similar bold sans-serif
            '/System/Library/Fonts/Helvetica.ttc',
            '/System/Library/Fonts/Arial Bold.ttf',
            'C:/Windows/Fonts/arialbd.ttf',
        ]
        
        font = None
        
        # Try system font paths first
        for path in font_paths[:2]:
            if os.path.exists(path):
                try:
                    font = ImageFont.truetype(path, 400)
                    print(f"Using Oswald font from: {path}")
                    break
                except:
                    continue
        
        # If not found, try downloading Oswald
        if font is None:
            try:
                oswald_path = os.path.join(os.path.dirname(__file__), 'Oswald-VariableFont_wght.ttf')
                if not os.path.exists(oswald_path):
                    print("Downloading Oswald font from Google Fonts...")
                    urllib.request.urlretrieve(
                        'https://github.com/google/fonts/raw/main/ofl/oswald/Oswald%5Bwght%5D.ttf',
                        oswald_path
                    )
                font = ImageFont.truetype(oswald_path, 400)
                print(f"Using downloaded Oswald font")
            except Exception as e:
                print(f"Could not download Oswald: {e}")
                # Try fallback fonts
                for path in font_paths[3:]:
                    if os.path.exists(path):
                        try:
                            font = ImageFont.truetype(path, 400)
                            print(f"Using fallback font: {path}")
                            break
                        except:
                            continue
        
        if font is None:
            font = ImageFont.load_default()
            print("Using default font - text may appear smaller")
            
    except Exception as e:
        print(f"Font loading issue: {e}")
        font = ImageFont.load_default()
    
    # Draw "MH5" text in white
    text = "MH5"
    text_color = (255, 255, 255, 255)  # White, fully opaque
    
    # Get text bounding box to center it
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    
    # Center the text
    x = (width - text_width) / 2 - bbox[0]
    y = (height - text_height) / 2 - bbox[1]
    
    # Draw the text
    draw.text((x, y), text, fill=text_color, font=font)
    
    # Save as PNG with transparency
    output_path = os.path.join(os.path.dirname(__file__), '..', 'public', 'images', 'mh5-logo.png')
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    img.save(output_path, 'PNG')
    
    print(f"✅ Logo created: {output_path}")
    print(f"   Size: {width}x{height}px")
    print(f"   Format: PNG with transparent background")
    
    return output_path

if __name__ == '__main__':
    create_mh5_logo()

