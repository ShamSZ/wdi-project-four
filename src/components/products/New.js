import React from 'react';
import axios from 'axios';
import { getHeader } from '../../lib/auth';

class ProductNew extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      images: ['', '', '']
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    axios.post('/api/', this.state, getHeader())
      .then(result => {
        this.props.history.push(`/product/${result.data._id}`);
      });
  }

  handleChange({ target: {name, value }}) {
    if(name.includes('images')) {
      const index = name[6] - 1;
      const newImages = this.state.images;
      newImages.splice(index, 1, value);
      this.setState({ images: newImages });
    }
    this.setState({ [name]: value });
  }

  render() {
    return(
      <section className="hero is-fullheight">
        <div className="hero-body">
          <div className="container has-text-centered">
            <div className="column is-4 is-offset-4">
              <div className="box back-image">
                <h3 id="addingtext" className="title">Add a Product</h3>
                <form className="loginform" onSubmit={this.handleSubmit}>


                  <div className="field">
                    <div className="control">
                      <input className="input " onChange={this.handleChange}  value={this.state.name || ''}  name="name" placeholder="Name"  />
                    </div>
                  </div>

                  <div className="select">
                    <select className="selection" name="format" onChange={this.handleChange} selected={this.state.format || ''}>
                      <option>Format</option>
                      <option value="PS4">PS4</option>
                      <option value="XBOX">XBOX</option>
                      <option value="Movie">Movie</option>
                    </select>
                  </div>


                  <div className="select">
                    <select className="selection" name="genre" onChange={this.handleChange} selected={this.state.genre || ''}>
                      <option>Genre</option>
                      <option value="RPG">RPG</option>
                      <option value="Racing">Racing</option>
                      <option value="Shooter">Shooter</option>
                      <option value="Drama">Drama</option>
                      <option value="Action">Action</option>
                    </select>
                  </div>


                  <div className="field imagesadd">
                    <div className="control">
                      <input className="input" onChange={this.handleChange}   value={this.state.images[0] || ['']}  name="images1"  placeholder="Main imageUrl"/>
                      <input className="input" onChange={this.handleChange}   value={this.state.images[1] || ['']}  name="images2"  placeholder="ImageUrl 2"/>
                      <input className="input" onChange={this.handleChange}   value={this.state.images[2] || ['']}  name="images3"  placeholder="ImageUrl 3"/>
                    </div>
                  </div>

                  <div className="field">
                    <div className="control">
                      <input className="input" onChange={this.handleChange}   value={this.state.video || ''}  name="video"  placeholder="Video"/>
                    </div>
                  </div>
                  <div className="field">
                    <div className="control">
                      <input className="input" onChange={this.handleChange}   value={this.state.unitPrice || ''}  name="unitPrice"  placeholder="Price"/>
                    </div>
                  </div>
                  <div className="field">
                    <div className="control">
                      <textarea className="input" onChange={this.handleChange} value={this.state.description || ''} placeholder="Enter description here..." name="description" ></textarea>
                    </div>
                  </div>
                  <div className="field">
                    <div className="control">
                      <input className="input" onChange={this.handleChange}   value={this.state.releaseDate || ''}  name="releaseDate"  placeholder="Release Date"/>
                    </div>
                  </div>
                  <button className="button button-form">Add</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}


export default ProductNew;
