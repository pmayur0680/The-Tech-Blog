// attached to login-handlebars template
const loginFormHandler = async function(event) {
  event.preventDefault();

   //  get user input form submitted
  const username = document.querySelector('#username-input-login').value.trim();;
  const password = document.querySelector('#password-input-login').value.trim();;

   //  call /api/user/login to authenticate user
  const response = await fetch('/api/user/login', {
    method: 'POST',
    body: JSON.stringify({
      username: username,
      password: password,
    }),
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.ok) {
    alert('You are now logged in!')
     document.location.replace('/dashboard');    
    //  document.location.reload();
  } else {
    alert('Failed to login');
  }
};

document
  .querySelector('#login-form')
  .addEventListener('submit', loginFormHandler);
