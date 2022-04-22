import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');
const player = new Vimeo.Player(iframe);

const CURRENT_TIME = 'videoplayer-current-time';

player.on('timeupdate', throttle(onTimeUpdate, 1000));
onPageLoad();

function onTimeUpdate({ seconds }) {
  localStorage.setItem(CURRENT_TIME, seconds);
}

function onPageLoad() {
  const seconds = localStorage.getItem(CURRENT_TIME);
  if (!seconds) {
    return;
  }

  player.setCurrentTime(seconds);
}
