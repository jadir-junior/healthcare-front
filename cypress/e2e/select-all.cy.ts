const rowOne = ['1003', '1008', '1009', '1001', '1007']
const rowTwo = ['1005', '1006', '1002', '1004', '1000']

const selectAll = () => {
  cy.getByTestId('checkbox header').click()
  cy.getByLabelText('select all').click()
  cy.getByLabelText('Page 2').click()
}

describe('Select All', () => {
  beforeEach(() => {
    cy.visit('/docs/table/lazy?page=1&limit=5')

    cy.getByLabelText('msw').click()

    cy.reload()
  })

  it('"SELECT ALL" pages', () => {
    cy.getByTestId('checkbox header').click()
    cy.getByLabelText('select all').click()

    rowOne.forEach((row) => {
      cy.getByTestId(`checkbox-${row}`).should('have.attr', 'aria-checked', 'true')
    })

    cy.getByLabelText('Page 2').click()

    cy.getByTestId('checkbox header').should('have.attr', 'aria-checked', 'true')

    rowTwo.forEach((row) => {
      cy.getByTestId(`checkbox-${row}`).should('have.attr', 'aria-checked', 'true')
    })
  })

  it('"SELECT ALL" and should deselect one row', () => {
    selectAll()

    cy.getByTestId('checkbox-1002').click()
    cy.getByTestId('checkbox-1002').should('have.attr', 'aria-checked', 'false')
  })

  it('"SELECT ALL" and should deselect one row and select again', () => {
    selectAll()

    cy.getByTestId('checkbox-1002').click()
    cy.getByTestId('checkbox-1002').should('have.attr', 'aria-checked', 'false')

    cy.getByTestId('checkbox-1002').click()
    cy.getByTestId('checkbox-1002').should('have.attr', 'aria-checked', 'true')
  })

  it('"SELECT ALL" and deselect with "CHECKBOX HEADER"', async () => {
    selectAll()

    cy.getByTestId('checkbox header').should('have.attr', 'aria-checked', 'true')
    cy.getByTestId('checkbox header').click()

    rowTwo.forEach((row) => {
      cy.getByTestId(`checkbox-${row}`).should('have.attr', 'aria-checked', 'false')
    })
    cy.getByTestId('checkbox header').should('have.attr', 'aria-checked', 'false')
    cy.getByLabelText('select all').contains('5 de 10 Select All')

    cy.getByLabelText('Page 1').click()
    rowOne.forEach((row) => {
      cy.getByTestId(`checkbox-${row}`).should('have.attr', 'aria-checked', 'true')
    })
    cy.getByTestId('checkbox header').should('have.attr', 'aria-checked', 'true')

    cy.getByTestId('checkbox header').click()
    cy.getByLabelText('select all').contains('0 de 10 Select all')
  })

  it('"SELECT ALL" and deselct with "CHECKBOX HEADER" and select again', () => {
    selectAll()

    cy.getByTestId('checkbox header').click()
    cy.getByLabelText('Page 1').click()
    cy.getByTestId('checkbox header').click()

    cy.getByTestId('checkbox header').click()
    cy.getByLabelText('select all').contains('5 de 10 Select All')
    rowOne.forEach((row) => {
      cy.getByTestId(`checkbox-${row}`).should('have.attr', 'aria-checked', 'true')
    })

    cy.getByLabelText('Page 2').click()
    cy.getByTestId('checkbox header').click()
    cy.getByLabelText('select all').contains('10 de 10 Select All')
    rowTwo.forEach((row) => {
      cy.getByTestId(`checkbox-${row}`).should('have.attr', 'aria-checked', 'true')
    })
  })
})
