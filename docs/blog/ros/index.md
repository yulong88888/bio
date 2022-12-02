# ROS

## Example
* [https://github.com/ros/ros_tutorials](https://github.com/ros/ros_tutorials)

## Docker VNC
* [https://github.com/Tiryoh/docker-ros-desktop-vnc](https://github.com/Tiryoh/docker-ros-desktop-vnc)
```shell
sudo docker run -d -p 6080:80 --name=test -e RESOLUTION=1280x800 --shm-size=512m tiryoh/ros-desktop-vnc:melodic

sudo docker run -d -v /Users/guyulong/Desktop/simulation/ws:/home/ubuntu/Desktop/ws -p 6080:80 --name=test -e RESOLUTION=1280x800 --shm-size=512m tiryoh/ros-desktop-vnc:melodic
```

## Docker GUI
* [https://github.com/yulong88888/win11_wsl2_docker_ros_gui](https://github.com/yulong88888/win11_wsl2_docker_ros_gui)

## 在WSL2下的使用问题
### 安装
* Ubuntu18用显卡比较卡，不适合仿真，所以使用了Ubuntu20，但是不支持melodic版本

### Husky仿真
```shell:no-line-numbers
# http://wiki.ros.org/husky_gazebo/Tutorials/Simulating%20Husky
sudo apt-get install ros-noetic-husky-simulator
export HUSKY_GAZEBO_DESCRIPTION=$(rospack find husky_gazebo)/urdf/description.gazebo.xacro
# https://github.com/husky/husky/blob/noetic-devel/husky_description/urdf/husky.urdf.xacro
export HUSKY_LASER_3D_ENABLED=1

roslaunch husky_gazebo husky_empty_world.launch

roslaunch husky_gazebo husky_playpen.launch
```

### 新建工程编译失败
```shell:no-line-numbers
https://stackoverflow.com/questions/62879479/every-call-to-configure-file-fails-on-wsl-configure-file-problem-configuring-fi

# /etc/wsl.conf
[automount]
options = "metadata"
enabled = true

# 重启wsl
```

### dep无法访问
```shell:no-line-numbers
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
