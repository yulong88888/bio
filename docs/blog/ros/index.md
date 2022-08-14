# ROS

## Example
* [https://github.com/ros/ros_tutorials](https://github.com/ros/ros_tutorials)

## Docker VNC
* [https://github.com/Tiryoh/docker-ros-desktop-vnc](https://github.com/Tiryoh/docker-ros-desktop-vnc)
```shell
sudo docker run -d -p 6080:80 --name=test -e RESOLUTION=1280x800 --shm-size=512m tiryoh/ros-desktop-vnc:melodic

sudo docker run -d -v /Users/guyulong/Desktop/simulation/ws:/home/ubuntu/Desktop/ws -p 6080:80 --name=test -e RESOLUTION=1280x800 --shm-size=512m tiryoh/ros-desktop-vnc:melodic
```