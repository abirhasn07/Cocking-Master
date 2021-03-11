const search = document.getElementById('search'),
    submitBtn = document.getElementById('submit'),
    randomBtn = document.getElementById('random'),
    resultHeading = document.getElementById('resultHeading'),
    meals = document.getElementById('meals'),
    singleMeals = document.getElementById('singleMeal'),
    randomMealDiv = document.getElementById('random-meal')


// form section------>
function searchMeal(e) {
    e.preventDefault();

    resultHeading.innerHTML = ""
    const term = search.value;

    if (term.trim()) {

        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
            .then(response => response.json())
            .then(data => {
                resultHeading.innerHTML = `<h2 class="searchHeadline"> Search  Result for:${term}</h2> `;
                if (data.meals === null) {

                    resultHeading.innerHTML = `<h3>There is no  food item for available for this name </h3>`

                } else {
                    meals.innerHTML = data.meals
                        .map(meal => `
                    <div class="meal" id="${meal.idMeal}">
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                    <div class="meal-info" data -mealID="${meal.idMeal}">
                    <h3> ${meal.strMeal}</h3>
                   
                    </div>
                    </div>
                    `).join("")
                }

                // console.log(data)
            });
        search.value = "";

    } else {
        alert("Please Enter Your Food Item")
    }


}

submitBtn.addEventListener('submit', searchMeal)







meals.addEventListener('click', e => {
    if (this === e.target) {
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${e.target.id}`

            )
            .then(res => res.json())
            .then(data => console.log(data))

    } else {
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${e.target.parentElement.id}`

            )
            .then(res => res.json())


        .then(data => {



            singleMeals.innerHTML = `<div class='single-meal' id='singleMealDiv'>

                  
            <h1>${data.meals[0].strMeal}</h1>
                    <img src="${data.meals[0].strMealThumb}" alt="">
                <h3>Instruction</h3>
               <p>${data.meals[0].strInstructions}</p>
               <a href="${data.meals[0].strYoutube}" target="_blank" class="watchYouTube">Watch YouTube</a>
                    </div>`

        })


    }

})


//add event listenar

meals.addEventListener('click', function() {


    meals.style.display = 'none'

    singleMeals.style.display = ' block'
    resultHeading.style.display = 'none'
    submitBtn.style.display = 'none'






})



// get random meals

// randomBtn.addEventListener('click', function() {


//     const randomAPI = `https://www.themealdb.com/api/json/v1/1/random.php`
//     fetch(randomAPI)
//         .then(res => res.json())
//         .then(data => {

//             showRandomMeal(res.meals[0])
//         })

// })



// function showRandomMeal(meal) {
//     randomMealDiv.innerHTML = `

// <h1>${meals.strMeal}</h1>

//     `
// }