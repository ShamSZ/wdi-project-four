import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { getToken, getHeader } from '../../lib/auth';

class AllPurchases extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const token = getToken();
    console.log(token);
    axios.get('/api/allpurchases', getHeader())
      .then(result => this.setState({ purchases: result.data }));
  }
  render() {
    console.log(this.state.purchases);
    return (
      <main>
        {
          this.state.purchases && this.state.purchases.map(purchase =>
            <div key={purchase._id} style={{ display: 'flex', justifyContent: 'space-around' }}>
              <p>{moment(purchase.createdAt).fromNow()}</p>
              <p>{purchase.user.username}</p>
              <p>{purchase.product.name}</p>
              <p>£{purchase.unitPrice} per unit</p>
              <p>{purchase.unitQuantity}</p>
              <p>Total £{purchase.totalPrice}</p>
            </div>
          )
        }
      </main>
    );
  }
}

export default AllPurchases;