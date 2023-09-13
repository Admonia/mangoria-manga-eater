import React from 'react'
import Anime from './anime'

describe('<Anime />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Anime />)
  })
})

describe('<Anime />', () => {
  it('it has a title', () => {
    cy.mount(<Anime />);
  });
});

describe('Anime Component', () => {
  it('has a description', () => {
    cy.mount(<Anime />);
  });
});

describe('Anime Component', () => {
  it('should have an anime titled Yu Yu Hakusho', () => {
    cy.mount(<Anime />);
  });
});

describe('Anime Component', () => {
  it('should have delete button', () => {
    cy.mount(<Anime /> );
  });
});

describe('Anime Component', () => {
  it('should have edit button', () => {
    cy.mount(<Anime />);
  });
});


