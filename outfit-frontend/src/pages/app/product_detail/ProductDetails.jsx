import React from 'react';
import s from './ProductDetails.module.css';
import { useParams } from 'react-router-dom';
import useFetch from '../../../hooks/useFetch';
import Loading from '../../../components/loading/Loading.component';
import axios from 'axios';
import { useAuth } from '../../../context/Auth.context';

function ProductDetails() {
  const { id } = useParams();
  const { user } = useAuth();

  const { data, error, loading } = useFetch(`product/${id}`, null, []);

  const buyNow = async () => {
    const { data } = await axios.post('/payment');
    console.log('data', data);

    var options = {
      key: 'rzp_test_pc7mVHAa7eSphk', // Enter the Key ID generated from the Dashboard
      amount: data.order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      order_id: data.order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      currency: data.order.currency,
      name: 'Outfit', //your business name
      description: 'Test Transaction',
      image: '/vite.svg',
      //callback_url: 'https://eneqd3r9zrjok.x.pipedream.net/',
      prefill: {
        name: user?.name || 'Sanjay Kumar', //your customer's name
        email: user?.email || 'gaurav.kumar@example.com',
        contact: '9999999999',
      },
      notes: {
        address: 'user address',
      },
      theme: {
        color: '#FCA311',
      },
      handler: async function (response) {
        console.log(response);
        try {
          const { data } = await axios.post('payment/verify', {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          });
          console.log('data - payment', data);
        } catch (e) {
          console.log(e);
        }
      },
    };

    var razor_pay_ui = new Razorpay(options);
    razor_pay_ui.open();
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={s.container}>
      <div className={s.image}>
        <img src={data.images[0]} alt={data.name} />
      </div>
      <div className={s.info}>
        <h1>{data.title}</h1>
        <p>{data.description}</p>
        <p>{data.price}</p>
      </div>
      <button onClick={buyNow} className={s.btn}>
        Buy Now
      </button>
    </div>
  );
}

export default ProductDetails;
