const formRecipe = document.getElementById("form-recipe");
const recipeList = document.getElementById("view");
const ingredientName = document.getElementById("ingredient-name");
const ingredientList = document.getElementById("ingredient-temp-list");
var listIngredent = [];
const keyList = "recipeList";

document.addEventListener("DOMContentLoaded", function() {
    formRecipe.addEventListener("submit", submitRecipe);
    paintRecipes();
});


function submitRecipe(e) {
    e.preventDefault();
    e.stopPropagation();

    let recipe = {
        id: Date.now(),
        title: formRecipe["title"].value,
        img_url: formRecipe["img_url"].value, 
        description: formRecipe["description"].value,
        ingredient_name: ingredientList
    };

    let list = getListRecipes();
    
    list.push(recipe);

    console.log(list);

    localStorage.setItem(keyList, JSON.stringify(list));

    formRecipe["title"].value = "";
    formRecipe["img_url"].value = "";
    formRecipe["description"].value = "";
    for(var i = 0; i <= listIngredent.length; i++){
        listIngredent.pop();
    }

    paintRecipes();
    paintIngredients();

}

function submitNewIngredent(){


    listIngredent.push(ingredientName.value);
    ingredientName.value = "";

    paintIngredients();
}

function paintIngredients(){

    let html = "";

    for(var i = 0; i < listIngredent.length; i++){
        html += `<li class="[ bg-white color-gray ]">
                ${listIngredent[i]}
            <button class="close" type="button" onclick="deleteIngredent()">X</button>
        </li>`;
    }

    ingredientList.innerHTML = html;
}

function deleteIngredent(){
    
}

function getListRecipes(){

    let list = JSON.parse(localStorage.getItem(keyList));

    if(list === null){
        return [];
    } else {
        return list;
    }
}

function paintRecipes() {

    let list = getListRecipes();

    let html = "";


    for(var i = 0; i < list.length; i++){
        html += `<div class="[ card ] [ bg-secondary color-white ] [ radius shadow ]" card-id="${i.id}">
            <img src="${i.img_url}" alt="">
                <div class="[ flow ]">
                <h5>${i.title}</h5>
                    <div class="[ flex ]" data-state="justify-between">
                        <button class="[ btn ]" data-state="white" onclick="getRecipe(${i.id})">Ver</button>
                        <button class="[ btn ]" data-state="warning" onclick="deleteRecipe(${i.id})">Eliminar</button>
                    </div>
                </div>
            </div>`;
    }
    
    recipeList.innerHTML = html;
}

function getRecipe(id){
    
    let html = "";
    
    let list = getListRecipes();

    recipe = recipeList.filter(i => i.id !== id)

    html += `<div class="[ recipe ] [ flex ] [ shadow ]">
            <div class="recipe-img">
                <img src="${recipe.img_url}" alt="">
            </div>
            <div class="[ recipe-info ] [ flow ]">
                <h2>${recipe.title}</h2>
                <div class="[ text-justify ]">${recipe.description}</div>
                <h5>Ingredientes</h5>
                <ul class="[ recipe-ing ] [ flex ]" data-state="wrap">
                    <li>${i}</li>
                </ul>
            </div>
        </div>

        <div class="text-right">
            <button class="[ btn ]" data-state="primary" onclick="paintRecipes()">Volver al listado</button>
        </div>`;

        recipeList.innerHTML = html;
}

function deleteRecipe(id){

    let list = getListRecipes();

    list = list.filter(i => i.id !== id);

    localStorage.setItem(keyList, JSON.stringify(list));

    let recipe = document.getElementById(id);

    recipe.setAttribute("data-state", "hide");

    setTimeout(() =>{
        recipe.remove();
    }, 1000)

}