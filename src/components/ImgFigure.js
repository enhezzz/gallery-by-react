import React from 'react';
class ImgFigure extends React.Component{
    render(){
        return (
            <figure className="img-figure">
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