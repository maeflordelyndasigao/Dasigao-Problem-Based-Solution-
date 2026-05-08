let subscriptions = [];

const subForm = document.getElementById('sub-form');
const subList = document.getElementById('sub-list');
const totalDisplay = document.getElementById('total-burn');

subForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const cost = parseFloat(document.getElementById('cost').value);
    const cycle = parseInt(document.getElementById('cycle').value);

    // NORMALIZATION LOGIC
    const monthlyEquivalent = cost / cycle;

    const newSub = {
        id: Date.now(),
        name,
        monthlyEquivalent
    };

    subscriptions.push(newSub);
    updateApp();
    subForm.reset();
});

function deleteSub(id) {
    subscriptions = subscriptions.filter(sub => sub.id !== id);
    updateApp();
}

function updateApp() {
    // 1. Clear current list
    subList.innerHTML = '';
    
    // 2. Calculate Total Burn
    const total = subscriptions.reduce((sum, sub) => sum + sub.monthlyEquivalent, 0);
    totalDisplay.innerText = `$${total.toFixed(2)}`;

    // 3. Render List
    subscriptions.forEach(sub => {
        const li = document.createElement('li');
        li.className = 'sub-item';
        li.innerHTML = `
            <div>
                <strong>${sub.name}</strong><br>
                <small>$${sub.monthlyEquivalent.toFixed(2)}/mo</small>
            </div>
            <button class="cancel-btn" onclick="deleteSub(${sub.id})">CANCEL</button>
        `;
        subList.appendChild(li);
    });
}