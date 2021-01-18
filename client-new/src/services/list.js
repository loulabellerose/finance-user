export function getList() {
    return fetch('http://localhost:5000/users')
    .then(data => data.json())
}

export function setItem(item) {
    return fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ item })
    })
    .then(data => data.json())
}