import React from 'react'
import Users from './users'

describe('<Users />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Users />)
  })
})