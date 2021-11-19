/// <reference types="Cypress" >

import faker from 'faker'
faker.locale = 'pt_BR'

describe('Cadastrar Supervisor', () => {
    beforeEach(() =>{
        cy.visit("/")
    })

    it('Cadastrar Supervisor - Sucesso com todos os campos', () => {
        const name = faker.name.findName()
        const email = faker.internet.email()
        const phone = faker.phone.phoneNumber()
        const data = '2013-10-10'
        
        cy.get('#name').type(name)
        cy.get('#email').type(email)
        cy.enterPassword(Cypress.env('CYPRESS_PASSWORD'), Cypress.env('CYPRESS_PASSWORD'))
        cy.get("[value='1']").should('to.be.visible').click()
        cy.get('.styles__Wrapper-sc-s8fbhq-0').should('to.be.disabled')
        cy.get('#termsConfirm').click()
        cy.get('.styles__Wrapper-sc-s8fbhq-0').should('to.be.enabled').click()
        cy.url().should('eq', 'https://me-conta-frontend.herokuapp.com/cadastro-voluntario')
        cy.get('#telefone').type(phone)
        cy.get('#dataNascimento').should('to.be.visible').type(data , { force: true })
        cy.get('#UF').should('to.be.visible').select('Acre').should('have.value', 'AC')
        cy.get('#cidade').type('Rio Branco')
        cy.get('#Masculino').should('to.be.visible').click()
        cy.get('#instituicao').type('Universidade')
        cy.get('#anoFormacao').type('2000')
        cy.get('#crp').type('1234 PR')
        cy.get('#especializacoes').type('Minhas especializações')
        cy.get('#areaAtuacao').select('Psicólogo').should('have.value', 'psicologo')
        cy.get('#abordagem').type('Minha abordagem')
        cy.get('#frentesAtuacao0').click()
        cy.get('#frentesAtuacao1').click()
        cy.get('#frentesAtuacao2').click()
        cy.get('.styles__Wrapper-sc-s8fbhq-0').click()
        cy.get('.Toastify__toast-body').should('have.text'," Cadastro realizado com sucesso! ")
    })

    it('Cadastrar Supervisor - Sucesso apenas com campos obrigatórios', () => {

    })

    it('Cadastrar Supervisor - Campos vazios', () => {
        
    })

    it('Cadastrar Supervisor - Pular preenchimento de dados', () => {

    })

    it('Cadastrar Supervisor - Campos inválidos', () => {
        //idade deve ser > 18 anos
    })
})