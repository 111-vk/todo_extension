// Handle extension icon click
chrome.action.onClicked.addListener(() => {
  chrome.tabs.create({ url: chrome.runtime.getURL('index.html') });
});

// Handle keyboard shortcut (Ctrl+Shift+Y)
chrome.commands.onCommand.addListener((command) => {
  if (command === 'open-extension') {
    chrome.tabs.create({ url: chrome.runtime.getURL('index.html') });
  }
});

