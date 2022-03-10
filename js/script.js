import {clearDomListTasks, builder, builderEl, renderGroundFrom} from './renders.js';

renderGroundFrom();

let userText = document.querySelector('.todo__input');  // input текст пользователя
let btnAdd = document.querySelector('#add');            //Кнопка Add
let btnDel = document.querySelector('#delete');         // Кнопка Delete
let taskList = [];                                      // Массив хранилище
let attachTask = document.querySelector('.todo__list'); //Точка привязки нового элемента

startLoad();                                            // Функция стартовой загрузки дел из localStorage

// Render TaskList
function renderNewList(){
    taskList.forEach((el, index) => {
    let startElement = document.createElement('div');
    startElement.classList.add('task');
    let label = builderEl('label', 'checkbox__label');
    if (el.checked) {
        label.classList.add('complete');}
    label.setAttribute('for', `checkbox__${index}`);
    label.textContent = el.task;
    let checkbox = builderEl('input', 'checkbox');
    checkbox.setAttribute('id', `checkbox__${index}`);
    checkbox.setAttribute('name', 'checkbox');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.addEventListener('change', event => {
        select(event.target);
    });
    label.appendChild(checkbox);
    startElement.appendChild(label);
    let dateField = builderEl('p', 'task__date');
    dateField.innerHTML = el.date;
    startElement.appendChild(dateField);
    let btnClose = builderEl('button', 'task__close');
    btnClose.setAttribute('type', 'button');
    btnClose.addEventListener('click', event => {
        close(event.target.parentNode.firstChild.textContent);
    });
    startElement.appendChild(btnClose);
    attachTask.appendChild(startElement);
});
}

// Button click Add
btnAdd.addEventListener('click', (event) => {
    let duplcate = 0;                                   // проверка на дубли
    taskList.forEach((el) => {
        el.task === userText.value ? duplcate++ : duplcate;});
    if (duplcate) {alert('Такое дело уже есть');}
    if ((userText.value) && (!duplcate)) {
        let dateInfo = new Date;                        // Генерируем дату
        let textDate = `${dateInfo.getDate()} : ${dateInfo.getMonth() + 1} : ${dateInfo.getFullYear()}`;
        let newTask = {
            id: (taskList.length + 1),                   // Id: карточки
            date: textDate,                              // записываем дату задачи в хранилище
            task: userText.value,                       // Записываем текст задачи в хранилище
            checked: false,                             // Записываем состояние чекбокса
        };
        taskList.push(newTask);                         // Добавляет информацию о таске в хранилище
        userText.value = '';                            // Очищаем инпут
        userText.focus();                               // наводим фокус на инупут
        sentName();                                     // отправляем данные в localStorage
        countTasks();                                   // подсчет всех заданий
        clearDomListTasks();                            // очистка старого списка в dom
        renderNewList();                                // рендеринг нового списка
    }
});

// Button Delete All
btnDel.addEventListener('click', (event) => {
    taskList.splice(0, taskList.length);                          // Удаляем все объекты из хранилища данных
    localStorage.clear();                                       //Удаляем всё из localStorage
    countTasks();                                               
    countComplete();
    clearDomListTasks();
});

// Button Close Task
function close(text) {
    taskList.forEach((el, i) => {
        if (el.task === text) {
            taskList.splice(i, 1);}                              //удаляем выбранный таск из хранилища
    });
    taskList.forEach((el, i) => { el.id = i + 1});
    sentName();                                                 // отправляем данные в localStorage
    countTasks();
    countComplete();
    clearDomListTasks();                   
    renderNewList();
}

// CheckBox
function select(check) {
    let searchText = check.parentNode.textContent;
    taskList.forEach((el) => {
        if (el.task === searchText) {
            el.checked === false ? el.checked = true : el.checked = false;
            check.parentNode.classList.toggle('complete');
        }
    });
    sentName();                                         // отправляем данные в localStorage
    countComplete();
}

//Первоначальная отрисовка
function startLoad() {
    getName();                                      //Забираем данные из localStorage
    renderNewList();
    countTasks();
    countComplete();
}

// Функция подсчета кол-ва всех дел
function countTasks() {
    let countText = document.querySelector('.stat__text');
    let count = taskList.length;
    countText.textContent = `Task: ${count}`;
    return;
}

// Функция подсчета всех завершенных дел
function countComplete() {
    let counter = 0;
    taskList.forEach(el => {
        if (el.checked) {
            counter++;
        }
    });
    let countCompletes = document.querySelectorAll('.stat__text');
    countCompletes[1].textContent = `Complete: ${counter}`;
    return;
}

//Функции отправки и полуения данных из localStorage 
function sentName() {                        //Отправка в localStorage
    if (localStorage.getItem('todos')) {
        localStorage.clear();
        localStorage.setItem('todos', JSON.stringify(taskList));
    } else {
        localStorage.setItem('todos', JSON.stringify(taskList));
    }
}

function getName() {                         //Получение из localStorage
    if (localStorage.getItem('todos')) {
        let request = JSON.parse(localStorage.getItem('todos'));
        taskList = [];
        request.forEach(el => {
            taskList.push(el);
        });
    } else {
        taskList = [];
    }
}