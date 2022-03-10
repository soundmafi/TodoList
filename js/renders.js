//Отрисовка основной формы
export function renderGroundFrom(){
    builder('div', 'container', '.todo');
    builder('div', 'form', '.container');
    builder('form', 'todo__controls', '.form');
    builder('button', 'todo__btn', '.todo__controls');
    let btnDelete = document.querySelector('.todo__btn');
    btnDelete.setAttribute('type', 'button');
    btnDelete.setAttribute('id', 'delete');
    btnDelete.classList.add('delete');
    builder('input', 'todo__input', '.todo__controls');
    let inputPlaceholder = document.querySelector('.todo__input');
    inputPlaceholder.setAttribute('placeholder', 'Enter todo ...');
    inputPlaceholder.setAttribute('type', 'text');
    inputPlaceholder.focus();
    builder('button', 'todo__btn', '.todo__controls');
    let buttonAdd = document.querySelectorAll('.todo__btn');
    buttonAdd[1].setAttribute('id', 'add');
    buttonAdd[1].classList.add('add');
    builder('p', 'stat__text', '.todo__controls');
    builder('button', 'stat__show', '.todo__controls');
    builder('button', 'stat__show', '.todo__controls');
    let btnShow = document.querySelectorAll('.stat__show');
    btnShow[0].classList.add('all__task');
    btnShow[1].classList.add('complete__task');
    builder('p', 'stat__text', '.todo__controls');
    builder('div', 'todo__list','.form');
}

// Функции создания элементa Dom
export function builder(el, cl, par) {
    let routStart = document.querySelector(par);
    if (routStart) {
        let newElement = document.createElement(el);
        newElement.classList.add(cl);
        return routStart.appendChild(newElement);
    } else {
        console.log(`Родитель ${par} не найден`);
    }
}
export function builderEl(el, cl) {
    let newElement = document.createElement(el);
    newElement.classList.add(cl);
    return newElement;
}

//Очистка всех дел из дерева
export function clearDomListTasks(){
    let elementParent = document.querySelector('.todo__list');
    while (elementParent.firstChild) {
        elementParent.removeChild(elementParent.firstChild);
    }
}
