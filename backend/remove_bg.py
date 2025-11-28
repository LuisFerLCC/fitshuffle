from rembg import remove

def remove_background_image(image_bytes: bytes) -> bytes:
    return remove(image_bytes)
