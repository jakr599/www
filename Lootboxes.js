class LootBoxes {
    #database;

    #nameList = [
        "Lion",
        "Tiger",
        "Elephant",
        "Giraffe",
        "Zebra",
        "Kangaroo",
        "Panda",
        "Penguin",
        "Koala",
        "Cheetah",
        "Leopard",
        "Rhinoceros",
        "Hippopotamus",
        "Bear",
        "Wolf",
        "Fox",
        "Deer",
        "Monkey",
        "Crocodile",
        "Dolphin"
      ];
    #imgList = [
        "img/lion.png",
        "img/tiger.png",
        "img/elephant.png",
        "img/giraffe.png",
        "img/zebra.png",
        "img/kangaroo.png",
        "img/panda.png",
        "img/penguin.png",
        "img/koala.png",
        "img/cheetah.png",
        "img/leopard.png",
        "img/rhinoceros.png",
        "img/hippopotamus.png",
        "img/bear.png",
        "img/wolf.png",
        "img/fox.png",
        "img/deer.png",
        "img/monkey.png",
        "img/crocodile.png",
        "img/dolphin.png"
      ];

    constructor (db) {
      this.#database = db;
    }

    async drawLootbox() {
      const price = 50;
      if (price <= await this.#database.getBalance()) {
        const drawnMon = this.#nameList[Math.floor(Math.random() * this.#nameList.length)];
        console.log(drawnMon);
        await this.#database.editBalance(price);
    
        try {
            const data = await this.#database.getAnimals();
            console.log(data);
    
            let isAlreadyOwned = false;
    
            for (let r of data) {
              //console.log(r.mon_name);
                if (r.mon_name == drawnMon) {
                    console.log("Already Owned");
                    isAlreadyOwned = true;
                    await this.#database.editBalance(price/2);
                    alert("You drew " + drawnMon + " you already own. Refunded 50%.");
                    break;
                }
            }
    
            if (!isAlreadyOwned) {
                await this.#database.insertAnimal(drawnMon);
                console.log("New animal added:", drawnMon);
                alert("You drew " + drawnMon);
                //console.log(this.#database.getBalance());
            }
        } catch (error) {
            console.log("Error getting animals:", error);
        }
    }
    else {
      alert("Not Enough Coins To Purchase a Lootbox");
    }
  }
}