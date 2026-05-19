let subscriptions = [];

const subForm = document.getElementById('sub-form');
const subList = document.getElementById('sub-list');
const totalDisplay = document.getElementById('total-burn');
const loglist = document.getElementById('activity-log');

function addlog(message) {
    const time = new Date().toLocateTimeString([], {hour: '2-digit', minute: '2-digit', second: '2-digit'});
    loglist.unshift({ time, message });
    renderLogs();
}

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
        cost,
        cycle,
        monthlyEquivalent
        status: 'active'
    };

    subscriptions.push(newSub);
    addLog('Added subscription: ${name} ($${monthlyEquivalent.toFixed(2)}/mo)');
    updateApp();
    subForm.reset();
});

function deleteSub(id) {
    const target = subscriptions.find(sub => sub.id ===id);
    if (target) {
        addLog('Canceled subscriptions: ${target.named}');
    }
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