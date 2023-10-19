/// <reference types="Cypress" />

declare namespace Cypress {
  interface Chainable {
    getByLabelText(dataAriaLabelAttribute: string): Chainable<JQuery<HTMLElement>>
    getAllByLabelText(dataAriaLabelAttribute: string): Chainable<JQuery<HTMLElement>>
    getByTestId(dataTestIdAttribute: string): Chainable<JQuery<HTMLElement>>
    getAllByTestId(dataTestIdAttribute: string): Chainable<JQuery<HTMLElement>>
    startMockServiceWork(): void
    closeMockServiceWork(): void
  }
}
