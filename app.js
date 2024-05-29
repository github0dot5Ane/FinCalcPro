document.addEventListener('DOMContentLoaded', () => {
    function convertToAnnualRate(rate, rateUnit) {
        switch (rateUnit) {
            case 'monthly':
                return rate * 12;
            case 'quarterly':
                return rate * 4;
            case 'semestral':
                return rate * 2;
            case 'daily':
                return rate * 365;
            default:
                return rate;
        }
    }

    function convertToYears(time, timeUnit) {
        switch (timeUnit) {
            case 'months':
                return time / 12;
            case 'quarters':
                return time / 4;
            case 'semestres':
                return time / 2;
            case 'days':
                return time / 365;
            default:
                return time;
        }
    }

    function getCurrencySymbol(currency) {
        switch (currency) {
            case 'USD':
                return '$';
            case 'EUR':
                return '€';
            case 'PEN':
                return 'S/';
            case 'JPY':
                return '¥';
            case 'CNY':
                return '¥';
            default:
                return '$';
        }
    }

    let simpleInterestPieChart;
    let simpleInterestLineChart;
    let compoundInterestPieChart;
    let compoundInterestLineChart;

    document.getElementById('simpleInterestForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const principal = parseFloat(document.getElementById('principal').value);
        const rate = parseFloat(document.getElementById('rate').value);
        const rateUnit = document.getElementById('rateUnit').value;
        const time = parseFloat(document.getElementById('time').value);
        const timeUnit = document.getElementById('timeUnit').value;
        const currency = document.getElementById('currency').value;

        const annualRate = convertToAnnualRate(rate, rateUnit) / 100;
        const years = convertToYears(time, timeUnit);
        const currencySymbol = getCurrencySymbol(currency);

        const interest = principal * annualRate * years;
        const totalAmount = principal + interest;

        document.getElementById('totalCapital').textContent = currencySymbol + principal.toFixed(2);
        document.getElementById('totalInterest').textContent = currencySymbol + interest.toFixed(2);
        document.getElementById('balanceFinal').textContent = currencySymbol + totalAmount.toFixed(2);

        // Pie Chart
        const ctxPie = document.getElementById('simpleInterestPieChart').getContext('2d');
        if (simpleInterestPieChart) {
            simpleInterestPieChart.destroy();
        }
        simpleInterestPieChart = new Chart(ctxPie, {
            type: 'pie',
            data: {
                labels: ['Total Capital', 'Total Interes'],
                datasets: [{
                    data: [principal, interest],
                    backgroundColor: ['#0E46A3', '#9AC8CD']
                }]
            }
        });

        // Line Chart
        const ctxLine = document.getElementById('simpleInterestLineChart').getContext('2d');
        if (simpleInterestLineChart) {
            simpleInterestLineChart.destroy();
        }
        simpleInterestLineChart = new Chart(ctxLine, {
            type: 'line',
            data: {
                labels: Array.from({ length: Math.ceil(years) + 1 }, (_, i) => i),
                datasets: [
                    {
                        label: 'Total Capital',
                        data: Array(Math.ceil(years) + 1).fill(principal),
                        backgroundColor: '#0E46A3',
                        fill: false
                    },
                    {
                        label: 'Total Interes',
                        data: Array.from({ length: Math.ceil(years) + 1 }, (_, i) => principal * annualRate * i),
                        backgroundColor: '#9AC8CD',
                        fill: false
                    },
                    {
                        label: 'Balance Final',
                        data: Array.from({ length: Math.ceil(years) + 1 }, (_, i) => principal + principal * annualRate * i),
                        backgroundColor: '#D83F31',
                        fill: false
                    }
                ]
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: 'Gráfico de Acumulación de Saldo',
                        fontSize: 30
                    },
                    legend: {
                        labels: {
                            usePointStyle: true, 
                            pointStyle: 'circle'
                        }
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Años'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Monto (' + currencySymbol + ')'
                        }
                    }
                }
            }
        });
    });

    document.getElementById('compoundInterestForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const principal = parseFloat(document.getElementById('principalComp').value);
        const rate = parseFloat(document.getElementById('rateComp').value);
        const rateUnit = document.getElementById('rateUnitComp').value;
        const time = parseFloat(document.getElementById('timeComp').value);
        const timeUnit = document.getElementById('timeUnitComp').value;
        const compounding = document.getElementById('compound').value;
        const currency = document.getElementById('currencyComp').value;

        const annualRate = convertToAnnualRate(rate, rateUnit) / 100;
        const years = convertToYears(time, timeUnit);
        const currencySymbol = getCurrencySymbol(currency);

        let n;
        switch (compounding) {
            case 'annually':
                n = 1;
                break;
            case 'semiannually':
                n = 2;
                break;
            case 'quarterly':
                n = 4;
                break;
            case 'monthly':
                n = 12;
                break;
            case 'daily':
                n = 365;
                break;
        }

        const amount = principal * Math.pow((1 + annualRate / n), n * years);
        const interest = amount - principal;

        document.getElementById('totalCapitalComp').textContent = currencySymbol + principal.toFixed(2);
        document.getElementById('totalInterestComp').textContent = currencySymbol + interest.toFixed(2);
        document.getElementById('balanceFinalComp').textContent = currencySymbol + amount.toFixed(2);

        // Pie Chart
        const ctxPieComp = document.getElementById('compoundInterestPieChart').getContext('2d');
        if (compoundInterestPieChart) {
            compoundInterestPieChart.destroy();
        }
        compoundInterestPieChart = new Chart(ctxPieComp, {
            type: 'pie',
            data: {
                labels: ['Total Capital', 'Total Interes'],
                datasets: [{
                    data: [principal, interest],
                    backgroundColor: ['#0E46A3', '#9AC8CD']
                }]
            }
        });

        // Line Chart
        const ctxLineComp = document.getElementById('compoundInterestLineChart').getContext('2d');
        if (compoundInterestLineChart) {
            compoundInterestLineChart.destroy();
        }
        compoundInterestLineChart = new Chart(ctxLineComp, {
            type: 'line',
            data: {
                labels: Array.from({ length: Math.ceil(years) + 1 }, (_, i) => i),
                datasets: [
                    {
                        label: 'Total Capital',
                        data: Array(Math.ceil(years) + 1).fill(principal),
                        backgroundColor: '#0E46A3',
                        fill: false
                    },
                    {
                        label: 'Total Interés',
                        data: Array.from({ length: Math.ceil(years) + 1 }, (_, i) => principal * (Math.pow((1 + annualRate / n), n * i) - 1)),
                        backgroundColor: '#9AC8CD',
                        fill: false
                    },
                    {
                        label: 'Balance Final',
                        data: Array.from({ length: Math.ceil(years) + 1 }, (_, i) => principal * Math.pow((1 + annualRate / n), n * i)),
                        backgroundColor: '#D83F31',
                        fill: false
                    }
                ]
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: 'Gráfico de Acumulación de Saldo'
                    },
                    legend: {
                        labels: {
                            usePointStyle: true, 
                            pointStyle: 'circle' 
                        }
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Años'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Monto (' + currencySymbol + ')'
                        }
                    }
                }
            }
        });
    });
});

function openModule(evt, moduleName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].classList.remove('active');
    }
    tablinks = document.getElementsByClassName("tab-link");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove('active');
    }
    document.getElementById(moduleName).classList.add('active');
    evt.currentTarget.classList.add('active');
}
