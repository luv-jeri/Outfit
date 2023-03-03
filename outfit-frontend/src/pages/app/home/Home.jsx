import React, { useState, useEffect } from 'react';
import NavComponent from '../../../components/nav/Nav.component';
import s from './Home.module.css';
import ProductCardComponent from '../../../components/product_card/ProductCard.component';
import Loading from '../../../components/loading/Loading.component';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../../../store/productSlice';

function Home() {
  const [page, setPage] = useState(1);

  // const { data, error, loading } = useFetch(`product?page=${page}&limit=10`, null, [
  //   page,
  // ]);

  const arrayOfPages = new Array(20).fill('a');
  const { data, loading, error } = useSelector((state) => state.products);
  const cart = useSelector((state) => state);
  console.log('cart', cart);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      fetchProducts({
        page,
      })
    );
  }, [page]);

  

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
      <footer className={s.footer}>
        {arrayOfPages.map((item, index) => {
          return (
            <div
              key={index}
              className={s.number}
              onClick={() => {
                setPage(index + 1);
              }}
            >
              {index + 1}
            </div>
          );
        })}
      </footer>
    </header>
  );
}

export default Home;
