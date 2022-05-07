// attached to signup-handlebars template
const signupFormHandler = async function(event) {
  event.preventDefault();

  //  get user input form submitted
  const username = document.querySelector('#username-input-signup').value.trim();
  const password = document.querySelector('#password-input-signup').value.trim();
  if(username && password){  
      //  call /api/user to register new user to database
  const response = await fetch('/api/user', {
     method: 'POST',
     body: JSON.stringify({ username, password }),
     headers: { 'Content-Type': 'application/json' },    
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert('Failed to sign up');
  }
 } 
};

document
  .querySelector('#signup-form')
  .addEventListener('submit', signupFormHandler);
