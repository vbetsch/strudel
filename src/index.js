import { repl, s, n, stack, cps } from "@strudel/core";
import {
  initAudioOnFirstClick,
  getAudioContext,
  webaudioOutput
} from "@strudel/webaudio";

const btnPlay = document.getElementById("play");
const btnStop = document.getElementById("stop");

const ctx = getAudioContext();
const { scheduler } = repl({
  defaultOutput: webaudioOutput,
  getTime: () => ctx.currentTime
});

btnPlay.addEventListener("click", async () => {
  await initAudioOnFirstClick();

  cps(1);

  const pattern = stack(
    s("bd sd hh").gain(0.8),
    n("<0 2>").s("bass").mode("minor")
  );

  scheduler.setPattern(pattern);
  scheduler.start();
});

btnStop.addEventListener("click", async () => {
  scheduler.stop();
});
