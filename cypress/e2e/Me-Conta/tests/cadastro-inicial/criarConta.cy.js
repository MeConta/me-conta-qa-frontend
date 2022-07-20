/// <reference types="Cypress" />

import faker from "@faker-js/faker";

const name = faker.name.findName();
const email = faker.internet.email();
const password = Cypress.env("PASSWORD");

describe("Criar conta", () => {
  beforeEach(() => {
    cy.visit("/criar-conta");
  });

  it("Criar Conta - E-mail duplicado", () => {
    cy.criarConta(name, "teste@teste.com", 0);
    cy.get(".Toastify__toast-body").should("have.text", "E-mail duplicado");
  });

  it("Criar Conta - E-mail inválido", () => {
    cy.criarConta(name, "teste", 0);
    cy.get('[data-testid="E-mail"]')
      .parent()
      .contains(/E-mail inválido/i);
  });

  it("Criar Conta - Sem preencher os campos", () => {
    cy.visit("/criar-conta");

    cy.contains(/CADASTRAR/i)
      .should("be.enabled")
      .click();
    cy.contains("Nome é obrigatório").should("be.visible");
    cy.contains("E-mail é obrigatório").should("be.visible");
    cy.contains("A senha é obrigatório").should("be.visible");
    cy.contains("A confirmação de senha é obrigatório").should("be.visible");
    cy.contains("Termo obrigatório").should("be.visible");
  });

  it("Criar Conta - Nome menor que 2 caracteres", () => {
    cy.get("#name").type("t");
    cy.get("#email").type(email);
    cy.enterPassword(password, password);
    cy.get("[name=termsConfirm]").click();
    cy.contains(/CADASTRAR/i).click();

    cy.contains("Nome deve conter mais de 2 caracteres").should("be.visible");
  });

  it("Criar Conta - Senhas diferentes", () => {
    cy.get("#name").type(name);
    cy.get("#email").type(email);
    cy.enterPassword("s#nh4Teste", "s#nh4Teste1");
    cy.get("[name=termsConfirm]").click();
    cy.contains(/CADASTRAR/i).click();
    cy.contains("As senhas devem ser iguais").should("be.visible");
  });
});
