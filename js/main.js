// بسم الله الرحمن الرحيم



/* ---- Var Declartions --- */

var nameval = document.getElementById('name');
var url = document.getElementById('url');
var note = document.getElementById('note');
var submit = document.getElementById('submit')
var updatebtn = document.getElementById('update')

var table = document.querySelector(".table")
var arrStor;

var tybOfSearch = document.getElementById("inputState")

var h3 = document.getElementById('h3')

/* ---- Var Declartions --- */




if (localStorage.getItem("myStorage") == null) {// for avoid eror cuz of null of array wheen is imptey
    arrStor = [];
} else {
    arrStor = JSON.parse(localStorage.getItem("myStorage"));
    show();
}

/* ------ Validation ------ */

var valedName = /^[A-Za-z0-9\." "]{2,25}$/
var valedEmail = /^[./:A-Za-z0-9]+(\.com|\.net|\.eg)(.)?$/
var valedNote = /^[A-Za-z0-9.]{3,15}$/

/* ------ Validation ------ */


function add() {// submit function for button

    var valN = nameval.value;
    var valU = url.value;
    var valNot = note.value;
    var doit = false


    if (valN != "" || valU != "" || valedEmail.test(url.value) || valedName.test(nameval.value)) {
        for (let i = 0; i < arrStor.length; i++) {
            if (arrStor[i].site == valN || arrStor[i].url == valU) {
                doit = true
                if (arrStor[i].site == valN) {

                    alert("this 'SITE NAME' is oredy exist")

                } if (arrStor[i].url == valU) {

                    alert("this 'URL' is oredy exist")

                }

                /* ---- For End Of Loop --- */
                i = arrStor.length
                /* ---- For End Of Loop --- */
            }
        }
        if (!doit) {

            pushing(valN, valU, valNot)
        }

        submit.removeAttribute("data-target", "#exampleModal")

    } else {

        submit.setAttribute("data-target", "#exampleModal")

    }
    /* ----- Display Array ---- */

    show()

    /* ----- Display Array ---- */

    /* ------ Reset Input ----- */

    clear()

    /* ------ Reset Input ----- */
    document.querySelector(".InameName").classList.remove('green')
    document.querySelector(".InameU").classList.remove('green')
    document.querySelector(".InameNote").classList.remove('green')

    // console.log(arrStor);
}

function pushing(v1, v2, v3) {
    (v2);
    arrStor.push({
        site: v1,
        url: v2,
        note: v3,
    })
}

function clear() { //reset input
    nameval.value = '';
    url.value = '';
    note.value = '';
    sersh.value = '';
}


function show() { //display array

    var newarr = ``

    for (let i = 0; i < arrStor.length; i++) {
        if (!arrStor[i].url.includes("https://")) {
            //lazm ngm3 kol el data l2n htt3red mra wa7da fe el refresh
            newarr += JSOND(arrStor[i].site, arrStor[i].note, "https://" + arrStor[i].url, i, i)
        } else {
            newarr += JSOND(arrStor[i].site, arrStor[i].note, arrStor[i].url, i, i)
        }
    }

    document.getElementById("lenghtOfIndex").textContent = '# ' + arrStor.length
    table.innerHTML = newarr

    localStorage.setItem("myStorage", JSON.stringify(arrStor))
}

var avelIndex;
/* ---- Updat Function ---- */

function update(index) {
    retrnVla(index)
    avelIndex = index;

    submit.onclick = btnubdate
    document.querySelector("html").scrollTop = 10
}


function retrnVla(index) {// retern value to input to mak update
    nameval.value = arrStor[index].site;
    url.value = arrStor[index].url
    note.value = arrStor[index].note

}

function btnubdate() {
    arrStor[avelIndex].site = nameval.value
    arrStor[avelIndex].url = url.value
    arrStor[avelIndex].note = note.value
    show()
    avelIndex = null
        .log(arrStor);
    submit.onclick = add;
    clear()
}


var btnmode = document.getElementById("deletbton")

/* ---- Delet Function ---- */

