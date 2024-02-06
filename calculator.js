var output = document.getElementById("screen").value;
var result = "";

// Push the values
function getinput(variable) {
  if (
    (variable == "+" ||
      variable == "-" ||
      variable == "*" ||
      variable == "/" ||
      variable == "%") &&
    output == ""
  ) {
    output = result;
  }
  output = output + variable;
  document.getElementById("screen").value = output;
}

// Calculate the Output
function cal(output) {
  let values = [];
  let operators = [];
  let top = 0;
  let ope = 0;
  let number = "";

  for (let i = 0; i < output.length; i++) {
    if (
      output[i] == "/" ||
      output[i] == "*" ||
      output[i] == "+" ||
      output[i] == "-" ||
      output[i] == "%"
    ) {
      number = parseFloat(number);
      values[top++] = number;
      number = 0;
      if (ope == 0) {
        operators[ope++] = output[i];
      } else {
        if (precedence(operators[ope - 1], output[i])) {
          let num = apply(values[top - 2], values[top - 1], operators[ope - 1]);
          top = top - 2;
          ope--;
          values[top++] = num;
          operators[ope++] = output[i];
        } else {
          operators[ope++] = output[i];
        }
      }
    } else {
      number = number + output[i];
    }
  }
  values[top++] = parseFloat(number);
  number = 0;
  while (ope > 0) {
    ope--;
    top--;
    let num1 = apply(values[top - 1], values[top], operators[ope]);
    values[top - 1] = num1;
    top = top--;
  }
  return values[top - 1];
}

// Check for precedence
function precedence(ope1, ope2) {
  if (
    (ope1 == "+" || ope1 == "-") &&
    (ope2 == "*" || ope2 == "/" || ope2 == "%")
  ) { 
    return false;
  } else {
    return true;
  }
}

// Print the output
function calculate() {
  if (output == "") {
    result = "";
  } else {
    result = cal(output);
  }
  document.getElementById("screen").value = result;
  output = "";
}

// Clear the input
function clearscreen() {
  output = "";
  document.getElementById("screen").value = output;
}

// Delete the last value
function pop() {
  output = output.slice(0, -1);
  document.getElementById("screen").value = output;
}
 
// function for calculate the values
function apply(num1, num2, operator){
  let result = 0;
  switch (operator) {
    case "/":
      result = num1 / num2;
      break;
    case "*":
      result = num1 * num2;
      break;
    case "+":
      result = num1 + num2;
      break;
    case "-":
      result = num1 - num2;
      break;
    case "%":
      result = num1 % num2;
      break;
  }
  return result;
}
