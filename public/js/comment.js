// attached to single-post-handlebars template

const commentFormHandler = async function(event) {
  event.preventDefault();
  
  //  get user input form submitted
  const postId = document.querySelector('input[name="post-id"]').value;
  const body = document.querySelector('textarea[name="comment-body"]').value;

  //  call /api/comment to save comment to database
  if (body) {
    await fetch('/api/comment', {
      method: 'POST',
      body: JSON.stringify({
        postId,
        body
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    document.location.reload();
  }
};
// listen form submit
document
  .querySelector('#new-comment-form')
  .addEventListener('submit', commentFormHandler);
