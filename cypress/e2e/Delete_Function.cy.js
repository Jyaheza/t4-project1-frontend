/// <reference types="Cypress"/>

// The Delete story tests is under the assumption you have
// stories already created with chapters.
describe('Delete parent story', () => {
  it('Chapter alert cancel', () => {
    cy.visit("http://localhost:8081")
    // Login procedures
    cy.get('input[type="text"]').type('hello@user.com')
    cy.get('input[type="Password"]').type('asdfasdf')
    cy.get('.v-btn__content').contains('Sign in').should('be.visible').click()
    cy.pause();
    // Click the first card title
    cy.get('.v-card-title.headline').eq(0).click();
    // Click trash can icon on the story card title
    cy.get('.mdi-delete').eq(0).click();
    cy.on ('window:confirm', (text) => {
      // Pop up window confirmation for deletion. In this one, we'll return false to show
      // that the story chapter was not removed. 
      expect(text).to.contains('This will delete the whole story, continue?');
      return false;
    })
    cy.reload();
    cy.get('.v-btn').contains('Stories').click();
    // Confirm that the story didnt get removed.
    // This is under the assumption you only have one story
    cy.get('.v-card').should('exist') 
    cy.pause();
  })
  it('Chapter alert delete', () => {
    cy.visit("http://localhost:8081")
    // Login procedures
    cy.get('input[type="text"]').type('hello@user.com')
    cy.get('input[type="Password"]').type('asdfasdf')
    cy.get('.v-btn__content').contains('Sign in').should('be.visible').click()
    cy.pause();
    // Click the first card title
    cy.get('.v-card-title.headline').eq(0).click();
    // Click trash can icon on the story card title
    cy.get('.mdi-delete').eq(0).click();
    cy.on ('window:confirm', (text) => {
      // Pop up window confirmation for deletion. In this one, we'll return true to show
      // that the story chapter  not removed. 
      expect(text).to.contains('This will delete the whole story, continue?');
    })
    cy.reload();
    cy.get('.v-btn').contains('Stories').click();
    // Confirm that the story got removed.
    // This is under the assumption you only have one story
    cy.get('.v-card').should('not.exist') 
    cy.pause();
  })
})

describe('Delete chapters', () => {
  it('Chapter alert cancel', () => {
    cy.visit("http://localhost:8081")
    // Login procedures
    cy.get('input[type="text"]').type('hello@user.com')
    cy.get('input[type="Password"]').type('asdfasdf')
    cy.get('.v-btn__content').contains('Sign in').should('be.visible').click()
    cy.pause();
    // Click the first card title
    cy.get('.v-card-title.headline').eq(0).click();
    // Click the trash can in the next story card for the chapter
    cy.get('.mdi-delete').eq(1).click()
    cy.pause();
    cy.on ('window:confirm', (text) => {
      // Pop up window confirmation for deletion. In this one, we'll return false to show
      // that the story chapter was not removed. 
      expect(text).to.contains('Confirm deletion of Chapter 2');
      return false;
    })
    cy.reload();
    // Confirmation that Chapter 2 was removed. 
    // This testing condition is under the assumption that there is only 1 extra chapter in the story.
    // To prove the functionality of the delete chapter
    cy.get('.story-title').eq(1).should('exist')
    cy.pause();
  })
  it('Chapter alert true', () => {
    cy.visit("http://localhost:8081/")
    // Login procedures
    cy.get('input[type="text"]').type('hello@user.com')
    cy.get('input[type="Password"]').type('asdfasdf')
    cy.get('.v-btn__content').contains('Sign in').should('be.visible').click()
    cy.pause();
    // Click the first card title
    cy.get('.v-card-title.headline').eq(0).click();
    // Click the trash can in the next story card for the chapter
    cy.get('.mdi-delete').eq(1).click()
    cy.pause();
    cy.on ('window:confirm', (text) => {
      // Pop up window confirmation for deletion. In this one, we'll return true to show
      // that the story chapter was removed. It is true by default
      expect(text).to.contains('Confirm deletion of Chapter 2');
    })
    cy.reload();
    // Confirmation that Chapter 2 was removed. 
    // This testing condition is under the assumption that there is only 1 extra chapter in the story.
    // To prove the functionality of the delete chapter
    cy.get('.story-title').eq(1).should('not.exist')
    cy.pause();
  })
})

