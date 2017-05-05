/**
 * @flow
 */
import React, { Component } from 'react'
import {
  View,
  Text,
} from 'react-native'
import {
  Container, Content, Footer,
} from 'native-base'
import HomeFooterWithPlayControl from '../component/HomeFooterWithPlayControl'
import InitMusicList from "../utils/InitMusicList"
import Recommend from '../component/home/Recommend'

class RecommendModule extends Component {
  render() {
    return (
      <Container>
        <Content>
          <Recommend />
        </Content>
        <Footer>
          <HomeFooterWithPlayControl
            musicData={InitMusicList.musicData}
            navigation={this.props.navigation}
          />
        </Footer>
      </Container>
    )
  }
}

export default RecommendModule