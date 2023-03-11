import React, { useState, useEffect } from 'react';
import s from './Cart.module.css';
import axios from 'axios';

function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    (async () => {
      const temp = [];
      try {
        const { data } = await axios.get('cart');
        data.data.forEach((element) => {
          temp.push({
            quantity: element.quantity,
            product: {
              ...element.id,
            },
          });
        });
        setCart(temp);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  console.log(cart);
  return (
    <div className={s.container}>
      <header className={s.header}>
        <h1>Cart</h1>
        <div>Home</div>
      </header>
      <section>
        {cart.map((item) => {
          return (
            <div key={item.product._id} className={s.card}>
              <img src={item.product.images[0]} alt={item.product.name} />
              <div className={s.info}>
                <h1>{item.product.name}</h1>
                <p>{item.product.description}</p>
                <p>{item.product.price}</p>
              </div>
              <div className={s.quantity}>
                <button>-</button>
                <p>{item.quantity}</p>
                <button>+</button>
              </div>
            </div>
          );
        })}
      </section>
      <button className={s.buyButton}>Buy</button>
    </div>
  );
}

export default Cart;
