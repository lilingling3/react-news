import React,{Component,PropTypes} from 'react'
import {Card} from 'antd'
import axios from 'axios'
import {Link} from 'react-router'

export default class NewsImageBlock extends Component {
  // 定义传入参数的类型
  static propTypes = {
      type:PropTypes.string.isRequired,
      count:PropTypes.number.isRequired,
      cardTitle:PropTypes.string.isRequired,
      cardWidth:PropTypes.string.isRequired,
      imageWidth:PropTypes.string.isRequired
  }

  state = {
    newArr:null
  }
  componentDidMount () {
    const {type,count} = this.props;
    const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=${type}&count=${count}`
    axios.get(url)
    .then(response => {
      const newArr = response.data.map(
        ({uniquekey, title, author_name, thumbnail_pic_s})=> ({uniquekey, title, author_name,thumbnail_pic_s})
      )
      this.setState({newArr})
    })

  }

  render () {
    const {cardTitle,cardWidth,imageWidth,type} = this.props;
    const {newArr} = this.state;
    const imageStyle = {
      'display':'block',
      'height':'90px',
       width: imageWidth,
    }
    const titleStyle = {
      "width": imageWidth,
      "whiteSpace": "nowrap",
      "overflow": "hidden",
      "textOverflow": "ellipsis"
    }
    const newList = newArr?(
      newArr.map((news,index)=>(
        <div className='imageblock' key={index}>
          <Link to={`/newDetail/${news.uniquekey}/${type}`}>
            <div>
              <img src={news.thumbnail_pic_s} style={imageStyle}/>
            </div>
            <div className='custom-card'>
              <h3 style={titleStyle}>{news.title}</h3>
              <p>{news.author_name}</p>
            </div>
          </Link>

        </div>
      ) 
      )
    ):(<h2>没有新闻列表</h2>)
    return (
      <Card title={cardTitle} style={{width:cardWidth}} className='topNewsList'>
        {newList}
      </Card>
    )   
  }
}