

const searchMeal = () => {

    const mealInput = document.getElementById('inputSearch').value;
    if (mealInput) {

        const noMealfound = document.getElementById("noMealfound");
        noMealfound.innerHTML = ``;

        const mealsDiv = document.getElementById("meals");
        const mealInfo = ``;

        const mealInfoSection = document.getElementById('meal-info-section');
        mealInfoSection.innerHTML = ``;


        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s= ${mealInput}`
        fetch(url)
            .then(res => res.json())
            .then(data => {
                totalMeals(data, mealInput);

            })
    }

}


const totalMeals = (data, mealInput) => {
    const meal = data.meals;



    if (meal) {
        meal.forEach(element => {
            displayMeal(element, mealInput);
        });
    }

    else {
        const noMealfound = document.getElementById("noMealfound");
        noMealfound.innerHTML = `No meal found for ${mealInput}!`;
    }


}
const displayMeal = (meal, mealInput) => {
    const mealsDiv = document.getElementById("meals");
    const mealDiv = document.createElement('div');
    mealDiv.className = 'meals';


    const mealInfo = `

    <a href="#meal-details-section" style="text-decoration: none; color: black;">
        <div onclick="getMealDetails(${meal.idMeal})" class="card " style="width: 15rem;">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body ">
                    <h5 class="card-title text-center">${meal.strMeal}</h5>
                </div>
        </div>
    </a>           
     `
    mealDiv.innerHTML = mealInfo;
    mealsDiv.appendChild(mealDiv);
}



const showMealDetailsDiv = data => {
    const meal = data.meals[0];
    const mealPhoto = meal.strMealThumb;
    const mealName = meal.strMeal;

    // Set Meal Details Div Structure
    const mealDetailsSection = document.getElementById('meal-details-section');
    mealDetailsSection.innerHTML = `
        <div id="meal-details" class="align-self-center card " style="width: 30rem;">
            <img src="${mealPhoto}" class="card-img-top" style="border-radius: 10px 10px 0 0;" alt=" ...">
            <div class="card-body">
                <h2 class="card-title text-center my-3">${mealName}</h2>
                <hr>
                <h5 class="card-title mt-4">Meal Ingredients</h5>
                <div id="meal-ingredients"></div>
            </div>
        </div>
    `
    const mealIngredients = document.getElementById('meal-ingredients');

    // Set Contents of Each Paragraph Inside Meal Details Div Structure
    for (let i = 1; meal[`strIngredient${i}`]; i++) {
        const ingredients = `
        ✔ ${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}
        `
        const mealDetailsP = document.createElement('p');
        mealDetailsP.className = 'card-text';
        mealDetailsP.innerText = ingredients;
        mealIngredients.appendChild(mealDetailsP);
    }
}

const getMealDetails = mealID => {
    // Clear the Meal Details Section For Every Single New Search
    const mealDetailsSection = document.getElementById('meal-details-section');
    mealDetailsSection.innerHTML = ``;

    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`
    fetch(url)
        .then(res => res.json())
        .then(data => showMealDetailsDiv(data));
}
