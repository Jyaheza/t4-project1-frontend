/// <reference types="Cypress"/>

describe("Russell Login", function(){
  it("Display Profile", function(){
      cy.visit("http://localhost:8081")
      cy.get('input[type="text"]').type('abc@hello.com')
      cy.get('input[type="Password"]').type('123123')
      cy.get('.v-btn__content').contains('Sign in').should('be.visible').click()
      cy.get('.v-btn__content').contains('RJ').click()
      cy.get('.v-btn__content').contains('Profile').should('be.visible').click()
      cy.pause()
      cy.get('.v-btn__content').contains('RJ').click()
      cy.get('.v-btn__content').contains('Logout').click()
  })
})

describe("Mario Login", function(){
  it("Display Profile", function(){
    cy.visit("http://localhost:8081")
    cy.get('input[type="text"]').type('hello@user.com')
    cy.get('input[type="Password"]').type('asdfasdf')
    cy.get('.v-btn__content').contains('Sign in').should('be.visible').click()
    cy.get('.v-btn__content').contains('MM').click()
    cy.get('.v-btn__content').contains('Profile').should('be.visible').click()
    cy.pause()
    cy.get('.v-btn__content').contains('MM').click()
    cy.get('.v-btn__content').contains('Logout').click()
  })
})