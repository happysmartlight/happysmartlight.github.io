#!/bin/bash

# Định nghĩa file nguồn
SOURCE_FILE="hsl_1500x1500.png"

# Kiểm tra nếu file nguồn tồn tại
if [ ! -f "$SOURCE_FILE" ]; then
    echo "File nguồn $SOURCE_FILE không tồn tại!"
    exit 1
fi

# Lặp qua tất cả các file ảnh trong thư mục hiện tại (trừ file nguồn)
for file in *.jpg *.png; do
    if [ "$file" != "$SOURCE_FILE" ]; then
        cp -f "$SOURCE_FILE" "$file"
        echo "Đã ghi đè $file"
    fi
done

echo "Hoàn thành!"