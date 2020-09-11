# Client(Service)
## 创建功能包
```shell script
cd 到 [工程名称]/src
catkin_create_pkg learning_service roscpp rospy std_msgs geometry_msgs turtlesim
```
## cpp demo
```shell script
cd 到 [工程名称]/src/learning_service/src
```
### turtle_spawn.cpp
```cpp
#include <ros/ros.h>
#include <turtlesim/Spawn.h>

int main(int argc, char** argv) {
    // 初始化ROS节点
	ros::init(argc, argv, "turtle_spawn");

    // 创建节点句柄
	ros::NodeHandle node;

    // 发现/spawn服务后，创建一个服务客户端，连接名为/spawn的service
	ros::service::waitForService("/spawn");
	ros::ServiceClient add_turtle = node.serviceClient<turtlesim::Spawn>("/spawn");

    // 初始化turtlesim::Spawn的请求数据
	turtlesim::Spawn srv;
	srv.request.x = 2.0;
	srv.request.y = 2.0;
	srv.request.name = "turtle2";

    // 请求服务调用
	ROS_INFO("Call service to spwan turtle[x:%0.6f, y:%0.6f, name:%s]", 
			 srv.request.x, srv.request.y, srv.request.name.c_str());

	add_turtle.call(srv);

	// 显示服务调用结果
	ROS_INFO("Spwan turtle successfully [name:%s]", srv.response.name.c_str());

	return 0;
};
```
### 编辑learning_service下CMakeLists.txt
```cmake
# 放到build下即可
add_executable(turtle_spawn src/turtle_spawn.cpp)
target_link_libraries(turtle_spawn $(catkin_LIBRARIES))
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
rosrun learning_service turtle_spawn
# 海龟就下崽了
```
## python demo
```shell script
cd 到 [工程名称]/src/learning_service
mkdir scripts
cd 到 [工程名称]/src/learning_service/scripts
```
### turtle_spawn.py
```python
import sys
import rospy
from turtlesim.srv import Spawn

def turtle_spawn():
	# ROS节点初始化
    rospy.init_node('turtle_spawn')

	# 发现/spawn服务后，创建一个服务客户端，连接名为/spawn的service
    rospy.wait_for_service('/spawn')
    try:
        add_turtle = rospy.ServiceProxy('/spawn', Spawn)

		# 请求服务调用，输入请求数据
        response = add_turtle(2.0, 2.0, 0.0, "turtle2")
        return response.name
    except rospy.ServiceException, e:
        print "Service call failed: %s"%e

if __name__ == "__main__":
	#服务调用并显示调用结果
    print "Spwan turtle successfully [name:%s]" %(turtle_spawn())
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
rosrun learning_service turtle_spawn.py
# 海龟就下崽了
```