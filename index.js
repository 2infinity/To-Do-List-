const container = document.getElementById("container");
const addBtn = document.getElementById("addBtn");
const note = document.getElementById("note");

note.addEventListener("keydown", (e)=>{
  if(e.key==="Enter"){
    addNote();
  }  
})


let noted = localStorage.getItem("savedNotes");

let noteArray = noted===null ? [] : JSON.parse(noted);

render();

function render(){
  container.innerHTML = "";
  
  noteArray.forEach((todo, index)=>{
    let list = document.createElement("div");
    list.id= "list";
    
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("click", ()=>{
      todo.completed = checkbox.checked;
      saveAndRender();
    });
    
    let li = document.createElement("li");
    li.textContent = todo.text;
    li.classList.toggle("open", todo.completed);
    checkbox.checked = todo.completed;
    
    let btn = document.createElement("button");
    btn.textContent = "X";
    btn.onclick = ()=>{
      li.remove();
      noteArray.splice(index, 1);
      saveAndRender();
    }
    list.appendChild(checkbox);
    list.appendChild(li);
    list.appendChild(btn);
    container.appendChild(list);
    
  });
}

function saveAndRender(){
  localStorage.setItem("savedNotes", JSON.stringify(noteArray));
  render();
}

function addNote(){
  let notes = note.value.trim();
  if(notes===null){
    return;
  }
  noteArray.push({
    text: notes, completed: false
  });
  note.value = "";
  saveAndRender();
}