function delet(index) {

    function doIt() {
        arrStor.splice(index, 1)
        show()

    }

    btnmode.onclick = doIt
}


function deletall(index) {
    if (confirm("you will delet evrey think")) {

        arrStor.splice(index, arrStor.length)
        show()

    }

}
document.getElementById("deletall").onclick = deletall

function search(val) {

    tybeOfSearchf = () => {
        var i;
        i = tybOfSearch.selectedIndex
        var arr = ``;
        var TorF;
        if (i == 0) {
            for (let i = 0; i < arrStor.length; i++) {

                arrStor[i]["indexr"] = i
                if (arrStor[i].site.includes(val)) {
                    arr += JSOND(arrStor[i].site, arrStor[i].note, arrStor[i].url, i, i)
                    TorF = true
                }
            }

        } else {
            for (let i = 0; i < arrStor.length; i++) {
                arrStor[i]["indexr"] = i
                if (arrStor[i].url.includes(val)) {
                    arr += JSOND(arrStor[i].site, arrStor[i].note, arrStor[i].url, i, i)
                }

            }

        }

        if (TorF) {

            table.innerHTML = arr
        } else {

            table.innerHTML = `<h2 class="text-center red"> Element is not exist !! </h2>`

        }
    }


    tybOfSearch.onchange = tybeOfSearchf()

}

var sersh = document.getElementById("sersh")

nameval.onkeyup = function () {
    if (valedName.test(nameval.value)) { // not site user
        document.querySelector(".InameName").classList.add('green')
    } else {
        document.querySelector(".InameName").classList.remove('green')
    }
};
nameval.onblur = function () {
    if (!valedName.test(nameval.value)) { // not site user
        document.getElementById("nameHelp").textContent = "Sorry, only letters (a-z) , numbers (0-9) not less thna (2), and periods (.) are allowed .";
        document.getElementById("nameHelp").classList.add('red')
        document.querySelector(".InameName").classList.remove('green')
    } else {
        document.getElementById("nameHelp").textContent = "";

    }
};

url.onkeyup = function () {
    if (valedEmail.test(url.value)) { // not site user
        document.querySelector(".InameU").classList.add('green')
    } else {
        document.querySelector(".InameU").classList.remove('green')
    }

};

url.onblur = function () {
    if (!valedEmail.test(url.value)) { // not site email
        document.getElementById("urlHelp").textContent = "Sorry,enter URL and should end with (.com .net .eg ...) .";
        document.getElementById("urlHelp").classList.add('red')
        document.querySelector(".InameU").classList.remove('green')
    } else {

        document.getElementById("urlHelp").textContent = "";
    }
};

note.onkeyup = function () {
    if (valedNote.test(note.value)) { // not site user
        document.querySelector(".InameNote").classList.add('green')
    } else {
        document.querySelector(".InameNote").classList.remove('green')
    }
};

note.onblur = function () {
    if (!valedNote.test(note.value)) { // Note
        document.getElementById("noteHelp").textContent = "Prefer Add Note Not Less Than (3) Not More Than (25)";
        document.getElementById("noteHelp").classList.add('green')
        document.querySelector(".InameNote").classList.remove('green')
    } else {
        document.getElementById("noteHelp").textContent = "";
    }
};

function JSOND(h3, h5, a, update, delet) {
    return `<div class="row m-4 row0f">
        <div class="w-100 col-8">
        <div class="row align-items-lg-baseline">  
        <h4 class="col-6" >${h3}</h4>
        <h6 class="col-6 ">${h5}</h6>
        </div>
        </div>
        <div class="w-100 col-4">
        <a href="${a}" id="linkurl" target="_blank" class="eye" ><abbr title="${a}"><i class="far fa-eye "></i></abbr></a> 
        <button onclick="update(${update})"  title="Edit"type="button" class="edit"><i class="far fa-edit "></i></button>
        <button onclick="delet(${delet})" data-toggle="modal" data-target="#exampleModal2" title="Delet" type="button" class="trash"><i class="fas fa-trash "></i></button>
        </div>
        </div>`
}

submit.onclick = add;
