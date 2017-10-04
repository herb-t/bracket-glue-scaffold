goog.module('EmojiComponent');

/**
 * A class that generates fixed markup with emojis and inserts it into the DOM.
 * @final
 */
class EmojiComponent {
  /**
   * Creates a new EmojiComponent.
   * @param {!number=} opt_num_emoji Number of emojis to insert.
   */
  constructor(opt_num_emoji = DEFAULT_NUM_EMOJI_) {
    this.numEmoji_ = opt_num_emoji;

    try {
      this.emojiElement_ = document.querySelector(COMPONENT_SELECTOR_);
      this.emojiElement_.textContent = TITLE_;
      this.appendSomeEmoji_();
    } catch (e) {
      throw new TypeError(ERROR_MESSAGE_);
    }
  }
  /**
   * Appends emoji markup to the parent element.
   * @private
   */
  appendSomeEmoji_() {
    const emojiWrapper = document.createElement('div');
    emojiWrapper.classList.add(WRAPPER_CLASS_);

    for (let i = 0; i < this.numEmoji_; i++) {
      let div = document.createElement('div');
      div.textContent = EMOJI_;
      emojiWrapper.appendChild(div);
    }

    this.emojiElement_.appendChild(emojiWrapper);
  }
}

/**
* The selector for the component's parent element.
* @const
* @private
*/
const COMPONENT_SELECTOR_ = '.emoji-component';

/**
 * The title text for the component.
 * @const
 * @private
 */
const TITLE_ = `⚡ This is an emoji component ayyyyyy ⚡`;

/**
 * The class name of the wrapper element.
 * @const
 * @private
 */
const WRAPPER_CLASS_ = 'emoji-wrapper';

/**
 * Error text if the component fails to initialize.
 * @const
 * @private
 */
const ERROR_MESSAGE_ = `😭  Bummerwave, we got an error 👇`;

/**
 * The default number of emojis to insert.
 * @const
 * @private
 */
const DEFAULT_NUM_EMOJI_ = 3;

/**
 * The emoji symbol to insert.
 * @const
 * @private
 */
const EMOJI_ = `😂`;

exports = EmojiComponent;
