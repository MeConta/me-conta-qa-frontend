Cypress.Commands.add('enterPassword', (password, confpassword) =>{
    password = Cypress.env('CYPRESS_PASSWORD')
    confpassword = Cypress.env('CYPRESS_PASSWORD')
    cy.get('#password').type(password, {log: false})
    cy.get('#passwordConfirm').type(confpassword, {log: false})
    })