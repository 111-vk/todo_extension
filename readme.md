## it is not done yet, but you can use it
# Notes Extension

## Overview
The Notes Extension is a browser-based task management tool designed to help users organize their tasks efficiently. It allows users to create, prioritize, and manage tasks with features like deadlines, descriptions, and more.

**Note:** This extension is only compatible with Brave and Chrome browsers.

**Feature Highlight:** Manage your daily to-dos directly on the browser's home page (new tab).

## Installation
1. Clone or download the repository to your local machine.
   ```bash
   git clone https://github.com/111-vk/todo_extension.git
   ```
2. Open your browser and navigate to the extensions page:
   - For Chrome: `chrome://extensions/`
   - For Brave: `brave://extensions/`
3. Enable "Developer mode" (usually a toggle in the top-right corner).
4. Click on "Load unpacked" and select the folder containing the extension files.
5. The extension should now be installed and visible in your browser's extensions list.



## Keybinds
now you need to set a custom keybind to quickly open the Notes Extension, such as <kbd>Ctrl</kbd> + <kbd>Space</kbd>. 

### How to add Keybind
1. Open your browser and navigate to the extensions page:
   - For Chrome: `chrome://extensions/`
   - For Brave: `brave://extensions/`
2. Scroll to the bottom of the page and click on "Keyboard shortcuts".
3. Locate the Notes Extension in the list.
4. click on the **pencil icon** next to activate the extension. 
5. now press the new key combination you want to use. (e.g., `Ctrl` + `Space`) 
> note: do not use key combinations that are already in use by the browser or other extensions. 


## Development
### Prerequisites
- A modern browser (Chrome, Brave, etc.)
- Basic knowledge of JavaScript, HTML, and CSS

### File Structure
- `index.html`: Main HTML file for the extension.
- `manifest.json`: Configuration file for the browser extension.
- `scripts/`: Contains JavaScript files for functionality.
  - `backend.js`: Handles task management logic.
  - `main.js`: Manages UI interactions.
- `css/`: Contains CSS files for styling.
- `images/`: Contains images used in the extension.

## Contributing
1. Fork the repository.
2. Create a new branch for your feature or bug fix:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Description of changes"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.
