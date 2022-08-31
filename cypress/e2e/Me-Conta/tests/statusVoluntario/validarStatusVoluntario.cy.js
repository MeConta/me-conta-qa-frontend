/// <reference types="Cypress" />

 beforeEach(() => {
    cy.visit('/login');
  });

 context("funcionalide: login com voluntário que possui status Aberto", () => {
     describe('Dado: eu estou logo no site como um usuario com status Aberto', () => {
       it("eu devo visualizar o banner referente", () => {
       cy.get("#email").type('voluntarioaberto@meconta.com').should("have.value", 'voluntarioaberto@meconta.com');
       cy.get("#password").type('M3c0nt4_123!admin').should("have.value", 'M3c0nt4_123!admin');
       cy.contains("ENTRAR").should("be.enabled").click();
       cy.get('.styles__BannerTitle-sc-1ibllmx-1').should("have.text", 'Bem-vindo(a) ao MeConta!')
       cy.get('.styles__BannerText-sc-1ibllmx-2').should("have.text", 'Nossa equipe irá analisar seu perfil e entrará em contato por e-mail em breve.')
       })
    })
})

 context("funcionalide: login com voluntário que possui status Aprovado", () => {
     describe('Dado: eu estou logo no site como um usuario com status Aprovado', () => {
       it("eu devo visualizar o banner referente", () => {
       cy.get("#email").type('voluntarioaprovado@meconta.com').should("have.value", 'voluntarioaprovado@meconta.com');
       cy.get("#password").type('M3c0nt4_123!admin').should("have.value", 'M3c0nt4_123!admin');
       cy.contains("ENTRAR").should("be.enabled").click();
       cy.get('.styles__NewUserCardTitle-sc-192oyhy-3').should("have.text", 'Meus horários disponíveis')
        })
    })
})


 context("funcionalide: login com voluntário que possui status Reprovado", () => {
     describe('Dado: eu estou logo no site como um usuario com status Reprovado', () => {
       it("eu devo visualizar o banner referente", () => {
       cy.get("#email").type('voluntarioreprovado@meconta.com').should("have.value", 'voluntarioreprovado@meconta.com');
       cy.get("#password").type('M3c0nt4_123!admin').should("have.value", 'M3c0nt4_123!admin');
       cy.contains("ENTRAR").should("be.enabled").click();
       cy.get('.styles__BannerTitle-sc-1ibllmx-1').should("have.text", 'Status: Não aprovado')
       cy.get('.styles__BannerText-sc-1ibllmx-2').should("have.text", 'Seu perfil não atendeu aos critérios. Caso haja alguma dúvida, entre em contato conosco pelo e-mail central@meconta.org.')
       })
    })
})
