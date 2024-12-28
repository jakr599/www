class Gamba {
    #database
    constructor(db) {
        this.#database = db;
    }

    #icons = ["x", "y", "z"];

    async spinWheel(bet){
        //let bet = 25;
        let bal = await this.#database.getBalance();
        //console.log(bal);
        
        if (bet <= bal) {
            await this.#database.editBalance(bet);
            const div1 = document.getElementById("1");
            const div2 = document.getElementById("2");
            const div3 = document.getElementById("3");
            div1.innerHTML = "";
            div2.innerHTML = "";
            div3.innerHTML = "";

            let s1 = this.#icons[Math.floor(Math.random() * this.#icons.length)];
            let s2 = this.#icons[Math.floor(Math.random() * this.#icons.length)];
            let s3 = this.#icons[Math.floor(Math.random() * this.#icons.length)];

            const img1 = document.createElement('img');
            img1.src = `img/${s1}Sign.png`;
            img1.style.width = "200px";
            img1.style.height = "200px";

            const img2 = document.createElement('img');
            img2.src = `img/${s2}Sign.png`;
            img2.style.width = "200px";
            img2.style.height = "200px";

            const img3 = document.createElement('img');
            img3.src = `img/${s3}Sign.png`;
            img3.style.width = "200px";
            img3.style.height = "200px";

            div1.appendChild(img1);
            div2.appendChild(img2);
            div3.appendChild(img3);

            /*div1.innerHTML = s1;
            div2.innerHTML = s2;
            div3.innerHTML = s3;*/

            if (s1 === s2 && s2 === s3) {
                await this.#database.editBalance(-(bet*10));
                //console.log(this.#database.getBalance());
            }
        }
        else {
            alert("Not Enough Coins To Spin the Wheel");
            if (bet <= 25){
                await this.#database.editBalance(-200);
                alert("Awarded Comeback Coins");
            }
        }
    }
}