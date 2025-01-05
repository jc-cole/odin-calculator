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
        }
    };
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

    
    return operators[sign](a, b);
}

function handleButtonPress(button) {
    const inputWindow = document.querySelector("#calc-display");

    switch (button.className) {
        case "number":
            inputWindow.value += button.id;
            break;
        case "operator":
            const parsed = inputWindow.value.split(" ", 3);
            if (parsed.length === 1) {
                // the spaces around the operator are required
                inputWindow.value += ` ${button.id} `;
            } else { // the only other case is that it has length 3
                parsed[1] = ` ${button.id} `;
                inputWindow.value = parsed.join("");
            }
            break;
        default:
            console.warn(`Button ${button.id} is not implemented yet.`)
    }
}

const buttons = document.querySelectorAll("button");

buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
        handleButtonPress(event.target);
    })
});

