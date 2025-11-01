const API_KEY = window.EXCHANGE_KEY || '';

const amountInput = document.getElementById("amount");
const fromInput = document.getElementById("from");
const toInput = document.getElementById("to");
const resultDiv = document.getElementById("result");
const convertBtn = document.getElementById("convertBtn");
const swapBtn = document.getElementById("swapBtn");

async function convertCurrency() {
  const amount = parseFloat(amountInput.value);
  const from = fromInput.value.trim().toUpperCase();
  const to = toInput.value.trim().toUpperCase();

  if (!amount || !from || !to) {
    resultDiv.textContent = "⚠️ Please fill all fields correctly!";
    return;
  }

  resultDiv.textContent = "Fetching rates... ⏳";

  try {
    const url = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${from}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.result === "success") {
      const rate = data.conversion_rates[to];
      if (rate) {
        const converted = (amount * rate).toFixed(2);
        resultDiv.innerHTML = `
          💰 ${amount} ${from} = <strong>${converted} ${to}</strong><br>
          (1 ${from} = ${rate.toFixed(2)} ${to})
        `;
      } else {
        resultDiv.textContent = `❌ Currency code "${to}" not found!`;
      }
    } else {
      resultDiv.textContent = `❌ Error: ${data["error-type"]}`;
    }
  } catch (error) {
    resultDiv.textContent = "❌ Failed to fetch data.";
  }
}

// Event Listeners
convertBtn.addEventListener("click", convertCurrency);
swapBtn.addEventListener("click", () => {
  const temp = fromInput.value;
  fromInput.value = toInput.value;
  toInput.value = temp;
  convertCurrency();
});

// Auto-update on input change
[amountInput, fromInput, toInput].forEach(input =>
  input.addEventListener("input", () => {
    clearTimeout(window.typingTimeout);
    window.typingTimeout = setTimeout(convertCurrency, 800);
  })
);
