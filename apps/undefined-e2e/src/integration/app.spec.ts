import { getGreeting } from '../support/app.po';

describe('undefined', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getGreeting().contains('Welcome to undefined!');
  });
});
