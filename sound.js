/**
 * Handles loading and playback of UI audio effects.
 * Provides sound feedback for hover and click events on the hex grid.
 */

class Sound {
  /**
   * Loads audio files from a dictionary of sound names and URLs.
   * @param {Object<string, string>} audioMap - Keys as sound identifiers and values as audio file paths.
   */
  static preload(audioMap) {
    this.audioElements = {};

    for (const [name, path] of Object.entries(audioMap)) {
      const audio = new Audio(path);
      audio.load(); // Start loading immediately
      this.audioElements[name] = audio;
    }
  }

  /**
   * Plays a sound given its identifier.
   * @param {string} name - The sound key that was preloaded.
   */
  static play(name) {
    if (!this.audioElements || !this.audioElements[name]) {
      console.warn(`[Sound] Sound not found for key "${name}"`);
      return;
    }

    // Create a new clone to allow overlapping sounds
    const soundClone = this.audioElements[name].cloneNode();
    soundClone.play().catch(() => {
      // Playback might fail before user interaction, ignoring errors silently
    });
  }
}

// Make Sound globally accessible
window.Sound = Sound;
