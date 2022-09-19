const rowsTablePageOne = ['1003', '1009', '1001', '1007']

const allRowsPageOneSelected = () => {
  cy.getByTestId('checkbox-1009').should('have.attr', 'aria-checked', 'true')
  cy.getByTestId('checkbox-1003').should('have.attr', 'aria-checked', 'true')
  cy.getByTestId('checkbox-1001').should('have.attr', 'aria-checked', 'true')
  cy.getByTestId('checkbox-1003').should('have.attr', 'aria-checked', 'true')
  cy.getByTestId('checkbox-1007').should('have.attr', 'aria-checked', 'true')
  cy.getByTestId('checkbox-1008').should('have.attr', 'aria-checked', 'false')
}

describe('Selection Table', () => {
  beforeEach(() => {
    cy.startMockServiceWork()

    cy.visit('/docs/table/selection?page=1&limit=5')
  })

  it('initial state', () => {
    cy.getByTestId('checkbox header').should('have.attr', 'aria-checked', 'false')
    cy.getAllByTestId('checkbox-').should('have.length', 5)
    cy.getByLabelText('checkbox-1008').should('be.disabled')
  })

  it('select two rows', () => {
    cy.getByTestId('checkbox-1003').click()
    cy.getByTestId('checkbox-1009').click()

    cy.getByTestId('checkbox-1009').should('have.attr', 'aria-checked', 'true')
    cy.getByTestId('checkbox-1003').should('have.attr', 'aria-checked', 'true')
  })

  it('select all rows on the page without select disabled', () => {
    cy.getByTestId('checkbox header').click()

    allRowsPageOneSelected()
  })

  it('select with "SELECT HEADER" and select rows and deselect "SELECT HEADER"', () => {
    cy.getByTestId('checkbox header').click()

    rowsTablePageOne.forEach((row) => {
      cy.getAllByTestId(`checkbox-${row}`).should('have.attr', 'aria-checked', 'true')
    })

    cy.getByTestId('checkbox header').click()

    rowsTablePageOne.forEach((row) => {
      cy.getAllByTestId(`checkbox-${row}`).should('have.attr', 'aria-checked', 'false')
    })
  })

  it('select all rows in two pages', () => {
    cy.getByTestId('checkbox header').click()
    cy.getByLabelText('Page 2').click()

    cy.getByTestId('checkbox header').should('have.attr', 'aria-checked', 'false')

    cy.getByTestId('checkbox header').click()

    cy.getByTestId('checkbox-1006').should('have.attr', 'aria-checked', 'true')
    cy.getByTestId('checkbox-1004').should('have.attr', 'aria-checked', 'true')
    cy.getByTestId('checkbox-1000').should('have.attr', 'aria-checked', 'true')
    cy.getByTestId('checkbox-1005').should('have.attr', 'aria-checked', 'false')
    cy.getByTestId('checkbox-1002').should('have.attr', 'aria-checked', 'false')
  })

  it('select all rows on two pages and return to first and have continued selected', () => {
    cy.getByTestId('checkbox header').click()
    cy.getByLabelText('Page 2').click()
    cy.getByTestId('checkbox header').click()

    cy.getByLabelText('Page 1').click()

    allRowsPageOneSelected()
  })
})
