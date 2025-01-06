const operators = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => {
        if (b === 0) {
            console.error(
                `Zero division in expression "${expression}"`
            );
            return NaN;
        }
        return a / b;
    },
    
};

// pointing × and ÷ symbols to same function as * and /
operators["×"] = operators["*"]; 
operators["÷"] = operators["/"];

function parseOperateInput(expression) {
    const parsed = expression.split(" ");
    if (parsed.length !== 3) {
        console.error(
            `Operate function passed invalid expression "${expression}"`
        );
        return NaN;
    }

    const num1 = Number(parsed[0]);
    const sign = parsed[1];
    const num2 = Number(parsed[2]);

    if (isNaN(num1) || isNaN(num2)) {
        console.error(
            `Operate function passed invalid expression "${expression}"`
        );
        return NaN;
    }

    if (!(sign in operators)) {
        console.error(
            `Invalid operator in expression "${expression}"`
        );
        return NaN;
    }

    return [num1, sign, num2];
}

function operate(expression) {
    let [num1, sign, num2] = parseOperateInput(expression);

    let result = operators[sign](num1, num2);

    if (isNaN(result)) {
        return "NaN";
    }

    if (String(result).length > inputWindow.maxLength){
        let parse = String(result).split(".");
        if (parse.length == 2) {
            if (parse[0].length > 7) {
                return result.toExponential();
            } else {
                return result.toFixed(inputWindow.maxLength - 1 - parse[0].length);
            }
        } else {
            return result.toExponential();
        }
    }

    return result;
}

const buttonPressEventHandlers = {
    number: (button, inputWindow) => {
        if (inputWindow.value == "NaN" || inputWindow.value == "0") {
            inputWindow.value = button.id;
        } else {
            inputWindow.value += button.id;
        }
    },

    operator: (button, inputWindow) => {
        const parsed = inputWindow.value.split(" ");
        if (parsed.length === 1) {
            if (inputWindow.value == "NaN") {
                inputWindow.value = "0";
            }
            // the spaces around the operator are required
            inputWindow.value += ` ${button.id} `;
        } else { // the only other case is that it has length 3
            parsed[1] = ` ${button.id} `;
            inputWindow.value = parsed.join("");
        }
    },

    "=": (inputWindow) => {
        const parsed = inputWindow.value.split(" ");
        if (parsed.length === 1 || parsed.length === 2) {
            return;
        } else if (parsed.length === 3) {
            inputWindow.value = operate(inputWindow.value);
        } else {
            console.error(`Input window in unexpected state ${inputWindow.value}`);
        }
    },

    "AC": (inputWindow) => inputWindow.value = "0",

    ".": (inputWindow) => {
        const last = inputWindow.value.split(" ").at(-1);
        if (!last.includes('.')) {
            if (last === "") {
                inputWindow.value += '0';
            }
            inputWindow.value += '.';
        }
    },

    "+/-": (inputWindow) => {
        const parsed = inputWindow.value.split(" ");
        if (parsed[parsed.length - 1] === "") {
            return;
        } else {
            parsed[parsed.length - 1] = String(Number(parsed[parsed.length - 1]) * -1);
        }
        inputWindow.value = parsed.join(" ");
    },

    "%": (inputWindow) => {
        parsed = inputWindow.value.split(" ");
        if (parsed[parsed.length - 1] === "") {
            return;
        } else {
            parsed[parsed.length - 1] = String(Number(parsed[parsed.length - 1]) * 0.01);
        }
        inputWindow.value = parsed.join(" ");
    },

    "++": (inputWindow) => {
        parse = inputWindow.value.split(" ");
        parse[parse.length - 1] = Number(parse[parse.length - 1]) + 1;
        inputWindow.value = parse.join(" ");
        return;
    }
}

function handleButtonPress(button) {
    const inputWindow = document.querySelector("#calc-display");

    const classButtonIdentifiers = [
        "number",
        "operator"
    ]

    const idButtonIdentifiers = [
        "=",
        "AC",
        ".",
        "+/-",
        "%",
        "++",
    ]

    if (classButtonIdentifiers.includes(button.className)) {
        buttonPressEventHandlers[button.className](button, inputWindow);
    } else if (idButtonIdentifiers.includes(button.id)) {
        buttonPressEventHandlers[button.id](inputWindow);
    }
}

const buttons = document.querySelectorAll("button");

const inputWindow = document.querySelector("#calc-display");
inputWindow.value = 0;
inputWindow.maxLength = 8;

buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
        handleButtonPress(event.target);
    });
});