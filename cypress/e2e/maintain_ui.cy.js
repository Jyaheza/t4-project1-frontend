/// <reference types="Cypress"/>

describe("Russell Profile settings", function(){
  it("Display All Settings", function(){
      cy.visit("http://localhost:8081")
      cy.get('input[type="text"]').type('abc@hello.com')
      cy.get('input[type="Password"]').type('123123')
      cy.get('.v-btn__content').contains('Sign in').should('be.visible').click()
      cy.get('.v-btn__content').contains('Maintain').click()
      cy.get('.v-btn').contains('Characters Roles').click()
      cy.pause()
      cy.get('.v-btn__content').contains('Maintain').click()
      cy.get('.v-btn').contains('Story Countries').click()
      cy.pause()
      cy.get('.v-btn__content').contains('Maintain').click()
      cy.get('.v-btn__content').contains('Story Languages').click()
      cy.pause()
      cy.get('.v-btn__content').contains('Maintain').click()
      cy.get('.v-btn__content').contains('Story Settings').click()
      cy.pause()
  })
})