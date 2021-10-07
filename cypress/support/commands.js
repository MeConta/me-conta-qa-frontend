Cypress.Commands.add('enterPassword', (password, confpassword) =>{
    password = Cypress.env('password')
    confpassword = Cypress.env('confpassword')
    cy.get('#password').type(password, {log: false})
    cy.get('#passwordConfirm').type(confpassword, {log: false})
    })