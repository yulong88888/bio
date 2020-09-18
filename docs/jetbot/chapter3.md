# 视频流
## 准备
```shell script
# master端（Nano端）桌面新建工作空间
cd Desktop
mkdir -p catkin_ws/src
cd catkin_ws/src
git clone https://github.com/ros-drivers/camera_umd
catkin_create_pkg learning_camera
cd learning_camera
mkdir launch
touch camera.launch
vi camera.launch
```
```xml
<!-- camera.launch -->
<launch>
    <node name="uvc_camera_node" pkg="uvc_camera" type="uvc_camera_node" output="screen">
        <remap from="/image_raw" to="/camera/rgb/image_raw"/>
        <remap from="/camera_info" to="/camera/rgb/camera_info"/>
        <param name="width" type="int" value="640"/>
        <param name="height" type="int" value="480"/>
        <param name="fps" type="int" value="30"/>
        <param name="frame" type="string" value="wide_stereo"/>
        <param name="auto_focus" type="bool" value="False"/>
        <param name="focus_absolute" type="int" value="0"/>
        <!-- other supported params: auto_exposure, exposure_absolute, brightness, power_line_frequency -->
        <param name="device" type="string" value="/dev/video0"/>
        <param name="camera_info_url" type="string" value="file://$(find uvc_camera)/example.yaml"/>
    </node>
    <node pkg="topic_tools" type="transform" name="compressed_image"
          args="/camera/rgb/image_raw/compressed /compressed_image sensor_msgs/CompressedImage 'm'"
          required="true">
    </node>
</launch>
```
## 运行
```shell script
# cd 到 catkin_ws/src
# 如果报错则需要执行“apt-get install libv4l-dev”
catkin_make
# master端（Nano端）
roslaunch learning_camera camera.launch
# slave端（Ubuntu端）
rosrun rqt_image_view rqt_image_view
```
