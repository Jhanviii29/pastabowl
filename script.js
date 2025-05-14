// Array to track all ingredients
let ingredients = [];
let ingredientCount = {
    pasta: 0,
    cheese: 0,
    basil: 0,
    mushroom: 0,
    olive: 0
};

let isServed = false;

function addToBowl(ingredient) {
    // Don't add ingredients if the dish is already served
    if (isServed) return;
    
    const bowl = document.getElementById("bowl");
    ingredientCount[ingredient]++;
    
    // Create a new ingredient element
    const elem = document.createElement("div");
    elem.className = `ingredient ${ingredient}`;
    
    // Random position within the bowl
    const bowlRadius = 140; // Slightly less than bowl size to keep away from edges
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * bowlRadius * 0.8;
    const posX = Math.cos(angle) * distance;
    const posY = Math.sin(angle) * distance;
    
    // Random rotation
    const rotation = Math.floor(Math.random() * 360);
    elem.style.setProperty('--rotate', rotation + 'deg');
    
    // Position the ingredient
    elem.style.left = `calc(50% + ${posX}px)`;
    elem.style.top = `calc(50% + ${posY}px)`;
    
    // Layer ordering - pasta at bottom, other ingredients on top
    const zIndex = ingredient === 'pasta' ? 2 : (3 + ingredientCount[ingredient]);
    elem.style.zIndex = zIndex;
    
    // Add to bowl and track
    bowl.appendChild(elem);
    ingredients.push(elem);
    
    // Add a little animation
    setTimeout(() => {
        elem.style.transform = `rotate(${rotation}deg) scale(1.1)`;
        setTimeout(() => {
            elem.style.transform = `rotate(${rotation}deg) scale(1)`;
        }, 150);
    }, 10);
}

function addSauce(sauceType) {
    // Don't add sauce if the dish is already served
    if (isServed) return;
    
    const sauceLayer = document.getElementById("sauce-layer");
    
    // Remove all existing sauce classes
    sauceLayer.classList.remove('sauce-tomato', 'sauce-pesto', 'sauce-alfredo');
    
    // Add the new sauce class
    sauceLayer.classList.add('sauce-' + sauceType);
}

function resetBowl() {
    const bowl = document.getElementById("bowl");
    const sauceLayer = document.getElementById("sauce-layer");
    const steam = document.getElementById("steam");
    
    // Remove served state
    isServed = false;
    bowl.classList.remove('served');
    steam.classList.remove('active');
    
    // Show UI elements
    document.querySelectorAll('.button-group').forEach(el => el.style.display = 'block');
    
    // Remove all ingredients except the sauce layer
    for (let elem of ingredients) {
        if (bowl.contains(elem)) {
            bowl.removeChild(elem);
        }
    }
    ingredients = [];
    
    // Reset counters
    for (let key in ingredientCount) {
        ingredientCount[key] = 0;
    }
    
    // Remove sauce
    sauceLayer.classList.remove('sauce-tomato', 'sauce-pesto', 'sauce-alfredo');
}

function bonAppetit() {
    const bowl = document.getElementById("bowl");
    const steam = document.getElementById("steam");
    
    // Mark as served
    isServed = true;
    
    // Hide UI elements
    document.querySelectorAll('.button-group').forEach(el => el.style.display = 'none');
    
    // Add served effects
    bowl.classList.add('served');
    steam.classList.add('active');
    
    // Show a message
    setTimeout(() => {
        alert("Your delicious pasta is ready! Bon appétit! 🍝✨");
    }, 500);
}

function newBowl() {
    resetBowl();
}