describe('Delete story settings', () => {
  it('Delete story cancel', () => {
    cy.visit("http://localhost:8081")
    // Login procedures
    cy.get('input[type="text"]').type('hello@user.com')
    cy.get('input[type="Password"]').type('asdfasdf')
    cy.get('.v-btn__content').contains('Sign in').should('be.visible').click()
    cy.get('.v-btn').contains('Maintain').click();
    cy.get('.v-btn').contains('Story Settings').click();
    cy.get('.v-btn').contains('Add').click();
    // Type in Setting1 for setting. This is under the assumption the setting table is empty
    cy.get('.v-field__input').eq(0).clear().type('Setting1')
    cy.pause();
    cy.get('.v-btn__content').contains('Add Setting').click();
    cy.get('table').contains('td', 'Setting1');
    cy.get('.mdi-delete').eq(0).click();
    cy.on ('window:confirm', (text) => {
      // Pop up window confirmation for deletion. In this one, we'll return false to show
      // that the story chapter was not removed.
      expect(text).to.contains('Are you sure you want to delete Setting1');
      return false;
    })
    cy.reload();
    // Make sure Setting1 was not removed after deletion
    cy.get('table').contains('td', 'Setting1').should('exist');
    cy.pause();
  })
  it('Delete story true', () => {
    cy.visit("http://localhost:8081")
    // Login procedures
    cy.get('input[type="text"]').type('hello@user.com')
    cy.get('input[type="Password"]').type('asdfasdf')
    cy.get('.v-btn__content').contains('Sign in').should('be.visible').click()
    cy.get('.v-btn').contains('Maintain').click();
    cy.get('.v-btn').contains('Story Settings').click();
    cy.get('table').contains('td', 'Setting1');
    cy.get('.mdi-delete').eq(0).click();
    cy.on ('window:confirm', (text) => {
      // Pop up window confirmation for deletion. In this one, we'll return false to show
      // that the story chapter was not removed.
      expect(text).to.contains('Are you sure you want to delete Setting1');
    })
    cy.reload();
    // Make sure Setting1 was not removed after deletion
    cy.get('table').contains('td', 'Setting1').should('not.exist');
    cy.pause();
  })
})

describe('Delete story languages', () => {
  it('Delete language cancel', () => {
    cy.visit("http://localhost:8081")
    // Login procedures
    cy.get('input[type="text"]').type('hello@user.com')
    cy.get('input[type="Password"]').type('asdfasdf')
    cy.get('.v-btn__content').contains('Sign in').should('be.visible').click()
    cy.get('.v-btn').contains('Maintain').click();
    cy.get('.v-btn').contains('Story Languages').click();
    cy.get('.v-btn').contains('Add').click();
    // type the new language in there and add it
    cy.get('.v-field__input').eq(0).clear().type('Language1')
    cy.pause();
    cy.get('.v-btn__content').contains('Add Language').click();
    cy.get('table').contains('td', 'Language1');
    cy.get('.mdi-delete').eq(0).click();
    cy.on ('window:confirm', (text) => {
      // Pop up window confirmation for deletion. In this one, we'll return false to show
      // that the story chapter was not removed.
      expect(text).to.contains('Are you sure you want to delete Language1');
      return false;
    })
    cy.reload();
    // Make sure Language1 was not removed after deletion
    cy.get('table').contains('td', 'Language1').should('exist');
    cy.pause();
  })
  it('Delete language cancel', () => {
    cy.visit("http://localhost:8081")
    // Login procedures
    cy.get('input[type="text"]').type('hello@user.com')
    cy.get('input[type="Password"]').type('asdfasdf')
    cy.get('.v-btn__content').contains('Sign in').should('be.visible').click()
    cy.get('.v-btn').contains('Maintain').click();
    cy.get('.v-btn').contains('Story Languages').click();
    cy.get('table').contains('td', 'Language1');
    cy.get('.mdi-delete').eq(0).click();
    cy.on ('window:confirm', (text) => {
      // Pop up window confirmation for deletion. In this one, we'll return true to show
      // that the story chapter was removed.
      expect(text).to.contains('Are you sure you want to delete Language1');
    })
    cy.reload();
    // Make sure Language1 was removed after deletion
    cy.get('table').contains('td', 'Language1').should('not.exist');
    cy.pause();
  })
})

