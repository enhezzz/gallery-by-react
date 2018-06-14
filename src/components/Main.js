require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';
import imageDatas from '../data/imageDatas.json'
// let yeomanImage = require('../images/yeoman.png');
(function getImgURL(imgArr){
  for(var i = 0;i<imgArr.length;i++){
    imgArr[i].imgUrl =require('../images/'+ imgArr[i].fileName)
  }
  return imgArr;
})(imageDatas);
class AppComponent extends React.Component {
  render() {
    return (
      // <div className="index">
      //   <img src={yeomanImage} alt="Yeoman Generator" />
      //   <div className="notice">Please edit <code>src/components/Main.js</code> to get started!</div>
      // </div>
      <section className="stage">
        <section className="img-sec">
        </section>
        <nav className="controler-nav"></nav>
      </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
