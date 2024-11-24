// Elements from the DOM
const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-bar');
const recipeContainer = document.getElementById('recipe-container');

// API URL (free API used)
const apiURL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

// Function to fetch recipes from the API
const fetchRecipes = async (query) => {
    if (!query) {
        recipeContainer.innerHTML = '<p>Please enter an ingredient or recipe name to search.</p>';
        return;
    }

    try {
        const response = await fetch(apiURL + query);
        const data = await response.json();

        if (data.meals) {
            displayRecipes(data.meals);
        } else {
            recipeContainer.innerHTML = '<p>No recipes found. Try another search!</p>';
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        recipeContainer.innerHTML = '<p>Error fetching data. Please try again later.</p>';
    }
};

// Function to display the recipes in the HTML
const displayRecipes = (recipes) => {
    recipeContainer.innerHTML = ''; // Clear previous results

    recipes.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe-card');

        // Create image element
        const img = document.createElement('img');
        img.src = recipe.strMealThumb;
        img.alt = recipe.strMeal;
        
        // Create title element
        const title = document.createElement('h3');
        title.textContent = recipe.strMeal;

        // Create link to the full recipe
        const recipeLink = document.createElement('a');
        recipeLink.href = recipe.strSource;
        recipeLink.target = '_blank';
        recipeLink.textContent = 'View Full Recipe';

        // Append all elements to the recipe card
        recipeCard.appendChild(img);
        recipeCard.appendChild(title);
        recipeCard.appendChild(recipeLink);

        // Append the recipe card to the container
        recipeContainer.appendChild(recipeCard);
    });
};

// Event listener for the search button
searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim();
    fetchRecipes(query);
});

// Optional: Allow pressing Enter key to trigger search
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const query = searchInput.value.trim();
        fetchRecipes(query);
    }
});
