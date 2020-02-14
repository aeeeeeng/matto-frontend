import React from 'react';
import './ImageTable.css';
import blankImage from '../../../../assets/img/no-image.jpg';

const ImageTable = props => {
    let image;
    if(!props.imgUrl || props.imgUrl === '') {
        image = blankImage
    } else {
        image = props.imgUrl;
    }

    return (<a href={image} target="_blank" rel="noopener noreferrer">
                <img className="image-table" src={image} alt={image}></img>
            </a>);
}

export default ImageTable;