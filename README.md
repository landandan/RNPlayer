# RNPlayer
基于react-native的音乐播放器  
音乐来源：网易云音乐

# Start
```
  git clone https://github.com/landandan/RNPlayer.git
  
  npm i
  ```
  
  # 效果展示
  ![效果展示](/src/images/show.gif)
  
# 引用库
## UI
[native-base](https://nativebase.io/)
第一次使用，感觉不是那么好用

# 遇到的问题
`Duplicate module name: ---`  
尝试解决方案：[https://github.com/aksonov/react-native-router-flux/issues/1809](https://github.com/aksonov/react-native-router-flux/issues/1809)

由于`react-native-router-flux`多次出现 以上问题，解决起来很麻烦，所以去除该模块，改用`react-navigation`


# 参考项目
[https://github.com/microzz/vue-music-player](https://github.com/microzz/vue-music-player)
  
[https://github.com/pheromone/react-native-videoDemo](https://github.com/pheromone/react-native-videoDemo)

[https://github.com/Binaryify/NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi)