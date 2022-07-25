/// <reference types="Cypress" />

import faker from "@faker-js/faker";
faker.locale = "pt_BR";

describe("Logout", () => {
  const password = Cypress.env("PASSWORD");
  const email = faker.internet.email();
  const phone = faker.phone.phoneNumber("553########");

  before(() => {
    const name = "Maria Silva";
    const data = "2013-10-10";
    cy.criarConta(name, email, 0);
    cy.preencherDadosPessoais(phone, data);
    cy.preencherDadosEscolares();
  });

  context("funcionalide: logout da página ao clicar sair", () => {
    describe('Dado: eu estou logado no site e clico em Sair', () => {
      it("eu sou deslogado da plataforma", () => {
        cy.contains(/Sair/i).should("be.enabled").click();
        cy.url().should("include", "/login");
      });
    })
  })

  context(
    "funcionalidade: logout da página por inatividade ",
    () => {
    describe('Dado: que fico inativo na página por mais de 10 minutos', () => {
      it("eu sou deslogado da plataforma", () => {
        cy.visit('/login');
        const now = new Date().getTime();
        cy.get("#email").type(email).should("have.value", email);
        cy.get("#password").type(password).should("have.value", password);
        cy.contains("ENTRAR").should("be.enabled").click();
        cy.clock(now);
        // Move the clock 11 minutes after
        cy.tick(11 * 60 * 1000);
        //cy.get(".Toastify__toast-body").should("have.text", 'Sessão Expirada!');
        cy.url().should("include", "/login");
      });
    })
  });
});
