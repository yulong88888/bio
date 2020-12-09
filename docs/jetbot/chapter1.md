# 基本配置
## 镜像、工具
* [https://developer.nvidia.com/embedded/downloads](https://developer.nvidia.com/embedded/downloads)
* [https://developer.nvidia.com/embedded/jetpack#install](https://developer.nvidia.com/embedded/jetpack#install)
* [https://www.techspot.com/downloads/6355-usb-image-tool.html](https://www.techspot.com/downloads/6355-usb-image-tool.html)
## 软件源
::: tip
此处使用arm内核，与其他cpu配置相比多了个“-ports”<br/>
路径为“/etc/apt/source.list“<br/>
遇到加锁时“sudo rm /var/lib/apt/lists/lock”<br/>
:::
```shell script
#阿里巴巴arm镜像中心
#https://mirrors.aliyun.com/ubuntu-ports/

# 默认注释了源码镜像以提高 apt update 速度，如有需要可自行取消注释
deb https://mirrors.aliyun.com/ubuntu-ports/ bionic main restricted universe multiverse
# deb-src https://mirrors.aliyun.com/ubuntu-ports/ bionic main restricted universe multiverse
deb https://mirrors.aliyun.com/ubuntu-ports/ bionic-updates main restricted universe multiverse
# deb-src https://mirrors.aliyun.com/ubuntu-ports/ bionic-updates main restricted universe multiverse
deb https://mirrors.aliyun.com/ubuntu-ports/ bionic-backports main restricted universe multiverse
# deb-src https://mirrors.aliyun.com/ubuntu-ports/ bionic-backports main restricted universe multiverse
deb https://mirrors.aliyun.com/ubuntu-ports/ bionic-security main restricted universe multiverse
# deb-src https://mirrors.aliyun.com/ubuntu-ports/ bionic-security main restricted universe multiverse

# 预发布软件源，不建议启用
# deb https://mirrors.aliyun.com/ubuntu-ports/ bionic-proposed main restricted universe multiverse
# deb-src https://mirrors.aliyun.com/ubuntu-ports/ bionic-proposed main restricted universe multiverse

sudo apt update
sudo apt upgrade
```
## RealVNC
```shell script
sudo apt install vino

#touch openvino
#!/bin/bash
export DISPLAY=:1
gsettings set org.gnome.Vino enabled true
gsettings set org.gnome.Vino prompt-enabled false
gsettings set org.gnome.Vino require-encryption false
/usr/lib/vino/vino-server &

chmod +x ~/openvino

~/openvino
```
## Jupyter iframe
```shell script
# 编辑配置文件，vim /home/jetdot/.jupyter/jupyter_notebook_config.py，追加如下代码配置：
c.NotebookApp.token = ''
c.NotebookApp.ip = '0.0.0.0'
c.NotebookApp.tornado_settings = { 'headers': { 'Content-Security-Policy': "frame-ancestors * 'self'" }}
c.NotebookApp.disable_check_xsrf = True
c.NotebookApp.open_browser = False
c.NotebookApp.allow_root = True
# 然后删除.json密码文件
```
## Docker部署开发环境
> docker下载镜像，需要单独为docker配置代理
```shell script
git clone http://github.com/NVIDIA-AI-IOT/jetbot.git
cd jetbot/docker/
sudo vim enable.sh # 删除OLED显示

# docker配置代理
sudo mkdir -p /etc/systemd/system/docker.service.d
sudo touch /etc/systemd/system/docker.service.d/proxy.conf
vi /etc/systemd/system/docker.service.d/proxy.conf
# 录入
[Service]
Environment="HTTP_PROXY=[ip]:[port]"
Environment="HTTPS_PROXY=[ip]:[port]"
# 重启（可以使用“sudo docker info”检查配置）
sudo systemctl daemon-reload
sudo systemctl restart docker

# 最后
cd ~/jetbot/docker/
./enable.sh $HOME
```