// Modal functionality
function openModal(tacoType) {
    const modal = document.getElementById(`${tacoType}-modal`);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    }
}

function closeModal(tacoType) {
    const modal = document.getElementById(`${tacoType}-modal`);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling when modal is closed
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const modals = document.getElementsByClassName('modal');
        for (let modal of modals) {
            if (modal.style.display === 'block') {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
                break;
            }
        }
    }
});

// Function to scroll to recipes section
function scrollToRecipes() {
    document.getElementById('recipes').scrollIntoView({ behavior: 'smooth' });
}

// Featured recipes data - we'll only use two recipes
const featuredRecipes = [
    {
        title: 'Classic Carne Asada Tacos',
        ingredients: [
            '1 lb flank steak',
            '1/4 cup lime juice',
            '2 cloves garlic',
            '1 tsp cumin',
            'Corn tortillas',
            'Onions and cilantro'
        ],
        instructions: [
            'Marinate steak in lime juice, garlic, and cumin',
            'Grill until medium-rare',
            'Slice thinly',
            'Serve in warm tortillas with toppings'
        ]
    },
    {
        title: 'Baja Fish Tacos',
        ingredients: [
            '1 lb white fish',
            '1 cup flour',
            '1 cup beer',
            'Shredded cabbage',
            'Chipotle sauce',
            'Corn tortillas'
        ],
        instructions: [
            'Make beer batter with flour and beer',
            'Dip fish in batter and fry',
            'Make cabbage slaw',
            'Assemble tacos with toppings'
        ]
    }
];

// Function to update featured recipe display
function updateFeaturedRecipe(index) {
    const recipe = featuredRecipes[index];
    const recipeGrid = document.querySelector('.recipe-grid');
    const recipeControls = document.querySelector('.recipe-controls');
    
    // Create new recipe card
    const recipeCard = document.createElement('div');
    recipeCard.className = 'recipe-card';
    recipeCard.onclick = scrollToRecipes;
    
    recipeCard.innerHTML = `
        <h3>${recipe.title}</h3>
        <div class="ingredients">
            <h4>Ingredients:</h4>
            <ul>
                ${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
            </ul>
        </div>
        <div class="instructions">
            <h4>Instructions:</h4>
            <ol>
                ${recipe.instructions.map(instruction => `<li>${instruction}</li>`).join('')}
            </ol>
        </div>
        <div class="recipe-hint">Click to view full recipe</div>
    `;
    
    // If there's an existing card, animate the transition
    const existingCard = recipeGrid.querySelector('.recipe-card');
    if (existingCard) {
        // Start fade out animation
        existingCard.classList.add('fade-out');
        
        // After fade out, remove old card and add new one
        setTimeout(() => {
            existingCard.remove();
            recipeGrid.appendChild(recipeCard);
            
            // Trigger reflow to ensure animation plays
            recipeCard.offsetHeight;
            
            // Start slide in animation
            recipeCard.classList.add('slide-in');
        }, 500);
    } else {
        // First card just gets added without animation
        recipeGrid.appendChild(recipeCard);
    }

    // Update recipe indicators
    const indicators = recipeControls.querySelectorAll('.recipe-indicator');
    indicators.forEach((indicator, i) => {
        indicator.classList.toggle('active', i === index);
    });
}

// Initialize recipe switching
let currentRecipeIndex = 0;
let autoSwitchInterval;

// Function to switch to next recipe
function switchToNextRecipe() {
    currentRecipeIndex = (currentRecipeIndex + 1) % featuredRecipes.length;
    updateFeaturedRecipe(currentRecipeIndex);
}

// Function to switch to previous recipe
function switchToPreviousRecipe() {
    currentRecipeIndex = (currentRecipeIndex - 1 + featuredRecipes.length) % featuredRecipes.length;
    updateFeaturedRecipe(currentRecipeIndex);
}

// Function to start auto-switching
function startAutoSwitch() {
    autoSwitchInterval = setInterval(switchToNextRecipe, 15000);
}

// Function to stop auto-switching
function stopAutoSwitch() {
    clearInterval(autoSwitchInterval);
}

// Function to manually switch recipe
function switchRecipe(index) {
    currentRecipeIndex = index;
    updateFeaturedRecipe(currentRecipeIndex);
    // Reset auto-switch timer
    stopAutoSwitch();
    startAutoSwitch();
}

// Initial recipe display
updateFeaturedRecipe(currentRecipeIndex);
startAutoSwitch(); 