describe('Delete story countries', () => {
  it('Delete story cancel', () => {
    cy.visit("http://localhost:8081")
    // Login procedures
    cy.get('input[type="text"]').type('hello@user.com')
    cy.get('input[type="Password"]').type('asdfasdf')
    cy.get('.v-btn__content').contains('Sign in').should('be.visible').click()
    cy.get('.v-btn').contains('Maintain').click();
    cy.get('.v-btn').contains('Story Countries').click();
    cy.get('.v-btn').contains('Add').click();
    // type the new country in there and add it
    cy.get('.v-field__input').eq(0).clear().type('Country1')
    cy.pause();
    cy.get('.v-btn__content').contains('Add Country').click();
    cy.get('table').contains('td', 'Country1');
    cy.get('.mdi-delete').eq(0).click();
    cy.on ('window:confirm', (text) => {
      // Pop up window confirmation for deletion. In this one, we'll return false to show
      // that the story chapter was not removed.
      expect(text).to.contains('Are you sure you want to delete Country1');
      return false;
    })
    cy.reload();
    // Make sure Country1 was removed after deletion
    cy.get('table').contains('td', 'Country1').should('exist');
    cy.pause();
  })
  it('Delete story true', () => {
    cy.visit("http://localhost:8081")
    // Login procedures
    cy.get('input[type="text"]').type('hello@user.com')
    cy.get('input[type="Password"]').type('asdfasdf')
    cy.get('.v-btn__content').contains('Sign in').should('be.visible').click()
    cy.get('.v-btn').contains('Maintain').click();
    cy.get('.v-btn').contains('Story Countries').click();
    cy.get('table').contains('td', 'Country1');
    cy.get('.mdi-delete').eq(0).click();
    cy.on ('window:confirm', (text) => {
      // Pop up window confirmation for deletion. In this one, we'll return true to show
      // that the story chapter was removed.
      expect(text).to.contains('Are you sure you want to delete Country1');
    })
    cy.reload();
    // Make sure Country1 was removed after deletion
    cy.get('table').contains('td', 'Country1').should('not.exist');
    cy.pause();
  })
})

describe('Delete story characters', () => {
  it('Delete story character cancel', () => {
    cy.visit("http://localhost:8081")
    // Login procedures
    cy.get('input[type="text"]').type('hello@user.com')
    cy.get('input[type="Password"]').type('asdfasdf')
    cy.get('.v-btn__content').contains('Sign in').should('be.visible').click()
    cy.get('.v-btn').contains('Maintain').click();
    cy.get('.v-btn').contains('Story Characters').click();
    cy.get('.v-btn').contains('Add').click();
    // type the new character in there and add it
    cy.get('.v-field__input').eq(0).clear().type('Character1')
    cy.pause();
    cy.get('.v-btn__content').contains('Add Character').click();
    cy.get('table').contains('td', 'Character1');
    cy.get('.mdi-delete').eq(0).click();
    cy.on ('window:confirm', (text) => {
      // Pop up window confirmation for deletion. In this one, we'll return false to show
      // that the story chapter was not removed.
      expect(text).to.contains('Are you sure you want to delete Character1');
      return false;
    })
    cy.reload();
    // Make sure Character1 was removed after deletion
    cy.get('table').contains('td', 'Character1').should('exist');
    cy.pause();
  })
  it('Delete story character true', () => {
    cy.visit("http://localhost:8081")
    // Login procedures
    cy.get('input[type="text"]').type('hello@user.com')
    cy.get('input[type="Password"]').type('asdfasdf')
    cy.get('.v-btn__content').contains('Sign in').should('be.visible').click()
    cy.get('.v-btn').contains('Maintain').click();
    cy.get('.v-btn').contains('Story Characters').click();
    cy.get('table').contains('td', 'Character1');
    cy.get('.mdi-delete').eq(0).click();
    cy.on ('window:confirm', (text) => {
      // Pop up window confirmation for deletion. In this one, we'll return to show
      // that the story chapter was removed.
      expect(text).to.contains('Are you sure you want to delete Character1');
    })
    cy.reload();
    // Make sure Character1 was removed after deletion
    cy.get('table').contains('td', 'Character1').should('not.exist');
    cy.pause();
  })
})