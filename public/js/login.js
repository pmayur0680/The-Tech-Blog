const loginFormHandler = async function(event) {
  event.preventDefault();

  const username = document.querySelector('#username-input-login').value.trim();;
  const password = document.querySelector('#password-input-login').value.trim();;

  const response = await fetch('/api/user/login', {
    method: 'POST',
    body: JSON.stringify({
      username: username,
      password: password,
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert('Failed to login');
  }
};

document
  .querySelector('#login-form')
  .addEventListener('submit', loginFormHandler);
