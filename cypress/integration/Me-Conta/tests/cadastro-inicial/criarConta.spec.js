/// <reference types="Cypress" >

import faker from 'faker'
faker.locale = 'pt_BR'

const name = faker.name.findName()
const email = faker.internet.email()

describe('Criar conta', () => {
    beforeEach(() =>{
        cy.visit("/criar-conta")
    })

    it('Criar conta - Aluno', () => {
        const name = faker.name.findName()
        const email = faker.internet.email()

        //Preencher campo Nome
        cy.get('#name').type(name)
        //Preencher campo E-mail
        cy.get('#email').type(email)
        //Preencher campo Senha e Confirmar senha
        cy.enterPassword(Cypress.env('CYPRESS_PASSWORD'), Cypress.env('CYPRESS_PASSWORD'))
        // Verificar se a opção Tipo aluno está selecionada
        cy.get("[value='0']").should('to.be.checked') 
        // Verificar botão Cadastrar desabilitado
        cy.get('.styles__Wrapper-sc-s8fbhq-0').should('to.be.disabled')
        // Selecionar Eu li e concoordo com os Termos de uso e ......
        cy.get('#termsConfirm').click()
        // Clicar no botão Cadastrar
        cy.get('.styles__Wrapper-sc-s8fbhq-0').should('to.be.enabled').click()
        // Redirecionado para a página aluno
        cy.url().should('eq', 'https://me-conta-frontend.herokuapp.com/cadastro-aluno')
    })

    it('Criar Conta - Voluntário Supervisor',() => {
        const name = faker.name.findName()
        const email = faker.internet.email()

        cy.get('#name').type(name)
        cy.get('#email').type(email)
        cy.enterPassword(Cypress.env('password'), Cypress.env('confpassword'))
        cy.get(':nth-child(2) > .styles__RadioValue-sc-rx994k-2').click()
        cy.get('.styles__Wrapper-sc-s8fbhq-0').should('to.be.disabled')
        cy.get('#termsConfirm').click()
        cy.get('.styles__Wrapper-sc-s8fbhq-0').should('to.be.enabled').click()
        cy.url().should('eq', 'https://me-conta-frontend.herokuapp.com/cadastro-voluntario')
    }) 

    it('Criar Conta - Voluntário Atendente',() => {
        const name = faker.name.findName()
        const email = faker.internet.email()

        cy.get('#name').type(name)
        cy.get('#email').type(email)
        cy.enterPassword(Cypress.env('password'), Cypress.env('confpassword'))
        cy.get(':nth-child(3) > .styles__RadioValue-sc-rx994k-2').click()
        cy.get('.styles__Wrapper-sc-s8fbhq-0').should('to.be.disabled')
        cy.get('#termsConfirm').click()
        cy.get('.styles__Wrapper-sc-s8fbhq-0').should('to.be.enabled') .click()
        cy.url().should('eq', 'https://me-conta-frontend.herokuapp.com/cadastro-voluntario')
    }) 

    it('Criar Conta - E-mail duplicado', () => {
        cy.get('#name').type(name)
        cy.get('#email').type("teste@teste.com")
        cy.enterPassword(Cypress.env('password'), Cypress.env('confpassword'))
        cy.get('#termsConfirm').click()
        cy.get('.styles__Wrapper-sc-s8fbhq-0').should('to.be.enabled').click()
        cy.get('.Toastify__toast-body').should('have.text', "e-mail duplicado")
    })

    it('Criar Conta - E-mail inválido', () => {
        cy.get('#name').type(name)
        cy.get('#email').type('teste')
        cy.enterPassword(Cypress.env('password'), Cypress.env('confpassword'))
        cy.get('#termsConfirm').click()
        cy.get('.styles__Wrapper-sc-s8fbhq-0').should('to.be.disabled')
        cy.get('.styles__Error-sc-1xrqtb1-3').should('have.text', " E-mail inválido ")
    })

    it('Criar Conta - Sem preencher os campos', () => {
        cy.get('.styles__Wrapper-sc-s8fbhq-0').should('to.be.enabled').click()
        cy.get(':nth-child(1) > .styles__Error-sc-1xrqtb1-3').should('have.text', " Nome é obrigatório ")
        cy.get(':nth-child(2) > .styles__Error-sc-1xrqtb1-3').should('have.text', " E-mail é obrigatório ")
        cy.get(':nth-child(3) > .styles__Error-sc-1xrqtb1-3').should('have.text', " A senha é obrigatório ")
        cy.get(':nth-child(5) > .styles__Error-sc-1xrqtb1-3').should('have.text', " A confirmação de senha é obrigatório ")
    })

    it('Criar Conta - Não concordar com os termos e políticas de privacidade', () => {
        cy.get('#name').type(name)
        cy.get('#email').type(email)
        cy.enterPassword(Cypress.env('password'), Cypress.env('confpassword'))
        cy.get('.styles__Error-sc-kj9pa0-3').should('have.text', " Termo obrigatório ")
    })

    it('Criar Conta - Nome menor que 2 caracteres', () => {
        cy.get('#name').type('t')
        cy.get('#email').type(email)
        cy.enterPassword(Cypress.env('password'), Cypress.env('confpassword'))
        cy.get('#termsConfirm').click()
        cy.get('.styles__Wrapper-sc-s8fbhq-0').should('to.be.disabled')
        cy.get('.styles__Error-sc-1xrqtb1-3').should('have.text', " Nome deve conter mais de 2 caracteres ")
    })

    it('Criar Conta - Senhas diferentes', () => {
        cy.get('#name').type(name)
        cy.get('#email').type(email)
        cy.get('#password').type("s#nh4Teste")
        cy.get('#passwordConfirm').type("s#nh4Teste1")
        cy.get('#termsConfirm').click()
        cy.get('.styles__Wrapper-sc-s8fbhq-0').should('to.be.disabled')
        cy.get(':nth-child(5) > .styles__Error-sc-1xrqtb1-3').should('have.text', " As senhas devem ser iguais ")
    })
})