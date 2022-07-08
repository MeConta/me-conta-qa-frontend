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
