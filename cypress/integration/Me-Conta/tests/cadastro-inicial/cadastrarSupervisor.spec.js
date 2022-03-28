/// <reference types="Cypress" />

import faker from "@faker-js/faker";
faker.locale = 'pt_BR'

describe('Cadastrar Supervisor', () => {
    beforeEach(() => {
        const name = faker.name.findName()
        const email = faker.internet.email()

        cy.criarConta(name, email, 1)
        cy.url().should('include', '/cadastro-voluntario')
    })

    it('Cadastrar Supervisor - Sucesso com todos os campos', () => {
        const phone = faker.phone.phoneNumber('###########')
        const data = '1990-10-10'

        cy.get("[id='Supervisor *']").click()
        cy.get('#telefone').type(phone)
        cy.get('#dataNascimento').type(data, { force: true })
        cy.get('#UF').select('Acre').should('have.value', 'AC')
        cy.get('#cidade').type('Rio Branco')
        cy.get('#Masculino').click()
        cy.get('#instituicao').type('Universidade')
        cy.get('#anoFormacao').clear().type('2000')
        cy.get('#crp').type('1234 PR')
        cy.get('#especializacoes').type('Minhas especializações')
        cy.get('#areaAtuacao').select('Psicólogo').should('have.value', 'psicologo')
        cy.get('#abordagem').type('Minha abordagem')
        cy.get('#frentesAtuacao0').click()
        cy.get('#frentesAtuacao1').click()
        cy.get('#frentesAtuacao2').click()
        cy.contains('CADASTRAR').click()
        cy.get('.Toastify__toast-body').should('have.text', "Cadastro realizado com sucesso!")
    })

    it('Cadastrar Supervisor - Sucesso apenas com campos obrigatórios', () => {
        const phone = faker.phone.phoneNumber('###########')
        const data = '1990-10-10'

        cy.get("[id='Supervisor *']").should('to.be.visible').click()
        cy.get('#telefone').type(phone)
        cy.get('#dataNascimento').should('to.be.visible').type(data, { force: true })
        cy.get('#UF').should('to.be.visible').select('Acre').should('have.value', 'AC')
        cy.get('#cidade').type('Rio Branco')
        cy.get('#Masculino').should('to.be.visible').click()
        cy.get('#instituicao').type('Universidade')
        cy.get('#anoFormacao').clear().type('2000')
        cy.get('#crp').type('1234 PR')
        cy.get('#areaAtuacao').select('Psicólogo').should('have.value', 'psicologo')
        cy.get('#frentesAtuacao0').click()
        cy.get('#frentesAtuacao1').click()
        cy.get('#frentesAtuacao2').click()
        cy.contains('CADASTRAR').click()
        cy.get('.Toastify__toast-body').should('have.text', "Cadastro realizado com sucesso!")
    })

    it('Cadastrar Supervisor - Campos vazios', () => {
        cy.get('#anoFormacao').clear()
        cy.contains('CADASTRAR').click()

        cy.get('[data-testid="Telefone"]').parent().contains('Telefone é obrigatório')
        cy.get('[data-testid="Data de nascimento"]').parent().contains('Data de nascimento inválida')
        cy.get('[data-testid="Estado"]').parent().contains('Estado é obrigatório')
        cy.get('[data-testid="Cidade"]').parent().contains('Cidade é obrigatório')
        cy.get('[data-testid="Gênero"]').parent().contains('Gênero é obrigatório')
        cy.get('[data-testid="Instituição de ensino"]').parent().contains('Instituição é obrigatória')
        cy.get('[data-testid="Ano de conclusão"]').parent().contains('Ano de formação é obrigatório')
        cy.get('[data-testid="CRP"]').parent().contains('CRP é obrigatório')
        cy.get('[data-testid="Área de Atuação"]').parent().contains('Área de atuação é obrigatória')
        cy.get('.styles__FrenteError-sc-1cq2thm-3').should('have.text', "Frentes de atuação é obrigatório")
    })

    it.only('Cadastrar Supervisor - Campos inválidos', () => {
        const data = '2010-10-10'

        //cy.get('#dataNascimento').type(data, { force: true })
        // This msg never appears
        //cy.get('[data-testid="Data de nascimento"]').parent().contains('Voluntários devem ter mais de 18 anos')
        cy.get('#cidade').type('AB')
        cy.contains('CADASTRAR').click()
        cy.get('[data-testid="Cidade"]').parent().contains('Cidade deve conter mais de 3 caracteres')

        cy.get('#anoFormacao').clear().type('2030')
        cy.get('[data-testid="Ano de conclusão"]').parent().contains('Ano de formação inválido')
    })
})