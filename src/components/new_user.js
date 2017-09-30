import React ,{Component}from 'react'
import {Row, Col, Tabs, Card, Upload, Icon, Modal} from 'antd'
import axios from 'axios'
import {Link} from 'react-router'
const TabPane = Tabs.TabPane
export default class NewFooter extends Component {
  constructor(props,context){
    super(props,context)
  }
  state = {
    collections: null,
    comments: null,
    previewVisible: false,
    previewImage: '',
    fileList: [{
      uid: -1,
      name: 'xxx.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    }],
  }

  componentDidMount(){
    const userId = localStorage.getItem('userId')
    // 收藏列表
    let url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=${userId}`
    axios.get(url)
      .then(response => {
        const collections = response.data
        this.setState({collections})
      })
 // 评论列表
 url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=${userId}`
 axios.get(url)
   .then(response => {
     const comments = response.data
     this.setState({comments})
   })

  }

  handleCancel = () =>{
      this.setState({previewVisible:false})
  }

  handlePreview = (file) => {
    // 默认会传递file
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange =({fileList}) => {
    this.setState({fileList})
  }
  render(){
    const {comments,collections} = this.state
    const collectionList = !collections
    ?<h2>没有任何收藏，立即去收藏</h2>
    :(
      collections.map((collection,index)=> (
        <Card key={index} title={collection.uniquekey}
        extra={<Link to={`/newDetail/${collection.uniquekey}/top`}>查看</Link>}>
         {collection.Title}
       </Card>
      ))
    )
    const commentList = !comments
    ?<h2>没有任何评论</h2>
    :(
      collections.map((collection, index) => (
        <Card key={index} title={collection.uniquekey}
              extra={<Link to={`/newDetail/${collection.uniquekey}/top`}>查看</Link>}>
          {collection.Title}
        </Card>
      ))
    )

    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    return (
      <Row>
        <Col span={1}></Col>
        <Col span={22}>
          <Tabs>
            <TabPane key='1' tab='我的收藏列表'>{collectionList}
            </TabPane>
            <TabPane key='2' tab='我的评论列表'>{commentList}</TabPane>
            <TabPane key='3' tab='头像设置'>
              <div className='clearfix'>
              <Upload
                action="http://jsonplaceholder.typicode.com/photos"
                listType="picture-card"
                fileList={fileList}
                onPreview={this.handlePreview}
                onChange={this.handleChange}>
                {fileList.length >= 3 ? null : uploadButton}
            </Upload>
            <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
              </div>
            </TabPane>
          </Tabs>
        </Col>
        <Col span={1}></Col>
      </Row>
    )
  }
}