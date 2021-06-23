# 基本配置
## 镜像、工具
* [https://developer.nvidia.com/embedded/downloads](https://developer.nvidia.com/embedded/downloads)
* [https://developer.nvidia.com/embedded/jetpack#install](https://developer.nvidia.com/embedded/jetpack#install)
* [https://www.techspot.com/downloads/6355-usb-image-tool.html](https://www.techspot.com/downloads/6355-usb-image-tool.html)
## 软件源
::: tip
此处使用arm内核，与其他cpu配置相比多了个“-ports”<br/>
路径为“/etc/apt/sources.list“<br/>
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
::: tip
官方配置地址
[https://developer.nvidia.com/embedded/learn/tutorials/vnc-setup](https://developer.nvidia.com/embedded/learn/tutorials/vnc-setup)<br/>
realvnc下载地址
[https://www.realvnc.com/en/connect/download/viewer/](https://www.realvnc.com/en/connect/download/viewer/)
:::
```shell script
# 1.Enable the VNC server to start each time you log in
#   If you have a Jetson Nano 2GB Developer Kit (running LXDE)
mkdir -p ~/.config/autostart
cp /usr/share/applications/vino-server.desktop ~/.config/autostart/.
# For all other Jetson developer kits (running GNOME)
cd /usr/lib/systemd/user/graphical-session.target.wants
sudo ln -s ../vino-server.service ./.

# 2.Configure the VNC server
gsettings set org.gnome.Vino prompt-enabled false
gsettings set org.gnome.Vino require-encryption false

# 3.Set a password to access the VNC server
gsettings set org.gnome.Vino authentication-methods "['vnc']"
gsettings set org.gnome.Vino vnc-password $(echo -n 'jetbot'|base64)

# 4.Reboot the system so that the settings take effect
sudo reboot
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
## Docker代理
```shell script
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
```
## Docker部署
::: tip
下方基于docker部署的内容，可直接通过此处查看有无更新的版本
[https://registry.hub.docker.com/r/jetbot/jetbot/tags](https://registry.hub.docker.com/r/jetbot/jetbot/tags)
:::
## Docker Jupyter
```shell script
docker pull jetbot/jetbot:jupyter-0.4.3-32.5.0

sudo docker run -it -d --restart always --runtime nvidia --network host --privileged --device /dev/video* --volume /dev/bus/usb:/dev/bus/usb --volume /tmp/argus_socket:/tmp/argus_socket -p 8888:8888 -v $HOME:/workspace --workdir /workspace --name=jetbot_jupyter --memory-swap=-1 --env JETBOT_DEFAULT_CAMERA=opencv_gst_camera jetbot/jetbot:jupyter-0.4.3-32.5.0
```
## Docker CSICamera
```shell
docker pull jetbot/jetbot:jupyter-0.4.3-32.5.0
docker pull jetbot/jetbot:camera-0.4.3-32.5.0
# jupyter
sudo docker run -it -d --restart always --runtime nvidia --network host --privileged --device /dev/video* --volume /dev/bus/usb:/dev/bus/usb --volume /tmp/argus_socket:/tmp/argus_socket -p 8888:8888 -v $HOME:/workspace --workdir /workspace --name=jetbot_jupyter --memory-swap=-1 --env JETBOT_DEFAULT_CAMERA=zmq_camera jetbot/jetbot:jupyter-0.4.3-32.5.0
# camera
sudo docker run -it -d --restart always --runtime nvidia --network host --privileged --device /dev/video* --volume /dev/bus/usb:/dev/bus/usb --volume /tmp/argus_socket:/tmp/argus_socket --privileged --name=jetbot_camera jetbot/jetbot:camera-0.4.3-32.5.0

# 解决CSI摄像头周围泛红的问题
# 下载camera-override.isp文件，解压到特定文件夹
wget http://www.waveshare.net/w/upload/e/eb/Camera_overrides.tar.gz
tar zxvf Camera_overrides.tar.gz
sudo cp camera_overrides.isp /var/nvidia/nvcam/settings/
# 安装文件
sudo chmod 664 /var/nvidia/nvcam/settings/camera_overrides.isp
sudo chown root:root /var/nvidia/nvcam/settings/camera_overrides.isp
```
```python
# CSI摄像头程序
from IPython.display import display
import ipywidgets
import traitlets
from jetbot import Camera, bgr8_to_jpeg
import cv2

camera = Camera()

image_widget = ipywidgets.Image()

#处理图片
def flipJpg(camera_image):
    temp = cv2.flip(camera_image, -1)
    return bgr8_to_jpeg(temp)

traitlets.dlink((camera, 'value'), (image_widget, 'value'), transform=flipJpg)

display(image_widget)
```
## 串口驱动
```shell script
apt-get install python3-serial
```
## 控制台代理
```shell script
# 终端输入
export ALL_PROXY=socks5://科学上网电脑IP : 端口
```
## 网络切换
```shell
# 连接
nmcli device wifi connect 'SSID' password 'PASSWORD'
# 断开
nmcli con down SSID
# 删除
nmcli con del SSID
# 查看状态
nmcli con show
nmcli device status
# 开启热点
sudo nmcli dev wifi hotspot ssid 'SSID' password 'PASSWORD'
```
