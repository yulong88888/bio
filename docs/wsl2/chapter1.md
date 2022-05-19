# 安装
:::warning
需要win11系统
:::
```shell
# 安装
wsl --install -d Ubuntu
# 查看
wsl -l
# 删除
wslconfig /u Ubuntu
# 进入后升级操作
sudo apt update
sudo apt upgrade
```

# 不常用的命令
```shell
# 修改密码（需进入wsl）
sudo passwd <用户名>
# 查看系统版本
uname -a
```