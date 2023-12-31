// const select = document.querySelector('.mobile-select');
// const selectDynamicText = () => {
//     //mobile select
//     Array.from(select.nextElementSibling.children).forEach(li => {
//         Array.from(li.children).forEach(child => {
//             if (child.classList.contains('active')) {
//                 let activeText = child.textContent;
//                 select.textContent = activeText;
//             }
//         });
//     });
// }
// select.addEventListener('click', function () {
//     this.classList.toggle('active');
//     this.nextElementSibling.classList.toggle('show');
// });

// const handleCloseSelect = () => {
//     select.classList.remove('active');
//     select.nextElementSibling.classList.remove('show');
// }

// //custom tabs
// const tabContainer = document.querySelector('.tab-container');

// tabContainer.addEventListener('click', e => {
//     e.stopPropagation();
//     const tabNavs = document.querySelectorAll('.tab-nav button');
//     const tabItems = document.querySelectorAll('.tab-item');
//     if (e.target.classList.contains('tab-btn')) {
//         tabNavs.forEach(tabNav => tabNav.classList.remove('active'));
//         tabItems.forEach(tabItem => {
//             tabItem.classList.add('hide');
//             let tabId = tabItem.getAttribute('data-id');

//             if (e.target.getAttribute('id') === tabId) {
//                 e.target.classList.add('active');
//                 tabItem.classList.remove('hide');
//             }
//         });
//         selectDynamicText();
//         handleCloseSelect();
//     }
// });


// selectDynamicText();

// Function to set dynamic text in the mobile select
const selectDynamicText = () => {
    const select = document.querySelector('.mobile-select');
    Array.from(select.nextElementSibling.children).forEach(li => {
        Array.from(li.children).forEach(child => {
            if (child.classList.contains('active')) {
                let activeText = child.textContent;
                select.textContent = activeText;
            }
        });
    });
};

// Function to handle closing the select menu
const handleCloseSelect = () => {
    const select = document.querySelector('.mobile-select');
    select.classList.remove('active');
    select.nextElementSibling.classList.remove('show');
};

// Function to handle click based on hash value
const handleHashClick = () => {
    const hash = window.location.hash;

    if (hash) {
        const tabBtn = document.querySelector(`.tab-btn[id="${hash.substring(1)}"]`);
        if (tabBtn) {
            tabBtn.click();
            selectDynamicText();
            handleCloseSelect();
        }
    }
};

// Event listener for hash changes
window.addEventListener('hashchange', handleHashClick);

// Initial handling of hash value on page load
window.addEventListener('DOMContentLoaded', handleHashClick);

// Event listener for clicking on tabs
const tabContainer = document.querySelector('.tab-container');
tabContainer.addEventListener('click', e => {
    e.stopPropagation();
    const tabNavs = document.querySelectorAll('.tab-nav button');
    const tabItems = document.querySelectorAll('.tab-item');
    const select = document.querySelector('.mobile-select');

    if (e.target.classList.contains('tab-btn')) {
        tabNavs.forEach(tabNav => tabNav.classList.remove('active'));
        tabItems.forEach(tabItem => {
            tabItem.classList.add('hide');
            let tabId = tabItem.getAttribute('data-id');

            if (e.target.getAttribute('id') === tabId) {
                e.target.classList.add('active');
                tabItem.classList.remove('hide');
            }
        });

        selectDynamicText();
        handleCloseSelect();
        const hashValue = `#${e.target.getAttribute('id')}`;
        history.pushState(null, null, hashValue); // Update URL hash without page reload
    }
});

// Initial setting of dynamic text in mobile select
selectDynamicText();


document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.reservation-form form');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        // Basic form validation
        const name = form.querySelector('input[name="name"]').value.trim();
        const phone = form.querySelector('input[name="phone"]').value.trim();
        const person = form.querySelector('select[name="person"]').value;
        const date = form.querySelector('input[name="reservation-date"]').value.trim();
        const time = form.querySelector('select[name="time"]').value;

        if (!name || !phone || person === "Select" || !date || time === "Select") {
            alert('Please fill in all the required fields.');
            return;
        }

        // Prepare message for WhatsApp
        const message = `Name: ${name}%0APhone: ${phone}%0APersons: ${person}%0ADate: ${date}%0ATime: ${time}`;

        // Redirect to WhatsApp with prefilled message
        const whatsappLink = `https://wa.me/+8801712750466?text=${message}`;
        window.location.href = whatsappLink;
    });
});
