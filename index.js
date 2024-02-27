"use stric"
// -----------VERAEBLIS -------------

const formCreate = document.querySelector("#form");

const listTodoosItim =document.querySelector('#list');

const sana = document.querySelector('#sana')

const vaqit = document.querySelector('.vaqit')

const modal = document.querySelector('.modal')

const formEdit = document.querySelector('#form-edit')

const closElement = document.querySelector('#close-elment')

let editItimid ;

//------check --------

let todos = JSON.parse(localStorage.getItem('list')) ? JSON.parse(localStorage.getItem('list')) : []

if(todos.length) showTodos()






//------setTodo  to locolstorige
function setTodos() {
    localStorage.setItem('list', JSON.stringify(todos))
}



//-----fanc messeg eror--------
function shovMesseg(where , messege) {
    document.getElementById(`${where}`).textContent = messege;
    setTimeout(()=>{
    document.getElementById(`${where}`).textContent = '';

    },2000)
}





//tim (Vaqitni hiosoblanb uni yuvayga ga chiqarish) ----

function getTime (){
    const  now = new Date();
    const kun = now.getDate() < 10 ? "0" + now.getDate() : now.getDate()
    const oy = now.getMonth() < 10 ? "0" + (now.getMonth()+1) : now.getMonth();
    const yil = now.getFullYear();
    const soat =now.getHours()< 10 ? "0" + now.getHours() : now.getHours()
    const minut =now.getMinutes()< 10 ? "0" + now.getMinutes() : now.getMinutes()
    const soniya =now.getSeconds()< 10 ? "0" + now.getSeconds() : now.getSeconds()
    sana.textContent=` Day - ${kun} . ${oy} . ${yil}`
    vaqit.textContent=`Tim - ${soat} : ${minut} : ${soniya}`

    return `${soat} : ${minut}:${soniya} , ${kun}.${oy}.${yil}`

}
setInterval(()=>{
   getTime()
},1000)




//func show todos (ul ga harbir inputtan kirgan maumot yasash)------
function showTodos() {
    const todos = JSON.parse(localStorage.getItem('list'));
    listTodoosItim.innerHTML=''
    todos.forEach((el ,id) => {
        listTodoosItim.innerHTML+=`
        <li ondblclick=setCompleted((${id})) class="list--itim ${el.complited == true ? 'complited' : ''}">
            ${el.text}
            <div class="itim--div">
               <span id="edit-taim">${el.tim}</span>
               <i onclick=editTodo((${id})) class="bi bi-pencil-square"></i>
               <i onclick=deletTodo((${id})) class="bi bi-trash-fill"></i>
            </div>
        </li>
        `
    });
}



//---get Todos-------

formCreate.addEventListener("submit" , (e)=>{
    e.preventDefault()

    const todoText = formCreate['form-input'].value.trim();
    formCreate.reset()
    if(todoText.length){

        todos.push({text:todoText, tim: getTime(), complited:false});
        setTodos()
        showTodos()
    }else{
        shovMesseg("text-erorr", "The data was entered incorrectly, please re-enter it !")
    }
})




//----delit todo ----

function deletTodo(id) {
   const deletTods = todos.filter((el,i)=> i !== id)
    
    todos = deletTods;
    setTodos()
    showTodos()
}


//---set competed---

 function setCompleted(id){
    const  complitedTodos = todos.map((el,i)=>{
        if(id == i){
            return{...el, complited: el.complited == true ? false : true}
        }else{
            return {...el}
        }
    })
    todos= complitedTodos
    setTodos()
    showTodos()
 }


 //edit form----

formEdit.addEventListener('submit' , (e)=>{
    e.preventDefault()
    const todoText = formEdit['form-input-edit'].value.trim();
    formEdit.reset()
    if(todoText.length){

        todos.splice(editItimid,1,{text:todoText, tim: getTime(), complited:false});
        setTodos()
        showTodos()
        close()
    }else{
        shovMesseg("text-erorr-edit", "The data was entered incorrectly, please re-enter it !")
    }
})




 //editTodo-----


 function editTodo(id) {
    open()
    editItimid = id
 }


 function open() {
    modal.style.display = "flex" 
    document.body.style.overflow ="hidden" 
 }

 function close() {
    modal.style.display = "none" 
    document.body.style.overflow ="visible"

 }
 closElement.addEventListener('click', close);