import Page from './Page'

class HomePage extends Page {
  URL = '/'
  products = []

  givenThereAreProducts = (products) => {
    this.products = products

    cy.route({ url: '/api/products', method: 'GET', response: this.products })
  }

  productList = () => {
    return cy.get('#products li')
  }
}

export default HomePage