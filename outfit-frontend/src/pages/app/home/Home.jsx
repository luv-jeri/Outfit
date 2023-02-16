import React, { useState, useEffect } from 'react';
import NavComponent from '../../../components/nav/Nav.component';
import s from './Home.module.css';
import ProductCardComponent from '../../../components/product_card/ProductCard.component';
import Loading from '../../../components/loading/Loading.component';
import useFetch from '../../../hooks/useFetch';

function Home() {
  const { data, error, loading } = useFetch('product', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    query: {
      select: 'title thumbnail price',
    },
  });

  return (
    <header className={s.container}>
      <NavComponent />
      <section id='list' className={s.list}>
        {!loading ? (
          !error ? (
            data.map((item) => {
              return (
                <ProductCardComponent key={item._id} {...item}></ProductCardComponent>
              );
            })
          ) : (
            <h1>Something went wrong</h1>
          )
        ) : (
          <Loading />
        )}
      </section>
    </header>
  );
}

export default Home;
