/**
 * Handles asynchronous loading of JSON resources for the game.
 */

class JsonLoader {
  /**
   * Generic method to fetch and parse JSON from a given URL.
   * @param {string} resourcePath - Path to the JSON file.
   * @returns {Promise<any>} Promise resolving with parsed JSON data.
   */
  static async fetchJson(resourcePath) {
    try {
      const resp = await fetch(resourcePath);
      if (!resp.ok) {
        throw new Error(`Failed to load JSON from "${resourcePath}" (Status: ${resp.status})`);
      }
      return resp.json();
    } catch (err) {
      console.error('JsonLoader error:', err);
      throw err;
    }
  }

  /**
   * Load the game character list JSON.
   * @returns {Promise<Array<Object>>} Array of character data.
   */
  static async getCharacters() {
    return this.fetchJson('data/characters.json');
  }
}

// Attach to global scope for external usage.
window.JsonLoader = JsonLoader;
