# WSL2
::: tip
需要win11系统
:::
## 基础使用
```shell:no-line-numbers
# 列举可用版本
wsl --list --online
# 安装
wsl --install -d Ubuntu
# 追加版本
wsl --install -d Ubuntu-20.04
# 查看
wsl -l
# 删除
wslconfig /u Ubuntu
# 进入后升级操作
sudo apt update
sudo apt upgrade
# 重启
wsl -t Ubuntu
```

## 可能用到
```shell:no-line-numbers
# 修改密码（需进入wsl）
sudo passwd <用户名>
# 查看系统版本
uname -a
```

## 网卡镜像模式
* 目的是让wsl和电脑为同一个ip地址[https://zhuanlan.zhihu.com/p/593263088](https://zhuanlan.zhihu.com/p/593263088)
> WSL2版本: 2.4.11.0
```shell:no-line-numbers
# 在用户目录下新建".wslconfig"文件，粘贴以下内容，重启wsl即可
[experimental]
networkingMode=mirrored
dnsTunneling=true
firewall=true
autoProxy=true
```

## 硬件连接
```shell:no-line-numbers
# win系统安装
winget install --interactive --exact dorssel.usbipd-win
# 使用时候可能需要更新并关机
wsl --update
wsl --shutdown
# wsl的linux安装
sudo apt install linux-tools-5.4.0-77-generic hwdata
sudo update-alternatives --install /usr/local/bin/usbip usbip /usr/lib/linux-tools/5.4.0-77-generic/usbip 20
# win系统操作选择挂载设备
usbipd wsl list
usbipd wsl attach -b x-xx
usbipd wsl detach -b x-xx
```

## 显卡驱动
```shell:no-line-numbers
# 安装图形驱动
sudo apt install mesa-utils
sudo add-apt-repository ppa:kisak/kisak-mesa
# 升级操作
sudo apt update && sudo apt dist-upgrade
# 查看显卡信息
nvidia-smi
# 查看图形测试
glxgears
```

## Docker安装
```shell:no-line-numbers
# 执行安装脚本
curl -fsSL get.docker.com -o get-docker.sh
sh get-docker.sh
# 删除脚本文件
rm get-docker.sh
# 启动服务
sudo service docker start
# 开机启动【wsl环境下并不好使】
sudo systemctl enable docker
```

## DockerGPU
```shell:no-line-numbers
# 添加源
distribution=$(. /etc/os-release; echo $ID$VERSION_ID)
curl -s -L https://nvidia.github.io/nvidia-docker/gpgkey | sudo apt-key add -
curl -s -L https://nvidia.github.io/nvidia-docker/$distribution/nvidia-docker.list | sudo tee /etc/apt/sources.list.d/nvidia-docker.list
# 安装toolkit
sudo apt-get update && sudo apt-get install -y nvidia-container-toolkit
# 重启docker
sudo systemctl restart docker 或者 sudo service docker restart
```
