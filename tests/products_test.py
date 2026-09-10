"""
Valida js/products.js. Sin dependencias, sin build step
(no hay Node.js en este entorno, por eso el validador es Python).

Uso: python tests/products_test.py
"""

import json
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PRODUCTS_PATH = os.path.join(ROOT, "js", "products.js")
REQUIRED_FIELDS = ["id", "name", "category", "price", "description", "image"]


def load_products():
    with open(PRODUCTS_PATH, "r", encoding="utf-8") as f:
        content = f.read()

    match = re.search(r"const PRODUCTS = (\[.*?\]);", content, re.DOTALL)
    if not match:
        print("FAIL — no se pudo encontrar el array PRODUCTS en products.js.")
        sys.exit(1)

    array_text = match.group(1)
    # products.js usa claves de objeto sin comillas (sintaxis JS válida
    # pero no JSON); las citamos para poder parsear con json.loads.
    json_text = re.sub(
        r"(?m)^(\s*)(id|name|category|price|description|image):",
        r'\1"\2":',
        array_text,
    )

    try:
        return json.loads(json_text)
    except json.JSONDecodeError as exc:
        print(f"FAIL — products.js no se pudo parsear como datos: {exc}")
        sys.exit(1)


def main():
    products = load_products()
    failures = []

    if not isinstance(products, list) or len(products) == 0:
        failures.append("PRODUCTS debe ser una lista no vacía.")

    seen_ids = set()

    for product in products:
        label = product.get("id") or json.dumps(product, ensure_ascii=False)

        for field in REQUIRED_FIELDS:
            if field not in product:
                failures.append(f'{label}: falta el campo "{field}".')

        pid = product.get("id")
        if not isinstance(pid, str) or pid.strip() == "":
            failures.append(f'{label}: "id" debe ser un string no vacío.')
        elif pid in seen_ids:
            failures.append(f'{label}: "id" duplicado.')
        else:
            seen_ids.add(pid)

        name = product.get("name")
        if not isinstance(name, str) or name.strip() == "":
            failures.append(f'{label}: "name" debe ser un string no vacío.')

        category = product.get("category")
        if not isinstance(category, str) or category.strip() == "":
            failures.append(f'{label}: "category" debe ser un string no vacío.')

        price = product.get("price")
        if not isinstance(price, (int, float)) or isinstance(price, bool) or price <= 0:
            failures.append(f'{label}: "price" debe ser un número mayor a 0 (recibido: {price!r}).')

        description = product.get("description")
        if not isinstance(description, str) or description.strip() == "":
            failures.append(f'{label}: "description" debe ser un string no vacío.')

        image = product.get("image")
        if image is not None and not isinstance(image, str):
            failures.append(f'{label}: "image" debe ser null o un string.')
        if isinstance(image, str):
            image_path = os.path.join(ROOT, image)
            if not os.path.isfile(image_path):
                failures.append(f'{label}: "image" apunta a un archivo que no existe ({image}).')

    if failures:
        print(f"FAIL — {len(failures)} problema(s) en products.js:\n")
        for message in failures:
            print(f"  - {message}")
        sys.exit(1)

    print(f"OK — {len(products)} productos válidos en products.js.")


if __name__ == "__main__":
    main()
