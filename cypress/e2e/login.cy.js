import logindata from '../fixtures/login.json'


describe('Verify Login functionality',() => {
  it('Log in with valid cridentials',() => {
    cy.login(logindata.username,logindata.password)
    cy.url().should('include','web/index.php/dashboard/index')
    //cy.contains('Dashboard').should('be.visible')
    cy.contains('Time at Work').should('be.visible')
   })
   it('Log in with invalid username and valid password',() => {
    cy.login(logindata.invalidUsername,logindata.password)
    //cy.contains('Dashboard').should('be.visible')
    cy.contains('Invalid credentials').should('be.visible')
   })
   it('Log in with valid username and invalid password',() => {
    cy.login(logindata.username,logindata.invalidPassword)
    //cy.contains('Dashboard').should('be.visible')
    cy.contains('Invalid credentials').should('be.visible')
   })
   it('Log in with no username and no password',() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get('button[type=submit]').click()
    //cy.contains('Dashboard').should('be.visible')
    cy.contains('Required').should('be.visible')
   })
   it('Validate user is able to send ResetPassword link ',() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.contains('Forgot your password?').click()
    //cy.contains('Dashboard').should('be.visible')
    cy.url().should('include','web/index.php/auth/requestPasswordResetCode')
    cy.contains('Reset Password').should('be.visible')
    cy.get('input[name=username]').type(logindata.username)
    cy.get('button[type=submit]').click()
    cy.contains('Reset Password link sent successfully').should('be.visible')
   })
   it('Validate user is able to cancel ResetPassword',() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.contains('Forgot your password?').click()
    //cy.contains('Dashboard').should('be.visible')
    cy.url().should('include','web/index.php/auth/requestPasswordResetCode')
    cy.contains('Reset Password').should('be.visible')
    cy.get('input[name=username]').type(logindata.username)
    cy.get('button[type=button]').click()
    cy.contains('Login').should('be.visible')
   })
})

