import { faker } from '@faker-js/faker';

/**
 * Generates a random checkout form payload.
 *
 * Not used by the current login suite — the login tests only need the fixed
 * SauceDemo demo credentials in data/login.data.json, and reusing the same
 * login on every run is exactly what you want there.
 *
 * This is the pattern to reach for once you add tests that *create* data
 * (e.g. SauceDemo's checkout step, or a real signup flow): generating fresh
 * values at runtime means parallel test runs never collide on the same
 * hardcoded name/zip/email.
 *
 * Example usage in a future checkout.spec.ts:
 *   const info = generateCheckoutInfo();
 *   await checkoutPage.fillInfo(info.firstName, info.lastName, info.zip);
 */
export function generateCheckoutInfo() {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    zip: faker.location.zipCode(),
  };
}