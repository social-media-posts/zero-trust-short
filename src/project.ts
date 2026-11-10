import {makeProject} from '@motion-canvas/core';
import example from './scenes/example?scene';
import audio from '../audio/ElevenLabs_2026-11-10T05_50_57_CJ - Young Swedish Male_pvc_s50_m2.mp3';

export default makeProject({
  scenes: [example],
  audio,
});