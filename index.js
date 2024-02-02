import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://falakfamily-fdb4f-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const reminderListInDB = ref(database, "reminderList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const reminderListEl = document.getElementById("reminder-list")

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value

    push(reminderListInDB, inputValue)

    clearInputFieldEl()
})

onValue(reminderListInDB, function(snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())

        clearReminderListEl()

        for (let i = 0; i < itemsArray.length; i++) {
            let currentReminder = itemsArray[i]
            let currentReminderID = currentReminder[0]
            let currentReminderValue = currentReminder[1]

            appendItemToReminderListEl(currentReminder)
        }
    } else {
        reminderListEl.innerHTML = "Nothing to remind for now..."
    }
    
})

function clearReminderListEl() {
    reminderListEl.innerHTML = ""
}

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function appendItemToReminderListEl(reminder) {
    let reminderID = reminder[0]
    let reminderValue = reminder[1]
    
    let newEl = document.createElement("li")
    
    newEl.textContent = reminderValue
    
    newEl.addEventListener("click", function() {
        let exactLocationOfReminderInDB = ref(database, `reminderList/${reminderID}`)
        
        remove(exactLocationOfReminderInDB)
    })
    
    reminderListEl.append(newEl)
}



















// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
// import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

// const appSettings = {
//     databaseURL: "https://shopping-assistant-app-bfb83-default-rtdb.asia-southeast1.firebasedatabase.app/"
// }

// const app = initializeApp(appSettings)
// const database = getDatabase(app)
// const shoppingListInDB = ref(database, "shoppingList")

// const inputFieldEl = document.getElementById("input-field")
// const addButtonEl = document.getElementById("add-button")
// const shoppingListEl = document.getElementById("shopping-list")

// addButtonEl.addEventListener("click", function() {
//     let inputValue = inputFieldEl.value
    
//     push(shoppingListInDB, inputValue)
    
//     clearInputFieldEl()
// })

// onValue(shoppingListInDB, function(snapshot) {
//     if (snapshot.exists()) {
//         let itemsArray = Object.entries(snapshot.val())
    
//         clearShoppingListEl()
        
//         for (let i = 0; i < itemsArray.length; i++) {
//             let currentItem = itemsArray[i]
//             let currentItemID = currentItem[0]
//             let currentItemValue = currentItem[1]
            
//             appendItemToShoppingListEl(currentItem)
//         }    
//     } else {
//         shoppingListEl.innerHTML = "No items here... yet"
//     }
// })

// function clearShoppingListEl() {
//     shoppingListEl.innerHTML = ""
// }

// function clearInputFieldEl() {
//     inputFieldEl.value = ""
// }

// function appendItemToShoppingListEl(item) {
//     let itemID = item[0]
//     let itemValue = item[1]
    
//     let newEl = document.createElement("li")
    
//     newEl.textContent = itemValue
    
//     newEl.addEventListener("click", function() {
//         let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)
        
//         remove(exactLocationOfItemInDB)
//     })
    
//     shoppingListEl.append(newEl)
// }