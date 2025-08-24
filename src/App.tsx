import './App.css';
import { useMachine } from '@xstate/react';
import { StepForwardOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, Modal, theme, Tooltip } from 'antd';
import ReactPlayer from 'react-player';
import { playerMachine } from './playerMachine';
import {
  fullHeightPx,
  fullWidthPx,
  inspect,
  miniHeightPx,
  miniWidthPx,
  url,
} from './App.consts';
import { styles } from './App.styles';

function App() {
  const [state, send] = useMachine(playerMachine, {
    inspect,
  });

  const toggleModal = () => {
    send({ type: 'toggleModal' });
  };

  const handleToggle = () => {
    send({ type: 'toggle' });
  };

  const handlePlayPause = () => {
    switch (true) {
      case state.matches({
        open: {
          full: 'playing',
        },
      }):
        send({ type: 'pause' });
        break;
      case state.matches({
        open: {
          full: 'paused',
        },
      }):
        send({ type: 'play' });
        break;
    }
  };

  return (
    <>
      <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
        <h1>App</h1>
        <div style={styles.fake_player}>
          <Tooltip title='Play'>
            <Button
              shape='circle'
              icon={<StepForwardOutlined />}
              onClick={toggleModal}
            />
          </Tooltip>
          <Modal
            width={state.matches({ open: 'full' }) ? fullWidthPx : miniWidthPx}
            title='Player'
            centered={true}
            open={state.matches('open')}
            onOk={toggleModal}
            onCancel={toggleModal}
            footer={
              <>
                <Button key='toggle' onClick={() => handleToggle()}>
                  Switch Size
                </Button>

                {state.matches({ open: 'full' }) ? (
                  <Button
                    key='play'
                    type='primary'
                    onClick={() => handlePlayPause()}
                  >
                    Play/Pause
                  </Button>
                ) : (
                  <></>
                )}
              </>
            }
          >
            <div style={styles.react_player_wrapper}>
              <ReactPlayer
                playing={state.matches({
                  open: {
                    full: 'playing',
                  },
                })}
                loop={true}
                src={url}
                width={
                  state.matches({ open: 'full' }) ? fullWidthPx : miniWidthPx
                }
                height={
                  state.matches({ open: 'full' }) ? fullHeightPx : miniHeightPx
                }
              />
            </div>
          </Modal>
        </div>
      </ConfigProvider>
    </>
  );
}

export default App;
