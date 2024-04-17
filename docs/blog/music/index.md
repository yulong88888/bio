# 音频分离器
* [https://github.com/deezer/spleeter](https://github.com/deezer/spleeter)
```Dockerfile:no-line-numbers
FROM python:3.7

ENV MODEL_PATH /model

RUN mkdir -p /model
RUN apt-get update && apt-get install -y ffmpeg libsndfile1
RUN pip install musdb museval
RUN pip install spleeter
```

```shell:no-line-numbers
sudo docker build -f Dockerfile.spleeter -t spleeter .

sudo docker run -it --rm spleeter:latest /bin/bash

spleeter separate -p spleeter:2stems -o output audio_example.mp3 -c mp3
```