const admin = require("../fixtures/admin.json");

beforeEach(() => {
  cy.visit("qamid.tmweb.ru/admin");
});

it("Should log in success", () => {
  cy.login(admin.email, admin.password);

  cy.contains("Управление залами").should("be.visible");
});

it("Should don't log in with sad pass", () => {
  cy.login(admin.email, admin.sadpassword);

  cy.contains("Ошибка авторизации").should("be.visible");
});
