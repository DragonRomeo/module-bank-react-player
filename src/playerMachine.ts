import { createMachine } from 'xstate';

// TODO: add toggle on key ESCAPE or delete this from machine
export const playerMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QAcA2BDAnmATgOgFsBLAOyIGIAXAeyilTAG0AGAXURWtiMqOpI4gAHogBMANgCceABwAWAMwB2AKwAaEJkQyVeUSoC+BjWiy48AMwCuqVFVr0mbQci48+ApMLEK5eAIxyzOL6GloI-jLieobGIKbY+Na25ADWYJh4cADG6MhO7F6u3Lz8giIIor4BQSHqmoj+CrqqRnEk1BBwLhiJLm6lnqAVALTiYYhjRia95sRk-SUe5YgKMtKBwaENCFF4rXEJ5smoi+5lXhVyohO7-nixRkA */
  id: 'player',
  initial: 'close',
  states: {
    close: {
      meta: {
        description: 'Fake player',
      },
      on: {
        toggleModal: 'open',
      },
    },
    open: {
      initial: 'mini',
      meta: {
        description: 'Open modal',
      },
      on: {
        toggleModal: 'close',
      },
      states: {
        mini: {
          meta: {
            description: 'The video is just a small and dont have any function',
          },
          on: {
            toggle: 'full',
          },
        },
        full: {
          initial: 'playing',
          states: {
            playing: {
              entry: 'playVideo',
              on: {
                pause: 'paused',
              },
            },
            paused: {
              exit: 'pauseVideo',
              on: {
                play: 'playing',
              },
            },
          },
          exit: 'stopVideo',
          on: {
            toggle: 'mini',
            'key.escape': 'mini',
          },
        },
      },
    },
  },
});
