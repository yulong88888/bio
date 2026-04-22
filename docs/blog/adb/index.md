# ADB
* Android Debug Bridge

## 常用命令
```shell:no-line-numbers
adb devices
adb kill-server
adb connect ip:port
adb disconnect ip:port
adb shell
adb logcat
# 远程安装
adb install app.apk -s 127.0.0.1:5555
# xapk安装（将xapk改zip，解压安装全部apk）
adb install-multiple *.apk
```