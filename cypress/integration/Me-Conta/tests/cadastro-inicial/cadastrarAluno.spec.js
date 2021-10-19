/// <reference types="Cypress" >

import faker from 'faker'
faker.locale = 'pt_BR'

const name = faker.name.findName()
const email = faker.internet.email()
const phone = faker.phone.phoneNumber()

describe('Cadastrar Aluno', () => {
    beforeEach(() =>{
        cy.visit("/")
    })

    it('Criar conta - Aluno', () => {
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
        //cy.get('#dataNascimento').type('2003/10/19')
        //cy.get('.styles__Input-sc-owercq-0 > .hHPgrZ').type('19')
        //cy.get('#estado').type('São Paulo')
        cy.get('#cidade').type('São Paulo')
        cy.get('#escolaridade').type('1º Ano - Ensino Médio')
        cy.get('.styles__Wrapper-sc-s8fbhq-0').click()
        cy.url().should('eq', 'https://me-conta-frontend.herokuapp.com/dashboard-aluno')
    })
})