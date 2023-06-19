<html>
<body dir="rtl">
<h3>
محترم: {{$mail_data['name']}} 
</h3>
</br>
<h4>
ضمن ابراز سپاس بخاطر ثبت نام در سیستم داکتر من، لطفا جهت تاییدی ایمیل خود برروی لینک ذیل کلیک کنید. 
</h4>
</br>
<a href="http://127.0.0.1:8000/doctor-register?varification_code={{$mail_data['verification_code']}}&id={{$mail_data['id']}}" target="_blank"><b>تاییدی ایمیل</b></a>
<h4>
در صورت کار نکردن لینک بالا، لینک پایینی را کاپی نمایید و در بروزر سیستم خود پست کنید.
<h4>
</br>
<p>
http://127.0.0.1:8000/doctor-register?varification_code={{$mail_data['verification_code']}}&id={{$mail_data['id']}}
</p>
</br>
<p>
بااحترام:
</br>
مدیریت سیستم داکتر من
</p>
</body>
</html>