const recipes = document.querySelector('.tasks');

document.addEventListener('DOMContentLoaded', function() {
  // nav menu
  const menus = document.querySelectorAll('.side-menu');
  M.Sidenav.init(menus, {edge: 'right'});
  // add task form
  const forms = document.querySelectorAll('.side-form');
  M.Sidenav.init(forms, {edge: 'left'});
});

// render tasks data
const renderTasks = (data, id) => {
  //debugger;
  console.log(data.taskdate)

  const html = `
 
    <div class="card-panel recipe white row  " data-id="${id}" id="style-5">
      <span class="date" >${data.taskdate} </span>
      <div class="recipe-details">
        <div class="recipe-title">Task Name : - ${data.taskname}</div>
      <!--  <div class="recipe-ingredients">Task Description : - ${data.taskdesc}</div> -->
      </div>
      <div class="recipe-delete">
        <i class="material-icons" data-id="${id}">delete_outline</i>
      </div>
    </div>
    
  `;
  recipes.innerHTML += html;

};

// remove task
const removeTask = (id) => {
  const recipe = document.querySelector(`.recipe[data-id=${id}]`);
  recipe.remove();
};