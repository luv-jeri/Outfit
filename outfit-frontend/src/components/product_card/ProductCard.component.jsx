import React from 'react';
import s from './ProductCard.module.css';
import { useState, useEffect, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ProductCardComponent(props) {
  const { title, thumbnail, price, _id } = props;
  const navigate = useNavigate();
  const [style, setStyle] = useState({
    transform: 'rotate(0deg)',
  });

  useLayoutEffect(() => {
    const random = Math.floor(Math.random() * 30) - 10;
    setStyle({
      ...style,
      transform: `rotate(${random}deg)`,
    });
  }, []);

  const onMouseEnter = () => {
    setStyle({
      transform: `scale(1.1)`,
    });
  };
  const onMouseLeave = () => {
    const random = Math.floor(Math.random() * 30) - 10;
    setStyle({
      transform: `rotate(${random}deg)`,
    });
  };

  const onClick = () => {
    navigate(`/product/${_id}`);
  };

  return (
    <div
      className={s.container}
      style={style}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <h2>{title}</h2>
      <img src={thumbnail} alt={`product_image-${title}`} />
      <p>${price}</p>
    </div>
  );
}

export default ProductCardComponent;
