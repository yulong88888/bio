# Topic自定义与使用
## 创建.msg文件
```shell script
cd 到 [工程名称]/src/learning_topic
mkdir msg
cd msg
touch Person.msg
# 内容为
# string name
# uint8  age
# uint8  sex
# uint8 unknown = 0
# uint8 male    = 1
# uint8 female  = 2
```
## 添加功能包依赖
```xml
<!--在[工程名称]/src/learning_topic/package.xml中添加依赖-->
<build_depend>message_generation</build_depend>
<exec_depend>message_runtime</exec_depend>
```
## 添加编译选项
```cmake
# 编辑learning_topic下CMakeLists.txt
在find_package下添加message_generation

add_message_files(FILES Person.msg)
generate_messages(DEPENDENCIES std_msgs)

在catkin_package下取消CATKIN_DEPENDS整行注释，并追加message_runtime
```
## 编译转化.msg
```shell script
cd 到 [工程名称]
catkin_make
# 编译完成后，.msg将被转为cpp和py能用的库文件
# 例如，在/[工程名]/devel/include/learning_topic下会多出Person.h
```
## cpp demo
```shell script
cd 到 [工程名称]/src/learning_topic/src
```
### person_publisher.cpp
```cpp
#include <ros/ros.h>
#include "learning_topic/Person.h"

int main(int argc, char **argv) {
    // ROS节点初始化
    ros::init(argc, argv, "person_publisher");

    // 创建节点句柄
    ros::NodeHandle n;

    // 创建一个Publisher，发布名为/person_info的topic，消息类型为learning_topic::Person，队列长度10
    ros::Publisher person_info_pub = n.advertise<learning_topic::Person>("/person_info", 10);

    // 设置循环的频率
    ros::Rate loop_rate(1);

    int count = 0;
    while (ros::ok()) {
        // 初始化learning_topic::Person类型的消息
    	learning_topic::Person person_msg;
		person_msg.name = "Tom";
		person_msg.age  = 18;
		person_msg.sex  = learning_topic::Person::male;

        // 发布消息
		person_info_pub.publish(person_msg);

       	ROS_INFO("Publish Person Info: name:%s  age:%d  sex:%d", 
				  person_msg.name.c_str(), person_msg.age, person_msg.sex);

        // 按照循环频率延时
        loop_rate.sleep();
    }

    return 0;
}
```
### person_subscriber.cpp
```cpp
#include <ros/ros.h>
#include "learning_topic/Person.h"

// 接收到订阅的消息后，会进入消息回调函数
void personInfoCallback(const learning_topic::Person::ConstPtr& msg) {
    // 将接收到的消息打印出来
    ROS_INFO("Subcribe Person Info: name:%s  age:%d  sex:%d", 
			 msg->name.c_str(), msg->age, msg->sex);
}

int main(int argc, char **argv) {
    // 初始化ROS节点
    ros::init(argc, argv, "person_subscriber");

    // 创建节点句柄
    ros::NodeHandle n;

    // 创建一个Subscriber，订阅名为/person_info的topic，注册回调函数personInfoCallback
    ros::Subscriber person_info_sub = n.subscribe("/person_info", 10, personInfoCallback);

    // 循环等待回调函数
    ros::spin();

    return 0;
}
```
### 编辑CMakeLists.txt
```cmake
# 文件在learning_topic下，下面内容放到build内容下即可
add_executable(person_publisher src/person_publisher.cpp)
target_link_libraries(person_publisher ${catkin_LIBRARIES})
add_dependencies(person_publisher ${PROJECT_NAME}_generate_messages_cpp)

add_executable(person_subscriber src/person_subscriber.cpp)
target_link_libraries(person_subscriber ${catkin_LIBRARIES})
add_dependencies(person_subscriber ${PROJECT_NAME}_generate_messages_cpp)
```
### 编译&运行
```shell script
cd 到 [工程名称]
catkin_make
# 开启新终端
roscore
# 开启新终端
rosrun learning_topic person_subscriber
# 开启新终端
rosrun learning_topic person_publisher
```
## python demo
```shell script
cd 到 [工程名称]/src/learning_topic
mkdir scripts
cd 到 [工程名称]/src/learning_topic/scripts
```
### person_publisher.py
```python
import rospy
from learning_topic.msg import Person

def velocity_publisher():
	# ROS节点初始化
    rospy.init_node('person_publisher', anonymous=True)

	# 创建一个Publisher，发布名为/person_info的topic，消息类型为learning_topic::Person，队列长度10
    person_info_pub = rospy.Publisher('/person_info', Person, queue_size=10)

	#设置循环的频率
    rate = rospy.Rate(10) 

    while not rospy.is_shutdown():
		# 初始化learning_topic::Person类型的消息
    	person_msg = Person()
    	person_msg.name = "Tom";
    	person_msg.age  = 18;
    	person_msg.sex  = Person.male;

		# 发布消息
        person_info_pub.publish(person_msg)
    	rospy.loginfo("Publsh person message[%s, %d, %d]", 
				person_msg.name, person_msg.age, person_msg.sex)

		# 按照循环频率延时
        rate.sleep()

if __name__ == '__main__':
    try:
        velocity_publisher()
    except rospy.ROSInterruptException:
        pass
```
### person_subscriber.py
```python
import rospy
from learning_topic.msg import Person

def personInfoCallback(msg):
    rospy.loginfo("Subcribe Person Info: name:%s  age:%d  sex:%d", 
			 msg.name, msg.age, msg.sex)

def person_subscriber():
	# ROS节点初始化
    rospy.init_node('person_subscriber', anonymous=True)

	# 创建一个Subscriber，订阅名为/person_info的topic，注册回调函数personInfoCallback
    rospy.Subscriber("/person_info", Person, personInfoCallback)

	# 循环等待回调函数
    rospy.spin()

if __name__ == '__main__':
    person_subscriber()
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
rosrun learning_topic person_subscriber.py
# 开启新终端
rosrun learning_topic person_publisher.py
```
::: tip
建立连接后，ros master退出不影响节点交互，但影响全局变量的使用
:::