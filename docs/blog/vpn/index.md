# VPN

## 官方地址
* [https://github.com/hwdsl2/docker-ipsec-vpn-server](https://github.com/hwdsl2/docker-ipsec-vpn-server)

## 启动
```shell:no-line-numbers
docker run \
    --name ipsec-vpn-server \
    --env-file /home/ubuntu/vpn/vpn.env \
    --restart=always \
    -v ikev2-vpn-data:/etc/ipsec.d \
    -v /lib/modules:/lib/modules:ro \
    -p 500:500/udp \
    -p 4500:4500/udp \
    -d --privileged \
    hwdsl2/ipsec-vpn-server

# vpn.env
# 预共享密钥
VPN_IPSEC_PSK=[长度20的随机字符串]
# 用户账号
VPN_USER=****
# 链接密码
VPN_PASSWORD=****

VPN_ADDL_USERS=user1 user2
VPN_ADDL_PASSWORDS=pass1 pass2
VPN_ADDL_IP_ADDRS=192.168.42.2 *
```

## 使用
```shell:no-line-numbers
ios需要添加IPSEC
mac需要倒入证书
```