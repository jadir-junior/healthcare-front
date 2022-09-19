/// <reference types="cypress" />

Cypress.Commands.add('getByLabelText', (selector) => {
  return cy.get(`[aria-label='${selector}']`)
})

Cypress.Commands.add('getAllByLabelText', (selector) => {
  return cy.get(`[aria-label^='${selector}']`)
})

Cypress.Commands.add('getByTestId', (selector) => {
  return cy.get(`[data-testid='${selector}']`)
})

Cypress.Commands.add('getAllByTestId', (selector) => {
  return cy.get(`[data-testid^='${selector}']`)
})

Cypress.Commands.add('startMockServiceWork', () => {
  window.localStorage.setItem('MSW', JSON.stringify(true))
})
