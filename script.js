//  "https://www.googleapis.com/customsearch/v1?key=" + this.api_key + "-U&cx=" + this.cx + "&q=" + query

let redditsearch = {
    api_key: "AIzaSyAtfq_gwRicOPODzk80kNcRuzVv3govv",
    cx: "e4d7867e22b0942fe",
    not_first_search : false,
    fetchResults: function (query) {
        fetch("test.json").then((response) => response.json()).then((data) => this.displayResults(data));
    },
    RedditDescription: async function (url) {
        const json_url = url + ".json";
        const subreddit = await fetch(json_url).then((response) => response.json()).then((data) => data[0].data.children[0].data.subreddit);
        const title = await fetch(json_url).then((response) => response.json()).then((data) => data[0].data.children[0].data.title);
        const description = await fetch(json_url).then((response) => response.json()).then((data) => data[0].data.children[0].data.selftext);
        const upvotes = await fetch(json_url).then((response) => response.json()).then((data) => data[0].data.children[0].data.ups);
        const percentage = await fetch(json_url).then((response) => response.json()).then((data) => data[0].data.children[0].data.upvote_ratio);
        return [subreddit, title, description, upvotes, percentage * 100];
    },
    
    displayResults: async function (data) {
        if (this.not_first_search || 1) {
            // DELETE ".grid-layout" and remake it
            const grid_layout = document.querySelector(".grid-layout");
            grid_layout.remove();
            let new_layout = document.createElement("div");
            new_layout.classList.add('grid-layout');
            document.body.appendChild(new_layout);
        }

        const grid_layout = document.querySelector(".grid-layout");
        for (let item in data.items) {
            const site_body = await this.RedditDescription(data.items[item].link).then((data) => data);
            let element = document.createElement("div");
            element.classList.add('grid-item');
            
            // CLEAN CODE AND ADD UPVOTE AND PERCENTAGE OF UPVOTES!

            let item_subreddit = document.createElement("h4");
            item_subreddit.innerText = "r/" + site_body[0];

            let item_title = document.createElement("h3");
            item_title.innerText = site_body[1]; // GET TITLE FROM REDDIT NOT GOOGLE

            let item_link = document.createElement("a");
            item_link.href = data.items[item].link;
            item_link.innerText = "Link";
            
            let item_snippet = document.createElement("p");
            
            if (site_body[2] == "") {
                item_snippet.innerText = "[No Description]"
            } else {
                console.log(site_body[2]);
                site_body[2] = site_body[2].replace("\n", "<br>");
                item_snippet.innerHTML = site_body[2].slice(0, 300); //.split(" ").slice(0, 50).join(" ");
                item_snippet.innerText += "...";
            }

            let item_upvotes = document.createElement("h4");
            item_upvotes.innerText = site_body[3];

            let item_percentage = document.createElement("h4");
            item_percentage.innerText = site_body[4];

        element.appendChild(item_subreddit);
        element.appendChild(item_title);
        element.appendChild(item_link);
        element.appendChild(item_snippet); // fetch from reddit json use the reddit function
        element.appendChild(item_upvotes); // fetch from reddit json use the reddit function
        element.appendChild(item_percentage); // fetch from reddit json use the reddit function
        document.querySelector(".grid-layout").appendChild(element);
        }
        this.not_first_search = true;
        const search_button = document.querySelector(".search-button");
        search_button.style.display = "block";
    },
    search: function () {
        let query = document.querySelector(".search-bar").value;
        const search_button = document.querySelector(".search-button");
        search_button.style.display = "none";
        this.fetchResults(query);
    },
};

document.querySelector(".search-button").addEventListener("click", () => redditsearch.search());