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
        style={{ width, height:  width * 200 / 540}}
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
        height={width * 200 / 540}
        autoplayTimeout={5}
        paginationStyle={{
          bottom: 5,
        }}
        dot={<View
         style={{
           backgroundColor:'rgba(0,0,0,.2)',
           width: 5, height: 5,
           borderRadius: 2.5,
           marginLeft: 2,
           marginRight: 2,
           marginTop: 2,
           marginBottom: 2,}} />}
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