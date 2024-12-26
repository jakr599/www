class Database {
    #db;
    #ver = 1;
    #dbName = 'mycollection';
    #osMons = "animals";
    #osCoins = "coins";
    #dbRequest;

    mycollection = [];

    constructor() {
        this.#dbRequest = indexedDB.open(this.#dbName, this.#ver);
        
        this.#dbRequest.onsuccess = (event) => this.onsuccess(event);
        this.#dbRequest.onupgradeneeded = (ev) => this.onupgradeneeded(ev);
        this.#dbRequest.onerror = function(event) {
            console.log("Something went wrong: ", event.target);
        };
    }

    onupgradeneeded(ev){
        console.log("Upgrade Needed");
        this.#db = ev.target.result;
        
        switch(ev.oldVersion) {
            case 0:
                const osSt = this.#db.createObjectStore(this.#osMons, 
                    {keyPath: "id", autoIncrement: true}
                );
                osSt.createIndex("nameIndex", "name");
                const osCo = this.#db.createObjectStore(this.#osCoins, 
                    {keyPath: "id", autoIncrement: false}
                );
                osCo.createIndex("valueIndex", "value");
        }
    }

    onsuccess(ev) {
        console.log("Database opened");
        this.#db = ev.target.result;
        this.#db.onerror = function(ev) {
            console.log("Database error: ", ev.target.errorCode);
        };  
        this.#dbReady = true;
        this.initBalance();
    }

    #dbReady = false;
    checkIfDBReady() {
        return new Promise((resolve, reject) => {
            if (this.#dbReady) {
                resolve(this.#db);
            } 
            else {
                const interval = setInterval(() => {
                    if (this.#dbReady) {
                        clearInterval(interval);
                        resolve(this.#db);
                    }
                }, 100);
            }
        });
    }

    insertAnimal(name){
        const trans = this.#db.transaction(this.#osMons, "readwrite");
        trans.oncomplete = (e) => {
            console.log("Transaction Done");
            this.printAnimals();
        }
        trans.onerror = (e) => {
            console.log("ne: " + e.target.errorCode);
        }

        const osSt = trans.objectStore(this.#osMons);
        osSt.add({mon_name: name});
    }

    printAnimals(){
        let data = [];
        const trans = this.#db.transaction(this.#osMons, "readonly");
        trans.oncomplete = (e) => {
            console.log("Transaction Done", data);
            this.printHTMLAnimalCollection(data);
        }
        trans.onerror = (e) => {
            console.log("Error Reading: " + e.target.errorCode);
        }

        const osSt = trans.objectStore(this.#osMons);

        osSt.openCursor().onsuccess = (ev) => {
            let curs = ev.target.result;
            if (curs) {
                data.push(curs.value);

                curs.continue();
            }
            else {
                console.log("Finished reading");
            }
        }
    }

    printHTMLAnimalCollection(data){
        const tbody = document.getElementById("mon-list");
        tbody.innerHTML = "";
        for (let r of data){
            let div = document.createElement("div");
            const img = document.createElement('img');
            const par = document.createElement('p');

            img.src = `img/${r.mon_name}.png`;
            img.style.width = "200px";
            img.style.height = "300px";

            par.innerHTML = r.mon_name;
            div.style.textAlign = "center";

            div.appendChild(img);
            div.appendChild(par);
            tbody.appendChild(div);
        }
    }

    async getAnimals() {
        return new Promise((resolve, reject) => {
            const trans = this.#db.transaction(this.#osMons, 'readonly');
            const osSt = trans.objectStore(this.#osMons);
            const request = osSt.getAll();

            request.onsuccess = () => {
                resolve(request.result);
            };
    
            request.onerror = (event) => {
                reject(event.target.error);
            };
        });
    }

    async initBalance() {
        const trans = this.#db.transaction(this.#osCoins, "readwrite");
        trans.oncomplete = (e) => {
            console.log("Balance Init Done");
        }
        trans.onerror = (e) => {
            console.log("Init Error: " + e.target.errorCode);
        }

        const osSt = trans.objectStore(this.#osCoins);
        osSt.add({id: 1, value: "200"});
    }

    async getBalance() {
        await this.checkIfDBReady();
        return new Promise((resolve, reject) => {
            const trans = this.#db.transaction(this.#osCoins, "readonly");
            const osPr = trans.objectStore(this.#osCoins);
            const request = osPr.get(1);

            request.onsuccess = (ev) => {
                console.log(request.result.value);
                resolve(request.result ? request.result.value : null);
            };

            request.onerror = (event) => {
                reject(event.target.error);
            };
        });
    } 

    async editBalance(changeValue) {
        try {
            let currentValue = await this.getBalance();
            if (currentValue === null) {
                console.log("Balance not found");
                return;
            }

            let newValue = parseInt(currentValue) - changeValue;

            const trans = this.#db.transaction(this.#osCoins, "readwrite");
            trans.oncomplete = (e) => {
                console.log("Editing Balance Done");
            }
            trans.onerror = (e) => {
                console.log("Editing Balance Error: " + e.target.errorCode);
            }

            const osSt = trans.objectStore(this.#osCoins);
            osSt.put({id: 1, value: newValue});

        } catch (error) {
            console.log("Error updating balance:", error);
        }

        const spanBal = document.getElementById('balance-span');
        spanBal.innerHTML = "Balance: " + await this.getBalance();
    }


}