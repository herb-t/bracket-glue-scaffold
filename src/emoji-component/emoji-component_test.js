goog.module('EmojiComponentTest');
goog.setTestOnly('EmojiComponentTest');

const EmojiComponent = goog.require('EmojiComponent');

describe('An Emoji Component', () => {
  let emojiComponentEl;
  let emojiComponent;
  let emojiContentRe = /😂*/gm;

  beforeEach(() => {
    emojiComponentEl = document.createElement('div');
    emojiComponentEl.classList.add('emoji-component');
    document.body.appendChild(emojiComponentEl);
    emojiComponent = new EmojiComponent();
  });

  it('is defined upon initialization.', () => {
    expect(emojiComponent).toBeDefined();
  });

  it('initializes without errors.', () => {
    expect(() => {new EmojiComponent();}).not.toThrow();
  });

  it('finds its parent element.', () => {
    expect(emojiComponent.emojiElement_).toBeDefined();
  });

  it('has a parent element of type Element.', () => {
    expect(emojiComponent.emojiElement_).toEqual(jasmine.any(Element));
  });

  it('has a wicked title on it.', () => {
    let emojiTitleRe = new RegExp(EmojiComponent.EMOJI_TITLE_);
    let emojiTitleCheck = emojiComponentEl.textContent.match(emojiTitleRe);
    expect(emojiTitleCheck.length).toEqual(1);
  });

  it('has the default number of emojis cry/laugh emojis inside it.', () => {
    let emojiCount =
        emojiComponent.emojiElement_.innerText.match(emojiContentRe);
    expect(emojiCount.length).toEqual(3);
  });

  it('has the correct number of emojis if passed a non-default.', () => {
    let testNumEmojis = 5;
    let testEmojiComponent = new EmojiComponent(testNumEmojis);
    let emojiCount =
        testEmojiComponent.emojiElement_.innerText.match(emojiContentRe);
    expect(emojiCount.length).toEqual(testNumEmojis);
  });

  afterEach(() => {
    document.body.removeChild(emojiComponentEl);
    emojiComponentEl = null;
    emojiComponent = null;
  });
});

describe('An Emoji Component errors', () => {
  let emojiComponentEl;
  let createEmojiComponent = () => {
    new EmojiComponent();
  };

  it('when it cannot find its parent element.', () => {
    expect(createEmojiComponent).toThrow();
  });

  it('when a parent element exists but does not have the proper class.', () => {
    emojiComponentEl = document.createElement('div');
    document.body.appendChild(emojiComponentEl);
    expect(createEmojiComponent).toThrow();
  });

  it('by throwing a bummerwave TypeError.', () => {
    expect(createEmojiComponent).toThrowError(TypeError, /Bummerwave/);
  });

  afterEach(() => {
    emojiComponentEl = null;
  });
});
