const commandInput = document.querySelector("#commandInput");
const welcome = document.querySelector(".welcome");
const lines = document.querySelector(".lines");
const input = document.querySelector(".input");
const caret = document.querySelector(".caret");
const user = document.querySelector(".user");

const previousCommands = [];
let pointerPrevious = 0;

document.addEventListener("click", () => {
  commandInput.focus();
});

commandInput.addEventListener("input", () => {
  input.innerText = commandInput.value;
  commandInput.value === ""
    ? caret.classList.remove("typing")
    : caret.classList.add("typing");
});

commandInput.addEventListener("keyup", (e) => {
  if (previousCommands.length) {
    if (
      e.key === "ArrowUp" &&
      previousCommands[pointerPrevious - 1] != undefined
    ) {
      pointerPrevious--;
      const lastCommand = previousCommands[pointerPrevious];
      input.innerText = lastCommand;
      commandInput.value = lastCommand;
    }

    if (
      e.key === "ArrowDown" &&
      previousCommands[pointerPrevious + 1] != undefined
    ) {
      pointerPrevious++;
      const lastCommand = previousCommands[pointerPrevious];
      input.innerText = lastCommand;
      commandInput.value = lastCommand;
    }
  }

  if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "l") {
    clear();
  }

  if (e.key === "Enter") {
    // Init Command (fazer em todos os comandos)
    const line = document.createElement("div");
    const txt = document.createElement("span");
    line.classList.add("line");
    txt.classList.add("user");
    txt.innerText = `${user.innerText + commandInput.value}`;
    line.appendChild(txt);
    lines.appendChild(line);
    previousCommands.push(commandInput.value);
    pointerPrevious = previousCommands.length;

    // Comando do Enter
    const comando = commandInput.value.toLowerCase().trim();
    if (comando === "help") {
      const output = document.createElement("div");
      const result = commands[comando].function();
      output.classList.add("output");
      output.innerHTML = result;
      lines.appendChild(output);
    }

    if (comando === "clear") {
      commands[comando].function();
    }

    commandInput.value = "";
    input.innerText = "";
    caret.classList.remove("typing");
  }
});

function help() {
  let output = "";
  for (const key in commands) {
    if (commands.hasOwnProperty(key)) {
      output += `${key} => ${commands[key].description}<br/>`;
    }
  }
  return output;
}

function clear() {
  welcome.remove();
  lines.innerHTML = "";
}

const commands = {
  help: {
    function: help,
    description: "Exibe essa tela =)",
  },
  clear: {
    function: clear,
    description: "Limpa o terminal",
    alias: ["cls"],
  },
};
