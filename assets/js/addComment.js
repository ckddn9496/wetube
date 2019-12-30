import axios from "axios";

const addCommentForm = document.getElementById("jsAddComment");
const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");

const increaseNumber = () => {
  commentNumber.innerHTML = `${parseInt(commentNumber.innerHTML, 10) + 1} `;
};

const addComment = comment => {
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.innerHTML = comment;
  const removeBtn = document.createElement("span");
  removeBtn.innerHTML = "X";
  removeBtn.className = "remove__comment";
  li.appendChild(span);
  li.appendChild(removeBtn);
  commentList.prepend(li);
};

const sendComment = async comment => {
  const videoId = window.location.href.split("videos")[1];
  const response = await axios({
    url: `/api/comment${videoId}`,
    method: "POST",
    data: { comment }
  });
  if (response.status === 200) {
    addComment(comment);
    increaseNumber();
  }
};

const handleSubmit = event => {
  event.preventDefault();
  const commentInput = addCommentForm.querySelector("input");
  const comment = commentInput.value;
  sendComment(comment);
  commentInput.value = "";
};

function init() {
  addCommentForm.addEventListener("submit", handleSubmit);
}

if (addCommentForm) {
  init();
}
