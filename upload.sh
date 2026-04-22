yarn docs:build
scp -i /Users/guyulong/.ssh/lengmang.pem -r ./docs/.vuepress/dist/** root@www.lengmang.cn:~/nginx/app/root