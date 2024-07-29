/*  2024.07.24

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
    // már eleve a függvényben bizonyos objektumokat veszünk csak át(name, species, status, image)

    2024.07.26

fetch címéből kiindulva szerezhetünk máshonnan új adatokat, az api kulcsban benne van, hogy honnan szerezhetünk további adatokat
lapozhatóvá tesszük az oldalt
nextbuttoncomponent kap majd egy urlt és ráklikkelve kiírja nekünk az adatot, hogy mit kell tárcsázni a megnyitáshoz
dom manipulálás után tudjuk rárakni az esemény figyelőt
rootelement kiegészítése a nextbuttoncomponenttel(fetchen belül a makedomfromdata függvény meghívása után), majd megadjuk a feladatát a querryselector függvénnyel
  nextbuttonelement-tel létrehozunk egy gombot és adunk neki egy esemény figyelőt
  a data elérhető a makedomfromdata függvényben
újabb fetch a data.info.next alapján és a .then metódussal ugyanazt csináljuk mint az első fetch esetén csak a következő oldallal és newData néven hivatkozunk rá
  körforgást szeretnénk létrehozni, így a meglévő adatot ki kell cserélni az új adatra
  majd a newnextbuttonelement-tel újra megcsináljuk ezt
  de ez nagyon sok callback függvénnyel jár, szóval nagyon macerás állandóan megírni
  1 fetch és 1 makedomfromdata függvény a megoldás és a makedomfromdata majd önmagát futtatja, csak akkor futtatja le magát, ha megtörténik a click esemény
    nem csak a domot hozza létre hanem hozzállieszti az esemény figyelőt is
    nextbuttonelement létrehozása és esemény figyelő rárakása a makedomfromdate függvényben, majd fetcheli a data.info.next oldalt és .json metodussal kicsomagolja
    a függvény önmagán belül van meghívva, így fontos, hogy ne legyen végetelenítve a függvény és addig futtassa magát, amíg nem teljesül valamilyen feltétel

 előző oldal gomb készítése
      olyan szelektorok kellenek, amik csak arra a bizonyos gombra vonatkoznak
      prevbutton element létrehozása, majd eseménfigyelő rárakása
      utána fetch json metódus és makedomfromdata függvény meghívása
      prev gomb eltűntetése, if függvény, ha a prev eredménye nem egyenlő 0-val, akkor tegye be a gombot
      illetve, ha data.info.prev nem egyenlő nullával, akkor nem futtatja le a kódot
      ugyanezt meg tudjuk csinálni, hogy az utolsó oldal után nem szeretnénk előre lapozni

    most van két változónk, nagyjából ugyanazt csinálja, ilyenkor jön a loop
    makedomfromdatában mindig ott van az adat
      if-el betesszük a két gombot, amiken ugyanaz az esemény figyelő van csak máshonnan szerzi az urlt
      buttons deklarálása és az összes gomb kiválasztása, majd foreach segítségével veszi az egyik gombot és lefuttatja az esemény figyelőt
      objectből js expression kinyeréséhez bracket notation kell
      utána fetch majd .then, json és a makedomfromdata meghívása
*/
const characterCard = ({ name, species, status, image }) => {
  return ` <div class="card"> 
    <h2>${name}</h2>
    <h3 class="species">${species}</h3>
    <h4>${status}</h4>
    <img src=${image} />
  </div> `;
}

const charactersComponent = (charactersData) => `
  <div class="characters">
    ${charactersData.map(characterData => characterCard(characterData)).join("")}
  </div>
`;

const buttonComponent = (type) => `
  <button class=${type}>${type}</button>
`;

const makeDomFromData = (data, rootElement) => {
  rootElement.innerHTML = "";

  console.log(data);
  if (data.info.next) rootElement.insertAdjacentHTML("beforeend", buttonComponent("next"));
  if (data.info.prev) rootElement.insertAdjacentHTML("beforeend", buttonComponent("prev"));

  const buttons = document.querySelectorAll("button");
  buttons.forEach(button => button.addEventListener("click", () => fetch(data.info[button.classList[0]])
    .then(res => res.json())
    .then(newData => makeDomFromData(newData, rootElement))
  ));
  
  /* if (data.info.next) {
    
    const nextButtonElement = document.querySelector("button.next");
    nextButtonElement.addEventListener("click", () => {
      fetch(data.info.next)
      .then(res => res.json())
      .then(newData => makeDomFromData(newData, rootElement))
    });
  }


  if (data.info.prev) {
    
    const prevButtonElement = document.querySelector("button.prev");
    prevButtonElement.addEventListener("click", () => {
      fetch(data.info.prev)
      .then(res => res.json())
      .then(newData => makeDomFromData(newData, rootElement))
    });
  } */

  rootElement.insertAdjacentHTML("beforeend", charactersComponent(data.results));
};

fetch("https://rickandmortyapi.com/api/character")
  .then((response) => response.json())
  .then((data) => makeDomFromData(data, document.querySelector("#root")));