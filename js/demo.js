/**
 * Particleground demo
 * @author Jonathan Nicol - @mrjnicol
 */

// This can be used to set the Particles Effects. Check README for more details!
document.addEventListener('DOMContentLoaded', function () {
  particleground(document.getElementById('particles'), {
    dotColor: '#5cbdaa',
    lineColor: '#5cbdaa'
  });
  var intro = document.getElementById('intro');
  intro.style.marginTop = - intro.offsetHeight / 2 + 'px';

  // Initialize music control
  initMusicControl();
}, false);

// Music Control Functionality
function initMusicControl() {
  const musicControl = document.getElementById('music-control');
  const musicIcon = document.getElementById('music-icon');
  const musicText = document.getElementById('music-text');
  const backgroundMusic = document.getElementById('background-music');

  let isPlaying = false;

  // Set volume to a comfortable level (30% volume)
  backgroundMusic.volume = 0.3;

  musicControl.addEventListener('click', function() {
    if (isPlaying) {
      // Pause music
      backgroundMusic.pause();
      musicIcon.className = 'fas fa-music';
      musicText.textContent = 'Turn Sound On';
      musicControl.style.opacity = '0.7';
      isPlaying = false;
    } else {
      // Try to play music
      const playPromise = backgroundMusic.play();

      if (playPromise !== undefined) {
        playPromise.then(() => {
          // Music started playing successfully
          musicIcon.className = 'fas fa-volume-up';
          musicText.textContent = 'Sound On';
          musicControl.style.opacity = '1';
          isPlaying = true;
        }).catch(error => {
          console.log('Audio playback failed:', error);

          // Provide helpful feedback based on error type
          if (error.name === 'NotAllowedError') {
            musicText.textContent = 'Click to Enable';
            setTimeout(() => {
              musicText.textContent = 'Turn Sound On';
            }, 3000);
          } else if (error.name === 'NotSupportedError') {
            musicText.textContent = 'Audio Not Supported';
            setTimeout(() => {
              musicText.textContent = 'Turn Sound On';
            }, 3000);
          } else {
            musicText.textContent = 'Audio Error';
            setTimeout(() => {
              musicText.textContent = 'Turn Sound On';
            }, 2000);
          }
        });
      }
    }
  });

  // Add hover effect
  musicControl.addEventListener('mouseenter', function() {
    this.style.opacity = '1';
  });

  musicControl.addEventListener('mouseleave', function() {
    if (!isPlaying) {
      this.style.opacity = '0.7';
    }
  });

  // Handle page visibility change (pause when tab is not active)
  document.addEventListener('visibilitychange', function() {
    if (document.hidden && isPlaying) {
      backgroundMusic.pause();
    }
  });
}


/*
// jQuery plugin example:
$(document).ready(function() {
  $('#particles').particleground({
    dotColor: '#5cbdaa',
    lineColor: '#5cbdaa'
  });
  $('.intro').css({
    'margin-top': -($('.intro').height() / 2)
  });
});
*/