
chrome.tabs.onActivated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status == "complete") {
    chrome.scripting.executeScript({
      target: {tabId: tab.id, allFrames: true},
      files: ['content.js'],
    });
  }
});

