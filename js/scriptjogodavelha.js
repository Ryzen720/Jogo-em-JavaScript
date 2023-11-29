let button = document.querySelectorAll(".button");
let popup = document.querySelector(".popup");
let novo_jogo = document.getElementById("novo_jogo");
let reiniciar = document.getElementById("reiniciar");
let mensagem = document.getElementById("mensagem");

let winningPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [2, 5, 8],
  [6, 7, 8],
  [3, 4, 5],
  [1, 4, 7],
  [0, 4, 8],
  [2, 4, 6],
];

let xTurn = true;
let count = 0;

const disableButtons = () => {
  button.forEach((element) => (element.disabled = true));

  popup.classList.remove("hide");
};

const enableButtons = () => {
  button.forEach((element) => {
    element.innerText = "";
    element.disabled = false;
  });

  popup.classList.add("hide");
};

const winFunction = (letter) => {
  disableButtons();
  if (letter == "X") {
    mensagem.innerHTML = "O jogador 1 ganhou com o 'X'";
  } else {
    mensagem.innerHTML = "O jogador 2 ganhou com o 'O'";
  }
};

const drawFunction = () => {
  disableButtons();
  mensagem.innerHTML = "Empate";
};

novo_jogo.addEventListener("click", () => {
  count = 0;
  enableButtons();
});
reiniciar.addEventListener("click", () => {
  count = 0;
  enableButtons();
});

const winChecker = () => {
  for (let i of winningPattern) {
    let [element1, element2, element3] = [
      button[i[0]].innerText,
      button[i[1]].innerText,
      button[i[2]].innerText,
    ];
    if (element1 != "" && (element2 != "") & (element3 != "")) {
      if (element1 == element2 && element2 == element3) {
  
        winFunction(element1);
      }
    }
  }
};

button.forEach((element) => {
  element.addEventListener("click", () => {
    if (xTurn) {
      xTurn = false;

      element.innerText = "X";
      element.disabled = true;
    } else {
      xTurn = true;

      element.innerText = "O";
      element.disabled = true;
    }

    count += 1;
    if (count == 9) {
      drawFunction();
    }

    winChecker();
  });
});

window.onload = enableButtons;
