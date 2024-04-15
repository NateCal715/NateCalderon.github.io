

// API stuff below 

let selectedFood = null;

async function fetchData() { // fetch food data from API
    try {
        const foodInput = document.getElementById('food').value;
        const response = await fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?api_key=KKEb2SudHha1uFk1PeCcoryitk9oH88RfdIovZrN&query=${foodInput}`);
        const data = await response.json();
        
        displayResults(data.foods);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayResults(foods) { //display food on page
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.innerHTML = '';

    if (foods.length === 0) {
        resultsContainer.innerHTML = '<p>No results found.</p>';
        return;
    }

    foods.forEach(food => {
        const foodDiv = document.createElement('div');
        foodDiv.classList.add('food-item');
        
        const description = food.description || 'N/A';
        const ingredients = food.ingredients || 'N/A';
        const calories = getCalories(food.foodNutrients);

        foodDiv.innerHTML = `
            <h3>${description}</h3>
            <p>Ingredients: ${ingredients}</p>
            <p>Calories: ${calories}</p>
            <button class="select" onclick="selectFood($food.fdcId})">Select</button>
        `;

        resultsContainer.appendChild(foodDiv);
    });
}
function getCalories(foodNutrients) { // gives the calories of the food
    const energyNutrient = foodNutrients.find(nutrient => {
        return nutrient.nutrientName === 'Energy' || nutrient.nutrientName == 'Energy (kcal)';
    });
    if (energyNutrient) {
        return energyNutrient.value;
    } else {
        return 'N/A';
    }
}
function selectFood(fdcId) { // allow users to select a food from the list
    const selectedFoodItem = foods.find(food => food.fdcId === fdcId);
    if (selectedFoodItem) {
        selectedFood = selectedFoodItem;
        alert(`Selected: ${selectedFoodItem.description}`);
    }
}function addTextBox() {
    const textEntry = document.querySelector('.text-entry');
    const clonedTextEntry = textEntry.cloneNode(true);
    clonedTextEntry.value - "";
    document.getElementbyId('text-entry-container').appendChild(clonedTextEntry);
}


