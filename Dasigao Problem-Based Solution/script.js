let subscriptions = [];
let logs = [];

const subForm = document.getElementById('sub-form');
const subList = document.getElementById('sub-list');
const totalDisplay = document.getElementById('total-burn');
const logList = document.getElementById('activity-log');

// Helper to push actions to tracking window
function addLog(message) {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    logs.unshift({ time, message }); // Puts latest event at the top
    renderLogs();
}

subForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const cost = parseFloat(document.getElementById('cost').value);
    const cycle = parseInt(document.getElementById('cycle').value);

    const monthlyEquivalent = cost / cycle;

    const newSub = {
        id: Date.now(),
        name,
        cost,
        cycle, // Keep track if 1 (Monthly) or 12 (Yearly)
        monthlyEquivalent,
        status: 'active' // New: Can be 'active' or 'paused'
    };

    subscriptions.push(newSub);
    addLog(`Added subscription: ${name} ($${monthlyEquivalent.toFixed(2)}/mo)`);
    updateApp();
    subForm.reset();
});

function deleteSub(id) {
    const target = subscriptions.find(sub => sub.id === id);
    if (target) {
        addLog(`Canceled subscription: ${target.name}`);
    }
    subscriptions = subscriptions.filter(sub => sub.id !== id);
    updateApp();
}

// NEW: Handles shifting between active and paused status
function toggleStatus(id) {
    subscriptions = subscriptions.map(sub => {
        if (sub.id === id) {
            const nextStatus = sub.status === 'active' ? 'paused' : 'active';
            addLog(`${nextStatus === 'paused' ? 'Paused' : 'Resumed'} subscription: ${sub.name}`);
            return { ...sub, status: nextStatus };
        }
        return sub;
    });
    updateApp();
}

function renderLogs() {
    logList.innerHTML = '';
    logs.forEach(log => {
        const li = document.createElement('li');
        li.innerHTML = `<span class="log-time">[${log.time}]</span>${log.message}`;
        logList.appendChild(li);
    });
}

function updateApp() {
    subList.innerHTML = '';
    
    // NEW CALCULATIONS: Only sum subscriptions that are 'active'
    const total = subscriptions
        .filter(sub => sub.status === 'active')
        .reduce((sum, sub) => sum + sub.monthlyEquivalent, 0);
        
    totalDisplay.innerText = `$${total.toFixed(2)}`;

    subscriptions.forEach(sub => {
        const li = document.createElement('li');
        // Add specific modifier class if item is paused
        li.className = `sub-item ${sub.status === 'paused' ? 'paused' : ''}`;
        
        // Conditional text to render Yearly tags
        const yearlyTag = sub.cycle === 12 ? '<span class="badge">YEARLY</span>' : '';
        const toggleBtnText = sub.status === 'active' ? 'PAUSE' : 'CONTINUE';
        const toggleBtnClass = sub.status === 'paused' ? 'pause-btn active-state' : 'pause-btn';

        li.innerHTML = `
            <div>
                <strong>${sub.name}</strong> ${yearlyTag}<br>
                <small>$${sub.monthlyEquivalent.toFixed(2)}/mo</small>
            </div>
            <div class="action-btns">
                <button class="${toggleBtnClass}" onclick="toggleStatus(${sub.id})">${toggleBtnText}</button>
                <button class="cancel-btn" onclick="deleteSub(${sub.id})">CANCEL</button>
            </div>
        `;
        subList.appendChild(li);
    });
}