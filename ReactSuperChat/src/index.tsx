import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
const appTitle:string = "SuperChat "
const titleContainer = <div className="flex flex-col justify-center bg-gray-200 min-h-screen">
                            <h1 className="font-semibold p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center text-gray-500 space-x-4">{appTitle}<sub>~ Testing Tailwind utilities</sub>  </h1>
                       </div>


ReactDOM.render(
  <React.StrictMode>
      {titleContainer}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
