import { assign, createMachine } from 'xstate';

export const playerMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QAcA2BDAnmATgOgGNUB7WSAYgBdiopUwBZYidVAbQAYBdRFUgS0r9iAO14gAHogCMANll4OSpfIAsAZlUAOAOyyANCEyIATOp15pHExy1aAnDp0BWHbYC+7w2iy48xZDARKho6RmZWTh4kEGQBIVFxKQQ5BWUVWQ1tPUNjFK0FWWsOexNZZwL1Ex11T28MbHwAoLwAW34RfhDaeijxONhBYTEY5OcTVTw3dWkdDR1pdXstVVzTBzxnZ1kyjmdVaRMy1VU62Ia-ZpE2jq6fTD6YgaHE0cRMjjwbGdl7HfMNGsEBMFPZnDN1L89hwarUvOdfE1Atd2p1yMh0ABXMiPPiDBIjUDJD5fDg-P5mObqIHSZzSRTKRZbezqDiqaxne6XZF4ABmmNQqG6YVxsXiwySiG09gZSjM5RMs1KQM0nz2O22BQ4chOOk5FyRLX5gvIAGswJg8HACOhAqLngTJQhpbLrJDxkqTCr7J8thqZjp7FYTFt9Yj-DzjUL7vbxa8iYhIfTvtJtCV1OoHLogdUZUctIsdFptTNSqd4VzDdco+isTjuP044TJInZMmyaniyzM8sdDStOovi5tSctqGziJmHB+gbG-iJW8EABaAxGRBLiau9LbmFhxqEEhkCBzl7N5KqL1rlKlPCyLT7Ez3qxOZzLPfcoInx2L1kWdKzJQCiDVc8lkQdnEZVMi0WMw4XqcMrhuTovwXBMEDAyZ0kzcEfV1FVVAsH0diKENbAvWR3yrPkBVQFD4xbBB1C2V0ANsX45BVYtLALMppCg2x72cTxPCAA */
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
