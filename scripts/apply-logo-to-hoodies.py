#!/usr/bin/env python3

"""
MH5 Hoodie Logo Application Script
Uses design specs from Gemini to apply MH5 logo to hoodie images
Requires: Pillow (PIL) library
Install: pip install Pillow
"""

import json
import os
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import sys

# Configuration
HOODIE_FOLDER = Path('/Users/simeonreid/Downloads/Snow Wash Fleece Oversize Hoodie_gallery')
DESIGN_SPECS_FILE = Path(__file__).parent.parent / 'public' / 'images' / 'hoodie-designs' / 'design-specs.json'
OUTPUT_FOLDER = Path(__file__).parent.parent / 'public' / 'images' / 'hoodie-designs' / 'designed-hoodies'
LOGO_COLOR = (125, 249, 255)  # Neon Cyan #7DF9FF in RGB

def create_mh5_logo_text(size_pixels):
    """Create MH5 logo as text image"""
    # Create a transparent image for the logo
    logo_img = Image.new('RGBA', (size_pixels, size_pixels // 2), (0, 0, 0, 0))
    draw = ImageDraw.Draw(logo_img)
    
    try:
        # Try to use a bold system font
        font_size = size_pixels // 3
        font = ImageFont.truetype('/System/Library/Fonts/Helvetica.ttc', font_size)
    except:
        try:
            font = ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial Bold.ttf', font_size)
        except:
            # Fallback to default font
            font = ImageFont.load_default()
    
    # Draw "MH5" text
    text = "MH5"
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    
    # Center the text
    x = (size_pixels - text_width) // 2
    y = (size_pixels // 2 - text_height) // 2
    
    # Draw text with neon cyan color
    draw.text((x, y), text, fill=LOGO_COLOR + (255,), font=font)
    
    return logo_img

def apply_logo_to_image(image_path, design_spec, output_path):
    """Apply MH5 logo to hoodie image based on design spec"""
    try:
        # Load the hoodie image
        hoodie_img = Image.open(image_path).convert('RGBA')
        img_width, img_height = hoodie_img.size
        
        # Get coordinates from design spec
        coords = design_spec.get('coordinates', {})
        top_pct = float(coords.get('top', '0').replace('%', ''))
        left_pct = float(coords.get('left', '0').replace('%', ''))
        width_pct = float(coords.get('width', '15').replace('%', ''))
        height_pct = float(coords.get('height', '5').replace('%', ''))
        
        # Calculate pixel positions
        logo_width = int(img_width * width_pct / 100)
        logo_height = int(img_height * height_pct / 100)
        
        # Create logo at the specified size
        logo = create_mh5_logo_text(max(logo_width, logo_height * 2))
        
        # Resize logo to fit the specified dimensions
        logo = logo.resize((logo_width, logo_height), Image.Resampling.LANCZOS)
        
        # Calculate position
        left = int(img_width * left_pct / 100)
        top = int(img_height * top_pct / 100)
        
        # Paste logo onto hoodie (with transparency)
        hoodie_img.paste(logo, (left, top), logo)
        
        # Convert back to RGB for saving as JPEG
        final_img = hoodie_img.convert('RGB')
        final_img.save(output_path, 'PNG', quality=95)
        
        return True
    except Exception as e:
        print(f"Error applying logo: {e}")
        return False

def main():
    print("🏀 MH5 Hoodie Logo Application")
    print("=" * 40 + "\n")
    
    # Load design specs
    if not DESIGN_SPECS_FILE.exists():
        print(f"❌ Design specs file not found: {DESIGN_SPECS_FILE}")
        print("   Please run create-hoodie-designs-v2.js first")
        sys.exit(1)
    
    with open(DESIGN_SPECS_FILE, 'r') as f:
        specs_data = json.load(f)
    
    # Create output folder
    OUTPUT_FOLDER.mkdir(parents=True, exist_ok=True)
    
    # Process each image and variant
    for image_data in specs_data:
        image_name = image_data['image']
        image_path = HOODIE_FOLDER / image_name
        
        if not image_path.exists():
            print(f"⚠️  Image not found: {image_name}")
            continue
        
        print(f"\n📷 Processing: {image_name}")
        
        for variant_data in image_data['variants']:
            if not variant_data.get('success'):
                continue
            
            variant_name = variant_data['variant']
            design_spec = variant_data.get('designSpec', {})
            
            # Create output filename
            base_name = Path(image_name).stem
            output_name = f"{base_name}-{variant_name}.png"
            output_path = OUTPUT_FOLDER / output_name
            
            print(f"   ✨ Creating {variant_name}...", end=' ')
            
            if apply_logo_to_image(image_path, design_spec, output_path):
                print("✅")
            else:
                print("❌ Failed")
    
    print(f"\n\n✅ Complete! Designs saved to: {OUTPUT_FOLDER}")
    print("\nNOTE: This script creates text-based logos. For production:")
    print("1. Create a vector logo file (SVG/AI) with proper 'MH5' design")
    print("2. Export high-resolution PNG versions at various sizes")
    print("3. Use those logo files instead of the text-based approach")
    print("4. Apply using the coordinates from design specs")

if __name__ == '__main__':
    main()

