import React from 'react'
import ReactDOM from 'react-dom/client'
import { Sankey } from './sankey/Sankey'
import { chartData } from './test/chartData'
import { settings } from './test/settings'

const rootElement = document.getElementById('root');

if (rootElement) {
rootElement.setAttribute('style', 'width: 100vw; height: 100vh')
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
        <Sankey
            datum={chartData}
            settings={settings}
            height={500}
            width={900}
        />
    </React.StrictMode>
  );
} else {
  console.error("Root element not found!");
}
