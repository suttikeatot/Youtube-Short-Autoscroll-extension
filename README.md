# YouTube Shorts Auto Scroll (Chrome Extension)

ส่วนขยาย Chrome นี้ช่วยเลื่อน YouTube Shorts ไปคลิปถัดไปอัตโนมัติเมื่อคลิปปัจจุบันเล่นจบ

## Features
- เลื่อนไป Short ถัดไปอัตโนมัติเมื่อวิดีโอจบ
- ทำงานกับหน้า `https://www.youtube.com/shorts/*`
- ปิด/เปิดการทำงานได้ด้วยคีย์ลัด `Alt + S`
- บันทึกสถานะเปิด/ปิดไว้ใน Chrome Storage

## วิธีติดตั้ง (Developer mode)
1. เปิด Chrome แล้วไปที่ `chrome://extensions`
2. เปิด `Developer mode`
3. กด `Load unpacked`
4. เลือกโฟลเดอร์โปรเจกต์นี้

## วิธีใช้งาน
1. เข้า YouTube Shorts
2. เปิดคลิปใดก็ได้ในหน้า Shorts
3. ระบบจะเลื่อนไปคลิปใหม่ให้อัตโนมัติเมื่อจบคลิป

## Files
- `manifest.json` - ตั้งค่า extension
- `content.js` - logic auto scroll บนหน้า YouTube Shorts
