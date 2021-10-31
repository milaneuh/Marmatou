const searchInput = document.querySelector('.searchInput')
const searchButton = document.querySelector('.searchButton')
const searchResultDiv = document.querySelector('.search-result')
const container = document.querySelector('.container')
let searchQuery = "";
const recipeImageUrl = "https://spoonacular.com/recipeImages/";


searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    //Query = Ce qui est écrit dans le form
    searchQuery = searchInput.value;
    //On affiche nos mots clefs
    console.log(searchQuery)
    //On appelle l'api
    fetchAPI();
});

async function fetchAPI() {
    const URL = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?limitLicense=true&ranking=2&addRecipeInformation=true&number=100&query=${searchQuery}"`
    fetch(
        //Notre url d'api avec dedans les mots clef de recherche
        "" + URL, {
            //Méthode d'appel
            "method": "GET",
            //On précise notre clef d'API
            "headers": {
                "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
                "x-rapidapi-key": "ea760cb741msh46d64c0e6e5f712p15856ejsnae1d1459403e"
            }
        })
        .then(response => {
            //Si la réponse n'est pas nulle
            if (response.ok) {
                //On l'affiche dans la console
                console.log(response)
                //On parse notre réponse en JSON dans un objet "data"
                response.json().then(data => {
                    //On affiche la variable data dans la console ainsin que l'attribut que on veut mettre dans le h1
                    console.log(data)
                    //On génère le HTML
                    console.log(data.results)
                    generateHTML(data.results)
                })
            }
        })
        //Si on récupère une erreur, on l'affiche dans la console
        .catch(err => {
            console.error(err);
        });
}

function generateHTML(results) {
    let generatedHTML = '';
    results.map(results => {
        generatedHTML +=
            `
            <div class="item">
                <img src="${results.image}" alt="">
                

                <div class="item_tips">
                    <div class="item_time">
                        <p class="item-minutes"><ion-icon class="hourglass" name="hourglass"></ion-icon>${results.readyInMinutes} min</p>
                    </div>

                    <p class="item_service"><ion-icon name="person"></ion-icon>${results.servings}  Serving</p>
                    
                    <div class="summary">
                    <!--${results.summary}-->
                    </div>
                </div>

                <h1 class="title">${results.title}</h1>
                
                <div class="recipe_wrapper">
                </div>
                
                <a href="${results.sourceUrl}" class="viewBt">View Recipe</a>

            </div>
            `
    })
    searchResultDiv.innerHTML = generatedHTML;
}