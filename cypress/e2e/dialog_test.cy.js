describe('Dialog Test', () => {
  it('should log the Test user in and check combo boxes in the dialog', () => {
      cy.visit("http://localhost:8081");

      cy.get('input[type="text"]').type('test@test.com');
      cy.get('input[type="Password"]').type('1234');
      cy.get('.v-btn__content').contains('Sign in').should('be.visible').click();

      cy.get('.v-btn').contains('Add').should('be.visible').click();
      cy.get('.v-dialog').should('be.visible');

      cy.get('.v-card-title').contains('Add Story').should('be.visible');

      cy.contains('Story Setting').parents('.v-select').click();
      cy.get('body').click(); 

      cy.contains('Country').parents('.v-select').click();
      cy.get('body').click(); 

      cy.contains('Lead Character').parents('.v-select').click();
      cy.get('body').click(); 

      cy.contains('Secondary Character').parents('.v-select').click();
      cy.get('body').click(); 

      cy.contains('Story Language').parents('.v-select').click();
      cy.get('body').click(); 


      cy.get('button').contains('Close').click();
      cy.get('.v-dialog').should('not.exist');

      cy.log('Test completed successfully!');
  });
});
