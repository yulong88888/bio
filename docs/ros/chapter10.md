# Service自定义与使用
## 创建.srv文件
```shell script
cd 到 [工程名称]/src/learning_service
mkdir srv
cd srv
touch Person.srv
# 内容为
# string name
# uint8  age
# uint8  sex
# uint8 unknown = 0
# uint8 male    = 1
# uint8 female  = 2
# --- # 三个横线之上是request内容，三个横线之下是response内容
# string result
```
## 添加功能包依赖
```xml
<!--在[工程名称]/src/learning_service/package.xml中添加依赖-->
<build_depend>message_generation</build_depend>
<exec_depend>message_runtime</exec_depend>
```
## 添加编译选项
```cmake
# 编辑learning_service下CMakeLists.txt
在find_package下添加message_generation

add_service_files(FILES Person.srv)
generate_messages(DEPENDENCIES std_msgs)

在catkin_package下取消CATKIN_DEPENDS整行注释，并追加message_runtime
```
## 编译转化.srv
```shell script
cd 到 [工程名称]
catkin_make
# 编译完成后，.msg将被转为cpp和py能用的库文件
# 例如，在/[工程名]/devel/include/learning_service下会多出Person.h，PersonRequest.h，PersonResponse.h
# Person.h已经包含了PersonRequest.h & PersonResponse.h。
```
## cpp demo
```shell script
cd 到 [工程名称]/src/learning_service/src
```
### person_server.cpp
```cpp
#include <ros/ros.h>
#include "learning_service/Person.h"

// service回调函数，输入参数req，输出参数res
bool personCallback(learning_service::Person::Request  &req,
         			learning_service::Person::Response &res) {
    // 显示请求数据
    ROS_INFO("Person: name:%s  age:%d  sex:%d", req.name.c_str(), req.age, req.sex);

	// 设置反馈数据
	res.result = "OK";

    return true;
}

int main(int argc, char **argv) {
    // ROS节点初始化
    ros::init(argc, argv, "person_server");

    // 创建节点句柄
    ros::NodeHandle n;

    // 创建一个名为/show_person的server，注册回调函数personCallback
    ros::ServiceServer person_service = n.advertiseService("/show_person", personCallback);

    // 循环等待回调函数
    ROS_INFO("Ready to show person informtion.");
    ros::spin();

    return 0;
}
```
### person_client.cpp
```cpp
#include <ros/ros.h>
#include "learning_service/Person.h"

int main(int argc, char** argv) {
    // 初始化ROS节点
	ros::init(argc, argv, "person_client");

    // 创建节点句柄
	ros::NodeHandle node;

    // 发现/spawn服务后，创建一个服务客户端，连接名为/spawn的service
	ros::service::waitForService("/show_person");
	ros::ServiceClient person_client = node.serviceClient<learning_service::Person>("/show_person");

    // 初始化learning_service::Person的请求数据
	learning_service::Person srv;
	srv.request.name = "Tom";
	srv.request.age  = 20;
	srv.request.sex  = learning_service::Person::Request::male;

    // 请求服务调用
	ROS_INFO("Call service to show person[name:%s, age:%d, sex:%d]", 
			 srv.request.name.c_str(), srv.request.age, srv.request.sex);

	person_client.call(srv);

	// 显示服务调用结果
	ROS_INFO("Show person result : %s", srv.response.result.c_str());

	return 0;
};
```
### 编辑CMakeLists.txt
```cmake
# 文件在learning_service下，下面内容放到build内容下即可
add_executable(person_server src/person_server.cpp)
target_link_libraries(person_server ${catkin_LIBRARIES})
add_dependencies(person_server ${PROJECT_NAME}_gencpp)

add_executable(person_client src/person_client.cpp)
target_link_libraries(person_client ${catkin_LIBRARIES})
add_dependencies(person_client ${PROJECT_NAME}_gencpp)
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
rosrun learning_service person_server
# 开启新终端
rosrun learning_service person_client
```
## python demo
```shell script
cd 到 [工程名称]/src/learning_service
mkdir scripts
cd 到 [工程名称]/src/learning_service/scripts
```
### person_server.py
```python
import rospy
from learning_service.srv import Person, PersonResponse

def personCallback(req):
	# 显示请求数据
    rospy.loginfo("Person: name:%s  age:%d  sex:%d", req.name, req.age, req.sex)

	# 反馈数据
    return PersonResponse("OK")

def person_server():
	# ROS节点初始化
    rospy.init_node('person_server')

	# 创建一个名为/show_person的server，注册回调函数personCallback
    s = rospy.Service('/show_person', Person, personCallback)

	# 循环等待回调函数
    print "Ready to show person informtion."
    rospy.spin()

if __name__ == "__main__":
    person_server()
```
### person_client.py
```python
import sys
import rospy
from learning_service.srv import Person, PersonRequest

def person_client():
	# ROS节点初始化
    rospy.init_node('person_client')

	# 发现/spawn服务后，创建一个服务客户端，连接名为/spawn的service
    rospy.wait_for_service('/show_person')
    try:
        person_client = rospy.ServiceProxy('/show_person', Person)

		# 请求服务调用，输入请求数据
        response = person_client("Tom", 20, PersonRequest.male)
        return response.result
    except rospy.ServiceException, e:
        print "Service call failed: %s"%e

if __name__ == "__main__":
	#服务调用并显示调用结果
    print "Show person result : %s" %(person_client())
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
rosrun learning_service person_server.py
# 开启新终端
rosrun learning_service person_client.py
```
::: tip
服务端与客户端启动不分先后顺序，先启动的会等待后启动的
:::