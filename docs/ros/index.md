# ROS环境搭建
* <font color="red">基于Ubuntu 18.04</font>
* **官方步骤 [http://wiki.ros.org/cn/melodic/Installation/Ubuntu](http://wiki.ros.org/cn/melodic/Installation/Ubuntu)**
## 一、添加ros软件源
```shell script
sudo sh -c '. /etc/lsb-release && echo "deb http://mirrors.tuna.tsinghua.edu.cn/ros/ubuntu/ `lsb_release -cs` main" > /etc/apt/sources.list.d/ros-latest.list'
```
## 二、添加公钥
```shell script
sudo apt-key adv --keyserver 'hkp://keyserver.ubuntu.com:80' --recv-key C1CF6E31E6BADE8868B172B4F42ED6FBAB17C654
```
## 三、安装ros
```shell script
sudo apt update
sudo apt install ros-melodic-desktop-full
```
## 四、安装rosdep
```shell script
rosdep init
# 执行后，提示如下
# Command 'rosdep' not found, but can be installed with:
# 需要安装
sudo apt install python-rosdep
# 安装完成后执行
sudo -E rosdep init
# 成功后执行
rosdep update

# 踩坑，raw.githubusercontent.com网站访问不了，此处可以尝试使用手机热点下载。
# 加入“-E”的操作，来自https://answers.ros.org/question/54150/rosdep-initialization-error/
# wget https://raw.githubusercontent.com 看网站是否可以正常打开
```
## 五、设置环境变量
```shell script
echo "source /opt/ros/melodic/setup.bash" >> ~/.bashrc
source ~/.bashrc
```
## 六、构建工厂依赖
```shell script
sudo apt-get install python-rosinstall python-rosinstall-generator python-wstool build-essential
```
## 七、测试roscore命令
如果正确打印版本等信息，说明安装成功