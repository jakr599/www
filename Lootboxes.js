class LootBoxes {
    #database;

    #nameList = [
        "Lion",//
        "Tiger",//
        "Elephant",//
        "Giraffe",//
        "Zebra",//
        "Kangaroo",//
        "Panda",//
        "Penguin",//
        "Koala",//
        "Cheetah",//
        "Leopard",//
        "Rhinoceros",//
        "Hippopotamus",//
        "Bear",//
        "Wolf",//
        "Fox",//
        "Deer",//
        "Monkey",//
        "Crocodile",//
        "Dolphin"//
      ];

    constructor (db) {
      this.#database = db;
    }

    async drawLootbox(price) {
      //const price = 50;
      if (price <= await this.#database.getBalance()) {
        await this.#database.editBalance(price);

        let countOfMons;
        switch(price){
          case 100:
            countOfMons = 1;
            break;
          case 185:
            countOfMons = 2;
            break;
          case 285:
            countOfMons = 3;
            break;
          case 375:
            countOfMons = 4;
            break;
        }
        
        for (let i = 0; i < countOfMons; i++){
          try {
            const drawnMon = this.#nameList[Math.floor(Math.random() * this.#nameList.length)];
            //console.log(drawnMon);
            const data = await this.#database.getAnimals();
            //console.log(data);
      
            let isAlreadyOwned = false;
      
            for (let r of data) {
              //console.log(r.mon_name);
              if (r.mon_name == drawnMon) {
                //console.log("Already Owned");
                isAlreadyOwned = true;
                await this.#database.editBalance(-(price/countOfMons/2));
                alert("You drew " + drawnMon + " you already own. Refunded some cost.");
                break;
              }
            }
      
            if (!isAlreadyOwned) {
              await this.#database.insertAnimal(drawnMon);
              //console.log("New animal added:", drawnMon);
              alert("You drew " + drawnMon);
              //console.log(this.#database.getBalance());
            }
          } 
          catch (error) {
            console.log("Error getting animals:", error);
          }
      }
  }
    else {
      alert("Not Enough Coins To Purchase a Lootbox");
    }
  }
}