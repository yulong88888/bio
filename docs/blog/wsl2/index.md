# WSL2
::: tip
需要win11系统
:::
## 基础使用
```shell
# 安装
wsl --install -d Ubuntu
# 查看
wsl -l
# 删除
wslconfig /u Ubuntu
# 进入后升级操作
sudo apt update
sudo apt upgrade
# 重启
wsl -t Ubuntu

# 修改密码（需进入wsl）
sudo passwd <用户名>
# 查看系统版本
uname -a
```

## 显卡驱动
```shell
# 安装图形驱动
sudo apt install mesa-utils
sudo add-apt-repository ppa:kisak/kisak-mesa
# 升级操作
sudo apt update && sudo apt dist-upgrade
# 查看显卡信息
nvidia-smi
# 查看图形测试
glxgears
```

## Docker安装
```shell
# 执行安装脚本
curl -fsSL get.docker.com -o get-docker.sh
sh get-docker.sh
# 删除脚本文件
rm get-docker.sh
# 启动服务
sudo service docker start
# 开机启动
sudo systemctl enable docker

# 添加源
distribution=$(. /etc/os-release; echo $ID$VERSION_ID)
curl -s -L https://nvidia.github.io/nvidia-docker/gpgkey | sudo apt-key add -
curl -s -L https://nvidia.github.io/nvidia-docker/$distribution/nvidia-docker.list | sudo tee /etc/apt/sources.list.d/nvidia-docker.list
# 安装toolkit
sudo apt-get update && sudo apt-get install -y nvidia-container-toolkit
# 重启docker
sudo systemctl restart docker 或者 sudo service docker restart
```

## ROS使用问题
### 安装
* Ubuntu18用显卡比较卡，不适合仿真，所以使用了Ubuntu20，但是不支持melodic版本

### Husky仿真
```shell
# http://wiki.ros.org/husky_gazebo/Tutorials/Simulating%20Husky
sudo apt-get install ros-noetic-husky-simulator
export HUSKY_GAZEBO_DESCRIPTION=$(rospack find husky_gazebo)/urdf/description.gazebo.xacro
# https://github.com/husky/husky/blob/noetic-devel/husky_description/urdf/husky.urdf.xacro
export HUSKY_LASER_3D_ENABLED=1

roslaunch husky_gazebo husky_empty_world.launch

roslaunch husky_gazebo husky_playpen.launch
```

### 新建工程编译失败
```shell
https://stackoverflow.com/questions/62879479/every-call-to-configure-file-fails-on-wsl-configure-file-problem-configuring-fi

# /etc/wsl.conf
[automount]
options = "metadata"
enabled = true

# 重启wsl
```

### dep无法访问
```shell
sudo mkdir -p /etc/ros/rosdep/sources.list.d

cd /etc/ros/rosdep/sources.list.d

sudo vim 20-default.list

复制以下内容
https://raw.githubusercontent.com/ros/rosdistro/master/rosdep/sources.list.d/20-default.list

所有文件加此前缀，https://ghproxy.com/https://raw.githubusercontent.com/***

# melodic
sudo vi /usr/lib/python2.7/dist-packages/rosdistro/__init__.py
为index-v4.yaml加此前缀，https://ghproxy.com/https://raw.githubusercontent.com/***

# noetic
sudo vi /usr/lib/python3/dist-packages/rosdistro/__init__.py
sudo vi /usr/lib/python3/dist-packages/rosdep2/rep3.py
sudo vi /usr/lib/python3/dist-packages/rosdep2/gbpdistro_support.py
网站内容添加https://ghproxy.com

rosdep update
```

