
  let monthlySleepLogs = {};

  function createMonthSelector() {
    const monthSelector = document.getElementById('monthSelector');
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    months.forEach((month, index) => {
      const option = document.createElement('option');
      option.value = index;
      option.textContent = month;
      monthSelector.appendChild(option);
    });
  }

  function getCurrentYearMonth() {
    const monthSelector = document.getElementById('monthSelector');
    const month = parseInt(monthSelector.value, 10);
    const year = new Date().getFullYear();
    return `${year}-${month}`;
  }

  function createDayInputs() {
    const container = document.getElementById('dailySleepInputs');
    container.innerHTML = ''; // Clear existing inputs
    const month = parseInt(document.getElementById('monthSelector').value, 10);
    const year = new Date().getFullYear();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const yearMonthKey = getCurrentYearMonth();

    for (let day = 1; day <= daysInMonth; day++) {
      const input = document.createElement('input');
      input.type = 'number';
      input.name = `day${day}`;
      input.placeholder = `Day ${day} hours`;
      input.className = 'sleep-hours-input';

      // Repopulate saved data if available
      if (monthlySleepLogs[yearMonthKey] && monthlySleepLogs[yearMonthKey][day]) {
        input.value = monthlySleepLogs[yearMonthKey][day];
      }

      container.appendChild(input);
    }
  }

  function saveCurrentMonthData() {
    const inputs = document.querySelectorAll('#dailySleepInputs input');
    const yearMonthKey = getCurrentYearMonth();
    monthlySleepLogs[yearMonthKey] = {};

    inputs.forEach((input, index) => {
      if (input.value) {
        monthlySleepLogs[yearMonthKey][index + 1] = parseFloat(input.value);
      }
    });

    saveSleepData();
  }

  function calculateSleep() {
    saveCurrentMonthData(); // Save data before calculation
    const yearMonthKey = getCurrentYearMonth();
    const monthlyData = Object.values(monthlySleepLogs[yearMonthKey] || {});
    const monthlyTotal = monthlyData.reduce((acc, val) => acc + val, 0);
    const average = monthlyData.length > 0 ? monthlyTotal / monthlyData.length : 0;

    document.getElementById('averageSleep').textContent = average.toFixed(2);
    document.getElementById('totalSleepMonth').textContent = monthlyTotal.toFixed(2);

    const yearlyTotal = Object.values(monthlySleepLogs).flatMap(obj => Object.values(obj))
            .reduce((acc, val) => acc + val, 0);
    document.getElementById('totalSleepYear').textContent = yearlyTotal.toFixed(2);
  }

  function saveSleepData() {
    localStorage.setItem('monthlySleepLogs', JSON.stringify(monthlySleepLogs));
  }

  function loadSleepData() {
    const data = localStorage.getItem('monthlySleepLogs');
    if (data) {
      monthlySleepLogs = JSON.parse(data);
    }
  }

  window.onload = function() {
    loadSleepData();
    createMonthSelector();
    document.getElementById('monthSelector').addEventListener('change', function() {
      saveCurrentMonthData(); // Save current month data before switching
      createDayInputs();
    });
    const currentMonth = new Date().getMonth();
    document.getElementById('monthSelector').value = currentMonth;
    createDayInputs();
    calculateSleep(); // Initial calculation based on loaded data
  };