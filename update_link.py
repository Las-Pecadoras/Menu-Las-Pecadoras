import re

filepath = r'c:\Users\jesus\Downloads\LAS-PECADORAS-WEB\LAS-PECADORAS-WEB\index.html'

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

new_content = re.sub(
    r'https://www\.instagram\.com/colibrix\.bi[^"\']*',
    'https://hummingxbi.com',
    content
)

if new_content != content:
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Link updated successfully!")
else:
    print("Link not found or already updated.")
