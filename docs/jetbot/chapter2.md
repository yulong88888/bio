# ROS2环境
::: tip
ROS2取消了主从模式，只需要将“ROS_DOMAIN_ID”进行配置即可
:::
## 安装
::: tip
可直接通过此处查看有无更新的版本 <br/>
官方地址 <br/>
[https://hub.docker.com/r/dustynv/ros/tags](https://hub.docker.com/r/dustynv/ros/tags) <br/>
非官方地址 <br/>
[https://registry.hub.docker.com/search?q=nvidiajetson&type=image](https://registry.hub.docker.com/search?q=nvidiajetson&type=image) <br/>
:::
```shell script
# 拉取镜像
docker pull nvidiajetson/l4t-ros2-foxy
# 查看版本号
sudo docker images
# 对应版本号做修改
sudo docker run -it -d --runtime nvidia --network host --privileged  --device /dev/video* --volume /dev/bus/usb:/dev/bus/usb --volume /tmp/argus_socket:/tmp/argus_socket -v /home/jetbot/Desktop/ros2:/root/test --name=ros2  nvidiajetson/l4t-ros2-foxy:r32.5
# 进入容器
sudo docker attach ros2

# 可退出自动删除
# sudo docker run --runtime nvidia -it --rm --network host nvidiajetson/l4t-ros2-foxy:r32.5
```
## 思岚雷达
::: tip
思岚雷达ROS地址，选择分支ROS2即可 <br/>
[https://github.com/Slamtec/rplidar_ros](https://github.com/Slamtec/rplidar_ros) <br/>
[https://github.com/Slamtec/rplidar_ros/tree/ros2](https://github.com/Slamtec/rplidar_ros/tree/ros2)
:::
```shell script
git clone -b ros2 https://github.com/slamtec/rplidar_ros.git

cd <your_own_ros2_ws>
colcon build --symlink-install

source ./install/setup.bash

ros2 launch rplidar_ros2 rplidar_launch.py
```
