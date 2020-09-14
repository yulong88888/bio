# 参数的使用与编程方法
## 创建功能包
```shell script
cd 到 [工程名称]/src
catkin_create_pkg learning_parameter roscpp rospy std_srvs
```
## rosparam
```shell script
# 列出当前参数
rosparam list
# 获取某个参数的值
rosparam get param_key
# 设置某个参数的值
rosparam set param_key param_value
# 保存参数到文件
rosparam dump file_name
# 从文件读取参数
rosparam load file_name
# 删除参数
rosparam delete param_key
```
## 海龟例子
```shell script
# 开启新终端
roscore
# 开启新终端
rosrun turtlesim turtlesim_node
# 开启新终端
rosparam list
# 修改背景色
rosparam set /background_b 100
# 发送请求确认改变
rosservice call /clear "{}"
# rosparam dump file_name.yaml
# rosparam load file_name.yaml
```
## cpp demo
```shell script
cd 到 [工程名称]/src/learning_parameter/src
```
### parameter_config.cpp
```cpp
#include <string>
#include <ros/ros.h>
#include <std_srvs/Empty.h>

int main(int argc, char **argv) {
	int red, green, blue;

    // ROS节点初始化
    ros::init(argc, argv, "parameter_config");

    // 创建节点句柄
    ros::NodeHandle node;

    // 读取背景颜色参数
	ros::param::get("/background_r", red);
	ros::param::get("/background_g", green);
	ros::param::get("/background_b", blue);

	ROS_INFO("Get Backgroud Color[%d, %d, %d]", red, green, blue);

	// 设置背景颜色参数
	ros::param::set("/background_r", 255);
	ros::param::set("/background_g", 255);
	ros::param::set("/background_b", 255);

	ROS_INFO("Set Backgroud Color[255, 255, 255]");

    // 读取背景颜色参数
	ros::param::get("/background_r", red);
	ros::param::get("/background_g", green);
	ros::param::get("/background_b", blue);

	ROS_INFO("Re-get Backgroud Color[%d, %d, %d]", red, green, blue);

	// 调用服务，刷新背景颜色
	ros::service::waitForService("/clear");
	ros::ServiceClient clear_background = node.serviceClient<std_srvs::Empty>("/clear");
	std_srvs::Empty srv;
	clear_background.call(srv);
	
	sleep(1);

    return 0;
}
```
### 编辑learning_parameter下CMakeLists.txt
```cmake
# 放到build下即可
add_executable(parameter_config src/parameter_config.cpp)
target_link_libraries(parameter_config $(catkin_LIBRARIES))
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
rosrun learning_parameter parameter_config
# 海龟的背景就发生变化了
```
## python demo
```shell script
cd 到 [工程名称]/src/learning_parameter
mkdir scripts
cd 到 [工程名称]/src/learning_parameter/scripts
```
### parameter_config.py
```python
import sys
import rospy
from std_srvs.srv import Empty

def parameter_config():
	# ROS节点初始化
    rospy.init_node('parameter_config', anonymous=True)

	# 读取背景颜色参数
    red   = rospy.get_param('/background_r')
    green = rospy.get_param('/background_g')
    blue  = rospy.get_param('/background_b')

    rospy.loginfo("Get Backgroud Color[%d, %d, %d]", red, green, blue)

	# 设置背景颜色参数
    rospy.set_param("/background_r", 255);
    rospy.set_param("/background_g", 255);
    rospy.set_param("/background_b", 255);

    rospy.loginfo("Set Backgroud Color[255, 255, 255]");

	# 读取背景颜色参数
    red   = rospy.get_param('/background_r')
    green = rospy.get_param('/background_g')
    blue  = rospy.get_param('/background_b')

    rospy.loginfo("Get Backgroud Color[%d, %d, %d]", red, green, blue)

	# 发现/spawn服务后，创建一个服务客户端，连接名为/spawn的service
    rospy.wait_for_service('/clear')
    try:
        clear_background = rospy.ServiceProxy('/clear', Empty)

		# 请求服务调用，输入请求数据
        response = clear_background()
        return response
    except rospy.ServiceException, e:
        print "Service call failed: %s"%e

if __name__ == "__main__":
    parameter_config()
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
rosrun learning_parameter parameter_config.py
# 海龟的背景就发生变化了
```