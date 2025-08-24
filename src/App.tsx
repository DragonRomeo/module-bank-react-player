import './App.css';

import { ConfigProvider, theme } from 'antd';
import VideoPlayer from './components/video-player/video-player';

function App() {
  return (
    <>
      <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
        <VideoPlayer />
      </ConfigProvider>
    </>
  );
}

export default App;
