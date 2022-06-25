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

    const tasks = getTask();
    
    const allTasks = getTaksFromStorage();

    allTasks.push(tasks);

    console.log(allTasks);

    displayAllTasks(allTasks);

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

function getTask(){
    const task = taskBox.value;
    let date = dateBox.value;
    date = date.split("-").reverse().join("-");
    const time = timeBox.value;
    const textArea = textAreaBox.value;
    const tasks = {
        task, date, time, textArea
    };
    return tasks;
}

function displayAllTasks(allTasks){
    taskNotesDiv.innerHTML = "";
    for(const task of allTasks){
        const index = allTasks.indexOf(task);
        const note = `
        <div class"noteDiv">
        <ul class="fadeInNote">
            <button type="button" onclick="deleteTask(${index})"><i class="fa-solid fa-trash deleteButton"></i></button>
            <li>Task: ${task.task}</li>
            <li>Description: ${task.textArea}</li>
            <li>Date: ${task.date}</li>
            <li>Time: ${task.time}</li>
        </ul>
        </div>
        `
        taskNotesDiv.innerHTML += note;
    }   
}

function currentTime(){
const time = new Date().toISOString();
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

function deleteTask(index){
    const allTasks = getTaksFromStorage();
    allTasks.splice(index, 1);
    saveTasksToStorage(allTasks);
    loadTasks();
}

function clearForm(){
    taskBox.focus();
    taskBox.value = "";
    dateBox.value = "";
    timeBox.value = "";
    textAreaBox.value = "";
}
