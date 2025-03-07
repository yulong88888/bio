# Buildroot
* [https://buildroot.org/](https://buildroot.org/)

## Windows
> 进入到WSL2（不要在/mnt目录下编译，会很慢）
```shell:no-line-numbers
wget https://buildroot.org/downloads/buildroot-2024.02.11.tar.xz
tar xvf buildroot-2024.02.11.tar.xz
sudo apt install build-essential libncurses-dev file wget cpio unzip rsync bc bzip2 patch perl libelf-dev libssl-dev -y
export PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/usr/lib/wsl/lib
make menuconfig
# 选择架构，选中linux内核，并选中内核配置下的默认配置
make

# 可能会用到
# # 打开libffi 中的文件：
# vim output/build/host-libffi-3.4.4/m4/ax_enable_builddir.m4
# # 找到119行的位置
# test -f $srcdir/config.log   && mv $srcdir/config.log   .
# # 将 mv 改为 cp
# test -f $srcdir/config.log   && cp $srcdir/config.log   .
```