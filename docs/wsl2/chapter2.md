# 显卡
```shell
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