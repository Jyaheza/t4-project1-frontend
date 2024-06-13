describe('Edit User Profile and Submit', () => {
  it('passes', () => {
    cy.visit("http://localhost:8081")
    // Login procedures
    cy.get('input[type="text"]').type('new@email.com')
    cy.get('input[type="Password"]').type('asdfasdf')
    cy.get('.v-btn__content').contains('Sign in').should('be.visible').click()
    cy.get('.v-avatar').click()
    cy.get('.v-btn__content').contains('Profile').should('be.visible').click()
    cy.get('.v-table__wrapper').should('be.visible')
    cy.get('.mdi-pencil').should('be.visible').click() // Make sure the edit pencil button is there
    // Type in the new credentials in the fields
    cy.get('.v-field__input').eq(0).clear().type('Donald')
    cy.get('.v-field__input').eq(1).clear().type('Trump')
    cy.get('.v-field__input').eq(2).clear().type('new@email.com')
    cy.get('.v-btn__content').contains('Update').should('be.visible').click()
    // Reload the page
    cy.reload()
    // Make sure the page contains the credentials that have been updated
    cy.get('table').contains('td', 'Donald');
    cy.get('table').contains('td', 'Trump');
    cy.get('table').contains('td', 'new@email.com');
  })
})