import React from 'react';
class ImgFigure extends React.Component {
    render() {
        var styleObj = {};
        // 如果props属性中指定了这张图片的位置，则使用
        if (this.props.arrange.pos) {
            styleObj = this.props.arrange.pos;
        }
        // 如果图片的旋转角度有值并且不为0， 添加旋转角度
        if (this.props.arrange.rotate) {
            (['MozTransform', 'msTransform', 'WebkitTransform', 'transform']).forEach(function (value) {
                styleObj[value] = 'rotate(' + this.props.arrange.rotate + 'deg)';
            }.bind(this));
        }
          // 如果是居中的图片， z-index设为11
          if (this.props.arrange.isCenter) {
            styleObj.zIndex = 11;
          }
        return (
            <figure className="img-figure" style={styleObj}>
                <img src={this.props.data.imgUrl}
                    alt={this.props.data.title} />
                <figcaption>
                    <h2 className="img-title">{this.props.data.title}</h2>
                </figcaption>
            </figure>
        )
    }
}
export default ImgFigure;