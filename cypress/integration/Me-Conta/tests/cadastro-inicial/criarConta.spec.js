/// <reference types="Cypress" />

import faker from "@faker-js/faker";

const name = faker.name.findName()
const email = faker.internet.email()
const password = Cypress.env('PASSWORD')

describe('Criar conta', () => {

    it('Criar conta - Aluno', () => {
        const name = faker.name.findName()
        const email = faker.internet.email()

        cy.criarConta(name, email, 0)
        cy.url().should('not.include', '/criar-conta')
    })

    it('Criar Conta - Voluntário Supervisor', () => {
        const name = faker.name.findName()
        const email = faker.internet.email()

        cy.criarConta(name, email, 1)
        cy.url().should('not.include', '/criar-conta')
    })

    it('Criar Conta - Voluntário Atendente', () => {
        const name = faker.name.findName()
        const email = faker.internet.email()

        cy.criarConta(name, email, 2)
        cy.url().should('not.include', '/criar-conta')
    })

    it('Criar Conta - E-mail duplicado', () => {
        cy.criarConta(name, "teste@teste.com", 0)
        cy.get('.Toastify__toast-body').should('have.text', "e-mail duplicado")
    })

    it('Criar Conta - E-mail inválido', () => {
        cy.criarConta(name, "teste", 0)
        cy.contains('CADASTRAR').should('to.be.disabled')
        cy.get('[data-testid="E-mail"]').parent().contains('E-mail inválido')
    })

    it('Criar Conta - Sem preencher os campos', () => {
        cy.contains('CADASTRAR').should('to.be.enabled').click()
        cy.get('[data-testid="Nome"]').parent().contains('Nome é obrigatório')
        cy.get('[data-testid="E-mail"]').parent().contains('E-mail é obrigatório')
        cy.get('[data-testid="Senha"]').parent().contains('A senha é obrigatório')
        cy.get('[data-testid="Confirmar Senha"]').parent().contains('A confirmação de senha é obrigatório')
        cy.contains('CADASTRAR').should('to.be.disabled')
    })

    it('Criar Conta - Não concordar com os termos e políticas de privacidade', () => {
        cy.get('#name').type(name)
        cy.get('#email').type(email)
        cy.enterPassword(password, password)
        cy.contains('CADASTRAR').click().should('to.be.disabled')
        cy.get('#termsConfirm').parent().parent().contains('Termo obrigatório')
    })

    it('Criar Conta - Nome menor que 2 caracteres', () => {
        cy.get('#name').type('t')
        cy.get('#email').type(email)
        cy.enterPassword(password, password)
        cy.get('#termsConfirm').click()
        cy.contains('CADASTRAR').click().should('to.be.disabled')
        cy.get('[data-testid="Nome"]').parent().contains('Nome deve conter mais de 2 caracteres')
    })

    it('Criar Conta - Senhas diferentes', () => {
        cy.get('#name').type(name)
        cy.get('#email').type(email)
        cy.enterPassword("s#nh4Teste", "s#nh4Teste1")
        cy.get('#termsConfirm').click()
        cy.contains('CADASTRAR').click().should('to.be.disabled')
        cy.get('[data-testid="Confirmar Senha"]').parent().contains('As senhas devem ser iguais')
    })
})