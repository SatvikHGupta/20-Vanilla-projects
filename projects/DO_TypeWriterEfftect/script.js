function show() {
  const input = document.getElementById("textInput").value.trim();
  const output = document.getElementById("textOutput");

  output.textContent = ""; 
  let i = 0;

  function letter() {
    if (i < input.length) {
      output.textContent += input.charAt(i);
      i++;
      setTimeout(letter, 500); 
    }
  }

  letter();
}
