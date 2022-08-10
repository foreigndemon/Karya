// import {v4 as uuidv4} from 'uuid';
let todo_list = [];
let d = new Date().toDateString();
// console.log(d.slice(8,10)+" "+d.slice(4,7)+" "+d.slice(13))

document.querySelector('.date').innerHTML = d.slice(8,10)+" "+d.slice(4,7)+" "+d.slice(13);

const checkItem = (id, checked) => {
    todo_list = todo_list.map(item => {
        if(item.id === id){
            return {
                ...item,
                completed:checked
            }
        }
        return item;
    })
    localStorage.setItem('todo', JSON.stringify(todo_list));
    renderList();
}

const delItem = (id) => {
    todo_list = todo_list.filter(item => item.id !== id)
    localStorage.setItem('todo',JSON.stringify(todo_list));
    renderList();
}

let renderList = () => {
    document.querySelector('.todo-items').innerHTML = '';
    todo_list.forEach(todo_list_item => {
        let todoDiv = document.createElement('div');
        todoDiv.setAttribute('class','check-text');

        let checkbox = document.createElement('input');
        checkbox.setAttribute('type','checkbox');
        checkbox.setAttribute('class','todo-item-check')

        
        let li = document.createElement('li');
        li.innerHTML = todo_list_item.text;
        li.appendChild(checkbox);
        li.setAttribute('class','todo-item');
        
        if (todo_list_item.completed) {
            checkbox.checked = true;
            li.style.textDecoration = 'line-through';
            li.style.fontStyle = 'italic'
        }

        let delBtn = document.createElement('button');
        delBtn.setAttribute('class','del-btn btn btn-danger');
        delBtn.innerHTML = '✘';

        // li.appendChild(delBtn);
        todoItems.appendChild(todoDiv);
        todoDiv.appendChild(li)
        todoDiv.appendChild(delBtn);

        // add event listeners
        checkbox.addEventListener('click', ()=> {
            checkItem(todo_list_item.id, checkbox.checked);
        })

        delBtn.addEventListener('click',() => delItem(todo_list_item.id))
     });
}
const todoForm = document.querySelector('.todo-form');
let submitBtn = document.querySelector('.submit-btn');
let todoItems = document.querySelector('.todo-items')

todoForm.addEventListener('submit',(event)=>{
    event.preventDefault();
    let todoInput = document.getElementById('todo-text');
    let todo_item = {
        id:uuidv4(),
        text:todoInput.value,
        completed:false
    }
    todo_list.push(todo_item)
    // only accepts strings values
    localStorage.setItem('todo',JSON.stringify(todo_list));
    renderList();
    todoInput.value = "";
})

window.addEventListener('load',()=>{
    let localStorageData = localStorage.getItem('todo');
    if(localStorageData){
        todo_list = JSON.parse(localStorageData);
    }
    // console.log(todo_list);
    renderList();
})

