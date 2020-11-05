/* eslint-disable */
import KeyboardPresentor from './presentor/keyboard-presentor';
import TextModel from './model/text-model';

const body = document.querySelector('body');

const textModel = new TextModel();

const keyboardPresentor = new KeyboardPresentor(body, textModel);

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

keyboardPresentor.init();
