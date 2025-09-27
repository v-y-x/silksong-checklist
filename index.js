let checkboxes = document.querySelectorAll('.check')
let state = JSON.parse(localStorage.getItem('checklistState') || '{}');
const percentText = document.getElementById('percent');

checkboxes.forEach(checkbox => {
    if (state[checkbox.id]) {
        checkbox.checked = true;
    }

    checkbox.addEventListener('click', () => {
        let id = checkbox.getAttribute('id');
        let text = document.getElementById('box' + id)
        if (checkbox.checked) {
            state[id] = checkbox.checked;
            if (text != null) {
                text.style.textDecoration = 'line-through'
                text.style.color = 'lightgrey'
            }
        }
        else {
            state[id] = checkbox.checked;
            if (text != null) {
                text.style.textDecoration = ''
                text.style.color = 'white'
            }
        }
        percentCalculate();
    })
})

function percentCalculate() {
    const checkedCount = Object.values(state).filter(Boolean).length;
    let percent = ((checkedCount / checkboxes.length) * 100).toFixed(0);
    percentText.innerHTML = percent + '%'
    localStorage.setItem('checklistState', JSON.stringify(state));
}

function loadStyles() {
    checkboxes.forEach(checkbox => {
        if (state[checkbox.id]) {
            let id = checkbox.getAttribute('id');
            let text = document.getElementById('box' + id);
            if (text != null) {
                text.style.textDecoration = 'line-through'
                text.style.color = 'lightgrey'
            }
        }
    })
}