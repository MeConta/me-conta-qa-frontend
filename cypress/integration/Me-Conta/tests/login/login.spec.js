/// <reference types="Cypress" />

import faker from "@faker-js/faker";
faker.locale = 'pt_BR'

const name = faker.name.findName()
const email = faker.internet.email()

describe('Criar conta', () => {
    before(() => {
        //cria conta de aluno
        cy.criarConta(name, email, 0)
        cy.contains('Preencher depois').click()
    })

    beforeEach(() => {
        cy.visit("/login")
    })

    it('Clicar no link para criar nova conta', () => {
        cy.contains('Criar conta').click()
        cy.url().should('include', '/criar-conta')
    })

    it('Clicar no link para recuperar a senha', () => {
        cy.contains('Esqueceu a senha?').click()
        cy.url().should('include', '/recuperacao-de-senha')
    })

    it('Campos inválidos', () => {
        cy.contains('ENTRAR').click()
        cy.get('[data-testid="E-mail"]').parent().contains('E-mail é obrigatório')
        cy.get('[data-testid="Senha"]').parent().contains('A senha é obrigatório')
        cy.get('#email').type('teste')
        cy.get('[data-testid="E-mail"]').parent().contains('E-mail inválido')
    })

    it('Senha incorreta', () => {
        cy.get('#email').type(email)
        cy.get('#password').type('senhaincorreta')
        cy.contains('ENTRAR').click()
        //mensagem de senha incorreta
        cy.get('.Toastify__toast-body').should('have.text', "Unauthorized")
    })

    it('Usuário não existente', () => {
        const email = faker.internet.email()

        cy.get('#email').type(email)
        cy.get('#password').type('senhaincorreta')
        cy.contains('ENTRAR').click()
        //mensagem de senha incorreta
        cy.get('.Toastify__toast-body').should('have.text', "Unauthorized")
    })
})