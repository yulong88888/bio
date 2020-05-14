# 镜像、工具
[https://developer.nvidia.com/embedded/downloads](https://developer.nvidia.com/embedded/downloads)<br/>
[https://www.balena.io/etcher/](https://www.balena.io/etcher/)

# 软件源
<font color=#FF0000>**此处使用arm内核，与其他cpu配置不同**</font>
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
# RealVNC
```shell script
udo apt install vino

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

# Jupyter
```shell script
pip install jupyterlab

#执行
jupyter notebook --generate-config
#生成
home/USERNAME/.jupyter/jupyter_notebook_config.py
#修改
NotebookApp.allow_password_change=False

#执行并输入以及确认密码
jupyter notebook password
#生成
home/USERNAME/.jupyter/jupyter_notebook_config.json
#复制密码hash替换到jupyter_notebook_config.py
c.NotebookApp.password = u'sha1:xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
```

