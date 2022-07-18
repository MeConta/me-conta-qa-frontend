import faker from "@faker-js/faker";
faker.setLocale("pt_BR");

context("funcionalidade: acessar a página de cadastro", () => {
  before(() => {
    cy.visit("/login");
  });

  describe("Dado: que estou na página de login do site do MeConta", () => {
    it("eu acesso a página de login", () => {
      cy.contains(/Faça seu login e comece seu atendimento/).should(
        "be.visible"
      );
    });
  });

  describe("Quando: eu clico no botão Crie sua Conta", () => {
    it("eu clico no botão Crie sua Conta", () => {
      const criarContaButton = cy.contains(/Crie sua Conta/i);
      criarContaButton.should("be.enabled");
      criarContaButton.click();
    });
  });

  describe("Então: sou redirecionado para a primeira tela de cadastro", () => {
    it("eu sou redirecionado a primeira tela do cadastro", () => {
      cy.url().should("include", "/criar-conta");
    });
  });
});

context("funcionalidade: completar detalhes da conta", () => {
  const password = Cypress.env("PASSWORD");
  const name = "Maria Silva Só";
  const email = faker.internet.email();

  describe("Dado: que estou na primeira tela do formulário de cadastro", () => {
    it("eu vejo a primeira tela do cadastro", () => {
      cy.contains(/Criar Conta/i).should("be.visible");
    })
  });

  describe("Quando: eu preencho todos os dados", () => {
    it("eu preencho todos os campos do formulário (nome, email e senha)", () => {
      cy.get("#name").type(name);
      cy.get("#email").type(email);
      cy.enterPassword(password, password);
    })
  });

  describe('E: escolho o tipo de usuário "Aluno"', () => {
    it("eu seleciono o usuário do tipo Aluno", () => {
      const aluno = '0';
      cy.get(`[value=${aluno}]`).click();
      cy.get(`[value=${aluno}]`).should("to.be.checked");
    })
  });

  describe("E: aceito os termos de uso e política de privacidade", () => {
    it("eu seleciono que aceito os termos de uso", () => {
      cy.get("[name=termsConfirm]").click();
      cy.get("[name=termsConfirm]").should("to.be.checked");
    })
  });

  describe("E: clico no botão de Cadastrar", () => {
    it("eu clico no botão de Cadastrar", () => {
      const cadastrarButton = cy.contains(/Cadastrar/i);
      cadastrarButton.should("be.enabled");
      cadastrarButton.click();
    })
  });

  describe("Então: sou redirecionado para a segunda tela de cadastro do aluno (Dados Pessoais)", () => {
    it("eu vejo a segunda tela de cadastro (dados pessoais)", () => {
      cy.contains(/Complete seus Dados Pessoais/i).should("be.visible");
    })
  });
});

context(
  "funcionalidade: exibir erros de campo inválido e campo obrigatório na tela de Dados da Conta",
  () => {
    describe("Dado: que estou na primeira tela do formulário de cadastro", () => {});

    describe("Quando: eu preencho um nome, email ou senha inválido", () => {});

    describe("Então: eu devo ser avisado sobre as inconsistências", () => {});

    describe("E: não consigo concluir meu cadastro", () => {});
  }
);
