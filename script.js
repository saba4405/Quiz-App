const startBtn = document.getElementById("startQuiz");
const nameInput = document.getElementById("nameInput");

startBtn.addEventListener("click", function () {
    const name = nameInput.value.trim();

    if (name === "") {
    alert("Please enter your name");
    return;
  }

    localStorage.setItem("playerName", name);
    window.location.href = "index2.html";
});
