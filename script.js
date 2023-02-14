function addMessage() {
  var name = document.getElementById("name").value;
  var message = document.getElementById("message").value;
  var timestamp = new Date().toLocaleString();
  var messagesDiv = document.getElementById("messages");
  var messageDiv = document.createElement("div");
  messageDiv.classList.add("message");
  messageDiv.innerHTML = '<div class="name">' + name + '</div>' +
                          '<div class="timestamp">' + timestamp + '</div>' +
                          '<div class="text">' + message + '</div>';
  messagesDiv.insertBefore(messageDiv, messagesDiv.firstChild);
  document.getElementById("name").value = "";
  document.getElementById("message").value = "";
}
