import React ,{Component}from 'react'
import {Col,Row}  from 'antd'

export default (props) => {
  return (
    <header>
      <Row>
        <Col span={1}></Col>
        <Col span={22} style={{textAlign:'center',padding:'20px'}}>
        2017 ReactNews. All Rights Reserved.
        </Col>
        <Col span={1}></Col>
      </Row>
    </header>
  )
}