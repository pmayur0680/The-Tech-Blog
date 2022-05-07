// attached to edit-post-handlebars template
const postId = document.querySelector('input[name="post-id"]').value;

const editFormHandler = async function(event) {
  event.preventDefault();

    //  get user input form submitted
  const title = document.querySelector('input[name="post-title"]').value;
  const body = document.querySelector('textarea[name="post-body"]').value;

  //  call /api/post to update user post
  await fetch(`/api/post/${postId}`, {
    method: 'PUT',
    body: JSON.stringify({
      title,
      body,
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  document.location.replace('/dashboard');
};

  //  call /api/post to delete user post
const deleteClickHandler = async function() {
  const response = await fetch(`/api/post/${postId}`, {
    method: 'DELETE'
  });
  
  if (response.ok) {
    document.location.replace('/dashboard/');
  } else {
    alert(response.statusText);
  }
  
};

// listen edit post form submit
document
  .querySelector('#edit-post-form')
  .addEventListener('submit', editFormHandler);
// listen edit post form delete button click
document
  .querySelector('#delete-btn')
  .addEventListener('click', deleteClickHandler);
