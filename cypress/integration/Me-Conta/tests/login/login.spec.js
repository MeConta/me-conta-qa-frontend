/// <reference types="Cypress" >

import faker from 'faker'
faker.locale = 'pt_BR'

const name = faker.name.findName()
const email = faker.internet.email()

describe('Criar conta', () => {
    before(() => {
        //cria conta de aluno
        cy.visit("/criar-conta")
        cy.get('#name').type(name)
        cy.get('#email').type(email)
        cy.enterPassword(Cypress.env('CYPRESS_PASSWORD'), Cypress.env('CYPRESS_PASSWORD'))
        cy.get("[value='0']").should('to.be.checked') 
        cy.get('.styles__Wrapper-sc-s8fbhq-0').should('to.be.disabled')
        cy.get('#termsConfirm').click()
        cy.get('.styles__Wrapper-sc-s8fbhq-0').should('to.be.enabled').click()
        cy.get('.styles__Link-sc-xhmkr6-2 > a').click()
    })

    beforeEach(() =>{
        cy.visit("/login")
    })

    it('Clicar no link para criar nova conta', () => {
        cy.get('div:nth-child(3) > a').click()
        cy.url().should('eq', 'https://me-conta-frontend.herokuapp.com/criar-conta')
    })

    it('Clicar no link para recuperar a senha', () => {
        cy.get('div:nth-child(4) > a').click()
        cy.url().should('eq', 'https://me-conta-frontend.herokuapp.com/recuperacao-de-senha')
    })

    it('Campos inválidos', () => {
        cy.get('.styles__Wrapper-sc-s8fbhq-0').click()
        cy.get('div:nth-child(1) > p').should('have.text'," E-mail é obrigatório ")
        cy.get('div:nth-child(2) > p').should('have.text'," A senha é obrigatório ")
        cy.get('#email').type('teste')
        cy.get('div:nth-child(1) > p').should('have.text'," E-mail inválido ")
    })

    it('Senha incorreta', () => {
        cy.get('#email').type(email)
        cy.get('#password').type('senhaincorreta')
        cy.get('.styles__Wrapper-sc-s8fbhq-0').click()
        //mensagem de senha incorreta
        cy.get('.Toastify__toast-body').should('have.text',"Unauthorized")
    })

    it('Usuário não existente', () => {
        const email = faker.internet.email()

        cy.get('#email').type(email)
        cy.get('#password').type('senhaincorreta')
        cy.get('.styles__Wrapper-sc-s8fbhq-0').click()
        //mensagem de senha incorreta
        cy.get('.Toastify__toast-body').should('have.text',"Unauthorized")
    })
})