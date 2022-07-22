/// <reference types="Cypress" />

import faker from "@faker-js/faker";

const name = faker.name.findName();
const email = faker.internet.email();
const password = Cypress.env("PASSWORD");

const irParaPaginaCriarConta = () => {
  before(() => {
    cy.visit("/criar-conta");
  });

  describe("Dado: que eu estou na tela de criar conta", () => {
    it("eu consigo ver o formulário de criar conta", () => {
      cy.contains(/Criar Conta/i).should("be.visible");
      cy.get("form").should("be.visible");
    });
  });
};

context(
  "funcionalidade: exibição de erro de e-mail duplicado na criação de conta ",
  () => {
    irParaPaginaCriarConta();

    describe("Quando: eu preencho um e-mail já cadastrado", () => {
      it("eu tento criar uma conta com um e-mail já cadastrado", () => {
        cy.intercept("POST", "/cadastro-inicial").as("criarConta");
        cy.criarConta(name, "teste@teste.com", 0);
        cy.wait("@criarConta");
        cy.get("#email").should("have.value", "teste@teste.com");
      });
    });

    describe("Então: sou avisado de que o e-mail está duplicado", () => {
      it("eu consigo ver um toast avisando que o e-mail está duplicado", () => {
        cy.get(".Toastify__toast-body").should("have.text", "E-mail duplicado");
      });
    });
  }
);

context("funcionalidade: exibição de erro de e-mail inválido", () => {
  irParaPaginaCriarConta();

  describe("Quando: preencho um e-mail inválido", () => {
    it("eu preencho um valor de e-mail fora do formato válido (email@email.com)", () => {
      cy.criarConta(name, "teste.teste.com", 0);
      cy.get("#email").should("have.value", "teste.teste.com");
    });
  });

  describe("Então: sou avisado sobre a inconsistência", () => {
    it("eu consigo ver um erro de e-mail inválido", () => {
      cy.get('[data-testid="E-mail"]')
        .parent()
        .contains(/E-mail inválido/i);
    });
  });
});

context("funcionalidade: exibição de erros de campo obrigatório", () => {
  irParaPaginaCriarConta();

  describe("Quando: não preencho os campos obrigatórios E clico no botão de cadastrar", () => {
    it("eu clico no botão de cadastrar", () => {
      cy.contains(/CADASTRAR/i)
        .should("be.enabled")
        .click();
    });
  });

  describe("Então: sou avisado sobre a obrigatoriedade dos campos", () => {
    it("eu consigo ver os erros de campo obrigatório", () => {
      cy.contains("Nome é obrigatório").should("be.visible");
      cy.contains("E-mail é obrigatório").should("be.visible");
      cy.contains("A senha é obrigatório").should("be.visible");
      cy.contains("A confirmação de senha é obrigatório").should("be.visible");
      cy.contains("Termo obrigatório").should("be.visible");
    });
  });
});

context(
  "funcionalidade: exibição do erro de nome com menos de 2 caracteres",
  () => {
    irParaPaginaCriarConta();

    describe("Quando: preencho o nome com nome de menos de 2 caracteres", () => {
      it("eu preencho o nome com menos de 2 caracteres E preencho os outros campos com valores válidos", () => {
        cy.get("#name").type("t").should("have.value", "t");
        cy.get("#email").type(email).should("have.value", email);
        cy.enterPassword(password, password);
        cy.get("[name=termsConfirm]").click().should("be.checked");
      });
    });

    describe("E: clico no botão de cadastrar", () => {
      it("eu clico no botão cadastrar", () => {
        cy.contains(/CADASTRAR/i)
          .should("be.enabled")
          .click();
      });
    });

    describe("Então: sou avisado sobre a inconsistência", () => {
      it("eu sou avisado sobre a inconsistência", () => {
        cy.contains("Nome deve conter mais de 2 caracteres").should(
          "be.visible"
        );
      });
    });
  }
);

context(
  "funcionalidade: exibição de erros de confirmação de senha (senhas diferentes)",
  () => {
    irParaPaginaCriarConta();

    describe("Quando: preencho a senha e a confirmação de senha com valores diferentes", () => {
      it("eu preencho a senha e confirmação de senha com valores diferentes", () => {
        const senha = "s#nh4Teste";
        const confirmacaoSenha = "s#nh4Teste1";

        cy.get("#name").type(name).should("have.value", name);
        cy.get("#email").type(email).should("have.value", email);

        cy.enterPassword(senha, confirmacaoSenha);

        cy.get("#password").should("not.have.value", confirmacaoSenha);

        cy.get("[name=termsConfirm]").click().should("be.checked");
      });
    });

    describe("E: clico no botão de cadastrar", () => {
      it("eu clico no botão cadastrar", () => {
        cy.contains(/CADASTRAR/i)
          .should("be.enabled")
          .click();
      });
    });

    describe("Então: sou avisado sobre a inconsistência", () => {
      it("eu vejo uma mensagem de erro indicando que as senhas devem ser iguais", () => {
        cy.contains("As senhas devem ser iguais").should("be.visible");
      });
    });
  }
);
