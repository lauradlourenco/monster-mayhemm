# monster-mayhemm
Implemented a reusable Sound class to handle UI audio effects such as button hover and click sounds throughout the game interface.

The initial structure for this class was generated with the help of ChatGPT. I used it as a foundation to implement audio preloading and playback in a way that improves game feedback and user experience.

### What I added and modified:
- Preload method to load sounds using a dictionary of identifiers and file paths.
- Play method that clones audio nodes to support overlapping playback (e.g. multiple fast clicks).
- Wrapped the `play()` call inside a try/catch block to safely handle autoplay restrictions in browsers like Chrome.
- Included a global `window.Sound` reference to easily access the class anywhere in the project.

### Troubleshooting and Fixes:
- Initially, the AI-generated code played the same audio object repeatedly, which caused sounds to get cut off during fast interactions.
- After manual testing (clicking multiple buttons quickly), I realised the need for `cloneNode()` to enable overlapping playback.
- Tested with silent failure using try/catch to handle errors due to user interaction not occurring yet (e.g., on page load).

### Notes:
- Even though the base was AI-generated, I fully understand how the logic works and made sure it fits the way my game handles UI components.
- The audio system is designed to be easily extendable. More sounds can be added by updating the audio map used in `Sound.preload()`.

This commit improves interactivity and polish in the overall UI experience of the game.
Created a structured JSON file containing metadata for all enemy units used in the game. Each object includes a unique ID, name, hit points, movement range, and a reference to the corresponding character image stored in the assets folder.

### What this file does:
- Acts as the enemy/unit database for gameplay logic.
- Allows for easy dynamic loading of enemy characters during game initialization.
- Keeps all game character data centralised and scalable for future additions.

### Included enemies:
- Classic fantasy enemies like Goblin, Skeleton, Orc, Troll, and Zombie.
- Stronger or special units such as Vampire, Ghost, Dragon, and a mysterious 'Mhystical'.
- Humorous/creative characters like Seagull and Creepy Elf.

### AI Use and Troubleshooting Notes:
- The structure was originally outlined using ChatGPT suggestions to keep it simple and extensible.
- Manual edits were made to ensure consistency across the JSON keys and to assign balanced `hitPoints` and `movementRange` values.
- Validated the format using a JSON linter to avoid parsing errors during integration with the main game logic.

This commit improves modularity, making it easier to update characters without hardcoding them into JavaScript. Future plans include linking this data with character selection menus or randomised enemy spawns.
Created the primary script responsible for initializing the Monster Mayhem game.

Key responsibilities implemented:
- Preload UI sounds (hover and click effects) at the start for responsive audio feedback.
- Create and render the hexagonal game board with configurable rows, columns, and hex size.
- Initialize the pathfinding system with reference to the game board.
- Setup a reset button to clear the board and any active paths, redrawing the grid.
- Load character data asynchronously from a data source, allowing future use for gameplay.

### Technical details:
- Wrapped all initialization logic inside a DOMContentLoaded event listener to ensure the DOM is fully parsed before running.
- Exposed the `gameBoard` instance globally (via `window.gameBoard`) for easier debugging and development testing.
- Added robust error handling when critical elements like the board container or character data fail to load.
- Used promises for asynchronous loading of character data with clear logging for success or failure.

### AI and troubleshooting notes:
- The initial structure and function breakdown were assisted by AI suggestions.
- Manually ensured all DOM element checks are safe to prevent runtime errors.
- Verified that the reset functionality correctly clears the board’s container and pathfinding state.
- Confirmed that sound preloading works in harmony with the previously implemented Sound class.

This commit lays the foundation for core game loop mechanics and user interaction, enabling further feature additions like character actions and game state management.
Implemented the JsonLoader utility class to manage asynchronous fetching and parsing of JSON resources used by the game.

Features:
- A generic `fetchJson` method that accepts a resource path, fetches the JSON file, and returns the parsed data as a Promise.
- Robust error handling for network or HTTP response failures, with console error logging and rethrowing for upstream handling.
- A specific `getCharacters` method for loading the characters JSON file (`data/characters.json`), providing a clean API to access game character data.

Design considerations:
- The generic fetchJson function makes this class easily extendable for future game data needs (e.g., loading levels, config files).
- Attached the class to the global `window` object for easy access across different modules without requiring imports.

Troubleshooting and improvements:
- Verified correct handling of HTTP errors (e.g., 404, 500) by checking `resp.ok`.
- Tested promise rejection scenarios to ensure errors propagate correctly and do not silently fail.
- Ensured JSON is properly parsed and returned to callers.

This utility enhances modularity and maintainability by isolating external data fetching logic, supporting the main game initialization flow.
