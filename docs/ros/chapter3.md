# 常用命令
```shell script
rostopic
rosservice
rosnode
rosparam
rosmsg
rossrv
```
## rosnode
```shell script
# 显示ROS系统节点，rosout是ros默认的系统节点
rosnode list
# 显示节点信息
rosnode info /[node name]
```
## rostopic
```shell script
# 显示ROS话题列表
rostopic list
# 发布话题消息
rostopic pub /[话题名称] 双击tab键补全后面的消息结构和内容
# 10HZ循环发布话题消息
rostopic pub -r 10 /[话题名称] 双击tab键补全后面的消息结构和内容
```
## rosmsg
```shell script
# 查看消息的结构
rosmsg show [消息结构名称] 双击tab键补全后面的消息结构
```
## rosservice
```shell script
# 查看消息的服务内容
rosservice list
# 例子画一只新海龟
rosservice call /spawn 双击tab键补全
```
## rosbag
```shell script
# 记录数据
rosbag record -a -O cmd_record
# 复现数据
rosbag play cmd_record.bag
```