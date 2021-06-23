# ROS1&STM32
* 使用具有ros环境的虚拟机
```shell script
cd <ws>/src
git clone https://github.com/ros-drivers/rosserial.git
cd <ws>
catkin_make

source devel/setup.bash

rosrun rosserial_arduino make_libraries.py ~/Desktop/

# 将输出文件放置到pio工程lib目录下，并使用src文件夹做嵌套
# 例如/ros_lib/src/<库文件>
```
