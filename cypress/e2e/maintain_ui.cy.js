/// <reference types="Cypress"/>

describe("Russell Login", function(){
  it("Display Profile", function(){
      cy.visit("http://localhost:8081")
      cy.get('input[type="text"]').type('abc@hello.com')
      cy.get('input[type="Password"]').type('123123')
      cy.get('.v-btn__content').contains('Sign in').should('be.visible').click()
  })
})