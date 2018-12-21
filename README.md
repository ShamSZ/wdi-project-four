
# **Project 4: Play & Watch** ![General Assembly](https://camo.githubusercontent.com/6ce15b81c1f06d716d753a61f5db22375fa684da/68747470733a2f2f67612d646173682e73332e616d617a6f6e6177732e636f6d2f70726f64756374696f6e2f6173736574732f6c6f676f2d39663838616536633963333837313639306533333238306663663535376633332e706e67)



## Overview
Play & Watch is an e-commerce web app that sells video games and movies. Users can register and keep track of their purchase history, have tailored suggestions made to them in the form of featured products and can leave their ratings.
Administrator accounts are able to see all the purchases made and keep track of sales  on the statistics page.

This was my fourth project as part of the General Assembly Web Development Immersive course. The objective was to build a full stack web application using React in **one week**.

Launch on [Heroku](https://play-and-watch.herokuapp.com). Check out the GitHub [Repo](https://github.com/ShamSZ/wdi-project-four).


## Brief

* Build a full-stack application by making your own backend and your own frontend

* Use an Express API to serve your data from a Mongo database

* Consume your API with a separate frontend built with React

* Be a complete product which most likely means multiple relationships and CRUD functionality for at least a couple of models

* Implement thoughtful user stories/wireframes that are significant enough to help you know which features are core MVP and which you can cut

* Be deployed online so it's publicly accessible.

* Have automated tests for at least one RESTful resource on the backend, and at least one classical and one functional component on the frontend.

## Technologies Used

* React
* JavaScript (ES6)
* HTML5
* SCSS
* Bulma CSS Framework
* Git
* GitHub
* bcrypt
* mongoose
* Heroku
* Trello
* Yarn
* Chai
* Mocha

## Approach Taken

### Models



#### User

``` JavaScript

```

#### Keypresses

``` JavaScript

```

### Audio

``` JavaScript

```
### Featured Piece of Code no. 1
This extract of code is responsible for returning a product that will be displayed on the index page as a Featured/suggested product.
It does so by taking all genres from the users purchase history, filtering through all products which match those genres and then removing the products already purchased by the user. At this point the function has an array of products not purchased by the user, but may be of interest to them because of the genre. A random product is then returned from the array .

From `/src/lib/common.js`:
``` JavaScript
function getSuggestion(myPurchases, products){
  if(myPurchases && myPurchases.length > 0){
    const productArray = [];
    const myGenres = getMyGenres(myPurchases);
    products.forEach(prod => {
      myGenres.forEach(myGenre => {
        if(prod.genre === myGenre){
          if(productArray.indexOf(prod) < 0){
            productArray.push(prod);
          }
        }
      });
    });
    const purchaseIds = [];
    for(let i = 0; i < myPurchases.length; i++){
      purchaseIds.push(myPurchases[i].product._id);
    }
    const finalArray = productArray.filter(prod => !purchaseIds.includes(prod._id));
    return finalArray[Math.floor(Math.random()*(finalArray.length))];
  }
}
```

### Featured Piece of Code no. 2
The Login and Register components are rendered conditionally based on login/register properties on this.state. When the user clicked on the button to login or register, the components would render, but the user would have click on the button again if they wanted to close the forms without submitting. As the forms were rendered earlier in the document flow, if the user scrolled down, they would still be able to see the content. I wrote the below code to toggle off the forms on scroll and found it cool how simple this solution was.  
From `/src/app.js`:

``` JavaScript
handleScroll(){
  const currentScrollPos = window.pageYOffset;
  if (this.state.prevScrollpos > currentScrollPos) {
    this.setState({ login: false, register: false });
  }
  this.setState({
    prevScrollpos: currentScrollPos
  });
}
```

## Trello
![trello](/images/trello.png)

## Wireframes

![wireframes](/images/wireframes.png)

## Screenshots

### At MVP
![mvp1](/images/mvp1.png)
![mvp2](/images/mvp2.png)

### Before final layout tweaks
![layout](/images/pre-style.png)

### Final Product
![index](/images/index.png)

## Bugs
Below is a list of some of the known bugs within the app:

* Shooting -
* Debris Generation -
* Game restart -
* Bonus -

## Wins and Blockers

One of the problems we faced initially...**add**

The biggest win, was getting the featured product suggestion working after being stuck on it for what it seemed like an eternity!

## Future Content

**Along with adding the shooting functionality, there are a number of potential future features I'd like to implement, such as:

* And much more!