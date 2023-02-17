'use strict';

const API_URL = 'https://jsonplaceholder.typicode.com/users';
const userList = [];
const userTable = document.getElementById('user-rows');
const searchInput = document.getElementById('search');

// Populates the user table, filtered by the optional searchQuery from searchInput;
const populateUsers = (searchQuery = null) => {
    userTable.innerHTML = '';
    const filteredUsers = searchQuery
        ? userList.filter(user => user.name.toLowerCase().includes(searchQuery.toLowerCase()))
        : userList;

    filteredUsers.forEach(user => {
        const row = userTable.insertRow(-1);
        row.insertCell(0).innerText = user.id;
        row.insertCell(1).innerText = user.name;
        row.insertCell(2).innerText = user.username;
        row.insertCell(3).innerText = user.email;
        row.insertCell(4).innerText = user.website;
    });
}

// Fetches users from api. If success then populate table;
const fetchUsers = () => {
    fetch(API_URL).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw Error(response.statusText);
        }
    }).then(usersJson => {
        userList.push(...usersJson);
        populateUsers();
    }).catch(error => {
        // Error handler
        console.log(error);
    });
}

// Add event listener to search input for filtering;
searchInput.addEventListener('input', e => populateUsers(e.target.value));

// Fetch the users and populate when the page first loads;
fetchUsers();