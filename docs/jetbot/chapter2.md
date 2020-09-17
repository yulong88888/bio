# ROS
## 安装
::: tip
记得更换软件源哦~
:::
```shell script
# windows下直接使用ssh
ssh jetbot@192.168.31.223
# 和正常安装ROS步骤一样操作 具体参照ROS章节
# 遇到“githubusercontent.com”打不开时使用代理 例如 export ALL_PROXY=socks5://192.168.31.158:1080
export ALL_PROXY=socks5://科学上网电脑IP:1080
```

## 环境测试
```shell script
# master .bashrc
export ROS_IP = `hostname -I | awk '{print $1}'`
export ROS_HOSTNAME = `hostname -I | awk '{print $1}'`
# slave .bashrc
export ROS_IP = `hostname -I | awk '{print $1}'`
export ROS_HOSTNAME = `hostname -I | awk '{print $1}'`
export ROS_MASTER_URI = http://192.168.31.223:11311 # 需要写master设备的IP：PORT

# master
roscore
rosrun turtlesim turtlesim_node
# slave 虚拟机注意网卡桥接
rosrun turtlesim turtle_teleop_key
```