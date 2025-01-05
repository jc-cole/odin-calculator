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

// console.log(operate("1 + 2"));
// console.log(operate("1 * 2"));
// console.log(operate("1 / 2"));
// console.log(operate("1 - 2"));
// console.log(operate("1112 - 1111"));
// console.log(operate("a - 4"));
// console.log(operate("1 / 0"));
// console.log(operate("apples + bananas"));
// console.log(operate("apples & bananas"));
// console.log(operate("1 & 2"));
// console.log(operate(""));
// console.log(operate("1"));
// console.log(operate("1 + 2 + 3"));

