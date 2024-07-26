// fetchelem az adatot .then metódussal, így elkerülöm az await szócskákat
// promise a fetch visszatérési értéke, mert async. -> abban a pillanatban, amint a fecth lefut, nem tudja, hogy milyen értékkel fog visszatérni
//.then lefuttat egy callback függvényt, az értéke visszatér a promiseból, a .then akkor fut le, amikor megkapta a response-t.
//return response.json lefutása után a .then metódus ujboli lefutásával egy láncolat indul el
//akkor fusson le a következő .then metódus

// asyn, await helyett callback fügvényekkel jelenítjük meg az adatokat
// data ponton lesz elérhető a valódi válasz a szervertől és itt végezzük majd a dom manipulációt
// nem kell külön függvény, hanem a globális térben történik a futása
//data.results.forEach() metódussal a karaktereket futtatjuk le
// queryselector root-al megkeresem az adatot a html-ből -> html-ben létre kell hozni a root elementet
// insertadjacenthtml-el elhelyezem az adatot, ami nyit egy divet, elnevezi és megadom honnan szerezze az adatot

// kód elején characterCard komponens létrehozása, ami visszatér egy stringgel, legkisebb komponensel érdemes indulni
    // melynek a paramétere visszaadja, amit akarunk értéknek
// érdemes arra törekedni, hogy a lehető legkevesebbszer futtassunk le dom manipulációt
    // amikor elkészült az összes komponens, akkor futtassa le
// characterscomponent függvény, charactersdata paramétert kap, mert az összes karaktert megkapja 
    // és összegyűjti egy div elembe az összes elkészült charactercardot
    //az egész array-en lefutatja a map metódust, egyes számban mert egy elemet fog megkapni a tömbből és készit egy charactercardot
    // ezzel egy egész tömböt illesztünk be a weboldalba, a map vége után a join metódussal stringgé alakítjuk at ömböt
// utolsó komponent elvégzi a dom manipulációt
    //a rootelementtel lefutattja az insertadjacenthtml metódust és továbbadja a legnagyobb komponensnek
    //lefuttatjuk a függvényt


// destructuring

// érdemes az elején kimenteni az adathalmazok különböző részeit, így nem kell annyi karaktert legépelni
    // a létező kulcsokat tudjuk kimenteni a memóriába
    // már eleve a függvényben bizonyos objektumokat veszünk csak át


        const characterCard = ({ name, species, status, image }) => {
        // console.log(characterData);
      
        /* const name = characterData.name;
        const species = characterData.species;
        const status = characterData.status;
        const image = characterData.image; */
      
        // const { name, species, status, image } = characterData;
      
        return ` <div class="card"> 
          <h2>${name}</h2>
          <h3 class="species">${species}</h3>
          <h3>kismacska</h3>
          <h4>${status}</h4>
          <img src=${image} />
        </div> `;
      }
      
      const charactersComponent = (charactersData) => `
        <div class="characters">
          ${charactersData.map(characterData => characterCard(characterData)).join("")}
        </div>
      `;
      
      const makeDomFromData = (data, rootElement) => {
        rootElement.insertAdjacentHTML("beforeend", charactersComponent(data.results));
      };
      
      fetch("https://rickandmortyapi.com/api/character")
        .then((response) => response.json())
        .then((data) => {
          console.log(data); // itt lesz elérhető az adat
      
          makeDomFromData(data, document.querySelector("#root"));
          /* data.results.forEach((characterData) => {
            document.querySelector('#root').insertAdjacentHTML("beforeend", characterCard(characterData));
            console.log("dom manipulation");
          }) */
      
          /* document.querySelector("#root").insertAdjacentHTML("beforeend", charactersComponent(data.results));
          console.log("dom manipulation"); */
      
        })