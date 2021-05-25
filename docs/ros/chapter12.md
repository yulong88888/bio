# 主从节点
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
# 如果出现无法控制海龟的问题，使用“rosnode info /turtlesim”排查
rosrun turtlesim turtle_teleop_key
```
