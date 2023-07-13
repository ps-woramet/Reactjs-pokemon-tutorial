1. npm create vite@latest
    project name: reactjs-pokemon-tutorial
    > react
    > javascript

2. cd reactjs-pokemon-tutorial
    npm i
    npm run dev

3. npm i axios (สำหรับ fetch api https://pokeapi.co)

4. App.jsx
    import axios from 'axios'
    import { useState, useEffect } from 'react'

5. tailwind > get started > framework guides > vite

    npm install -D tailwindcss postcss autoprefixer
    npx tailwindcss init -p

    5.1 tailwind.config.js ทำการแก้ไข
    
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],

    5.2 index.css

    @tailwind base;
    @tailwind components;
    @tailwind utilities;

    5.3 npm run start อีกรอบ

6. npm i react-icons, npm i react-loading