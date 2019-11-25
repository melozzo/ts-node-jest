import validatePhone  from './validate-phone'

test('reg-ex accepts well formed phone numbers', () => {
    expect( validatePhone('888-888-9999')).toBe(true);
  });

  
test('reg-ex filters malformed phone numbers', () => {
  expect( validatePhone('1-888-888-9999')).toBe(false);
});