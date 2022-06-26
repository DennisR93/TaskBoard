loadTasks();

function validateInfo(){
    const task = taskBox.value;
    const date = dateBox.value;
    const time = timeBox.value;
    const textArea = textAreaBox.value;
    const today = setMinDay();

    taskBox.style.backgroundColor = "";
    dateBox.style.backgroundColor = "";
    timeBox.style.backgroundColor = "";
    textAreaBox.style.backgroundColor = "";
    taskErrorSpan.innerHTML = "";
    dateErrorSpan.innerHTML = "";
    timeErrorSpan.innerHTML = "";
    textAreaErrorSpan.innerHTML = "";

    if(task === ""){
        taskBox.style.backgroundColor = "pink";
        taskBox.focus();
        taskErrorSpan.innerHTML = "No task entered!";
        return false;
    }

    if(date === ""){
        dateBox.style.backgroundColor = "pink";
        dateBox.focus();
        dateErrorSpan.innerText = "No Date entered";
        return false;
    }

    if(date < today){
        dateBox.style.backgroundColor = "pink";
        dateBox.focus();
        dateErrorSpan.innerText = "Invalid date!";
        return false;
    }

    if(time === ""){
        timeBox.style.backgroundColor = "pink";
        timeBox.focus();
        timeErrorSpan.innerText = "No time entered";
        return false;
    }

    if(textArea === ""){
        textAreaBox.style.backgroundColor = "pink";
        textAreaBox.focus();
        textAreaErrorSpan.innerText = "No description entered";
        return false;
    }

    return true;
}

function addTask(){
    const isValid = validateInfo();
    if(!isValid){
        return;
    }
    
    const allTasks = getTaksFromStorage();

    const tasks = getTask(allTasks.length + 1);

    allTasks.push(tasks);

    displayAllTasks(allTasks, tasks.id);

    saveTasksToStorage(allTasks);

    clearForm();

}

function getTaksFromStorage(){
    const str = localStorage.getItem("tasks");

    const tasks = (str === null) ? [] : JSON.parse(str);

    return tasks;
}

function saveTasksToStorage(allTasks) {

    const str = JSON.stringify(allTasks);

    localStorage.setItem("tasks", str);
}

function getTask(num){
    const task = taskBox.value;
    let date = dateBox.value;
    date = date.split("-").reverse().join("-");
    const time = timeBox.value;
    const textArea = textAreaBox.value;
    const tasks = {
        task, date, time, textArea, id: num
    };
    return tasks;
}

function displayAllTasks(allTasks, newNote){
    taskNotesDiv.innerHTML = "";
    for(const task of allTasks){
        const index = allTasks.indexOf(task);
        const div = document.createElement("div");
        div.setAttribute("id", `${task.id}`);
        div.classList.add("noteDiv");
        const ul = document.createElement("ul");
        (newNote === task.id) ? ul.classList.add("fadeInNote") : ul.classList.remove("fadeInNote");
        const li1 = document.createElement("li");
        const button = document.createElement("button");
        button.innerHTML = `<i class="fa-solid fa-trash deleteButton"></i>`;
        button.onclick = function deleteTask(){
                            const allTasks = getTaksFromStorage();
                            allTasks.splice(index, 1);
                            saveTasksToStorage(allTasks);
                            loadTasks();
                            };
        const li2 = document.createElement("li");
        const taskLi = document.createTextNode(`Task: ${task.task}`);
        const li3 = document.createElement("li");
        const descLi = document.createTextNode(`Description ${task.textArea}`);
        const li4 = document.createElement("li");
        const dateLi = document.createTextNode(`Date: ${task.date}`);
        const li5 = document.createElement("li");
        const timeLi = document.createTextNode(`Time: ${task.time}`);
        div.append(ul);
        li1.append(button);
        li2.append(taskLi);
        li3.append(descLi);
        li4.append(dateLi);
        li5.append(timeLi);
        ul.append(li1, li2, li3,li4,li5);
        const tasksDiv = document.getElementById("taskNotesDiv");
        tasksDiv.append(div);
                        }
    } 

function currentTime(){
const time = new Date().getTime();
const date = Date();
console.log(time);
console.log(date);
return time;
}

function setMinDay(){
const today = new Date().toISOString().split('T')[0];
return today;
}

function minDay(){
    let today = new Date().toISOString().split('T')[0];
    document.getElementsByName("dateBox")[0].setAttribute('min', today);
}

function loadTasks(){
    const allTasks = getTaksFromStorage();
    displayAllTasks(allTasks);
}

function clearForm(){
    taskBox.focus();
    taskBox.value = "";
    dateBox.value = "";
    timeBox.value = "";
    textAreaBox.value = "";
}
