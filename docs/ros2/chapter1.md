# ROS2环境搭建
::: tip
ROS-FOXY官方安装步骤
[https://docs.ros.org/en/foxy/Installation/Ubuntu-Install-Binary.html](https://docs.ros.org/en/foxy/Installation/Ubuntu-Install-Binary.html)
:::
```shell script
sudo apt update && sudo apt install curl gnupg2 lsb-release

# 使用代码或者单独下载再复制
# 复制命令为 sudo cp ros.key /usr/share/keyrings/ros-archive-keyring.gpg
sudo curl -sSL https://raw.githubusercontent.com/ros/rosdistro/master/ros.key  -o /usr/share/keyrings/ros-archive-keyring.gpg

echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/ros-archive-keyring.gpg] http://packages.ros.org/ros2/ubuntu $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/ros2.list > /dev/null

sudo apt update

sudo apt install ros-foxy-desktop

# 解决每次启动控制台，需要手动source ros目录的问题
echo "source /opt/ros/foxy/setup.bash" >> ~/.bashrc
```

