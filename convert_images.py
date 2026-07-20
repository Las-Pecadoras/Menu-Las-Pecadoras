import os
from PIL import Image

assets_dir = r"c:\Users\jesus\Downloads\LAS-PECADORAS-WEB\LAS-PECADORAS-WEB\assets\img"

for root, dirs, files in os.walk(assets_dir):
    for file in files:
        if file.lower().endswith(('.png', '.jpg', '.jpeg')):
            file_path = os.path.join(root, file)
            webp_path = os.path.splitext(file_path)[0] + ".webp"
            try:
                with Image.open(file_path) as img:
                    img.save(webp_path, "webp", optimize=True)
                print(f"Converted {file} to webp")
                os.remove(file_path)
            except Exception as e:
                print(f"Failed to convert {file}: {e}")
