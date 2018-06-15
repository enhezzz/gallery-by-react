import React from 'react';
class ImgFigure extends React.Component{
    render(){
        var styleObj = {};
        console.log(this.props.arrange.pos)
        // 如果props属性中指定了这张图片的位置，则使用
        if(this.props.arrange.pos){
            styleObj = this.props.arrange.pos;
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