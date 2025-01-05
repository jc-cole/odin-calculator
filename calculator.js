function operate(expression) {

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

    operators["×"] = operators["*"];
    operators["÷"] = operators["/"];

    const parsed = expression.split(" ");
    if (parsed.length !== 3) {
        console.error(
            `Operate function passed invalid expression "${expression}"`
        );
        return NaN;
    }

    const a = Number(parsed[0]);
    const sign = parsed[1];
    const b = Number(parsed[2]);

    if (isNaN(a) || isNaN(b)) {
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

    let result = operators[sign](a, b);

    if (isNaN(result)) {
        return "NaN";
    }

    if (String(result).length > 8){
        return result.toExponential()
    }

    return result;
}

function handleButtonPress(button) {
    const inputWindow = document.querySelector("#calc-display");

    let parsed = [];
    let last = "";

    switch (button.className) {
        case "number":
            if (inputWindow.value == "NaN" || inputWindow.value == "0") {
                inputWindow.value = button.id;
            } else {
                inputWindow.value += button.id;
            }
            return;
        case "operator":
            parsed = inputWindow.value.split(" ", 3);
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
            return;
    }

    switch (button.id) {
        case "=":
            parsed = inputWindow.value.split(" ");
            if (parsed.length === 1 || parsed.length === 2) {
                return; // do nothing because user hasn't completed expression
            } else if (parsed.length === 3) {
                inputWindow.value = operate(inputWindow.value);
            } else {
                console.error(`Input window in unexpected state ${inputWindow.value}`);
            }
            return;
        case "AC":
            inputWindow.value = "0";
            return;
        case ".":
            last = inputWindow.value.split(" ").at(-1);
            if (!last.includes('.')) {
                if (last === "") {
                    inputWindow.value += '0';
                }
                inputWindow.value += '.';
            }
            return;
        case "+/-":
            parsed = inputWindow.value.split(" ");
            last = parsed[parsed.length - 1];
            if (last === "") {
                inputWindow.value += '-0';
            } else {
                // flip the sign by multiplying by -1
                inputWindow.value = String(Number(last) * -1);
            }
            return;
        case "%":
            console.warn(`"%" button not implemented yet. `);
    }
}

const buttons = document.querySelectorAll("button");

const inputWindow = document.querySelector("#calc-display");
inputWindow.value = 0;

buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
        handleButtonPress(event.target);
    });
});

