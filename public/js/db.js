// enable offline data
db.enablePersistence()
  .catch(function(err) {
    if (err.code == 'failed-precondition') {
      // probably multible tabs open at once
      console.log('persistance failed');
    } else if (err.code == 'unimplemented') {
      // lack of browser support for the feature
      console.log('persistance not available');
    }
  });

// real-time listener
db.collection('tasks-manager').onSnapshot(snapshot => {
  console.log(snapshot.docChanges());
  snapshot.docChanges().forEach(change => {
    if(change.type === 'added'){
      renderTasks(change.doc.data(), change.doc.id);
    }
    if(change.type === 'removed'){
      removeTask(change.doc.id);
    }
  });
});

// add new recipe
const form = document.querySelector('form');
form.addEventListener('submit', evt => {
  evt.preventDefault();
  
  const recipe = {
    taskdate:form.taskdate.value,
    taskname: form.taskname.value,
    //taskdesc: form.taskdesc.value
  };

  db.collection('tasks-manager').add(recipe)
    .catch(err => console.log(err));
  form.taskdate.value='';
  form.taskname.value = '';
 // form.taskdesc.value = '';
});

// remove a recipe
const recipeContainer = document.querySelector('.tasks');
recipeContainer.addEventListener('click', evt => {
  if(evt.target.tagName === 'I'){
    const id = evt.target.getAttribute('data-id');
    //console.log(id);
    db.collection('tasks-manager').doc(id).delete();
  }
})