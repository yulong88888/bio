# Subscriber
* 代码案例 [https://github.com/huchunxu/ros_21_tutorials](https://github.com/huchunxu/ros_21_tutorials)
## 创建功能包
```shell script
cd 到 [工程名称]/src
catkin_create_pkg learning_topic roscpp rospy std_msgs geometry_msgs turtlesim
```
## cpp demo
```shell script
cd 到 [工程名称]/src/learning_topic/src
```
### pose_subscriber.cpp
```cpp
#include <ros/ros.h>
#include "turtlesim/Pose.h"

// 接收到订阅的消息后，会进入消息回调函数
void poseCallback(const turtlesim::Pose::ConstPtr& msg) {
    // 将接收到的消息打印出来
    ROS_INFO("Turtle pose: x:%0.6f, y:%0.6f", msg->x, msg->y);
}

int main(int argc, char **argv) {
    // 初始化ROS节点
    ros::init(argc, argv, "pose_subscriber");

    // 创建节点句柄
    ros::NodeHandle n;

    // 创建一个Subscriber，订阅名为/turtle1/pose的topic，注册回调函数poseCallback
    ros::Subscriber pose_sub = n.subscribe("/turtle1/pose", 10, poseCallback);

    // 循环等待回调函数
    ros::spin();

    return 0;
}
```
### 编辑learning_topic下CMakeLists.txt
```cmake
# 放到build下即可
add_executable(pose_subscriber src/pose_subscriber.cpp)
target_link_libraries(pose_subscriber $(catkin_LIBRARIES))
```
### 编译&运行
```shell script
cd 到 [工程名称]
catkin_make
# 终端打开一次需要执行一次
# 如不想每次执行，打开主文件夹按ctrl+h显示隐藏文件，编辑.bash.rc，最后添加“source [具体路径]/[工程名]/devel/setup.bash”
source devel/setup.bash
# 开启新终端
roscore
# 开启新终端
rosrun turtlesim turtlesim_node
# 开启新终端
rosrun learning_topic pose_subscriber
# 开启新终端
rosrun turtlesim turtle_teleop_key
# 控制海龟移动即可显示海龟位置信息
```
## python demo
```shell script
cd 到 [工程名称]/src/learning_topic
mkdir scripts
cd 到 [工程名称]/src/learning_topic/scripts
```
### pose_subscriber.py
```python
import rospy
from turtlesim.msg import Pose

def poseCallback(msg):
    rospy.loginfo("Turtle pose: x:%0.6f, y:%0.6f", msg.x, msg.y)

def pose_subscriber():
	# ROS节点初始化
    rospy.init_node('pose_subscriber', anonymous=True)

	# 创建一个Subscriber，订阅名为/turtle1/pose的topic，注册回调函数poseCallback
    rospy.Subscriber("/turtle1/pose", Pose, poseCallback)

	# 循环等待回调函数
    rospy.spin()

if __name__ == '__main__':
    pose_subscriber()
```
### 运行
```shell script
cd 到 [工程名称]
catkin_make
# 终端打开一次需要执行一次
# 如不想每次执行，打开主文件夹按ctrl+h显示隐藏文件，编辑.bash.rc，最后添加“source [具体路径]/[工程名]/devel/setup.bash”
source devel/setup.bash
# 开启新终端
roscore
# 开启新终端
rosrun turtlesim turtlesim_node
# 开启新终端
rosrun learning_topic pose_subscriber.py
# 开启新终端
rosrun turtlesim turtle_teleop_key
# 控制海龟移动即可显示海龟位置信息
```

