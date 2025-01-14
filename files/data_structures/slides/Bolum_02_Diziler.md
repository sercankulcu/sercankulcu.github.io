---
layout: archive
permalink: /data-structure-arrays/
title: "Array Simulator"
author_profile: true
redirect_from: 
---

``
<head>
    <style>

        .controls {
            display: flex;
            justify-content: space-between;
            gap: 1vw;
            box-sizing: border-box;
            padding: 1vw;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        input,
        button {
            width: calc((100% - (4 * 1vw)) / 4);
            padding: 0.5vw;
            margin: 0;
            border: 2px solid #ccc;
            border-radius: 8px;
            font-size: 1rem;
        }

        input:focus,
        button:hover {
            border-color: #4CAF50;
            box-shadow: 0 0 8px rgba(76, 175, 80, 0.5);
        }

        button {
            background-color: #4CAF50;
            color: white;
            cursor: pointer;
            transition: background-color 0.3s;
        }

        button:active {
            background-color: #45a049;
        }

        .array-container {
            min-height: 80px;
            display: flex;
            flex-wrap: nowrap;
            justify-content: left;
            gap: 10px;
            margin: 20px 0px;
            padding: 10px 0;
            overflow-x: auto;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .array-element {
            width: 60px;
            height: 60px;
            border: 2px solid #4CAF50;
            border-radius: 5px;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #e8f5e9;
            transition: all 0.3s ease-in-out;
        }

        .array-element:hover {
            background-color: #c8e6c9;
            cursor: pointer;
        }

        .highlight {
            background-color: #ffff99 !important;
        }

        #output {
            margin: 10px 0px;
            padding: 10px;
            border-radius: 5px;
            text-align: center;
            box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
            font-size: 1.2rem;
        }

        @media (max-width: 768px) {
            input,
            button {
                font-size: 3vw;
                padding: 2vw;
                width: calc((100% - (4 * 2vw)) / 4);
            }
        }
    </style>
</head>
<body>
    <header>
        <p>Interactive learning tool for data structures</p>
    </header>

    <main>
        <div class="controls">
            <input type="number" id="arraySize" min="0" max="20" placeholder="Size">
            <button onclick="createArray()">Create</button>
            <input type="number" id="index" min="0" max="20" placeholder="Index">
            <input type="number" id="value" min="0" max="100" placeholder="Value">
            <button onclick="setValue()">Set</button>
        </div>

        <div class="controls">
            <input type="number" id="searchValue" min="0" max="100" placeholder="Search Value">
            <button onclick="searchArray()">Search</button>
            <button onclick="traverseArray()">Traverse</button>
            <button onclick="sortArray()">Sort</button>
        </div>

        <div id="arrayContainer" class="array-container"></div>
        <div id="output">Operations result will appear here.</div>
    </main>

    <script>
        let array = [];

        function createArray() {
            const size = document.getElementById('arraySize').value;
            array = Array.from({ length: parseInt(size) }, () => Math.floor(Math.random() * 100));
            updateArrayDisplay();
        }

        function setValue() {
            const index = document.getElementById('index').value;
            const value = document.getElementById('value').value;
            if (index >= 0 && index < array.length) {
                array[index] = parseInt(value);
                updateArrayDisplay();
            } else {
                document.getElementById('output').innerText = 'Invalid index';
            }
        }

        function updateArrayDisplay() {
            const container = document.getElementById('arrayContainer');
            container.innerHTML = '';
            array.forEach((value, index) => {
                const element = document.createElement('div');
                element.className = 'array-element';
                element.textContent = value;
                element.id = `element-${index}`;
                container.appendChild(element);
            });
        }

        async function traverseArray() {
            document.getElementById('output').innerText = 'Traversing...';
            for (let i = 0; i < array.length; i++) {
                highlightElement(i);
                await delay(500);
                unhighlightElement(i);
            }
            document.getElementById('output').innerText = 'Traversal complete!';
        }

        async function searchArray() {
            const searchValue = document.getElementById('searchValue').value;
            document.getElementById('output').innerText = `Searching for ${searchValue}...`;
            for (let i = 0; i < array.length; i++) {
                highlightElement(i);
                await delay(500);
                if (array[i] == searchValue) {
                    document.getElementById('output').innerText = `Value found at index ${i}`;
                    unhighlightElement(i);
                    return;
                }
                unhighlightElement(i);
            }
            document.getElementById('output').innerText = 'Value not found!';
        }

        async function sortArray() {
            for (let i = 0; i < array.length; i++) {
                for (let j = 0; j < array.length - i - 1; j++) {
                    highlightElement(j);
                    highlightElement(j + 1);
                    await delay(500);
                    if (array[j] > array[j + 1]) {
                        [array[j], array[j + 1]] = [array[j + 1], array[j]];
                        updateArrayDisplay();
                    }
                    unhighlightElement(j);
                    unhighlightElement(j + 1);
                }
            }
            document.getElementById('output').innerText = 'Array sorted!';
        }

        function highlightElement(index) {
            document.getElementById(`element-${index}`).classList.add('highlight');
        }

        function unhighlightElement(index) {
            document.getElementById(`element-${index}`).classList.remove('highlight');
        }

        function delay(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        createArray();
    </script>
</body>
</html>
