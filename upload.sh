yarn docs:build
scp -i /Users/guyulong/.ssh/lengmang.pem -r ./docs/.vuepress/dist/** root@www.lengmang.net:~/nginx/app/root