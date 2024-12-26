const DB = new Database();
const LB = new LootBoxes(DB);
const gamba = new Gamba(DB);

DB.getBalance()
    .then(bal => {
        document.getElementById('balance-span').innerHTML = "Balance: " + bal;
    })
    .catch(error => {
        console.log("Error getting balance:", error);
    });

//DB.getBalance();

/*function readyAnimal(){
    let inputName = document.getElementById("mon-name");
    const name = inputName.value;
    DB.insertAnimal(name);
    inputName.value = "";
}*/

function displayAnimals(){
    let div_button = document.getElementById("mycollection");
    let displayStyle = window.getComputedStyle(div_button).display;
    console.log(displayStyle);

    document.getElementById("lootboxes").style.display = "none";
    document.getElementById("about").style.display = "none";

    if (displayStyle == "none"){
        div_button.style.display = "block";
        DB.printAnimals();
    }
    else {
        div_button.style.display = "none";
    }
}

function displayLootboxes(){
    let div_button = document.getElementById("lootboxes");
    let displayStyle = window.getComputedStyle(div_button).display;
    console.log(displayStyle);

    document.getElementById("about").style.display = "none";
    document.getElementById("mycollection").style.display = "none";

    if (displayStyle == "none"){
        div_button.style.display = "block";
    }
    else {
        div_button.style.display = "none";
    }
}

function displayAbout(){
    let div_button = document.getElementById("about");
    let displayStyle = window.getComputedStyle(div_button).display;
    console.log(displayStyle);

    document.getElementById("lootboxes").style.display = "none";
    document.getElementById("mycollection").style.display = "none";

    if (displayStyle == "none"){
        div_button.style.display = "block";
    }
    else {
        div_button.style.display = "none";
    }
}

function buyLootbox(){
    LB.drawLootbox();
}

function playGame(){
    gamba.spinWheel();
}