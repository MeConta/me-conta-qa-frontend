/// <reference types="Cypress" >

import faker from 'faker'
faker.locale = 'pt_BR'

const name = faker.name.findName()
const email = faker.internet.email()

describe('Criar Conta Aluno', () => {
    beforeEach(() =>{
        cy.visit("/")
    })

    it('Cadastrar Aluno', () => {
        //Preencher campo Nome
        cy.get('#name').type(name)
        //Preencher campo E-mail
        cy.get('#email').type(email)
        //Preencher campo Senha e Confirmar senha
        cy.enterPassword(Cypress.env('password'), Cypress.env('confpassword'))
        // Verificar se a opção Tipo aluno está selecionada
        cy.get('#Aluno').should('to.be.checked') 
        // Verificar botão Cadastrar desabilitado
        cy.get('.styles__Wrapper-sc-s8fbhq-0').should('to.be.disabled')
        // Selecionar Eu li e concoordo com os Termos de uso e ......
        cy.get('#termsConfirm').click()
        // Clicar no botão Cadastrar
        cy.get('.styles__Wrapper-sc-s8fbhq-0').should('to.be.enabled')
        .click()
        // Redirecionado para a página aluno
        cy.url().should('eq', 'https://me-conta-frontend.herokuapp.com/cadastro-aluno')
    })

    it('Cadastrar Usuário - email duplicado', () => {
        cy.get('#name').type(name)
        cy.get('#email').type("teste@teste.com")
        cy.enterPassword(Cypress.env('password'), Cypress.env('confpassword'))
        cy.get('#termsConfirm').click()
        cy.get('.styles__Wrapper-sc-s8fbhq-0').should('to.be.enabled').click()
        cy.get('.Toastify__toast-body').should('have.text', "E-mail duplicado!")
    })

    it('Cadastrar Usuário - email inválido', () => {
        cy.get('#name').type(name)
        cy.get('#email').type('teste')
        cy.enterPassword(Cypress.env('password'), Cypress.env('confpassword'))
        cy.get('#termsConfirm').click()
        cy.get('.styles__Wrapper-sc-s8fbhq-0').should('to.be.disabled')
        cy.get('.styles__Error-sc-1xrqtb1-3').should('have.text', " E-mail inválido ")
    })

    it('Cadastrar Usuário - sem preencher os campos', () => {
        cy.get('.styles__Wrapper-sc-s8fbhq-0').should('to.be.enabled').click()
        cy.get(':nth-child(1) > .styles__Error-sc-1xrqtb1-3').should('have.text', " Nome é obrigatório ")
        cy.get(':nth-child(2) > .styles__Error-sc-1xrqtb1-3').should('have.text', " E-mail é obrigatório ")
        cy.get(':nth-child(3) > .styles__Error-sc-1xrqtb1-3').should('have.text', " A senha é obrigatório ")
        cy.get(':nth-child(5) > .styles__Error-sc-1xrqtb1-3').should('have.text', " A confirmação de senha é obrigatório ")
    })

    it('Cadastrar Usuário - não concordar com os termos e políticas de privacidade', () => {
        cy.get('#name').type(name)
        cy.get('#email').type(email)
        cy.enterPassword(Cypress.env('password'), Cypress.env('confpassword'))
        cy.get('.styles__Error-sc-kj9pa0-3').should('have.text', " Termo obrigatório ")
    })

    it('Cadastrar Usuário - nome menor que 2 caracteres', () => {
        cy.get('#name').type('t')
        cy.get('#email').type(email)
        cy.enterPassword(Cypress.env('password'), Cypress.env('confpassword'))
        cy.get('#termsConfirm').click()
        cy.get('.styles__Wrapper-sc-s8fbhq-0').should('to.be.disabled')
        cy.get('.styles__Error-sc-1xrqtb1-3').should('have.text', " Nome deve conter mais de 2 caracteres ")
    })

    it('Cadastrar Usuário - senhas diferentes', () => {
        cy.get('#name').type(name)
        cy.get('#email').type(email)
        cy.get('#password').type("s#nh4Teste")
        cy.get('#passwordConfirm').type("s#nh4Teste1")
        cy.get('#termsConfirm').click()
        cy.get('.styles__Wrapper-sc-s8fbhq-0').should('to.be.disabled')
        cy.get(':nth-child(5) > .styles__Error-sc-1xrqtb1-3').should('have.text', " As senhas devem ser iguais ")
    })
})