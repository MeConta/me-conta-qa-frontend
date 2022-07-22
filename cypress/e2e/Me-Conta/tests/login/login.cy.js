/// <reference types="Cypress" />

import faker from "@faker-js/faker";
faker.locale = "pt_BR";

const name = "Maria Silva Sá";
const email = faker.internet.email();
const password = Cypress.env("PASSWORD");

const TIPO_ALUNO = 0;
const INVALID_LOGIN_ERROR = "Email ou senha inválido(s)!";

const irParaPaginaLogin = () => {
  before(() => {
    cy.visit("/login");
  });

  describe("Dado: que eu estou na página de login", () => {
    it("eu consigo ver a página de login", () => {
      cy.contains("Faça seu login e comece seu atendimento!").should(
        "be.visible"
      );
    });
  });
};

context("funcionalidade: realização de login com sucesso", () => {
  describe("Dado: que eu sou um usuário com uma conta criada", () => {
    it("eu crio uma conta do tipo aluno, mas não completo todas as etapas do cadastro (Dados Pessoais e Dados Escolares)", () => {
      cy.intercept("POST", "/cadastro-inicial").as("criarConta");
      cy.criarConta(name, email, TIPO_ALUNO);
      cy.wait("@criarConta").its("response.statusCode").should("eq", 201);
    });
  });

  describe("Quando: eu estou na página de login", () => {
    it("eu consigo ver a página de login", () => {
      cy.visit("/login");

      cy.contains("Faça seu login e comece seu atendimento!").should(
        "be.visible"
      );
    });
  });

  describe("E: preencho as credenciais corretamente e clico no botão de entrar", () => {
    it("eu preencho o email e senha corretamente e clico no botão de entrar", () => {
      cy.get("#email").type(email).should("have.value", email);
      cy.get("#password").type(password).should("have.value", password);
      cy.contains("ENTRAR").should("be.enabled").click();
    });
  });

  describe("Então: eu sou redirecionado para o formulário de Dados Pessoais para que eu possa concluir o cadastro", () => {
    it("eu consigo ver o formulário de dados pessoais", () => {
      cy.contains(/Complete seus Dados Pessoais/i).should("be.visible");
      cy.get("form").should("be.visible");
    });
  });
});

context("funcionalidade: exibição de erro de campos obrigatórios", () => {
  irParaPaginaLogin();

  describe("Quando: eu tento logar sem preencher os campos obrigatórios", () => {
    it("eu não preencho o email e senha e clico no botão de entrar", () => {
      cy.contains(/ENTRAR/i)
        .should("be.enabled")
        .click();
    });
  });

  describe("Então: eu sou avisado sobre a obrigatoriedade dos campos", () => {
    it("eu consigo ver mensagens de erro abaixo dos campos obrigatórios (e-mail e senha)", () => {
      cy.get('[data-testid="E-mail"]')
        .parent()
        .contains("E-mail é obrigatório")
        .should("be.visible");
      cy.get('[data-testid="Senha"]')
        .parent()
        .contains("A senha é obrigatório")
        .should("be.visible");
    });
  });
});

context("funcionalidade: exibição de erro de senha incorreta", () => {
  irParaPaginaLogin();

  describe("Quando: eu tento fazer login com uma senha incorreta", () => {
    it("eu preencho o e-mail corretamente e a senha de forma incorreta", () => {
      cy.get("#email")
        .should("be.enabled")
        .type(email)
        .should("have.value", email);
      cy.get("#password")
        .type("senhaincorreta")
        .should("have.value", "senhaincorreta");
      cy.contains("ENTRAR").should("be.enabled").click();
    });
  });

  describe("Então: eu sou avisado sobre incompatibilidade da senha", () => {
    it("eu vejo um toast com uma mensagem de erro", () => {
      cy.get(".Toastify__toast-body").should("have.text", INVALID_LOGIN_ERROR);
    });
  });
});

context("funcionalidade: exibição de erro de usuário não existente", () => {
  irParaPaginaLogin();

  describe("Quando: eu tento fazer login com um e-mail de usuário não cadastrado", () => {
    it("eu tento fazer com um e-mail que não está cadastrado no sistema", () => {
      const emailNaoCadastrado = "emailNaoCadastrado1234@email.com";

      cy.get("#email")
        .type(emailNaoCadastrado)
        .should("have.value", emailNaoCadastrado);
      cy.get("#password").type(password).should("have.value", password);
      cy.contains("ENTRAR").should("be.enabled").click();
    });
  });

  describe("Então: eu sou avisado sobre incompatibilidade do e-mail", () => {
    it("eu vejo um toast com uma mensagem de erro", () => {
      cy.get(".Toastify__toast-body").should("have.text", INVALID_LOGIN_ERROR);
    });
  });
});
