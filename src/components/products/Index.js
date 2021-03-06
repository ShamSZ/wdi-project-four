import React from 'react';
import axios from 'axios';
import ProductBox from './ProductBox';
import IndexSuggestion from './IndexSuggestion';
import { getHeader, isAuthenticated } from '../../lib/auth';
import { getSuggestion, getRandomProduct } from '../../lib/common';

class ProductsIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ''
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.loadSuggestion = this.loadSuggestion.bind(this);
    this.getMyPurchases = this.getMyPurchases.bind(this);
  }

  componentDidMount() {
    //get all products
    axios.get('/api')
      .then(result => {
        //if user is logged in:
        if(isAuthenticated()){
          this.setState({
            products: result.data,
            filteredProducts: result.data
          },
          //get the users purchase history
          this.getMyPurchases());
        } else {
          //if user is not logged in:
          this.setState({
            products: result.data,
            filteredProducts: result.data,
            //get a random suggestion:
            suggestion: getRandomProduct(result.data)
          });
        }
      });
  }
  getMyPurchases(){
    axios.get('/api/mypurchases', getHeader())
      .then(myPurchases =>
        this.setState({
          myPurchases: myPurchases.data
          //use all the products and the purchase history to get a suggestion
        }, this.loadSuggestion(myPurchases.data)
        ));
  }

  loadSuggestion(myPurchases){
    const product = getSuggestion(myPurchases, this.state.products);
    this.setState({
      suggestion: product
    });

  }

  handleSearch(event){
    this.setState({ query: event.target.value });
    let filteredProducts = this.state.filteredProducts;
    const products = this.state.products;
    const query = this.state.query;
    filteredProducts = products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.format.toLowerCase().includes(query.toLowerCase()) ||
      product.genre.toLowerCase().includes(query.toLowerCase())
    );
    this.setState({ filteredProducts: filteredProducts });
  }

  render() {
    return (
      <section className="hero">
        <div>
          {this.state.suggestion &&
            <div>
              <IndexSuggestion suggestion={this.state.suggestion}/>
            </div>
          }
        </div>
        <div className="columns is-centered">
          <div className="column is-11 search-container">
            <div className="columns is-centered">
              <div className="column is-12 search-bar">
                <div className="field">
                  <div className="control is-expanded">
                    <input className="input has-text-centered"
                      onChange={this.handleSearch} type="search"
                      placeholder="What are you looking for?"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div id="marginIndex" className="columns is-centered">
          <div className="column is-12 index-items">
            <div className="columns is-multiline">
              {this.state.filteredProducts && this.state.filteredProducts.map(
                product => <ProductBox key={product._id} product={product}/>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }
}


export default ProductsIndex;
