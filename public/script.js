function generateKey() {
    const hwid = document.getElementById('hwid').value;
    if (!hwid) {
        alert('Please enter a HWID.');
        return;
    }

    const key = hashString(hwid);
    const expirationTime = new Date(Date.now() + 60 * 60 * 1000); // 1 hour expiration
    const expirationDate = expirationTime.toLocaleDateString();
    const expirationTimeFormatted = expirationTime.toLocaleTimeString();

    const payload = { key, hwid, date: expirationDate, time: expirationTimeFormatted };

    fetch('/add-key', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })
        .then(response => response.text())
        .then(data => {
            document.getElementById('result').innerHTML = `<p>${data}</p>`;
        })
        .catch(err => console.error(err));
}

function hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = (hash << 5) - hash + str.charCodeAt(i);
        hash |= 0; // Convert to 32bit integer
    }
    return hash.toString(16);
}
