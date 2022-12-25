let redditsearch = {
    api_key : "AIzaSyAtfq_gwRicOPODzk80kNcRuzVv3govv",
    cx : "e4d7867e22b0942fe",
    first_search : true,
    fetchResults: function (query) {
        fetch(
            "https://www.googleapis.com/customsearch/v1?key=" + this.api_key + "-U&cx=" + this.cx + "&q=" + query
        ).then((response) => response.json()).then((data) => this.displayResults(data))
    },
    displayResults: function (data) {
        const grid_layout = document.querySelector(".grid-layout");
        for (let item in data.items) {
            let element = document.createElement("div");
            element.classList.add('grid-item');
            
            let item_title = document.createElement("h3");
            item_title.innerText = data.items[item].title;

            let item_link = document.createElement("a");
            item_link.href = data.items[item].link;
            item_link.innerText = "Link";
            
            let item_snippet = document.createElement("p");
            item_snippet.innerText = data.items[item].snippet;
            if (this.first_search) {
                element.appendChild(item_title);
                element.appendChild(item_link);
                element.appendChild(item_snippet); // fetch from reddit json
                document.querySelector(".grid-layout").appendChild(element);
            } else {
                const old_element = document.querySelector(".grid-layout").children;

                console.log(old_element[Number(item)]);
                //element.replaceChild(item_title, old_element.childNodes[0]);
                //element.replaceChild(item_link, old_element.childNodes[1]);
                //element.replaceChild(item_snippet, old_element.childNodes[2]);


            }
        }
        this.first_search = false; 
    },
    search: function () {
        let query = document.querySelector(".search-bar").value;
        this.fetchResults(query);
    },
};

document.querySelector(".search-button").addEventListener("click", function () {
    redditsearch.search();
});