Cypress.Commands.add('enterPassword', (password, confpassword) =>{
    password = Cypress.env('password')
    confpassword = Cypress.env('confpassword')
    //Preencher campo Senha
    cy.get('#password').type(password, {log: false})
    //Prencher campo Confirmar senha
    cy.get('#passwordConfirm').type(confpassword, {log: false})
    })