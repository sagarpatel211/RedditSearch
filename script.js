let redditsearch = {
    api_key: "AIzaSyAtfq_gwRicOPODzk80kNcRuzVv3govv",
    cx: "e4d7867e22b0942fe",
    not_first_search : false,
    fetchResults: function (query) {
        fetch("https://www.googleapis.com/customsearch/v1?key=" + this.api_key + "-U&cx=" + this.cx + "&q=" + query
        ).then((response) => response.json()).then((data) => this.displayResults(data));
    },
    RedditDescription: async function (url) {
        return await fetch(url + ".json").then((response) => response.json()).then((data) => {
            return [data[0].data.children[0].data.subreddit,
            data[0].data.children[0].data.title,
            data[0].data.children[0].data.selftext,
            data[0].data.children[0].data.ups,
            Math.fround(data[0].data.children[0].data.upvote_ratio * 100)];
        });
    },
    displayResults: async function (data) {
        if (this.not_first_search || 1) {
            const grid_layout = document.querySelector(".grid-layout");
            grid_layout.remove();
            let new_layout = document.createElement("div");
            new_layout.classList.add('grid-layout');
            document.body.appendChild(new_layout);
        }
        const grid_layout = document.querySelector(".grid-layout");
        for (let item in data.items) {
            try {
                var site_body = await this.RedditDescription(data.items[item].link).then((data) => data);
            } catch (err) {
                console.error(err);
                console.error(site_body);
            }
            let element = document.createElement("div");
            element.classList.add('grid-item');
            
            // Subreddit Name
            let item_subreddit = document.createElement("h4");
            item_subreddit.innerText = "r/" + site_body[0];

            // Title
            let item_title = document.createElement("h3");
            let full_title = site_body[1];
            if (full_title.length > 75) {
                full_title = full_title.slice(0, 75) + "...";
            }
            item_title.innerText = full_title;
            item_title.classList.add('grid-item-title');

            // Description
            let item_snippet = document.createElement("p");
            let first_snippet = site_body[2].slice(0, 250);

            let newline_count = (site_body[2].match(/\n/g) || []).length;
            let char_count = 200 - newline_count * 20;

            let second_snippet = first_snippet.replace("\n", "<br>") + "...";
            item_snippet.innerHTML = second_snippet;

            let bottom_item_div = document.createElement("div");
            bottom_item_div.classList.add('bottom-item-div');

            // Link Icon
            let item_link = document.createElement("a");
            item_link.href = data.items[item].link;
            let item_link_icon = document.createElement("i");
            item_link_icon.classList.add('item-link', 'fa', 'fa-link');
            item_link.appendChild(item_link_icon);

            // Upvotes
            let item_upvotes = document.createElement("h4");
            item_upvotes.classList.add('item-upvotes');
            item_upvotes.innerText = site_body[3] + " Upvotes";

            // Percentage of Upvotes
            let item_percentage = document.createElement("h4");
            item_percentage.classList.add('item-percentage');
            item_percentage.innerText = site_body[4] + "%";

            element.appendChild(item_subreddit);
            element.appendChild(item_title);
            element.appendChild(item_snippet);
            bottom_item_div.appendChild(item_link);
            bottom_item_div.appendChild(item_upvotes);
            bottom_item_div.appendChild(item_percentage);
            element.appendChild(bottom_item_div);
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

document.querySelector(".search-bar").addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        redditsearch.search()
    }
});
