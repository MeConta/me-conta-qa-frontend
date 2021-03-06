import { nivelDeFormacao, frentesAtuacao } from "../constants/constants";
import faker from "@faker-js/faker";

Cypress.Commands.add("enterPassword", (password, confpassword) => {
  cy.get("#password").type(password, { log: false });
  cy.get("#passwordConfirm").type(confpassword, { log: false });
});

Cypress.Commands.add("criarConta", (name, email, tipo) => {
  const password = Cypress.env("PASSWORD");
  cy.visit("/criar-conta");
  cy.get("#name").type(name);
  cy.get("#email").type(email);
  cy.enterPassword(password, password);
  // Verify that default is checked
  cy.get("[value='0']").should("to.be.checked");
  cy.get(`[value=${tipo}]`).click();
  cy.get("[name=termsConfirm]").click();
  cy.contains(/CADASTRAR/i).click();
});

Cypress.Commands.add("preencherDadosPessoais", (phone, data, enableProximoPasso = true) => {
  cy.get("#telefone").type(phone);
  cy.get("#dataNascimento").type(data, { force: true });
  cy.get("#UF").select("Acre").should("have.value", "AC");
  cy.get("#cidade").type("Rio Branco");
  cy.get("#Feminino").click();
  if (enableProximoPasso){
    cy.contains(/Próximo Passo/i).click();
  }
});

Cypress.Commands.add("preencherDadosEscolares", (enableCamposOpcionais = false) => {
  cy.get("[name=escolaridade]")
  .select("1º Ano - Ensino Médio")
  .should("have.value", "0");
  cy.get("[name=tipoEscola]").should("to.be.checked");
  if (enableCamposOpcionais) {
    cy.get("#necessidades")
    .type("minhas necessidades")
    .should("have.value", "minhas necessidades");
  cy.get("#expectativas")
    .type("minhas expectativas")
    .should("have.value", "minhas expectativas");
  cy.get("#tratamentos")
    .type("meus tratamentos")
    .should("have.value", "meus tratamentos");
  }
  cy.contains(/Concluir meu Cadastro/i)
  .should("be.enabled")
  .click();
})

Cypress.Commands.add("preencherDadosAcademicos", (formacao = nivelDeFormacao.SUPERIOR_EM_ANDAMENTO) => {
  const breveDescricao = faker.lorem.words(5);  
  cy.get("#instituicao").type("UFRJ").should("have.value", "UFRJ");
  cy.get(`#frentes [value=${frentesAtuacao.ACOLHIMENTO}]`)
  .click()
  .should("be.checked");
  cy.get(`#frentes [value=${frentesAtuacao.COACHING_ESTUDOS}]`)
  .click()
  .should("be.checked");
  cy.get(`#frentes [value=${frentesAtuacao.ORIENTACAO_VOCACIONAL}]`)
  .click()
  .should("be.checked");
  cy.get("#bio").type(breveDescricao).should("have.value", breveDescricao);

  if (formacao === nivelDeFormacao.SUPERIOR_EM_ANDAMENTO){
    cy.get(
      `#nivelDeFormacao [value=${nivelDeFormacao.SUPERIOR_EM_ANDAMENTO}]`
    ).should("be.checked");
    cy.get("#semestre").type("{backspace}8").should("have.value", "8");
  } else {
    const CRP = "1231454646";
    cy.get(`#nivelDeFormacao [value=${nivelDeFormacao.SUPERIOR_COMPLETO}]`)
      .click()
      .should("be.checked");
    cy.get("#anoFormacao").clear().type("2004").should("have.value", "2004");
    cy.get("#crp").type(CRP).should("have.value", CRP);
    cy.get("#areaAtuacao")
      .select("Psicólogo(a)")
      .should("have.value", "psicologo");
  }
})

