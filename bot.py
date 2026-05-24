import datetime
import os

# هذا البوت يقوم بإنشاء ملف يسمى log.txt ويكتب فيه تاريخ ووقت تشغيله
# هذه وظيفة برمجية بسيطة لتجربة عمل البوت
log_file = "bot_log.txt"

with open(log_file, "a", encoding="utf-8") as f:
    f.write(f"تم تشغيل البوت بنجاح في: {datetime.datetime.now()}\n")

print(f"البوت يعمل الآن! تم التحديث في {log_file}")
