import React ,{Component}from 'react'
import axios from 'axios' //提前引入

import {
  Row, // 行
  Col, // 列
  Menu,// 菜单
  Modal,// 确认框
  Icon, // 图标
  Button,// 按钮
  Tabs,
  Form,
  Input,
  message
} from 'antd';
import {Link} from 'react-router';
// 一个图片也是一个组件
import logo from '../images/logo.png';
// 菜单项组件
const MenuItem = Menu.Item;
//标签页
const TabPane = Tabs.TabPane;
// 表单
const FormItem = Form.Item;

class NewHeader extends Component {
  constructor(props,context){
    super(props,context)
    this.state = {
      selectedKey:'top',
      username:null,
      modalShow:false
    }
  }
  // 更改状态
  clickMenu = ({key})=>{
    if(key === 'logout'){
      this.setState({
        modalShow:true
      })
    }
    this.setState({
      selectedKey:key
    })
  }

  /**
   * 
   * 使用对象结构赋值
  clickMenu = (e)=>{
    this.setState({
      selectedKey:e.key
    })
  }
   * 
   */
  showModal = (isShow) => {
    this.setState({
      modalShow:isShow
    })
  }
  // 处理表单请求
  handleSubmit = (isLogin,event) => {
    event.preventDefault();// 阻止表单默认提交
    // 收集表单输入的数据
    const {username,password,r_userName,r_password,r_confirmPassword} = this.props.form.getFieldsValue();
 
    let url = 'http://newsapi.gugujiankong.com/Handler.ashx?';
    // 通过传递参数不同进行区分
    if(isLogin){
      url += `action=login&username=${username}&password=${password}`
    }else{
      url += `action=register&r_userName=${r_userName}&r_password=${r_password}&r_confirmPassword=${r_confirmPassword}`
    }

    axios.get(url)
      .then(response => {
        // 重置输入的值
        this.props.form.resetFields();
        const result = response.data;
        if(isLogin){ // 登陆返回
          if(!result){ //登陆失败
            message.error('登陆失败，重新登陆')
          }else{ // 登陆成功
            const userId = result.UserId;
            const username = result.NickUserName;
            this.setState({username}) // 更改状态
            // localstorage
            localStorage.setItem('username',username);
            localStorage.setItem('userId',userId);
            message.success('登陆成功')
          }
        }else{// 注册返回
          message.success('注册成功');

        }
      })

    // 隐藏
    this.setState({
      modalShow:false
    })
      
  }

  logout = () => {
     //更新状态
     this.setState({username: null})
     // 清除保存的用户数据
     localStorage.removeItem('username')
     localStorage.removeItem('userId')
  }
  render(){
    var {selectedKey,username,modalShow} = this.state;
    let { getFieldDecorator } = this.props.form; // 从form中获取属性
    
    const userShow = username ? (
      <MenuItem key="login" className="register">
        <Button type="primary">{username}</Button> &nbsp;&nbsp;
        <Link to="/newUser"><Button type="dashed">个人中心</Button></Link>&nbsp;&nbsp;
        <Button onClick={this.logout}>退出</Button>
      </MenuItem>
    ):(
      <MenuItem key="logout" className="register">
         <Icon type="appstore"/>登陆/注册
      </MenuItem>
    );



      return (
        <header>
            <Row>
                <Col span={1}></Col>
                <Col span={3}>
                  <a href='#/' className='login'>
                    <img src={logo} alt='login'/>
                    <span>ReactNews</span>
                  </a>
                </Col>
                <Col span={19}>
                  <Menu mode="horizontal"  onClick={this.clickMenu} selectedKeys={[selectedKey]}>
                      <MenuItem key="top">
                         <Icon type="appstore"/>头条
                      </MenuItem>
                      <MenuItem key="shehui">
                        <Icon type="appstore"/>社会
                      </MenuItem>
                      <MenuItem key="guonei">
                       <Icon type="appstore"/>国内
                      </MenuItem>
                      <MenuItem key="guoji">
                        <Icon type="appstore"/>国际
                      </MenuItem>
                      <MenuItem key="yule">
                        <Icon type="appstore"/>娱乐
                      </MenuItem>
                      <MenuItem key="tiyu">
                        <Icon type="appstore"/>体育
                      </MenuItem>
                      <MenuItem key="keji">
                        <Icon type="appstore"/>科技
                      </MenuItem>
                      <MenuItem key="shishang">
                        <Icon type="appstore"/>时尚
                      </MenuItem>
                      {userShow}
                  </Menu>
                  <Modal
                    visible={modalShow}
                    onOk={this.showModal.bind(this,false)}
                    onCancel={() =>this.showModal(false)}
                    okText="关闭">
                    <Tabs type='card' onChange={() => this.props.form.resetFields()}>
                      <TabPane tab="登陆" key="1">
                        <Form onSubmit={this.handleSubmit.bind(this,true)}>
                          <FormItem label='用户名'>
                            {
                              getFieldDecorator('username')(
                                <Input type='text' placeholder="请输入用户名"/>
                              )
                            }
                          </FormItem>
                          <FormItem label='密码'>
                            {
                              getFieldDecorator('password')(
                                <Input type='password' placeholder="请输入密码"/>
                              )
                            }
                          </FormItem>
                          <Button type="primary" htmlType='submit'>登陆</Button>
                        </Form>
                      </TabPane>
                      <TabPane tab="注册" key="2">
                      <Form  onSubmit={this.handleSubmit.bind(this,false)}>
                        <FormItem label='用户名'>
                          {
                            getFieldDecorator('r_userName')(
                              <Input type='text' placeholder="请输入用户名"/>
                            )
                          }
                        </FormItem>
                        <FormItem label='密码'>
                          {
                            getFieldDecorator('r_password')(
                              <Input type='password' placeholder="请输入密码"/>
                            )
                          }
                        </FormItem>
                        <FormItem label='确认密码'>
                          {
                            getFieldDecorator('r_confirmPassword')(
                              <Input type='password' placeholder="请输入密码"/>
                            )
                          }
                        </FormItem>
                        <Button type="primary" htmlType='submit'>注册</Button>
                      </Form>
                      </TabPane>
                    </Tabs>
                 </Modal>


                </Col>
                <Col span={1}></Col>
            </Row>
        </header>
      )
  }
}

//对NewHeader组件进行包装产生一个新的组件类, 向NewHeader传入一个属性: form
export default Form.create()(NewHeader)
// 使用form 必须这样包装