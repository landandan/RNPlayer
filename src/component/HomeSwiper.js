/**
 * @flow
 */
import React, { Component } from 'react'
import {
  View,
  Image,
  Dimensions,
  TouchableHighlight,
} from 'react-native'
import Swiper from 'react-native-swiper'

const { width } = Dimensions.get('window')
function SwiperImg(props: {
  data: {
    imageUrl: string,
    typeTitle: string,
  }
}) {
  const { imageUrl, typeTitle } = props.data
  return (
    <TouchableHighlight>
      <Image
        source={{ uri: imageUrl }}
        style={{ width, height: 150 }}
        resizeMode={'stretch'}
      />
    </TouchableHighlight>
  )
}

class HomeSwiper extends Component {
  render() {
    let dataFlag = false
    const banners = this.props.banners || []
    if(banners && banners.length > 0){
      dataFlag = true
    }
    return(
      dataFlag && <Swiper
        showsButtons={false}
        autoplay
        height={540 * 200 / width}
        autoplayTimeout={5}
        >
        {
          banners.map((item, key) =>
            <SwiperImg
              data={item}
              key={key}
              {...this.props}
            />)
        }
      </Swiper>
    )
  }
}

export default HomeSwiper