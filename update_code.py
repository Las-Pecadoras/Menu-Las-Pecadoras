import os
import re

def update_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the link related to hummingx / colibri
    # Let's see if we can find something like "hummingx" in the file
    links = re.findall(r'href=["\']([^"\']+)["\']', content)
    for link in links:
        if 'humming' in link.lower() or 'colibri' in link.lower() or 'wa.me' not in link.lower() and 'facebook' not in link.lower() and 'instagram' not in link.lower() and 'maps' not in link.lower() and link.startswith('http'):
            print(f"Found link in {filepath}: {link}")

    # Replace image extensions
    new_content = re.sub(r'\.png|\.jpg|\.jpeg', '.webp', content, flags=re.IGNORECASE)

    # Replace hummingx link (we will aggressively look for any wrong humming link or we can just replace specific strings)
    # The user says "en la imagen clickeable donde los lleva a hummingx bi que los lleve a hummingxbi.com"
    # So there is a link currently to something else, maybe 'hummingx.com' or 'hummingx bi.com' or similar.
    # Let's replace any hummingx related domain with https://hummingxbi.com
    new_content = re.sub(r'href=["\']https?://[^"\']*hummingx[^"\']*["\']', 'href="https://hummingxbi.com"', new_content, flags=re.IGNORECASE)
    
    # Just in case it's not starting with http, but www
    new_content = re.sub(r'href=["\']www\.hummingx[^"\']*["\']', 'href="https://hummingxbi.com"', new_content, flags=re.IGNORECASE)

    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filepath}")

update_file(r'c:\Users\jesus\Downloads\LAS-PECADORAS-WEB\LAS-PECADORAS-WEB\index.html')

css_dir = r'c:\Users\jesus\Downloads\LAS-PECADORAS-WEB\LAS-PECADORAS-WEB\css'
for root, _, files in os.walk(css_dir):
    for file in files:
        if file.endswith('.css'):
            update_file(os.path.join(root, file))

