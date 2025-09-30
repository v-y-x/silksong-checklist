let checkboxes = document.querySelectorAll('.check')
let state = JSON.parse(localStorage.getItem('checklistState') || '{}');
const percentText = document.getElementById('percent');
let radioState = localStorage.getItem('actChoice');

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
    let totalWeight = 0;
    let current = 0;

    checkboxes.forEach(cb => {
        const w = parseFloat(cb.dataset.weight || 1);
        totalWeight += w;
        if (state[cb.id])
            current += w;
    });
    
    let percent = ((current / totalWeight) * 100).toFixed(2);
    percentText.innerHTML = percent + '%'
    localStorage.setItem('checklistState', JSON.stringify(state));
}

let originals = {};

for (let i = 1; i <= 20; i++){
    const el = document.getElementById('boxmask' + i)
    if (el) originals['boxmask' + i] = el.innerHTML
}

function actOne() {
    document.getElementById('boxmask1').innerHTML = 'Bought from Pebb [ 300 Rosaries ]'
    document.getElementById('boxtp1').innerHTML = 'Bought from Mort [ 220 Rosaries ]'
    document.getElementById('boxtp2').innerHTML = '1st reward from Loddie'
    document.querySelector('.flowerBlock').style.display = 'none'

    for (let i = 7; i <= 20; i++){
        id = 'boxmask' + i
        el = document.getElementById(id);
        cb = document.getElementById('mask' + i)

        if (!originals[id]) {
            originals[id] = el.innerHTML
        }
        el.innerHTML = '---'
        cb.disabled = true;
    }

    for (let i = 2; i <= 3; i++){
        id = 'boxheart' + i
        el = document.getElementById(id);
        cb = document.getElementById('heart' + i)

        if (!originals[id]) {
            originals[id] = el.innerHTML
        }
        el.innerHTML = '---'
        cb.disabled = true;
    }
    
    for (let i = 7; i <= 18; i++){
        id = 'boxspool' + i
        el = document.getElementById(id)
        cb = document.getElementById('spool' + i)

        if (originals[id]) {
            originals[id] = el.innerHTML
        }
        el.innerHTML = '---'
        cb.disabled = true;
    }
    
    for (let i = 3; i <= 4; i++){
        id = 'boxck' + i
        el = document.getElementById(id);
        cb = document.getElementById('ck' + i)

        if (!originals[id]) {
            originals[id] = el.innerHTML
        }
        el.innerHTML = '---'
        cb.disabled = true;
    }

    for (let i = 4; i <= 4; i++){
        id = 'boxtp' + i
        el = document.getElementById(id);
        cb = document.getElementById('tp' + i)

        if (!originals[id]) {
            originals[id] = el.innerHTML
        }
        el.innerHTML = '---'
        cb.disabled = true;
    }
}

function actTwo() {
    document.querySelector('.flowerBlock').style.display = 'none'
    document.getElementById('boxmask1').innerHTML = 'Bought from Pebb [ 300 Rosaries ]'
    for (let i = 7; i <= 16; i++){
        id = 'boxmask' + i
        el = document.getElementById(id);
        el.innerHTML = originals[id]
    }

    for (let i = 4; i <= 4; i++){
        id = 'boxtp' + i
        el = document.getElementById(id);
        cb = document.getElementById('tp' + i)

        if (!originals[id]) {
            originals[id] = el.innerHTML
        }
        el.innerHTML = '---'
        cb.disabled = true;
    }

    for (let i = 17; i <= 20; i++){
        id = 'boxmask' + i
        el = document.getElementById(id);
        cb = document.getElementById('mask' + i)

        if (!originals[id]) {
            originals[id] = el.innerHTML
        }
        el.innerHTML = '---'
        cb.disabled = true;
    }
}

function actThree() {
    document.querySelector('.flowerBlock').style.display = 'flex    '
    document.getElementById('boxmask1').innerHTML = 'Bought from Grindle [ 320 Rosaries ]'
    document.getElementById('boxtp1').innerHTML = 'Bought from Grindle [ 220 Rosaries ]'
    document.getElementById('boxtp2').innerHTML = 'At Loddie\'s former location'
}

const actRadio = document.querySelectorAll('input[name="act"]');

const saved = localStorage.getItem('actChoice');
if (saved) {
  const r = document.querySelector(`input[name="act"][value="${saved}"]`);
  if (r) r.checked = true;
}

function updateActState() {
  const chosen = document.querySelector('input[name="act"]:checked');
  const enabled = !!chosen;
  checkboxes.forEach(cb => cb.disabled = !enabled);
    if (chosen) {
        anchors.forEach(a => {
            a.innerHTML = originals[a.id];
        })
        document.querySelector('.notif').style.display = 'none';
      if (chosen.value === 'a1') actOne(); else if (chosen.value === 'a2') actTwo(); else actThree();
    localStorage.setItem('actChoice', chosen.value);
    }
  else {
      firstVisit();
    }
  
}

// first load
let anchors = document.querySelectorAll('a:not(.link)');
anchors.forEach(a => {
    originals[a.id] = a.innerHTML;
})

function firstVisit() {
    anchors.forEach(a => {
        a.innerHTML = '---' 
    })
    document.querySelector('.flowerBlock').style.display = 'none'
}


updateActState();
actRadio.forEach(r => r.addEventListener('change', updateActState));

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