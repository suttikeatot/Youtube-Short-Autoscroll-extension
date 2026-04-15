# YouTube Shorts Auto Scroll (Chrome Extension)

ส่วนขยาย Chrome นี้ช่วยเลื่อน YouTube Shorts ไปคลิปถัดไปอัตโนมัติเมื่อคลิปปัจจุบันเล่นจบ

## Features
- เลื่อนไป Short ถัดไปอัตโนมัติเมื่อวิดีโอจบ
- เปิด/ปิดฟีเจอร์ได้จาก popup ของ extension
- ปิด/เปิดการทำงานได้ด้วยคีย์ลัด `Alt + S`
- บันทึกสถานะเปิด/ปิดไว้ใน Chrome Storage
- ทำงานกับหน้า `https://www.youtube.com/shorts/*`

## วิธีติดตั้ง (Developer mode)
1. เปิด Chrome แล้วไปที่ `chrome://extensions`
2. เปิด `Developer mode`
3. กด `Load unpacked`
4. เลือกโฟลเดอร์โปรเจกต์นี้

## วิธีใช้งาน
1. เข้า YouTube Shorts
2. กด pin extension แล้วคลิกไอคอน extension
3. ใช้สวิตช์ `Auto Scroll` เพื่อเปิด/ปิด
4. ระบบจะเลื่อนไปคลิปใหม่ให้อัตโนมัติเมื่อจบคลิป

## Troubleshooting
### กรณี Chrome แจ้ง `Manifest is not valid JSON`
ปัญหานี้มักเกิดจากตอน resolve merge conflict แล้วไฟล์ `manifest.json` มี comma หาย/เกิน หรือมี conflict marker ค้าง (`<<<<<<<`, `=======`, `>>>>>>>`) ทำให้ parse ไม่ได้

ตรวจสอบและแก้ไขด้วยคำสั่ง:
```bash
python -m json.tool manifest.json
```

ถ้าคำสั่งไม่ error แปลว่าไฟล์ JSON ถูกต้องแล้ว จากนั้นกลับไปหน้า `chrome://extensions` แล้วกด `Reload`

## Files
- `manifest.json` - ตั้งค่า extension และ popup
- `content.js` - logic auto scroll บนหน้า YouTube Shorts
- `popup.html` / `popup.css` / `popup.js` - หน้าเมนูเปิด/ปิด Auto Scroll
