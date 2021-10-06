/// <reference types="Cypress" >

import faker from 'faker'
faker.locale = 'pt_BR'

const name = faker.name.findName()
const email = faker.internet.email()

describe('Criar Conta Supervisor', () => {

    beforeEach(() =>{
        cy.visit("/")
    })

    it('Cadastrar Voluntário Supervisor',() => {

        //Preencher campo Nome
        cy.get('#name').type(name)
        //Preencher campo E-mail
        cy.get('#email').type(email)
        //Preencher campo Senha e Confirmar senha
        cy.enterPassword(Cypress.env('password'), Cypress.env('confpassword'))
        // Selecionar Tipo Voluntário Supervisor
        cy.get(':nth-child(2) > .styles__RadioValue-sc-rx994k-2').click()
        // Verificar botão Cadastrar desabilitado
        cy.get('.styles__Wrapper-sc-s8fbhq-0').should('to.be.disabled')
        // Selecionar Eu li e concoordo com os Termos de uso e ......
        cy.get('#termsConfirm').click()
        // Clicar no botão Cadastrar
        cy.get('.styles__Wrapper-sc-s8fbhq-0').should('to.be.enabled')
        .click()
        // Redirecionado para a página atendente
        cy.url().should('eq', 'https://me-conta-frontend.herokuapp.com/cadastro-atendente')
    }) 
})