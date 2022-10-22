console.log("Hello from content script");

var loadMoreButton = document.getElementById("productList-loadmore").getElementsByClassName("btn")[0];
var parentList = document.getElementById("productList");
var storeDetailsTable = document.getElementById("search-sf-storedetails").getElementsByTagName("tbody")[0];
 


var observer = new MutationObserver(function(mutations){
    mutations.forEach(function(mutation){
        for(var i = 0; i < mutation.addedNodes.length; i++) {
            storeDetailsTable = document.getElementById("search-sf-storedetails").getElementsByTagName("tbody")[0];
            //console.log(storeDetailsTable);
            if(storeDetailsTable) {
                console.log("Injecting dorking params...");
                injectDorkingParams();
                observer.disconnect();
                break;
            }
        }
    });
  
});

observer.observe(document.body, {
    childList: true,
    subtree: false
});



loadMoreButton.addEventListener("click", function() {
    console.log("load more clicked");  
    updateHref("Walmart.com");
});

function updateHref(desiredSite) {
    parentList = document.getElementById("productList");
    if(parentList) {
        if(parentList.childElementCount > 0) {
            var items = parentList.getElementsByClassName("pl-item-container");
            for(var i = 0; i < items.length; i++) {
                var btn = items[i].getElementsByClassName("google-link")[0];
                var link = btn.getAttribute("href");
                if(link.includes(desiredSite)) break;
                var split = link.split("q=");
                var injection = "site:" + desiredSite + " ";
                var completedArray = [];

                completedArray.push(split[0]);
                //When the link is a google search, it will have a q= in the link. Without pushing it onto the array it is left out, breaking the link. 
                completedArray.push("q=");
                completedArray.push(injection);
                completedArray.push(split[1]);

                var completed = completedArray.join("");
                btn.setAttribute("href", completed);
            }

        }
    }
}

function injectDorkingParams() {
    
    console.log(storeDetailsTable.getElementsByTagName("tr"));
    
}