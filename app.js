//Proyect A
document.addEventListener("DOMContentLoaded", () => {
    function convertToAnnualRate(rate, rateUnit) {
      switch (rateUnit) {
        case "monthly":
          return rate * 12;
        case "quarterly":
          return rate * 4;
        case "fortnightly":
          return rate * 26;
        case "daily":
          return rate * 365;
        default:
          return rate;
      }
    }
  
    function convertToYears(time, timeUnit) {
      switch (timeUnit) {
        case "months":
          return time / 12;
        case "quarters":
          return time / 4;
        case "fortnights":
          return time / 26;
        case "days":
          return time / 365;
        default:
          return time;
      }
    }
  
    function getCurrencySymbol(currency) {
      switch (currency) {
        case "USD":
          return "$";
        case "EUR":
          return "€";
        case "PEN":
          return "S/";
        case "JPY":
          return "¥";
        case "CNY":
          return "¥";
        default:
          return "$";
      }
    }
  
    let simpleInterestPieChart;
    let simpleInterestLineChart;
    let compoundInterestPieChart;
    let compoundInterestLineChart;
  
    let frenchBarChart;
    let alemanBarChart;
    let americanBarChart;
  
    document
      .getElementById("simpleInterestForm")
      .addEventListener("submit", function (event) {
        event.preventDefault();
        const principal = parseFloat(document.getElementById("principal").value);
        const rate = parseFloat(document.getElementById("rate").value);
        const rateUnit = document.getElementById("rateUnit").value;
        const time = parseFloat(document.getElementById("time").value);
        const timeUnit = document.getElementById("timeUnit").value;
        const currency = document.getElementById("currency").value;
  
        const annualRate = convertToAnnualRate(rate, rateUnit) / 100;
        const years = convertToYears(time, timeUnit);
        const currencySymbol = getCurrencySymbol(currency);
  
        const interest = principal * annualRate * years;
        const totalAmount = principal + interest;
  
        document.getElementById("totalCapital").textContent =
          currencySymbol + principal.toFixed(2);
        document.getElementById("totalInterest").textContent =
          currencySymbol + interest.toFixed(2);
        document.getElementById("balanceFinal").textContent =
          currencySymbol + totalAmount.toFixed(2);
  
        // Pie Chart
        const ctxPie = document
          .getElementById("simpleInterestPieChart")
          .getContext("2d");
        if (simpleInterestPieChart) {
          simpleInterestPieChart.destroy();
        }
        simpleInterestPieChart = new Chart(ctxPie, {
          type: "pie",
          data: {
            labels: ["Total Capital", "Total Interes"],
            datasets: [
              {
                data: [principal, interest],
                backgroundColor: ["#0E46A3", "#9AC8CD"],
              },
            ],
          },
        });
  
        // Line Chart
        const ctxLine = document
          .getElementById("simpleInterestLineChart")
          .getContext("2d");
        if (simpleInterestLineChart) {
          simpleInterestLineChart.destroy();
        }
        simpleInterestLineChart = new Chart(ctxLine, {
          type: "line",
          data: {
            labels: Array.from({ length: Math.ceil(years) + 1 }, (_, i) => i),
            datasets: [
              {
                label: "Total Capital",
                data: Array(Math.ceil(years) + 1).fill(principal),
                backgroundColor: "#0E46A3",
                fill: false,
              },
              {
                label: "Total Interes",
                data: Array.from(
                  { length: Math.ceil(years) + 1 },
                  (_, i) => principal * annualRate * i
                ),
                backgroundColor: "#9AC8CD",
                fill: false,
              },
              {
                label: "Balance Final",
                data: Array.from(
                  { length: Math.ceil(years) + 1 },
                  (_, i) => principal + principal * annualRate * i
                ),
                backgroundColor: "#D83F31",
                fill: false,
              },
            ],
          },
          options: {
            plugins: {
              title: {
                display: true,
                text: "Gráfico de Acumulación de Saldo",
                fontSize: 30,
              },
              legend: {
                labels: {
                  usePointStyle: true, // Usa el estilo de punto para la leyenda
                  pointStyle: "circle",
                },
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Años",
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Monto (" + currencySymbol + ")",
                },
              },
            },
          },
        });
      });
  
    document
      .getElementById("compoundInterestForm")
      .addEventListener("submit", function (event) {
        event.preventDefault();
        const principal = parseFloat(
          document.getElementById("principalComp").value
        );
        const rate = parseFloat(document.getElementById("rateComp").value);
        const rateUnit = document.getElementById("rateUnitComp").value;
        const time = parseFloat(document.getElementById("timeComp").value);
        const timeUnit = document.getElementById("timeUnitComp").value;
        const compounding = document.getElementById("compound").value;
        const currency = document.getElementById("currencyComp").value;
  
        const annualRate = convertToAnnualRate(rate, rateUnit) / 100;
        const years = convertToYears(time, timeUnit);
        const currencySymbol = getCurrencySymbol(currency);
  
        let n;
        switch (compounding) {
          case "annually":
            n = 1;
            break;
          case "semiannually":
            n = 2;
            break;
          case "quarterly":
            n = 4;
            break;
          case "monthly":
            n = 12;
            break;
          case "daily":
            n = 365;
            break;
        }
  
        const amount = principal * Math.pow(1 + annualRate / n, n * years);
        const interest = amount - principal;
  
        document.getElementById("totalCapitalComp").textContent =
          currencySymbol + principal.toFixed(2);
        document.getElementById("totalInterestComp").textContent =
          currencySymbol + interest.toFixed(2);
        document.getElementById("balanceFinalComp").textContent =
          currencySymbol + amount.toFixed(2);
  
        // Pie Chart
        const ctxPieComp = document
          .getElementById("compoundInterestPieChart")
          .getContext("2d");
        if (compoundInterestPieChart) {
          compoundInterestPieChart.destroy();
        }
        compoundInterestPieChart = new Chart(ctxPieComp, {
          type: "pie",
          data: {
            labels: ["Total Capital", "Total Interes"],
            datasets: [
              {
                data: [principal, interest],
                backgroundColor: ["#0E46A3", "#9AC8CD"],
              },
            ],
          },
        });
  
        // Line Chart
        const ctxLineComp = document
          .getElementById("compoundInterestLineChart")
          .getContext("2d");
        if (compoundInterestLineChart) {
          compoundInterestLineChart.destroy();
        }
        compoundInterestLineChart = new Chart(ctxLineComp, {
          type: "line",
          data: {
            labels: Array.from({ length: Math.ceil(years) + 1 }, (_, i) => i),
            datasets: [
              {
                label: "Total Capital",
                data: Array(Math.ceil(years) + 1).fill(principal),
                backgroundColor: "#0E46A3",
                fill: false,
              },
              {
                label: "Total Interés",
                data: Array.from(
                  { length: Math.ceil(years) + 1 },
                  (_, i) => principal * (Math.pow(1 + annualRate / n, n * i) - 1)
                ),
                backgroundColor: "#9AC8CD",
                fill: false,
              },
              {
                label: "Balance Final",
                data: Array.from(
                  { length: Math.ceil(years) + 1 },
                  (_, i) => principal * Math.pow(1 + annualRate / n, n * i)
                ),
                backgroundColor: "#D83F31",
                fill: false,
              },
            ],
          },
          options: {
            plugins: {
              title: {
                display: true,
                text: "Gráfico de Acumulación de Saldo",
              },
              legend: {
                labels: {
                  usePointStyle: true, // Usa el estilo de punto para la leyenda
                  pointStyle: "circle",
                  backgroundColor: "red", // Forma de los puntos en la leyenda
                },
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Años",
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Monto (" + currencySymbol + ")",
                },
              },
            },
          },
        });
      });
    //--------Acciones French Table
    const showBtn = document.getElementById("show-dialog");
    const dialog = document.getElementById("dialog");
    const jsCloseBtn = dialog.querySelector(".close");
  
    showBtn.addEventListener("click", () => {
      dialog.showModal();
    });
  
    jsCloseBtn.addEventListener("click", (e) => {
      e.preventDefault();
      dialog.close();
    });
  
    //--------Acciones Aleman Table
    const al_showBtn = document.getElementById("aleman-show-dialog");
    const al_dialog = document.getElementById("aleman-dialog");
    const al_jsCloseBtn = al_dialog.querySelector(".close");
  
    al_showBtn.addEventListener("click", () => {
      al_dialog.showModal();
    });
  
    al_jsCloseBtn.addEventListener("click", (e) => {
      e.preventDefault();
      al_dialog.close();
    });
  
    //--------Acciones American Table
    const am_showBtn = document.getElementById("american-show-dialog");
    const am_dialog = document.getElementById("american-dialog");
    const am_jsCloseBtn = am_dialog.querySelector(".close");
  
    am_showBtn.addEventListener("click", () => {
      am_dialog.showModal();
    });
  
    am_jsCloseBtn.addEventListener("click", (e) => {
      e.preventDefault();
      am_dialog.close();
    });
    document
      .getElementById("frenchAmortizationForm")
      .addEventListener("submit", function (event) {
        event.preventDefault();
        const principal = parseFloat(
          document.getElementById("principalFr").value
        );
        const rate = parseFloat(document.getElementById("rateFr").value) / 100;
        const time = parseFloat(document.getElementById("timeFr").value);
        const timeUnit = document.getElementById("timeUnitFr").value;
        const currency = document.getElementById("currencyFr").value;
        const currencySymbol = getCurrencySymbol(currency);
  
        const n = {
          years: 12,
          months: 1,
          quarters: 3,
          fortnights: 0.5,
          days: 0.033,
        }[timeUnit];
  
        const numberOfPayments = time * n;
        const monthlyRate = rate / 12;
        const monthlyPayment =
          principal *
          (monthlyRate / (1 - Math.pow(1 + monthlyRate, -numberOfPayments)));
  
        let balance = principal;
        let totalInterest = 0;
        const balances = [];
        const interests = [];
        const capitals = [];
  
        for (let i = 0; i < numberOfPayments; i++) {
          const interest = balance * monthlyRate;
          const capital = monthlyPayment - interest;
          balance -= capital;
          totalInterest += interest;
          balances.push(balance);
          interests.push(interest);
          capitals.push(capital);
        }
        document.getElementById("totalCapitalFr").textContent =currencySymbol+
          principal.toFixed(2);
        document.getElementById("totalInterestFr").textContent =currencySymbol+
          totalInterest.toFixed(2);
        document.getElementById("balanceFinalFr").textContent =currencySymbol+ (
          principal + totalInterest
        ).toFixed(2);
  
        if (frenchBarChart) {
          frenchBarChart.destroy();
        }
  
        // Generar etiquetas y datos automáticamente
        const amortizationData = [0];
        const DeudaData = [principal];
        const Cuota = [""];
        const Interes = [""];
        let actualDeuda = principal;
        for (let i = 0; i < time; i++) {
          let amortizationParcial = 0;
          let interesParcial = 0;
          let cuotaParcial = 0;
          for (let j = 0; j < n; j++) {
            actualDeuda -= capitals[i * n + j];
            interesParcial += interests[i * n + j];
            cuotaParcial += capitals[i] + interests[i];
            amortizationParcial += capitals[i];
          }
          Interes.push(interesParcial.toFixed(2));
          Cuota.push(cuotaParcial.toFixed(2));
          amortizationData.push(amortizationParcial);
          DeudaData.push(actualDeuda);
        }
        const barLabels = Array.from({ length: time + 1 }, (_, i) => i);
  
        // Crear gráfico de barras
        const ctxBar = document
          .getElementById("frenchAmortizationBarChart")
          .getContext("2d");
        frenchBarChart = new Chart(ctxBar, {
          type: "bar",
          data: {
            labels: barLabels,
            datasets: [
              {
                label: "Deuda Restante",
                data: DeudaData,
                backgroundColor: ["rgba(54, 162, 235, 0.2)"],
                borderColor: ["rgba(54, 162, 235, 1)"],
                borderWidth: 1,
              },
              {
                label: "Amortizacion",
                data: amortizationData,
                backgroundColor: ["rgba(255, 99, 132, 0.2)"],
                borderColor: ["rgba(255, 99, 132, 1)"],
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
  
        const table = document.getElementById("data-table");
        const tbody = table.querySelector("tbody");
        // Vaciar la tabla
        tbody.innerHTML = "";
        // Llenar la tabla con los datos
        for (let i = 0; i < time + 1; i++) {
          const row = document.createElement("tr");
          const cell1 = document.createElement("td");
          const cell2 = document.createElement("td");
          const cell3 = document.createElement("td");
          const cell4 = document.createElement("td");
          const cell5 = document.createElement("td");
          cell1.textContent = barLabels[i];
          cell2.textContent = currencySymbol+Cuota[i];
          cell3.textContent = currencySymbol+Interes[i];
          cell4.textContent = currencySymbol+amortizationData[i].toFixed(2);
          cell5.textContent = currencySymbol+DeudaData[i].toFixed(2);
          row.appendChild(cell1);
          row.appendChild(cell2);
          row.appendChild(cell3);
          row.appendChild(cell4);
          row.appendChild(cell5);
          tbody.appendChild(row);
        }
      });
  
    // Amortización Alemana
    document
      .getElementById("germanAmortizationForm")
      .addEventListener("submit", function (event) {
        event.preventDefault();
        const principal = parseFloat(
          document.getElementById("principalGer").value
        );
        const rate = parseFloat(document.getElementById("rateGer").value) / 100;
        const time = parseFloat(document.getElementById("timeGer").value);
        const timeUnit = document.getElementById("timeUnitGer").value;
  
        const currency = document.getElementById("currencyGer").value;
        const currencySymbol = getCurrencySymbol(currency);
  
        const n = {
          years: 12,
          months: 1,
          quarters: 3,
          fortnights: 0.5,
          days: 0.033,
        }[timeUnit];
  
        const numberOfPayments = time * n;
        const monthlyRate = rate / 12;
        const monthlyCapitalPayment = principal / numberOfPayments;
  
        let balance = principal;
        let totalInterest = 0;
        const balances = [];
        const interests = [];
        const capitals = [];
  
        for (let i = 0; i < numberOfPayments; i++) {
          const interest = balance * monthlyRate;
          const payment = monthlyCapitalPayment + interest;
          balance -= monthlyCapitalPayment;
          totalInterest += interest;
          balances.push(balance);
          interests.push(interest);
          capitals.push(monthlyCapitalPayment);
        }
  
        document.getElementById("totalCapitalGer").textContent =currencySymbol+
          principal.toFixed(2);
        document.getElementById("totalInterestGer").textContent =currencySymbol+
          totalInterest.toFixed(2);
        document.getElementById("balanceFinalGer").textContent = currencySymbol+(
          principal + totalInterest
        ).toFixed(2);
  
        // Generar etiquetas y datos automáticamente
        const amortizationData = [0];
        const DeudaData = [principal];
        const Cuota = [""];
        const Interes = [""];
        let actualDeuda = principal;
        for (let i = 0; i < time; i++) {
          let amortizationParcial = 0;
          let interesParcial = 0;
          let cuotaParcial = 0;
          for (let j = 0; j < n; j++) {
            actualDeuda -= capitals[i * n + j];
            interesParcial += interests[i * n + j];
            cuotaParcial += capitals[i] + interests[i];
            amortizationParcial += capitals[i];
          }
          Interes.push(interesParcial.toFixed(2));
          Cuota.push(cuotaParcial.toFixed(2));
          amortizationData.push(amortizationParcial);
          DeudaData.push(actualDeuda);
        }
        const barLabels = Array.from({ length: time + 1 }, (_, i) => i);
        if (alemanBarChart) {
          alemanBarChart.destroy();
        }
        // Crear gráfico de barras
        const ctxBar = document
          .getElementById("aleman-AmortizationBarChart")
          .getContext("2d");
        alemanBarChart = new Chart(ctxBar, {
          type: "bar",
          data: {
            labels: barLabels,
            datasets: [
              {
                label: "Deuda Restante",
                data: DeudaData,
                backgroundColor: ["rgba(54, 162, 235, 0.2)"],
                borderColor: ["rgba(54, 162, 235, 1)"],
                borderWidth: 1,
              },
              {
                label: "Amortizacion",
                data: amortizationData,
                backgroundColor: ["rgba(255, 99, 132, 0.2)"],
                borderColor: ["rgba(255, 99, 132, 1)"],
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
  
        const table = document.getElementById("aleman-data-table");
        const tbody = table.querySelector("tbody");
        // Vaciar la tabla
        tbody.innerHTML = "";
        // Llenar la tabla con los datos
        for (let i = 0; i < time + 1; i++) {
          const row = document.createElement("tr");
          const cell1 = document.createElement("td");
          const cell2 = document.createElement("td");
          const cell3 = document.createElement("td");
          const cell4 = document.createElement("td");
          const cell5 = document.createElement("td");
          cell1.textContent = barLabels[i];
          cell2.textContent = currencySymbol+Cuota[i];
          cell3.textContent = currencySymbol+Interes[i];
          cell4.textContent = currencySymbol+amortizationData[i].toFixed(2);
          cell5.textContent = currencySymbol+DeudaData[i].toFixed(2);
          row.appendChild(cell1);
          row.appendChild(cell2);
          row.appendChild(cell3);
          row.appendChild(cell4);
          row.appendChild(cell5);
          tbody.appendChild(row);
        }
      });
  
    // Amortización Americana
    document
      .getElementById("americanAmortizationForm")
      .addEventListener("submit", function (event) {
        event.preventDefault();
        const principal = parseFloat(
          document.getElementById("principalAm").value
        );
        const rate = parseFloat(document.getElementById("rateAm").value) / 100;
        const time = parseFloat(document.getElementById("timeAm").value);
        const timeUnit = document.getElementById("timeUnitAm").value;
  
        const currency = document.getElementById("currencyAm").value;
        const currencySymbol = getCurrencySymbol(currency);
  
        const n = {
          years: 12,
          months: 1,
          quarters: 3,
          fortnights: 0.5,
          days: 0.033,
        }[timeUnit];
  
        const numberOfPayments = time * n;
        const monthlyRate = rate / 12;
  
        let balance = principal;
        let totalInterest = 0;
        const balances = [];
        const interests = [];
        const capitals = [];
  
        for (let i = 0; i < numberOfPayments; i++) {
          const interest = balance * monthlyRate;
          const capital = i === (numberOfPayments - 1) ? principal : 0;
          totalInterest += interest;
          balances.push(balance - capital);
          interests.push(interest);
          capitals.push(capital);
        }
  
        document.getElementById("totalCapitalAm").textContent =currencySymbol+
          principal.toFixed(2);
        document.getElementById("totalInterestAm").textContent =currencySymbol+
          totalInterest.toFixed(2);
        document.getElementById("balanceFinalAm").textContent =currencySymbol+ (
          principal + totalInterest
        ).toFixed(2);
  
        // Generar etiquetas y datos automáticamente
        const amortizationData = [0];
        const DeudaData = [principal];
        const Cuota = [""];
        const Interes = [""];
        let actualDeuda = principal;
        for (let i = 0; i < time; i++) {
          let amortizationParcial = 0;
          let interesParcial = 0;
          let cuotaParcial = 0;
          for (let j = 0; j < n; j++) {
            actualDeuda -= capitals[i * n + j];
            interesParcial += interests[i * n + j];
            cuotaParcial += capitals[i] + interests[i];
            amortizationParcial += capitals[i];
          }
          Interes.push(interesParcial.toFixed(2));
          Cuota.push(cuotaParcial.toFixed(2));
          amortizationData.push(amortizationParcial);
          DeudaData.push(actualDeuda);
        }
        const barLabels = Array.from({ length: time + 1 }, (_, i) => i);
        if (americanBarChart) {
          americanBarChart.destroy();
        }
        // Crear gráfico de barras
        const ctxBar = document
          .getElementById("american-AmortizationBarChart")
          .getContext("2d");
        americanBarChart = new Chart(ctxBar, {
          type: "bar",
          data: {
            labels: barLabels,
            datasets: [
              {
                label: "Deuda Restante",
                data: DeudaData,
                backgroundColor: ["rgba(54, 162, 235, 0.2)"],
                borderColor: ["rgba(54, 162, 235, 1)"],
                borderWidth: 1,
              },
              {
                label: "Amortizacion",
                data: amortizationData,
                backgroundColor: ["rgba(255, 99, 132, 0.2)"],
                borderColor: ["rgba(255, 99, 132, 1)"],
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
  
        const table = document.getElementById("american-data-table");
        const tbody = table.querySelector("tbody");
        // Vaciar la tabla
        tbody.innerHTML = "";
        // Llenar la tabla con los datos
        for (let i = 0; i < time + 1; i++) {
          const row = document.createElement("tr");
          const cell1 = document.createElement("td");
          const cell2 = document.createElement("td");
          const cell3 = document.createElement("td");
          const cell4 = document.createElement("td");
          const cell5 = document.createElement("td");
          cell1.textContent = barLabels[i];
          cell2.textContent = currencySymbol+Cuota[i];
          cell3.textContent = currencySymbol+Interes[i];
          cell4.textContent = currencySymbol+amortizationData[i].toFixed(2);
          cell5.textContent = currencySymbol+DeudaData[i].toFixed(2);
          row.appendChild(cell1);
          row.appendChild(cell2);
          row.appendChild(cell3);
          row.appendChild(cell4);
          row.appendChild(cell5);
          tbody.appendChild(row);
        }
      });
  });
  
  function openModule(evt, moduleName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].classList.remove("active");
    }
    tablinks = document.getElementsByClassName("tab-link");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].classList.remove("active");
    }
    document.getElementById(moduleName).classList.add("active");
    evt.currentTarget.classList.add("active");
  }
  