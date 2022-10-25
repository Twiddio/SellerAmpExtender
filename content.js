
var loadMoreButton = document.getElementById("productList-loadmore").getElementsByClassName("btn")[0];
var parentList = document.getElementById("productList");
var storeDetailsTable = document.getElementById("search-sf-storedetails");
var sellerID;
var dorkingParamsInput;
 
checkIsLoaded();


loadMoreButton.addEventListener("click", function() {
    updateHref(dorkingParamsInput.value);
});



function updateHref(desiredSite) {
    console.log("Update HREF's to " + desiredSite);
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

function checkIsLoaded() {
    var interval = setInterval(function() {
        var indicator = storeDetailsTable.getElementsByTagName("tr")[0].getElementsByTagName("td")[0].innerText;
        console.log(indicator);
        if(indicator.includes("Loading")) {
            console.log("not loaded");
            return false;
        } else {
            console.log("loaded");
            clearInterval(interval);
            injectDorkingParams();
            sellerID = storeDetailsTable.getElementsByTagName("tr")[1].getElementsByTagName("td")[1].innerText;
            console.log(sellerID);
            return true;
        }
    }, 1000);
}

function injectDorkingParams() {
    var row = storeDetailsTable.insertRow();
    var labelCell = row.insertCell(0);
    labelCell.innerHTML = "Dorking Params";
    var valueCell = row.insertCell(1);
    //create a blank text box in value cell
    var input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("id", "dorkingParams");
    valueCell.appendChild(input);

    dorkingParamsInput = input;

    input.addEventListener("blur", function() {
        updateHref(input.value);
    });
}
