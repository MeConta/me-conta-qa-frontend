/// <reference types="Cypress" />

import faker from "@faker-js/faker";
faker.setLocale("pt_BR");

const TIPO_VOLUNTARIO = "2";
const breveDescricao = faker.lorem.words(5);
const frentesAtuacao = {
  ACOLHIMENTO: 0,
  COACHING_ESTUDOS: 1,
  ORIENTACAO_VOCACIONAL: 2,
};
const nivelDeFormacao = {
  SUPERIOR_COMPLETO: 0,
  SUPERIOR_EM_ANDAMENTO: 1,
};
const name = "Maria Silva Só";
let email = faker.internet.email();

context("funcionalidade: completar dados pessoais", () => {
  const phone = faker.phone.phoneNumber("553########");
  const data = "2013-10-10";
  before (() => {
    cy.criarConta(name, email, TIPO_VOLUNTARIO);
  })
  describe("Dado: que estou na segunda tela do formulário de cadastro", () => {
    it("eu vejo a segunda tela do cadastro", () => {
      cy.contains(/Complete seus Dados Pessoais/i).should("be.visible");
    });
  });

  describe("Quando: eu preencho todos os dados pessoais", () => {
    it("eu preencho todos os campos do formulário (telefone, data de nascimento, estado, cidade e gênero)", () => {
      cy.preencherDadosPessoais(phone, data, false);
    });
  });

  describe("E: clico no botão de Próximo Passo", () => {
    it("eu clico no botão de Próximo Passo", () => {
      const proximoPassoButton = cy.contains(/Próximo Passo/i);
      proximoPassoButton.should("be.enabled");
      proximoPassoButton.click();
    });
  });

  describe("Então: sou redirecionado para a terceira tela de cadastro do voluntário (Dados Acadêmicos)", () => {
    it("eu vejo a terceira tela de cadastro (dados acadêmicos)", () => {
      cy.contains(/Complete seus Dados Acadêmicos/i).should("be.visible");
    });
  });
});

describe("funcionalidade: completar cadastro com sucesso com todos os dados preenchidos (Superior em Andamento)", () => {
  before(() => {
    const name = "Maria Silva Só";
    const email = faker.internet.email();

    const phone = faker.phone.phoneNumber("553########");
    const data = "2000-10-10";
    cy.criarConta(name, email, TIPO_VOLUNTARIO);
    cy.preencherDadosPessoais(phone, data);
  });

  it("Dado: que eu preencho os dados acadêmicos e concluo o cadastro, então sou redirecionado para o dashboard de voluntário", () => {
    cy.contains(/Complete seus Dados Acadêmicos/i).should("be.visible");

    cy.get(
      `#nivelDeFormacao [value=${nivelDeFormacao.SUPERIOR_EM_ANDAMENTO}]`
    ).should("be.checked");
    cy.get("#instituicao").type("UFRJ").should("have.value", "UFRJ");
    cy.get("#semestre").type("{backspace}8").should("have.value", "8");
    cy.get(`#frentes [value=${frentesAtuacao.ACOLHIMENTO}]`)
      .click()
      .should("be.checked");
    cy.get(`#frentes [value=${frentesAtuacao.COACHING_ESTUDOS}]`)
      .click()
      .should("be.checked");
    cy.get(`#frentes [value=${frentesAtuacao.ORIENTACAO_VOCACIONAL}]`)
      .click()
      .should("be.checked");
    cy.get("#bio")
      .type(breveDescricao)
      .should("have.value", breveDescricao.slice(0, 255));

    cy.contains(/Finalizar Cadastro/i)
      .should("be.enabled")
      .click();

    cy.url().should("include", "/dashboard-atendente");
  });
});

describe("funcionalidade: completar cadastro com sucesso com todos os dados preenchidos (Superior Completo)", () => {
  before(() => {
    cy.intercept("POST", "/cadastro-inicial").as("criarConta");
    cy.intercept("POST", "/cadastro-voluntario").as("cadastrarVoluntario");
    const name = "Maria Silva Só";
    const email = faker.internet.email();
    const phone = faker.phone.phoneNumber("553########");
    const data = "2000-10-10";
    cy.criarConta(name, email, TIPO_VOLUNTARIO);
    cy.wait("@criarConta");
    cy.preencherDadosPessoais(phone, data);
  });

  it("Dado: que eu preencho os dados acadêmicos e concluo o cadastro, então sou redirecionado para o dashboard de voluntário", () => {
    const CRP = "1231454646";

    cy.contains(/Complete seus Dados Acadêmicos/i).should("be.visible");

    cy.get(`#nivelDeFormacao [value=${nivelDeFormacao.SUPERIOR_COMPLETO}]`)
      .click()
      .should("be.checked");
    cy.get("#instituicao").type("UFRB").should("have.value", "UFRB");
    cy.get("#anoFormacao").clear().type("2004").should("have.value", "2004");
    cy.get("#crp").type(CRP).should("have.value", CRP);
    cy.get("#areaAtuacao")
      .select("Psicólogo(a)")
      .should("have.value", "psicologo");
    cy.get(`#frentes [value=${frentesAtuacao.ACOLHIMENTO}]`)
      .click()
      .should("be.checked");
    cy.get(`#frentes [value=${frentesAtuacao.COACHING_ESTUDOS}]`)
      .click()
      .should("be.checked");
    cy.get("#bio").type(breveDescricao).should("have.value", breveDescricao);

    cy.contains(/Finalizar Cadastro/i)
      .should("be.enabled")
      .click();

    cy.wait("@cadastrarVoluntario");
    cy.url().should("include", "/dashboard-atendente");
  });
});
