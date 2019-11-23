function Osoba(jmeno, prijmeni, vaha = 75, vyska = 180, datumNarozeni) {
    this.jmeno = jmeno;
    this.prijmeni = prijmeni;
    this.vaha = vaha;
    this.vyska = vyska;
    this.datumNarozeni = datumNarozeni;

    //  Zadané datum narození
    this.datum = new Date(this.datumNarozeni);

    //  Získání dne narození
    this.den = this.datum.getDate();

    //  Získání měsíce narození
    this.mesic = this.datum.getMonth() + 1;

    //  Získání roku narození
    this.rok = this.datum.getFullYear();


    //  Dnešní datum
    this.today = new Date();

    //  Aktuální den
    this.d = this.today.getDate();

    //  Aktuální měsíc
    this.m = this.today.getMonth() + 1;

    //  Aktuální rok
    this.y = this.today.getFullYear();



    this.celeJmeno = function() {
        return `${this.jmeno} ${this.prijmeni}`;
    }

    this.bmi = function() {
        return (this.vaha/((this.vyska/100)**2)).toFixed(2);
    }

    this.narozeni = function() {
        if (this.today > this.datum)
            return `${this.den}. ${this.mesic}. ${this.rok}`;
        else {
            return '--. --. ----';
        }
    }

    this.vek = function() {
        let age = this.y - this.rok;
        if(this.m < this.mesic || (this.m == this.mesic && this.d < this.den))
            age--;
        if (age >= 0)
            return age;
        else {
            age = '---';
            return age;
        }
    }

    this.vizitka = function() {
        return `<h3>${this.celeJmeno()}</h3>
                <p>Váha: <b>${this.vaha} kg</b></p>
                <p>Výška: <b>${this.vyska} cm</b></p>
                <p>BMI: <b>${this.bmi()}</b></p>
                <p>Datum narození: <b>${this.narozeni()}</b></p>
                <p>Věk: <b>${this.vek()} roku/let</b></p>`;
    }
}

const jmeno = document.getElementById('jmeno');
const prijmeni = document.getElementById('prijmeni');
const vyska = document.getElementById('vyska');
const vaha = document.getElementById('vaha');
const potvrdit = document.getElementById('potvrdit');
const novy = document.getElementById('novy');
const smazat = document.getElementById('smazat');
const seznam = document.getElementById('seznam');
const vizitka = document.getElementById('vizitka');
const datumNarozeni = document.getElementById('datumNarozeni');


//  Prazdny objekt
//  Objekt k uložení jedné osoby
let osoba = {};

//  Osoby - pole objektů
let osoby = [];

//  Rozhoduje o možnosti editace
let editace = false;


function reset() {
    jmeno.value = '';
    prijmeni.value = '';
    vaha.value = 75;
    vyska.value = 180;
    editace = false;
    vizitka.innerHTML = '';
    datumNarozeni.value = 'dd.mm.yyyy';
}

//  Akce při stisku Potvrdit
potvrdit.addEventListener('click', ()=>{
    osoba = new Osoba(jmeno.value, prijmeni.value, vaha.value, vyska.value, datumNarozeni.value);
    if (!editace) {
        //  Přidání nové osoby
        osoby.push(osoba);
        let option = document.createElement('option');
        option.text = osoba.celeJmeno();
        seznam.add(option);
        editace = true;
        seznam.selectedIndex = osoba.celeJmeno();
    }
    else {
        //  Editace staré
        osoby[seznam.selectedIndex] = osoba;
        seznam.getElementsByTagName('option')[seznam.selectedIndex].text = osoba.celeJmeno();
    }
    vizitka.innerHTML = osoba.vizitka();
    console.log(osoby);
    //console.log(datumNarozeni.value);
});

smazat.addEventListener('click', ()=>{
    osoby.splice(seznam.selectedIndex, 1);
    seznam.remove(seznam.selectedIndex);
    reset();
    console.log(osoby);
});

novy.addEventListener('click', ()=>{
    reset();
});

seznam.addEventListener('click', ()=>{
    osoba = osoby[seznam.selectedIndex];
    vizitka.innerHTML = osoba.vizitka();
    jmeno.value = osoba.jmeno;
    prijmeni.value = osoba.prijmeni;
    vaha.value = osoba.vaha;
    vyska.value = osoba.vyska;
    datumNarozeni.value = osoba.datumNarozeni;
    editace = true;
});