import '../css/styles.css';

document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");
  const recipes = [
    { name: "Spaghetti", ingredients: ["pasta", "tomato", "garlic"], notes: "Family favorite" },
    { name: "Salad", ingredients: ["lettuce", "tomato", "cucumber"], notes: "Quick lunch" }
  ];

  recipes.forEach(recipe => {
    const div = document.createElement("div");
    div.innerHTML = `<h2>${recipe.name}</h2>
                     <p><strong>Ingredients:</strong> ${recipe.ingredients.join(", ")}</p>
                     <p><strong>Notes:</strong> ${recipe.notes}</p>`;
    app.appendChild(div);
  });
});
