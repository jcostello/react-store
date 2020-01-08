import HomePage from './../pages/HomePage'
import productFactory from '../../../test/factories/productFactory'

let page, products

describe('Home Page', () => {
  beforeEach(() => {
    page = new HomePage()

    products = productFactory.buildList(3).concat(
      productFactory.build({description: 'Test Product'})
    )

    page.givenThereAreProducts(products)
  })

  describe('Listing', () => {
    it('renders a list of products', () => {
      page.visit()

      page.productList().should('contain', 'Test Product')
    })
  })

  describe('Adding to cart', () => {
    it('add one to the cart link counter', () => {
      page.visit()

      page.productList().first().find('#add').click()
      page.productList().last().find('#add').click()

      page.should('contain', 'Cart (2)')
      page.should('contain', `${products[0].description} (1)`)
      page.should('contain', `${products[products.length - 1].description} (1)`)
    })
  })

  describe('Decrease from cart', () => {
    it('add one to the cart link counter', () => {
      page.visit()

      page.productList().first().find('#add').click()
      page.productList().last().find('#add').click()
      page.productList().first().find('#remove').click()

      page.should('contain', 'Cart (1)')
      page.should('contain', `${products[products.length - 1].description} (1)`)
      page.should('contain', `${products[0].description} (0)`)
    })

    it('removes the product from cart', () => {
      page.visit()

      page.productList().first().find('#add').click()
      page.productList().first().find('#remove').click()

      page.should('contain', 'Cart (0)')
      page.should('contain', `${products[0].description} (0)`)
    })
  })
  
  describe('View Cart', () => {
    it('show the added products in the cart', () => {
      page.visit()

      page.productList().first().find('#add').click()

      cy.get('#cart-link').click()

      cy.get('html').should('contain', products[0].description)
    })
  })
})