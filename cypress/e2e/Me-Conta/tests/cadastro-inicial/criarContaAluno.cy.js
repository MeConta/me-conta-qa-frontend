/// <reference types="Cypress" />

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
    });
  });

  describe("Quando: eu preencho todos os dados", () => {
    it("eu preencho todos os campos do formulário (nome, email e senha)", () => {
      cy.get("#name").type(name);
      cy.get("#email").type(email);
      cy.enterPassword(password, password);
    });
  });

  describe('E: escolho o tipo de usuário "Aluno"', () => {
    it("eu seleciono o usuário do tipo Aluno", () => {
      const aluno = "0";
      cy.get(`[value=${aluno}]`).click();
      cy.get(`[value=${aluno}]`).should("to.be.checked");
    });
  });

  describe("E: aceito os termos de uso e política de privacidade", () => {
    it("eu seleciono que aceito os termos de uso", () => {
      cy.get("[name=termsConfirm]").click();
      cy.get("[name=termsConfirm]").should("to.be.checked");
    });
  });

  describe("E: clico no botão de Cadastrar", () => {
    it("eu clico no botão de Cadastrar", () => {
      const cadastrarButton = cy.contains(/Cadastrar/i);
      cadastrarButton.should("be.enabled");
      cadastrarButton.click();
    });
  });

  describe("Então: sou redirecionado para a segunda tela de cadastro do aluno (Dados Pessoais)", () => {
    it("eu vejo a segunda tela de cadastro (dados pessoais)", () => {
      cy.contains(/Complete seus Dados Pessoais/i).should("be.visible");
    });
  });
});

context("funcionalidade: completar dados pessoais", () => {
  const phone = faker.phone.phoneNumber("553########");
  const data = "2013-10-10";
  describe("Dado: que estou na segunda tela do formulário de cadastro", () => {
    it("eu vejo a segunda tela do cadastro", () => {
      cy.contains(/Complete seus Dados Pessoais/i).should("be.visible");
    });
  });

  describe("Quando: eu preencho todos os dados pessoais", () => {
    it("eu preencho todos os campos do formulário (telefone, data de nascimento, estado, cidade e gênero)", () => {
      cy.get("#telefone").type(phone);
      cy.get("#dataNascimento").type(data, { force: true });
      cy.get("#UF").select("Acre").should("have.value", "AC");
      cy.get("#cidade").type("Rio Branco");
      cy.get("#Feminino").click();
    });
  });

  describe("E: clico no botão de Próximo Passo", () => {
    it("eu clico no botão de Próximo Passo", () => {
      const proximoPassoButton = cy.contains(/Próximo Passo/i);
      proximoPassoButton.should("be.enabled");
      proximoPassoButton.click();
    });
  });

  describe("Então: sou redirecionado para a terceira tela de cadastro do aluno (Dados Escolares)", () => {
    it("eu vejo a terceira tela de cadastro (dados escolares)", () => {
      cy.contains(/Complete seus Dados Escolares/i).should("be.visible");
    });
  });
});

context("funcionalidade: completar dados escolares", () => {
  before(() => {
    cy.criarConta("Maria Silva", faker.internet.email(), 0);
    cy.url().should("include", "/criar-conta");
    const phone = faker.phone.phoneNumber("553########");
    const data = "2013-10-10";
    cy.preencherDadosPessoais(phone, data);
  });

  describe("Dado: que estou na terceira tela do formulário de cadastro (Dados Escolares)", () => {
    it("eu vejo a terceira tela do cadastro", () => {
      cy.contains(/Complete seus Dados Escolares/i).should("be.visible");
    });
  });

  describe("Quando: eu preencho todos os dados escolares", () => {
    it("eu preencho todos os campos do formulário (escolaridade, tipo de escola)", () => {
      cy.get("[name=escolaridade]")
        .select("1º Ano - Ensino Médio")
        .should("have.value", "0");
      cy.get("[name=tipoEscola]").should("to.be.checked");
      cy.get("#necessidades").type("minhas necessidades");

      cy.get("#expectativas").type("minhas expectativas");

      cy.get("#tratamentos").type("meus tratamentos");
    });
  });

  describe.skip("E: clico no botão de Concluir meu Cadastro", () => {
    it("eu clico no botão de Concluir meu Cadastro", () => {
      cy.contains(/Concluir meu Cadastro/i).click();
      cy.wait(2000).url().should("include", "/dashboard-aluno");
    });
  });
});
