const codes = [
  'Backquote',
  'Digit1',
  'Digit2',
  'Digit3',
  'Digit4',
  'Digit5',
  'Digit6',
  'Digit7',
  'Digit8',
  'Digit9',
  'Digit0',
  'Minus',
  'Equal',
  'Backspace',
  'Tab',
  'KeyQ',
  'KeyW',
  'KeyE',
  'KeyR',
  'KeyT',
  'KeyY',
  'KeyU',
  'KeyI',
  'KeyO',
  'KeyP',
  'BracketLeft',
  'BracketRight',
  'Backslash',
  'Delete',
  'CapsLock',
  'KeyA',
  'KeyS',
  'KeyD',
  'KeyF',
  'KeyG',
  'KeyH',
  'KeyJ',
  'KeyK',
  'KeyL',
  'Semicolon',
  'Quote',
  'Enter',
  'ShiftLeft',
  'KeyZ',
  'KeyX',
  'KeyC',
  'KeyV',
  'KeyB',
  'KeyN',
  'KeyM',
  'Comma',
  'Period',
  'Slash',
  'ArrowUp',
  'ShiftRight',
  'ControlLeft',
  'MetaLeft',
  'AltLeft',
  'Space',
  'AltRight',
  'ControlRight',
  'ArrowLeft',
  'ArrowDown',
  'ArrowRight',
];

const ruKeys = [
  ['ё', 'Ё'],
  ['1', '!'],
  ['2', '"'],
  ['3', '№'],
  ['4', ';'],
  ['5', '%'],
  ['6', ':'],
  ['7', '?'],
  ['8', '*'],
  ['9', '('],
  ['0', ')'],
  ['-', '_'],
  ['=', '+'],
  'Backspace',
  'Tab',
  ['й', 'Й'],
  ['ц', 'Ц'],
  ['у', 'У'],
  ['к', 'К'],
  ['е', 'Е'],
  ['н', 'Н'],
  ['г', 'Г'],
  ['ш', 'Ш'],
  ['щ', 'Щ'],
  ['з', 'З'],
  ['х', 'Х'],
  ['ъ', 'Ъ'],
  ['\\', '/'],
  'Del',
  'Caps Lock',
  ['ф', 'Ф'],
  ['ы', 'Ы'],
  ['в', 'В'],
  ['а', 'А'],
  ['п', 'П'],
  ['р', 'Р'],
  ['о', 'О'],
  ['л', 'Л'],
  ['д', 'Д'],
  ['ж', 'Ж'],
  ['э', 'Э'],
  'Enter',
  'L Shift',
  ['я', 'Я'],
  ['ч', 'Ч'],
  ['с', 'С'],
  ['м', 'М'],
  ['и', 'И'],
  ['т', 'Т'],
  ['ь', 'Ь'],
  ['б', 'Б'],
  ['ю', 'Ю'],
  ['.', ','],
  '↑',
  'R Shift',
  'Ctrl',
  'Win',
  'Alt',
  'Space',
  'Alt',
  'Ctrl',
  '←',
  '↓',
  '→',
];

const enKeys = [
  ['`', '~'],
  ['1', '!'],
  ['2', '@'],
  ['3', '#'],
  ['4', '$'],
  ['5', '%'],
  ['6', '^'],
  ['7', '&'],
  ['8', '*'],
  ['9', '('],
  ['0', ')'],
  ['-', '_'],
  ['=', '+'],
  'Backspace',
  'Tab',
  ['q', 'Q'],
  ['w', 'W'],
  ['e', 'E'],
  ['r', 'R'],
  ['t', 'T'],
  ['y', 'Y'],
  ['u', 'U'],
  ['i', 'I'],
  ['o', 'O'],
  ['p', 'P'],
  ['[', '{'],
  [']', '}'],
  ['\\', '/'],
  'Del',
  'Caps Lock',
  ['a', 'A'],
  ['s', 'S'],
  ['d', 'D'],
  ['f', 'F'],
  ['g', 'G'],
  ['h', 'H'],
  ['j', 'J'],
  ['k', 'K'],
  ['l', 'L'],
  [';', ':'],
  ['\'', '"'],
  'Enter',
  'L Shift',
  ['z', 'Z'],
  ['x', 'X'],
  ['c', 'C'],
  ['v', 'V'],
  ['b', 'B'],
  ['n', 'N'],
  ['m', 'M'],
  [',', '<'],
  ['.', '>'],
  ['/', '?'],
  '↑',
  'R Shift',
  'Ctrl',
  'Win',
  'Alt',
  'Space',
  'Alt',
  'Ctrl',
  '←',
  '↓',
  '→',
];

const CreateBaseHTML = () => {
  const wrapper = document.createElement('div');
  wrapper.className = 'wrapper';
  const body = document.getElementsByTagName('body');
  body[0].prepend(wrapper);

  const textarea = document.createElement('textarea');
  textarea.className = 'text-box';
  wrapper.append(textarea);

  const keyboard = document.createElement('div');
  keyboard.className = 'keyboard';
  wrapper.append(keyboard);

  const AboutKeys = document.createElement('div');
  AboutKeys.className = 'about';
  wrapper.append(AboutKeys);
  const AboutP = document.createElement('p');
  AboutP.innerHTML = 'OS: Windows<br>To switch the language: Shift+Alt';
  AboutKeys.append(AboutP);
};

