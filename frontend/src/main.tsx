
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import "./index.css"  // Import RecoilRoot
import App from './App'; // Your main App component

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RecoilRoot>
    <App />
  </RecoilRoot>
);
