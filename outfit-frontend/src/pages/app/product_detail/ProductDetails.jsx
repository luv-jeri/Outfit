import React from 'react';
import s from './ProductDetails.module.css';
import { useParams } from 'react-router-dom';
import useFetch from '../../../hooks/useFetch';
import Loading from '../../../components/loading/Loading.component';

function ProductDetails() {
  const { id } = useParams();

  const { data, error, loading } = useFetch(`product/${id}`);

  return <div>ProductDetails</div>;
}

export default ProductDetails;
