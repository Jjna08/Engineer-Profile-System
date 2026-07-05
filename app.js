let engineersData = [
    { id: 1, name: "Ali Hassan", skill: "Frontend", email: "ali@gmail.com", hired: false },
    { id: 2, name: "Sara Ahmed", skill: "Backend", email: "sara@gmail.com", hired: false },
    { id: 3, name: "Omar Youssef", skill: "Full Stack", email: "omar@gmail.com", hired: false },
    { id: 4, name: "Lina Khaled", skill: "AI Engineer", email: "lina@gmail.com", hired: false },
    { id: 5, name: "Mohammed Ali", skill: "DevOps", email: "mohammed@gmail.com", hired: false },
    { id: 6, name: "Huda Nasser", skill: "Data Scientist", email: "huda@gmail.com", hired: false },
    { id: 7, name: "Khaled Sami", skill: "Mobile Dev", email: "khaled@gmail.com", hired: false },
    { id: 8, name: "Noor Taha", skill: "Security", email: "noor@gmail.com", hired: false },
    { id: 9, name: "Yara Said", skill: "Frontend", email: "yara@gmail.com", hired: false },
    { id: 10, name: "Zaid Omar", skill: "Backend", email: "zaid@gmail.com", hired: false },
    
];

document.addEventListener("DOMContentLoaded", () => {
    initData();
    refresh();

    document.getElementById("closePopup").onclick = closePopup;

    document.getElementById("popup").addEventListener("click",closePopup);

    document.getElementById("popupDetails").addEventListener("click",(e) => {
        e.stopPropagation();

    });

    document.getElementById("searchInput").addEventListener("input", (e) => {
        const value = e.target.value.toLowerCase();

        const filtered = getEngineers().filter(e =>
            e.name.toLowerCase().includes(value)
        );

        displayEngineers(filtered);
    });
});


function initData() {
    const data = localStorage.getItem("engineers");

    if (!data) {
        localStorage.setItem("engineers", JSON.stringify(engineersData));
        return;
    }

    try {
        const parsed = JSON.parse(data);

        if (!Array.isArray(parsed) || !parsed.length || !parsed[0].email) {
            localStorage.setItem("engineers", JSON.stringify(engineersData));
        }

    } catch (e) {
        localStorage.setItem("engineers", JSON.stringify(engineersData));
    }
}


function getEngineers() {
    return JSON.parse(localStorage.getItem("engineers")) || engineersData;
}


function getRandom8(data) {
    return [...data]
        .sort(() => Math.random() - 0.5)
        .slice(0, 8)
        .sort((a, b) => a.name.localeCompare(b.name));
}


function displayEngineers(list) {
    const container = document.getElementById("engineersContainer");
    container.innerHTML = "";
   
    if (list.length===0){
        container.innerHTML=`
        <div class="not-found">
        <h2>Not foun</h2>
        <p>No engineer matches your search.</p>
        </div>
        `;
        return;
    }
    list.forEach(e => {
        const card = document.createElement("div");

        const skillMap = {
            "Frontend": "frontend",
            "Backend": "backend",
            "Full Stack": "fullstack",
            "AI Engineer": "ai",
            "DevOps": "devops",
            "Data Scientist": "datascientist",
            "Mobile Dev": "mobile",
            "Security": "security"
        };

        card.className = "card " + (skillMap[e.skill] || "");

        card.innerHTML = `
            <h3>${e.name || "No Name"}</h3>
            <p>${e.skill || "Unknown skill"}</p>
            <p class="${e.hired ? 'hired' : ''}">
                ${e.hired ? "Hired ✔" : "Available"}
            </p>
        `;

        card.onclick = () => openPopup(e.id);
        container.appendChild(card);
    });
}


function openPopup(id) {
    const engineers = getEngineers();
    const engineer = engineers.find(e => e.id === id);

    if (!engineer) return;

    document.getElementById("popupDetails").innerHTML = `
        <h2>${engineer.name}</h2>
        <p>Skill: ${engineer.skill}</p>
        <p>Email: ${engineer.email}</p>
        <p>Status: ${engineer.hired ? "Hired" : "Available"}</p>
        <button onclick="toggleHire(${engineer.id})">
            ${engineer.hired ? "Unhire" : "Hire"}
        </button>
    `;

    document.getElementById("popup").classList.remove("hidden");
}


function toggleHire(id) {
    let engineers = getEngineers();

    engineers = engineers.map(e => {
        if (e.id === id) {

            e.hired = !e.hired;
        }
        return e;
    });

    localStorage.setItem("engineers", JSON.stringify(engineers));

    refresh();
    closePopup();
}


function closePopup() {
    document.getElementById("popup").classList.add("hidden");
}


function clearSearch() {
    document.getElementById("searchInput").value = "";
    refresh();
}


function refresh() {
    displayEngineers(getRandom8(getEngineers()));
}