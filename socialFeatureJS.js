
//function for creating post with title and content sections
function createPost() {
    const title = document.getElementById('post-title').value;
    const content = document.getElementById('post-content').value;

    document.getElementById('post-title').value = '';
    document.getElementById('post-content').value = '';

    const postElement = document.createElement('div');
    postElement.classList.add('post');
    const postId = 'post-' + Date.now();  //unique identifier for the post
    postElement.id = postId;

    postElement.innerHTML = `
    <h3>${title}</h3>
    <p>${content}</p>
    <div class="replies"></div>
    <button onclick="showReplyForm(this.nextElementSibling.nextElementSibling)">Reply</button>
    <button onclick="toggleReplies(this)">Toggle Replies</button>
    <div class="replyForm" style="display:none;">
    <input type="text" class="replyInput" placeholder="Write a reply...">
    <button onclick="addReply(this, '${postId}')">Post Reply</button>
    </div>`;
    document.getElementById('posts-container').appendChild(postElement);
}

function showReplyForm(replyForm) {
    //toggle the display state
    replyForm.style.display = replyForm.style.display === 'none' ? 'block' : 'none';
}

function addReply(button, parentId) {
    //add ability to add reply same fashion as post function
    const replyInput = button.previousElementSibling;
    const replyContent = replyInput.value.trim();
    replyInput.value = '';

    if (!replyContent) return;
    const replyElement = document.createElement('div');
    replyElement.classList.add('reply');
    const replyId = 'reply-' + Date.now(); //assign a unique ID to each reply for future reference
    replyElement.id = replyId;
    replyElement.innerHTML = `
    <p>${replyContent}</p>
    <div class="replies"></div> <!-- Container for nested replies -->
    <button onclick="showReplyForm(this.nextElementSibling)">Reply</button>
    <div class="replyForm" style="display:none;">
    <input type="text" class="replyInput" placeholder="Write a reply...">
    <button onclick="addReply(this, '${replyId}')">Post Reply</button>
    </div>`;

    //find the replies container of the parent post or reply
    let repliesContainer = document.getElementById(parentId).querySelector('.replies');
                
    //if there's no .replies container, create it and append to parent
    if (!repliesContainer) {
        repliesContainer = document.createElement('div');
        repliesContainer.classList.add('replies');
        document.getElementById(parentId).appendChild(repliesContainer);
    }
    repliesContainer.appendChild(replyElement); //append the new reply to the replies container
    button.parentElement.style.display = 'none'; //hide the reply form after posting the reply
}

//toggle replies to either hide or show replies
function toggleReplies(button) {
    const repliesElement = button.parentElement.querySelector('.replies');
    if (repliesElement.style.display === 'none') {
    repliesElement.style.display = 'block';
    button.textContent = 'Hide Replies';
    } else {
        repliesElement.style.display = 'none';
        button.textContent = 'Show Replies';
        }
    }
    