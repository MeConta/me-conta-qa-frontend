Cypress.Commands.add('enterPassword', ( password, confpassword) =>{
    password = Cypress.env('CYPRESS_PASSWORD')
    confpassword = Cypress.env('CYPRESS_PASSWORD')
    cy.get('#password').type("CYPRESS_PASSWORD", {log: false})
    cy.get('#passwordConfirm').type("CYPRESS_PASSWORD", {log: false})
    })