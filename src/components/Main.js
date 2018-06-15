require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';
import imageDatas from '../data/imageDatas.json'
import ImgFigure from 'components/ImgFigure'
import ReactDOM from 'react-dom'
// let yeomanImage = require('../images/yeoman.png');
let imgDatas = (function getImgURL(imgArr){
  for(var i = 0;i<imgArr.length;i++){
    imgArr[i].imgUrl =require('../images/'+ imgArr[i].fileName)
  }
  return imgArr;
})(imageDatas);
class AppComponent extends React.Component {
  //组件加载之后，为每张图片计算位置的范围
  constructor(props){
    super(props);
    this.Constant = {
      centerPos: {
        left: 0,
        right: 0
      },
      hPosRange: {  //水平方向的取值范围
        leftSecX: [0,0],
        rightSecX:[0,0],
        y: [0,0]
      },
     vPosRange: { // 垂直方向的取值范围
       x: [0,0],
       topY: [0,0]
     }
    };
    this.state = {
      imgsArrangeArr : [
        // {
        //   pos: {
        //     left: '0',
        //     top: '0'
        //   }
        // }
      ]
    }
  }
/*
*重新布局所有图片
*param centerIndex 指定居中排布哪个图片
*/
rearrange(centerIndex){
  var imgsArrangeArr = this.state.imgsArrangeArr,
  Constant = this.Constant,
  centerPos = Constant.centerPos,
  hPosRange = Constant.hPosRange,
  vPosRange = Constant.vPosRange,
  hPosRangeLeftSecX = hPosRange.leftSecX,
  hPosRangeRightSecX = hPosRange.rightSecX,
  hPosRangeY = hPosRange.y,
  vPosRangeTopY = vPosRange.topY,
  vPosRangeX = vPosRange.x,

  imgsArrangeTopArr = [],
  topImgNum = Math.ceil(Math.random() * 2),
  //取一个或者不取
  topImgSpliceIndex = 0,
  imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex,1);

  //首先居中 centerIndex 的图片
  imgsArrangeCenterArr[0].pos = centerPos,

  //取出要布局上侧的图片的状态信息
  topImgSpliceIndex = Math.ceil(Math.random() * (
    imgsArrangeTopArr.length - topImgNum));
    imgsArrangeTopArr = imgsArrangeArr.splice(
      topImgSpliceIndex, topImgNum);

      //布局位于上侧的 图片
      imgsArrangeTopArr.forEach((value,index)=>{
        imgsArrangeTopArr[index].pos = {
          top: this.getRangeRandom(vPosRangeTopY[0],
            vPosRangeTopY[1]),
          left: this.getRangeRandom(vPosRangeX[0]) 
        }
      });

      //布局两侧的图片
      for(var i = 0,j = imgsArrangeArr,k = j/2;i < j;i++){
        var hPosRangeLORX = null;

        //前半部分布局左边，右半部分布局右边
        if(i < k){
          hPosRangeLORX = hPosRangeLeftSecX;
        }else{
          hPosRangeLORX = hPosRangeRightSecX;
        }

        imgsArrangeArr[i].pos = {
          top: this.getRangeRandom(hPosRangeY[0],hPosRangeY[1]),
          left: this.getRangeRandom(hPosRangeLORX[0],
          hPosRangeLORX[1])
        }
      }
      if(imgsArrangeTopArr && imgsArrangeTopArr[0]){
        imgsArrangeArr.splice(topImgSpliceIndex,0,
        imgsArrangeTopArr[0]);
      }
    
      imgsArrangeArr.splice(centerIndex,0,imgsArrangeCenterArr[0]);

      this.setState({
        imgsArrangeArr: imgsArrangeArr
      });
}
/*
*获取区间内的一个随机值
*/
getRangeRandom(low,high){
  return Math.ceil(Math.random() * (high - low) + low);
}
  componentDidMount(){
    var stageDOM = ReactDOM.findDOMNode(this.refs.stage),
        stageW = stageDOM.scrollWidth,
        stageH = stageDOM.scrollHeight,
        halfStageW = Math.ceil(stageW/2),
        halfStageH = Math.ceil(stageH/2);

        //拿到一个imageFigure的大小
        var imgFigureDOM = ReactDOM.findDOMNode(this.refs.imgFigure0),
            imgW = imgFigureDOM.scrollWidth,
            imgH = imgFigureDOM.scrollHeight,
            halfImgW = Math.ceil(imgW/2),
            halfImgH = Math.ceil(imgH/2);

            this.Constant.centerPos  = {
              left: halfStageW - halfImgW,
              top: halfStageH - halfImgH
            }
            //计算左侧、右侧区域图片排布位置的取值范围
            this.Constant.hPosRange.leftSecX[0] = -halfImgW;
            this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW*3;
            this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
            this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;
            this.Constant.hPosRange.y[0]= -halfImgH;
            this.Constant.hPosRange.y[1] = stageH - halfImgH;
            //计算上侧区域位置排布的取值范围
            this.Constant.vPosRange.topY[0] = -halfImgH;
            this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;
            this.Constant.vPosRange.x[0] = halfStageW - imgW;
            this.Constant.vPosRange.x[1] = halfStageW;

            this.rearrange(0)
  }
  render() {
    
    var controlerUnits = [];
    var imgFigures = [];
    imgDatas.forEach((imageData,index)=>{
      if(!this.state.imgsArrangeArr[index]){
        this.state.imgsArrangeArr[index] = {
          pos: {
            left: 0,
            top: 0
          }
        }
      }
      imgFigures.push(<ImgFigure data={imageData} ref={'imgFigure'+
    index} arrange={this.state.imgsArrangeArr[index]}></ImgFigure>)
    })
    return (
      // <div className="index">
      //   <img src={yeomanImage} alt="Yeoman Generator" />
      //   <div className="notice">Please edit <code>src/components/Main.js</code> to get started!</div>
      // </div>
      <section className="stage" ref="stage">
        <section className="img-sec">
          {imgFigures}
        </section>
        <nav className="controler-nav">
          {controlerUnits }
        </nav>
      </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
