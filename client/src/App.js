import React from 'react';
import logo from './logo.svg';
import './App.css';
import StripeCheckout from 'react-stripe-checkout'



function App() {

  const [product, setProduct] = React.useState({
    name: "Arsenal football club",
    price: "100",
    productBy: "Arsenal"
  })

  const makePayment = token => {
    const body = {
      token,
      product
    }
    const headers = {
      "Content-type": "application/json"
    }

    return fetch(`/api/payment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body)
    }).then(response => {
      console.log("RESPONSE ", response)
      const { status } = body
      console.log("STATUS ", status)
    })
      .catch(error => {
        console.log(error)
      })

  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        <StripeCheckout
          stripeKey={process.env.REACT_APP_KEY}
          token={makePayment}
          name="Buy AFC"
          amount={product.price * 100}


        >

          <button className="btn-large pink">Buy Arsenal for {product.price}</button>


        </StripeCheckout>




      </header>
    </div>
  );
}

export default App;
