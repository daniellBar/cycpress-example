

declare namespace Cypress {
  interface Chainable {
    getSessionStorageItem(key: string): Chainable;
    clearSessionStorage(): Chainable
  }
}
