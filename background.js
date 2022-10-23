chrome.tabs.onConnect.addListener(function(port) {
    console.assert(port.name === "loading");
    port.onMessage.addListener(function(msg) {
      console.log(msg.loading);
    });
  });

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete') {
        chrome.tabs.executeScript(tab.id, {
            file: 'content.js'
        });
    }
});

