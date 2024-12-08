import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

// Registering the necessary elements for Chart.js
//Chart.register(CategoryScale, LinearScale, LineController, LineElement, PointElement, ArcElement);

const root = createRoot(document.getElementById('root'));
root.render(<App />);

reportWebVitals();
