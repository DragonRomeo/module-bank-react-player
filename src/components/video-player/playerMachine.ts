import { assign, createMachine } from 'xstate';

export const playerMachine = createMachine({
  id: 'player',
  initial: 'closed',
  context: {
    isPlaying: false,
  },
  states: {
    closed: {
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
        toggleModal: 'closed',
      },
      states: {
        mini: {
          meta: {
            description: 'The video is just a small and have same functions',
          },
          on: {
            toggle: 'full',
            play: {
              actions: assign({ isPlaying: true }),
            },
            pause: {
              actions: assign({ isPlaying: false }),
            },
          },
        },
        full: {
          on: {
            toggle: 'mini',
            play: {
              actions: assign({ isPlaying: true }),
            },
            pause: {
              actions: assign({ isPlaying: false }),
            },
          },
        },
      },
    },
  },
});
