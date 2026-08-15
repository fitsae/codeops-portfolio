# Validated Persistent Signup Form

## About the Project

This project is a simple signup form that validates a user's name and
Ethiopian phone number.

The project demonstrates four important JavaScript skills:

- Forms
- Validation
- Regular expressions
- localStorage and JSON

Valid signup information is saved in the browser's `localStorage`, so the
data remains available after refreshing or reopening the page.

---

## Features

- User can enter their full name.
- User can enter an Ethiopian phone number.
- Name must contain at least 2 characters.
- Phone number is validated with a regular expression.
- Clear error messages are displayed for invalid input.
- The form does not reload the page when submitted.
- Valid entries are saved to `localStorage`.
- Saved data is stored as JSON.
- Saved data is restored after a page reload.
- Missing or corrupt localStorage data is handled safely.
- User messages are displayed using `textContent`.

---

## Ethiopian Phone Number Validation

The project uses this regular expression:

```javascript
/^(?:\+251|0)9\d{8}$/;
```
