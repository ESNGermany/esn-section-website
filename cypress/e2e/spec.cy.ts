const pages = [
  '/',
  '/esncard',
  '/events',
  '/for-incomings',
  '/for-members',
  '/team',
  '/legal-notice',
];

describe('Each page contains navigation', () => {
  pages.forEach((page) => {
    it(`Should display navigation on ${page} page`, () => {
      cy.visit(page);
      cy.get('esn-navigation').should('be.visible');
    });
  });
  it(`Should open menu when click on burger menu`, () => {
    cy.viewport('iphone-x');
    cy.visit('/');
    cy.get('[data-testid="esn-mobile-menu"]').should('not.be.visible');
    cy.get('[data-testid="esn-burger-menu"]').should('be.visible').click();
    cy.get('[data-testid="esn-mobile-menu"]').should('be.visible');
  });
});

describe('Can load contents', () => {
  // it(`Should load a content item on landing page`, () => {
  //   cy.visit('/');
  //   cy.get('[data-testid="esn-title"]') // loads from sections strapi
  //     .should('be.visible')
  //     .and('not.be.empty');
  // });
  it(`Should open at least one national partner`, () => {
    cy.visit('/esncard');
    cy.get('[data-testid="esn-national-partner"]') // loads from esn germany strapi
      .should('exist')
      .and('not.be.empty');
  });
});

describe('Calendars work', () => {
  // it(`Should load pretix calendar only after accepting banner`, () => {
  //   cy.clearCookie('pretix');
  //   cy.reload();
  //   cy.visit('/events');
  //   cy.get('[data-testid="esn-calendar-blur"]').should('be.visible');
  //   cy.getCookie('pretix').should('not.exist');
  //   cy.get('[data-testid="esn-calendar-button"]').should('exist').click();
  //   cy.getCookie('pretix').should('exist');
  //   cy.get('esn-pretix-calendar').should('exist').and('be.visible');
  // });
  it(`Should show custom calendar`, () => {
    cy.visit('https://konstanz.esn-germany.de/events/');
    cy.get('esn-custom-calendar').should('exist').and('be.visible');
    cy.get('h2')
      .should('exist')
      .then((month) => {
        let currentMonth = month;
        cy.wrap(currentMonth).as('currentMonth');
      });
    cy.get('.fc-icon-chevron-right').should('exist').click();
    cy.get('h2')
      .should('exist')
      .then((month) => {
        let nextMonth = month;
        cy.wrap(nextMonth).as('currentMonth');
      });
    cy.get('@currentMonth').then((currentMonth) => {
      cy.get('h2')
        .should('exist')
        .then((month) => {
          let nextMonth = month;
          cy.wrap(nextMonth).as('nextMonth');
        });
      expect(currentMonth).to.not.equal(cy.get('@nextMonth'));
    });
  });
});

describe(`If no legal notice given, fall back to ESN Germany's`, () => {
  it(`Should load section legal notice`, () => {
    cy.visit('/legal-notice');
    cy.get('[data-testid="esn-section-legal"]')
      .should('be.visible')
      .and('not.be.empty');
  });
  // it(`Should load ESN Germany's legal notice if none provided`, () => {
  //   cy.visit('https://konstanz.esn-germany.de/legal-notice');
  //   cy.get('.title-p').contains('Legal Notice ESN Germany e.V.');
  // });
});
