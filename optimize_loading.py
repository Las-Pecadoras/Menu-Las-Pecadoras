import re

filepath = r'c:\Users\jesus\Downloads\LAS-PECADORAS-WEB\LAS-PECADORAS-WEB\index.html'

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Add decoding="async" to all <img> tags if not present
def add_decoding(match):
    img_tag = match.group(0)
    if 'decoding=' not in img_tag:
        return img_tag.replace('<img ', '<img decoding="async" ')
    return img_tag

content = re.sub(r'<img\s+[^>]+>', add_decoding, content, flags=re.IGNORECASE)

# Add loading="lazy" to all <img> tags if not present, UNLESS it's the logo or cantarito
def add_lazy(match):
    img_tag = match.group(0)
    if 'loading=' not in img_tag:
        if 'logo_pecadoras' in img_tag or 'cantaritos' in img_tag:
            # For important above-the-fold images, we add fetchpriority="high" if it's the logo
            if 'logo_pecadoras' in img_tag and 'fetchpriority=' not in img_tag:
                return img_tag.replace('<img ', '<img fetchpriority="high" loading="eager" ')
            return img_tag
        else:
            return img_tag.replace('<img ', '<img loading="lazy" ')
    return img_tag

content = re.sub(r'<img\s+[^>]+>', add_lazy, content, flags=re.IGNORECASE)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
print("Image loading attributes updated successfully!")
