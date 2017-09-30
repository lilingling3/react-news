import React,{Component} from 'react';
import {Link} from 'react-router'
import {Row,Col,Carousel,Tabs} from 'antd'

import carousel_1 from '../images/carousel_1.jpg';
import carousel_2 from '../images/carousel_2.jpg';
import carousel_3 from '../images/carousel_3.jpg';
import carousel_4 from '../images/carousel_4.jpg';

// 定义组件
import NewsImageBlock from './news_image_block'
import NewsBlock from './news_block'
import NewsProducts from './news_products'
// 先import 
const TabPane = Tabs.TabPane;
export default class NewContainer  extends Component {
  constructor(props,context){
    super(props,context)
  }

  render(){
    return (
      <div className='container'>
        <Row>
          <Col span={1}></Col>
          <Col span={22}>
          
            <div className='leftContainer' style={{width:'35%'}}>

                <Carousel autoplay={true}>
                  <div><img src={carousel_1}/></div>
                  <div><img src={carousel_2}/></div>
                  <div><img src={carousel_3}/></div>
                  <div><img src={carousel_4}/></div>
                </Carousel>

                <NewsImageBlock type='guoji' count={6} cardTitle="国际新闻" cardWidth="100%" imageWidth='112px'/>
            </div>

            <Tabs style={{width:'35%'}} className='tabs_news'>
              <TabPane tab="头条新闻" key="1">
                <NewsBlock type='top' count={21}></NewsBlock>
              </TabPane>
              <TabPane tab="国际新闻" key="2">
                <NewsBlock type='guoji' count={21}></NewsBlock>
              </TabPane>
            </Tabs>

            <Tabs style={{width:'30%'}}>
              <TabPane tab="React New 产品" key="1">
                  <NewsProducts></NewsProducts>
              </TabPane>
            </Tabs>
           <div>
              <NewsImageBlock type="guonei" count={8} cardTitle="国内新闻" cardWidth="100%" imageWidth='132px'></NewsImageBlock>
              <NewsImageBlock type="yule" count={16} cardTitle="娱乐新闻" cardWidth="100%" imageWidth='132px'></NewsImageBlock>
           </div>
          </Col>
          <Col span={1}></Col>
        </Row>
      </div>
    )
  }
}



