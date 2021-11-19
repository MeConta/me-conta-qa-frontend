/// <reference types="Cypress" >

import faker from 'faker'
faker.locale = 'pt_BR'

describe('Cadastrar Aluno', () => {
    beforeEach(() =>{
        cy.visit("/")
    })

    it('Cadastrar Aluno - Sucesso com todos os campos', () => {
        const name = faker.name.findName()
        const email = faker.internet.email()
        const phone = faker.phone.phoneNumber()
        const data = '2013-10-10'
        
        cy.get('#name').type(name)
        cy.get('#email').type(email)
        cy.enterPassword(Cypress.env('CYPRESS_PASSWORD'), Cypress.env('CYPRESS_PASSWORD'))
        cy.get("[value='0']").should('to.be.checked') 
        cy.get('.styles__Wrapper-sc-s8fbhq-0').should('to.be.disabled')
        cy.get('#termsConfirm').click()
        cy.get('.styles__Wrapper-sc-s8fbhq-0').should('to.be.enabled').click()
        cy.url().should('eq', 'https://me-conta-frontend.herokuapp.com/cadastro-aluno')
        cy.get('#telefone').type(phone)
        cy.get('#dataNascimento').should('to.be.visible').type(data , { force: true })
        cy.get('#UF').should('to.be.visible').select('Acre').should('have.value', 'AC')
        cy.get('#cidade').type('Rio Branco')
        cy.get('#Feminino').should('to.be.visible').click()
        cy.get('#escolaridade').should('to.be.visible').select('1').should('have.value', '1')
        cy.get('[name=tipoEscola]').should('to.be.checked')
        cy.get('#necessidades').type('minhas necessidades')
        cy.get('#expectativas').type('minhas expectativas')
        cy.get('#tratamentos').type('meus tratamentos')
        cy.get('.styles__Wrapper-sc-s8fbhq-0').click()
        cy.url().should('eq', 'https://me-conta-frontend.herokuapp.com/dashboard-aluno')
    })

    it.skip('Cadastrar Aluno - Sucesso apenas com campos obrigatórios', () => {
        const name = faker.name.findName()
        const email = faker.internet.email()
        const phone = faker.phone.phoneNumber()
        const data = '2013-10-10'
        
        cy.get('#name').type(name)
        cy.get('#email').type(email)
        cy.enterPassword(Cypress.env('CYPRESS_PASSWORD'), Cypress.env('CYPRESS_PASSWORD'))
        cy.get("[value='0']").should('to.be.checked') 
        cy.get('.styles__Wrapper-sc-s8fbhq-0').should('to.be.disabled')
        cy.get('#termsConfirm').click()
        cy.get('.styles__Wrapper-sc-s8fbhq-0').should('to.be.enabled').click()
        cy.url().should('eq', 'https://me-conta-frontend.herokuapp.com/cadastro-aluno')
        cy.get('#telefone').type(phone)
        cy.get('#dataNascimento').should('to.be.visible').type(data , { force: true })
        cy.get('#UF').should('to.be.visible').select('Acre').should('have.value', 'AC')
        cy.get('#cidade').type('Rio Branco')
        cy.get('#Feminino').should('to.be.visible').click()
        cy.get('#escolaridade').should('to.be.visible').select('1').should('have.value', '1')
        cy.get('[name=tipoEscola]').should('to.be.checked')
        cy.get('.styles__Wrapper-sc-s8fbhq-0').click()
        cy.url().should('eq', 'https://me-conta-frontend.herokuapp.com/dashboard-aluno')
    })

    it('Cadastrar Aluno - Campos vazios', () => {
        const name = faker.name.findName()
        const email = faker.internet.email()

        cy.get('#name').type(name)
        cy.get('#email').type(email)
        cy.enterPassword(Cypress.env('CYPRESS_PASSWORD'), Cypress.env('CYPRESS_PASSWORD'))
        cy.get("[value='0']").should('to.be.checked') 
        cy.get('.styles__Wrapper-sc-s8fbhq-0').should('to.be.disabled')
        cy.get('#termsConfirm').click()
        cy.get('.styles__Wrapper-sc-s8fbhq-0').should('to.be.enabled').click()
        cy.url().should('eq', 'https://me-conta-frontend.herokuapp.com/cadastro-aluno')
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
        cy.get("[value='0']").should('to.be.checked') 
        cy.get('.styles__Wrapper-sc-s8fbhq-0').should('to.be.disabled')
        cy.get('#termsConfirm').click()
        cy.get('.styles__Wrapper-sc-s8fbhq-0').should('to.be.enabled').click()
        cy.url().should('eq', 'https://me-conta-frontend.herokuapp.com/cadastro-aluno')
        cy.get('.styles__Link-sc-xhmkr6-2 > a').click()
        cy.url().should('eq', 'https://me-conta-frontend.herokuapp.com/dashboard-aluno')
    })

    it('Cadastrar Aluno - Campos inválidos', () => {
        const name = faker.name.findName()
        const email = faker.internet.email()

        cy.get('#name').type(name)
        cy.get('#email').type(email)
        cy.enterPassword(Cypress.env('CYPRESS_PASSWORD'), Cypress.env('CYPRESS_PASSWORD'))
        cy.get("[value='0']").should('to.be.checked') 
        cy.get('.styles__Wrapper-sc-s8fbhq-0').should('to.be.disabled')
        cy.get('#termsConfirm').click()
        cy.get('.styles__Wrapper-sc-s8fbhq-0').should('to.be.enabled').click()
        cy.url().should('eq', 'https://me-conta-frontend.herokuapp.com/cadastro-aluno')
        cy.get('#dataNascimento').type('1111-11-11')
        cy.get('#cidade').type('Aa')
        cy.get('.styles__Wrapper-sc-s8fbhq-0').should('to.be.disabled')
        cy.get(':nth-child(4) > .styles__Error-sc-1xrqtb1-3').should('have.text', " Data de nascimento inválida. ")
        cy.get(':nth-child(6) > .styles__Error-sc-1xrqtb1-3').should('have.text', " Cidade é obrigatório. ")
    })
})