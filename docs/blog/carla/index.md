# CARLA
::: tip
* 如何在win11上实现carla和ros的通信？
* 架构：win11上安装carla，wsl2上安装docker再安装ros
* 实现环境： win11 23H2，intel i7 10700F，16G内存，nVidia RTX2060S
* 前提需要安装wsl2和Docker，[这里](../wsl2/index.md)有说明
:::

## 下载
[https://github.com/carla-simulator/carla/releases/tag/0.9.13/](https://github.com/carla-simulator/carla/releases/tag/0.9.13/)<br/>
[需要追加的资源文件](https://www.alipan.com/s/cLZTdbgPGU8)

## 命令
```shell:no-line-numbers
# 注意修改/mnt/d/CARLA_0.9.13/WindowsNoEditor为自己的路径
sudo docker run -it -d --net host -e DISPLAY=$DISPLAY -v /tmp/.X11-unix:/tmp/.X11-unix -v $PWD:/root/ros_ws -v /mnt/d/CARLA_0.9.13/WindowsNoEditor:/root/CARLA --gpus all --name ros-carla-sim osrf/ros:melodic-desktop
# 进入容器
sudo docker exec -it ros-carla-sim bash
# 执行可能会有报错
apt update
# 尝试修复报错
apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 4B63CF8FDE49746E98FA01DDAD19BAB3CBF125EA
```

## 通信桥
* [官方文档](https://carla.readthedocs.io/projects/ros-bridge/en/latest/ros_installation_ros1/)
```shell:no-line-numbers
sudo apt update
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 1AF1527DE64CB8D9
sudo apt install software-properties-common -y
sudo add-apt-repository "deb [arch=amd64] http://dist.carla.org/carla $(lsb_release -sc) main"
sudo apt update
sudo apt install carla-ros-bridge -y
```

## 环境变量
```shell:no-line-numbers
# 文件env.bash
export CARLA_ROOT=/root/CARLA
export PYTHONPATH=$PYTHONPATH:$CARLA_ROOT/PythonAPI/carla/dist/carla-0.9.13-py2.7-linux-x86_64.egg:$CARLA_ROOT/PythonAPI/carla
source /opt/ros/melodic/setup.bash
source /opt/carla-ros-bridge/melodic/setup.bash
# 每次都手动加载一次
source env.bash
```

## 补充组件
```shell:no-line-numbers
sudo apt install python-pip
pip install pygame -i https://pypi.tuna.tsinghua.edu.cn/simple
```

## 测试
```shell:no-line-numbers
# 后面的ip是由cmd查看ipconfig里wsl地址得来
roslaunch carla_ros_bridge carla_ros_bridge.launch host:="172.20.96.1"
roslaunch carla_ros_bridge carla_ros_bridge_with_example_ego_vehicle.launch host:="172.20.96.1"
```

## 其他
```shell:no-line-numbers
# 删除容器
sudo docker rm -f ros-carla-sim
# 使用过程中，我遇到了一次wsl窗口花屏的情况
# 升级了显卡驱动和系统重启就解决了
# 用了如下在wsl层（非docker容器）命令排查了下问题
sudo apt install mesa-utils
glxgears
```
