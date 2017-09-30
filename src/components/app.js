import React ,{Component}from 'react'

// 引入组件
import NewHeader from './new_header';
import NewFooter from './new_footer';

// 引入样式模块
import  '../componentsCss/pc.css';
export default class App extends Component {
  render(){
      return (
        <div>
            <NewHeader></NewHeader>
            {this.props.children}
            <NewFooter></NewFooter>
        </div>
      )
  }
}