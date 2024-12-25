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
        "lion.png",
        "tiger.png",
        "elephant.png",
        "giraffe.png",
        "zebra.png",
        "kangaroo.png",
        "panda.png",
        "penguin.png",
        "koala.png",
        "cheetah.png",
        "leopard.png",
        "rhinoceros.png",
        "hippopotamus.png",
        "bear.png",
        "wolf.png",
        "fox.png",
        "deer.png",
        "monkey.png",
        "crocodile.png",
        "dolphin.png"
      ];

    constructor (db) {
      this.#database = db;
    }

    async drawLootbox() {
      const drawnMon = this.#nameList[Math.floor(Math.random() * this.#nameList.length)];
      console.log(drawnMon);
  
      try {
          const data = await this.#database.getAnimals();
          console.log(data);
  
          let isAlreadyOwned = false;
  
          for (let r of data) {
            //console.log(r.mon_name);
              if (r.mon_name == drawnMon) {
                  console.log("Already Owned");
                  isAlreadyOwned = true;
                  break;
              }
          }
  
          if (!isAlreadyOwned) {
              await this.#database.insertAnimal(drawnMon);
              await this.#database.editBalance(1);
              console.log("New animal added:", drawnMon);
              console.log(this.#database.getBalance());
          }
      } catch (error) {
          console.error("Error getting animals:", error);
      }
  }
}