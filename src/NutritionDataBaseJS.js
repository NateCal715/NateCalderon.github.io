function showCheckboxes() {
  let checkboxes = document.getElementById("checkBoxes");
  if (show) {
      checkboxes.style.display = "block";
      show = false;
  } else {
      checkboxes.style.display = "none";
      show = true;
  }
}
function addTextBox() {
    const textEntry = document.querySelector('.text-entry');
    const clonedTextEntry = textEntry.cloneNode(true);
    clonedTextEntry.value - "";
    document.getElementbyId('text-entry-container').appendChild(clonedTextEntry);
}
hideMeals();
function hideMeals(){
    mealformBreakfast.style.display = "none";
    mealformLunch.style.display = "none";
    mealformDinner.style.display = "none";
    heading.style.display = "none";
}
function showBreakfast(){
    mealformBreakfast.style.display = "block";
    mealformLunch.style.display = "none";
    mealformDinner.style.display = "none";
    heading.style.display = "block";
}
function showLunch(){
    mealformBreakfast.style.display = "none";
    mealformLunch.style.display = "block";
    mealformDinner.style.display = "none";
    heading.style.display = "block";
}
function showDinner(){
    mealformBreakfast.style.display = "none";
    mealformLunch.style.display = "none";
    mealformDinner.style.display = "block";
    heading.style.display = "block";
} 
function breakfastIntake (form) {
    let entree = form.entreeInput.value;
    let appetizer = form.appetizerInput.value;
    let beverage = form.beverageInput.value;
    let displayMessage = "You have not recorded anything consumed on this day";
    if (!isEmpty(entree)) {
        displayMessage = 'You recorded ${entree} eaten during breakfast on this day';
    }
    if (!isEmpty(appetizer)) {
        displayMessage = 'You recorded ${appetizer} eaten during breakfast on this day';
    }
    if (!isEmpty(beverage)) {
        displayMessage = 'You recorded ${beverage} drank during breakfast on this day';
    } 
    document.getElementbyId("breakfastValue").innerHTML = displayMessage;
}    
function waterIntake (form) {
    let water = form.waterInput.value;
    let displayMessage = "You have not drank any water today";

    if (!isEmpty(water)) {
        displayMessage = `You drank ${water} fluid ounces of water today!`;
    }
    document.getElementById("waterValue").innerHTML = displayMessage;
}
function isEmpty(input){
    return input === "" || input === undefined || input === NaN || input === "0" ? true : false;
}
