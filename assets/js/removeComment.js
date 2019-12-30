import axios from "axios";
const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");

let comments;

const decreaseNumber = () => {
  commentNumber.innerHTML = `${parseInt(commentNumber.innerHTML, 10) - 1} `;
};

const removeComment = commentId => {
  document.getElementById(commentId).parentElement.remove();
};

const sendRemoveRequest = async event => {
  const commentId = event.target.id;
  const response = await axios({
    url: `/api/comment/${commentId}`,
    method: "DELETE"
  });
  if (response.status === 200) {
    removeComment(commentId);
    decreaseNumber();
  }
};

function init() {
  comments = commentList.getElementsByClassName("remove__comment");
  for (let i = 0; i < comments.length; i += 1) {
    comments[i].addEventListener("click", sendRemoveRequest);
  }
}

if (commentList) {
  init();
}
