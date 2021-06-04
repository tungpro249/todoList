const input_value = document.getElementById("input-value");
const btn_submit = document.getElementById("btn-submit");
const todo_list = document.getElementById("todo-list");
const btn_xoa = document.getElementById("btn_xoa");

todo_list.addEventListener("click", deleteTodo);

function deleteTodo(e){
  const item = e.target;
  //delete todo
  if(item.classList[0] === 'xoa_btn'){
    const todo = item.parentElement;
    todo.remove();
    removeStorageTodo(todo);
  }
  //hoàn thành 
  if(item.classList[0] === 'completed_btn'){
    const todo = item.parentElement;
    todo.classList.toggle("completed");
    //updata khi nhấn hoàn thành
    updataStorage(todo);
  }
}
function updataStorage(todo){
  let task;
  if(localStorage.getItem("task") === null){
    task = [];
  }else{
    task = JSON.parse(localStorage.getItem("task"))
  }
   
}
// xóa dữ liệu ra khỏi Storage

function removeStorageTodo(todo){
  let task;
  if(localStorage.getItem("task") === null){
    task = [];
  }else{
    task = JSON.parse(localStorage.getItem("task"))
  }
  const todoIndex = todo.children[0].innerText;
  console.log(todoIndex);
  task.splice(task.indexOf(todoIndex),1);
  localStorage.setItem("task",JSON.stringify(task))
}

btn_submit.addEventListener("click", addtodo);
  listTodoStorage();
function addtodo(e){
  todo = input_value.value;

  if(todo){

    //tạo thẻ div
    const newDiv = document.createElement("div");
    //thêm class cho div
    newDiv.classList.add('todo');
    //tạo thẻ li
    const newLi = document.createElement("li");
    newLi.innerText = todo; //in ra giá trị nhập vào
    newLi.classList.add('todo-item');
    newDiv.appendChild(newLi);

    // thêm local
    saveLocalStorage(todo);
    //tạo nút hoàn thành
    const btn_hoanthanh = document.createElement("button");
    btn_hoanthanh.innerText ="Hoàn thành";
    btn_hoanthanh.classList.add("completed_btn");
    newDiv.appendChild(btn_hoanthanh);

    //tạo nút xóa
    const btn_xoa = document.createElement("button");
    btn_xoa.innerText ="Xóa";
    btn_xoa.classList.add("xoa_btn");
    newDiv.appendChild(btn_xoa);
    todo_list.appendChild(newDiv);

  }
}

// lưu vào local storage của trình duyệt
function saveLocalStorage(todo){
  let task;
  // nếu tìm thấy local storage task = null 
  if(localStorage.getItem("task") === null){
    task = [];
  }else{
    task = JSON.parse(localStorage.getItem("task"))
  }
  //push vào localStorage
  task.push({
    text:todo,
    complete: false
  });
  localStorage.setItem("task", JSON.stringify(task));
}

// reset browser vẫn hiển thị data từ localStorage ra màn hình
function listTodoStorage(){
  let task;
  // nếu tìm thấy local storage task = null 
  if(localStorage.getItem("task") === null){
    task = [];
  }else{
    task = JSON.parse(localStorage.getItem("task"))
  }
  // lặp qua json và in ra màn hình
  task.forEach(nhiemvu =>{
    //tạo thẻ div
    const newDiv = document.createElement("div");
    //thêm class cho div
    newDiv.classList.add('todo');
    //tạo thẻ li
    const newLi = document.createElement("li");
    newLi.innerText = nhiemvu.text; //in ra giá trị nhập vào
    newLi.classList.add('todo-item');
    newDiv.appendChild(newLi);

    //tạo nút hoàn thành
    const btn_hoanthanh = document.createElement("button");
    btn_hoanthanh.innerText ="Hoàn thành";
    btn_hoanthanh.classList.add("completed_btn");
    newDiv.appendChild(btn_hoanthanh);

    //tạo nút xóa
    const btn_xoa = document.createElement("button");
    btn_xoa.innerText ="Xóa";
    btn_xoa.classList.add("completed_btn");
    newDiv.appendChild(btn_xoa);

    todo_list.appendChild(newDiv);

  });

}