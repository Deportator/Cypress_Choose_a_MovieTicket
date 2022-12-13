const admin = require("../fixtures/admin.json");
const selectors = require("../fixtures/selectors.json");
const seat = require("../fixtures/seatReserv.json");

it("Should book a hall and a ticket", () => {
  cy.visit("qamid.tmweb.ru/admin");
  cy.login(admin.email, admin.password);

  cy.get(selectors.hallSelection)
    .its("length")
    .then((hallNamber) => {
      for (let i = 1; i <= hallNamber; i += 1) {
        let chooseHall = `#start-sales > div:nth-child(2) > ul > li:nth-child(${i})`;
        cy.get(chooseHall).click();

        if (cy.get(selectors.openSale).contains("Продажа билетов открыта")) {
          cy.get(chooseHall).then(($el) => {
            const nameHall = $el.text();
            cy.visit("/");
            cy.get(`body > nav > a:nth-child(${seat.day})`).click();
            cy.contains(nameHall)
              .parent()
              .find(selectors.selectSession)
              .click();
            cy.get(selectors.hallInfo).contains(nameHall).should("be.visible");
            cy.get(
              `div.buying-scheme__wrapper > div:nth-child(${seat.row}) > span:nth-child(${seat.seat})`
            ).click();
            cy.contains("Забронировать").click();
            cy.get("h2")
              .should("have.text", "Вы выбрали билеты:")
              .should("be.visible");
            const ticket = seat.row + "/" + seat.seat;
            cy.contains(ticket).should("be.visible");
            cy.contains(nameHall).should("be.visible");
          });
          break;
        }
      }
    });
});
