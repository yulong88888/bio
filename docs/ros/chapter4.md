# WorkSpace
* src： 代码空间
* build： 编译空间
* devel： 开发空间
* install： 安装空间

## 创建
```shell script
mkdir -p [工程名称]/src
cd [工程名称]/src
catkin_init_workspace
```
## 创建功能包
```shell script
cd 到 [工程名称]/src
catkin_create_pkg [工程名称] <depend1> <depend2> <depend3>
# 例如
catkin_create_pkg test_pkg std_msgs rospy roscpp
```
## 编译
```shell script
cd 到 [工程名称]
catkin_make
# 为了输出install文件夹
catkin_make install
```
## 设置工作空间环境变量
```shell script
source devel/setup.bash

# 查看环境变量
echo $ROS_PACKAGE_PATH
```