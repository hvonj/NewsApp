console.log("Moi Mukulat!");


async function clickSeed() {

    let response = await fetch("api/news/seed", { method: "POST" });

    if (response.status === 204) {

        console.log("Seed done");

    } else {
        console.log("Not done")
    }
}

async function clickShowAllNews() {

    var w = document.getElementById("newsList");

    if (w.style.display === "none") {
        w.style.display = "block";

        let response = await fetch("api/news", { method: "GET" }); //Represents the response to a request

        if (response.status === 200) {

            let allNews = await response.json();
            console.log("allNews", allNews);

            let html = "";

            for (let n of allNews) {
                html += `<p>Id: ${n.id} Rubrik: ${n.header}</p>`;
            }
            document.getElementById("newsList").innerHTML = html;

        } else {
            console.error("Unexpected error", response);

        }
    }

    else {
        w.style.display = "none"
    }
}
async function clickStatArea() {

    var y = document.getElementById("statArea");

    if (y.style.display === "none") {
        y.style.display = "block";

        let resp = await fetch("api/news", { method: "GET" });
        let allNews = await resp.json();
        let numberofnews = allNews.length;

        document.getElementById("nrOfNews").innerText = ` ${numberofnews}`
    }
    else {
        y.style.display = "none";
    }
}

async function clickShowAddNews() {
    getCategories();

    var x = document.getElementById("addArea");

    if (x.style.display === "none") {
        x.style.display = "block";
    }
    else {
        x.style.display = "none";
    }
}

async function clickShowUpdate() {
    var z = document.getElementById("updateArea");

    if (z.style.display === "none") {
        z.style.display = "block";
    }
    else {
        z.style.display = "none";
    }

}

async function clickAddNews() {

    var j = document.getElementById("addArea");

    let x = document.getElementById("addAreaHeader").value;
    let value = document.getElementById("addAreaCategory").value;

    let intro = document.getElementById("addAreaIntro").value;
    let body = document.getElementById("addAreaBody").value;


    let response = await fetch("api/News", {
        method: "POST",
        body: JSON.stringify(
            {
                header: x,
                intro: intro,
                body: body,
                category: {
                    id: value
                }
            }),
        headers: {
            "Content-Type": "application/json"
        }
    });
}

async function getCategories() {

    let cats = await fetch("api/categories", { method: "GET" })
    let cats2 = await cats.json();

    let addAreaCategory = document.getElementById("addAreaCategory");
    let hej = "";

    for (let cat of cats2) {

        hej += `<option value="${cat.id}">${cat.name}</option>`;
    }

    addAreaCategory.innerHTML = hej;
}