let keysLang = localStorage.getItem('KeysLang');
const CreateKeyboard = (lang, shift) => {
  keysLang = lang === ruKeys ? 'ru' : 'en';
  localStorage.setItem('KeysLang', keysLang);
  document.querySelector('.keyboard').innerHTML = '';
  let key;
  for (let i = 0; i < lang.length; i += 1) {
    key = document.createElement('div');
    key.classList = 'key';
    key.id = codes[i];
    if (Array.isArray(lang[i])) {
      key.innerText = lang[i][shift];
    } else {
      key.innerText = lang[i];
    }
    document.querySelector('.keyboard').append(key);
  }
};

const ChangeCase = (keysLang1, switchTo) => {
  if (keysLang1 === 'ru') {
    CreateKeyboard(ruKeys, switchTo);
  } else {
    CreateKeyboard(enKeys, switchTo);
  }
};

const ChangeLang = (keysLang1) => {
  if (keysLang1 === 'ru') {
    CreateKeyboard(enKeys, 0);
  } else {
    CreateKeyboard(ruKeys, 0);
  }
};

let capsLock = false;
let downKey;
let caretPos;
const inputText = (ev) => {
  const textarea = document.querySelector('.text-box');
  caretPos = textarea.selectionStart;
  window.event.returnValue = false;
  textarea.focus();
  if (ev === 'CapsLock') {
    if (!capsLock) {
      ChangeCase(keysLang, 1);
      document.querySelector('#CapsLock').classList.add('key-pressed');
      capsLock = true;
    } else {
      document.querySelector('#CapsLock').classList.remove('key-pressed');
      ChangeCase(keysLang, 0);
      capsLock = false;
    }
  } else if (ev === 'Backspace') {
    textarea.value = textarea.value.slice(0, caretPos - 1) + textarea.value.slice(caretPos);
    textarea.selectionStart = caretPos - 1;
    textarea.selectionEnd = caretPos - 1;
  } else if (ev === 'Delete') {
    textarea.value = textarea.value.slice(0, caretPos) + textarea.value.slice(caretPos + 1);
    textarea.selectionStart = caretPos;
    textarea.selectionEnd = caretPos;
  } else if (ev === 'ArrowLeft') {
    if(caretPos !== 0) {
      textarea.selectionStart = caretPos - 1;
      textarea.selectionEnd = caretPos - 1;
    }
  } else if (ev === 'ArrowRight') {
    textarea.selectionStart = caretPos + 1;
    textarea.selectionEnd = caretPos + 1;
  } else if (ev === 'Enter') {
    textarea.value += '\n';
  } else if (ev === 'Space') {
    textarea.value += ' ';
  } else if (ev === 'Tab') {
    textarea.value += '    ';
  } else if (ev === 'ShiftLeft') {
    ChangeCase(keysLang, 1);
    document.querySelector('#ShiftLeft').classList.add('key-pressed');
  } else if (ev === 'ShiftRight') {
    ChangeCase(keysLang, 1);
    document.querySelector('#ShiftRight').classList.add('key-pressed');
  } else if (ev !== 'Tab' && ev !== 'Delete' && ev !== 'ControlLeft' && ev !== 'MetaLeft' && ev !== 'AltLeft' && ev !== 'AltRight' && ev !== 'ControlRight') {
    textarea.value = textarea.value.slice(0, caretPos) + document.querySelector(`#${ev}`).innerText + textarea.value.slice(caretPos);
    textarea.selectionStart = caretPos + 1;
    textarea.selectionEnd = caretPos + 1;
  }
};

const pressed = new Set();
const KeyDown = (event) => {
  if (codes.indexOf(event.code) !== -1) {
    inputText(event.code);
    downKey = document.querySelector(`#${event.code}`);
    if (event.code !== 'CapsLock') {
      downKey.classList.add('key-pressed');
    }
  }

  pressed.add(event.code);
  if (pressed.has('AltLeft') && pressed.has('ShiftLeft')) {
    ChangeLang(keysLang);
  }
};


const KeyUp = (event) => {
  if (codes.indexOf(event.code) !== -1) {
    if (event.code === 'CapsLock') {
      return;
    }

    if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
      ChangeCase(keysLang, 0);
    }

    const upKey = document.querySelector(`#${event.code}`);
    upKey.classList.remove('key-pressed');
    pressed.delete(event.code);
  }
};

const MouseDown = (event) => {
  if (event.target.classList.contains('key')) {
    event.target.classList.add('key-pressed');
    inputText(event.target.id);
  }
};

const MouseUp = (event) => {
  if (event.target.classList.contains('key')) {
    if (event.target.id === 'ShiftLeft' || event.target.id === 'ShiftRight') {
      ChangeCase(keysLang, 0);
    } else if (event.target.id === 'CapsLock') {
      return;
    }
    event.target.classList.remove('key-pressed');
  }
};

CreateBaseHTML();
CreateKeyboard(keysLang === 'ru' ? ruKeys : enKeys, 0);

document.addEventListener('keydown', KeyDown);
document.addEventListener('keyup', KeyUp);
document.addEventListener('mousedown', MouseDown);
document.addEventListener('mouseup', MouseUp);
