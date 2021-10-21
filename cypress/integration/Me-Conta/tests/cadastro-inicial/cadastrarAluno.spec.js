/// <reference types="Cypress" >

import faker from 'faker'
faker.locale = 'pt_BR'

describe('Cadastrar Aluno', () => {
    beforeEach(() =>{
        cy.visit("/")
    })

    it('Cadastrar Aluno - Sucesso', () => {
        const name = faker.name.findName()
        const email = faker.internet.email()
        const phone = faker.phone.phoneNumber()
        const data = '2013-10-10'
        
        cy.get('#name').type(name)
        cy.get('#email').type(email)
        cy.enterPassword(Cypress.env('CYPRESS_PASSWORD'), Cypress.env('CYPRESS_PASSWORD'))
        cy.get('#Aluno').should('to.be.checked') 
        cy.get('.styles__Wrapper-sc-s8fbhq-0').should('to.be.disabled')
        cy.get('#termsConfirm').click()
        cy.get('.styles__Wrapper-sc-s8fbhq-0').should('to.be.enabled').click()
        cy.url().should('eq', 'https://me-conta-frontend.herokuapp.com/cadastro-aluno')
        cy.get('.Toastify__toast-body').should('have.text', "O registro foi criado com sucesso!A operação foi realizada com sucesso!")
        cy.get('[data-testid=phone-number]').type(phone)
        cy.get('#dataNascimento').should('to.be.visible').type(data , { force: true })
        cy.get('#UF').should('to.be.visible').select('Acre').should('have.value', 'AC')
        cy.get('#cidade').type('Rio Branco')
        cy.get('#escolaridade').should('to.be.visible').select('1').should('have.value', '1')
        cy.get('.styles__Wrapper-sc-s8fbhq-0').click()
        cy.url().should('eq', 'https://me-conta-frontend.herokuapp.com/dashboard-aluno')
    })

    it('Cadastrar Aluno - Campos vazios', () => {
        const name = faker.name.findName()
        const email = faker.internet.email()

        cy.get('#name').type(name)
        cy.get('#email').type(email)
        cy.enterPassword(Cypress.env('CYPRESS_PASSWORD'), Cypress.env('CYPRESS_PASSWORD'))
        cy.get('#Aluno').should('to.be.checked') 
        cy.get('.styles__Wrapper-sc-s8fbhq-0').should('to.be.disabled')
        cy.get('#termsConfirm').click()
        cy.get('.styles__Wrapper-sc-s8fbhq-0').should('to.be.enabled').click()
        cy.url().should('eq', 'https://me-conta-frontend.herokuapp.com/cadastro-aluno')
        cy.get('.Toastify__toast-body').should('have.text', "O registro foi criado com sucesso!A operação foi realizada com sucesso!")
        cy.get('.styles__Wrapper-sc-s8fbhq-0').click()
        cy.get(':nth-child(3) > .styles__Error-sc-1xrqtb1-3').should('have.text', " Telefone é obrigatório. ")
        cy.get(':nth-child(4) > .styles__Error-sc-1xrqtb1-3').should('have.text', " Data de nascimento é obrigatório. ")
        cy.get(':nth-child(5) > .styles__Error-sc-1xrqtb1-3').should('have.text', " Estado é obrigatório. ")
        cy.get(':nth-child(6) > .styles__Error-sc-1xrqtb1-3').should('have.text', " Cidade é obrigatório. ")
        cy.get(':nth-child(8) > .styles__Error-sc-1xrqtb1-3').should('have.text', " Escolaridade é obrigatória. ")
    })

    it('Cadastrar Aluno - Pular preenchimento de dados', () => {
        const name = faker.name.findName()
        const email = faker.internet.email()

        cy.get('#name').type(name)
        cy.get('#email').type(email)
        cy.enterPassword(Cypress.env('CYPRESS_PASSWORD'), Cypress.env('CYPRESS_PASSWORD'))
        cy.get('#Aluno').should('to.be.checked') 
        cy.get('.styles__Wrapper-sc-s8fbhq-0').should('to.be.disabled')
        cy.get('#termsConfirm').click()
        cy.get('.styles__Wrapper-sc-s8fbhq-0').should('to.be.enabled').click()
        cy.url().should('eq', 'https://me-conta-frontend.herokuapp.com/cadastro-aluno')
        cy.get('.Toastify__toast-body').should('have.text', "O registro foi criado com sucesso!A operação foi realizada com sucesso!")
        cy.get('.styles__Link-sc-xhmkr6-2 > a').click()
        cy.url().should('eq', 'https://me-conta-frontend.herokuapp.com/dashboard-aluno')
    })
})