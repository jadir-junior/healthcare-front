const rowOne = ['1003', '1008', '1009', '1001', '1007']
const rowTwo = ['1005', '1006', '1002', '1004', '1000']

const selectAll = () => {
  cy.getByTestId('checkbox header').click()
  cy.getByLabelText('select all').click()
  cy.getByLabelText('Page 2').click()
}

describe('Select All', () => {
  beforeEach(() => {
    cy.startMockServiceWork()
    cy.visit('/docs/table/selectall?page=1&limit=5')
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
    cy.getByLabelText('5 of 10').should('exist')

    cy.getByLabelText('Page 1').click()
    rowOne.forEach((row) => {
      cy.getByTestId(`checkbox-${row}`).should('have.attr', 'aria-checked', 'true')
    })
    cy.getByTestId('checkbox header').should('have.attr', 'aria-checked', 'true')

    cy.getByTestId('checkbox header').click()
    cy.getByLabelText('0 of 10').should('exist')
  })

  it('"SELECT ALL" and deselect with "CHECKBOX HEADER" and select again', () => {
    selectAll()

    cy.getByTestId('checkbox header').click()
    cy.getByLabelText('Page 1').click()
    cy.getByTestId('checkbox header').click()

    cy.getByTestId('checkbox header').click()
    cy.getByLabelText('5 of 10').should('exist')
    rowOne.forEach((row) => {
      cy.getByTestId(`checkbox-${row}`).should('have.attr', 'aria-checked', 'true')
    })

    cy.getByLabelText('Page 2').click()
    cy.getByTestId('checkbox header').click()
    cy.getByLabelText('10 of 10').should('exist')
    rowTwo.forEach((row) => {
      cy.getByTestId(`checkbox-${row}`).should('have.attr', 'aria-checked', 'true')
    })
  })

  it('"SELECT ALL" and click "CLEAR SELECTED"', () => {
    selectAll()

    cy.getByLabelText('clear selected').click()

    rowTwo.forEach((row) => {
      cy.getByTestId(`checkbox-${row}`).should('have.attr', 'aria-checked', 'false')
    })

    cy.getByLabelText('Page 1').click()
    rowOne.forEach((row) => {
      cy.getByTestId(`checkbox-${row}`).should('have.attr', 'aria-checked', 'false')
    })
  })

  it('"SELECT ALL" and deselect with checkbox header 5 rows and click and clear selected and change to page 2 and page 1', () => {
    selectAll()

    cy.getByTestId('checkbox header').click()

    cy.getByLabelText('clear selected').click()

    cy.getByLabelText('Page 1').click()
    rowOne.forEach((row) => {
      cy.getByTestId(`checkbox-${row}`).should('have.attr', 'aria-checked', 'false')
    })
  })
})
