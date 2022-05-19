# Docker
```shell
# 安装
curl -fsSL get.docker.com -o get-docker.sh
sh get-docker.sh
# 删除文件
rm get-docker.sh
# 启动服务
sudo service docker start
# 开机启动
sudo systemctl enable docker

# 添加源
distribution=$(. /etc/os-release; echo $ID$VERSION_ID)
curl -s -L https://nvidia.github.io/nvidia-docker/gpgkey | sudo apt-key add -
curl -s -L https://nvidia.github.io/nvidia-docker/$distribution/nvidia-docker.list | sudo tee /etc/apt/sources.list.d/nvidia-docker.list
# 安装toolkit
sudo apt-get update && sudo apt-get install -y nvidia-container-toolkit
# 重启docker
sudo systemctl restart docker 或者 sudo service docker restart
```