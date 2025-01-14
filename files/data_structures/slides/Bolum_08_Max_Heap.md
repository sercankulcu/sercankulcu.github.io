---
layout: archive
permalink: /max-heap/
title: "Heap Simulator - Interactive Max Heap Visualization"
author_profile: true
redirect_from: 
  - /max-heap.html
---

<style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
            color: #333;
            text-align: center;
            margin: 0 auto;
            padding: 1vw;
            max-width: 800px;
            box-sizing: border-box;
        }
        .container {
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
        }
        .controls {
            display: flex;
            flex-wrap: nowrap;
            justify-content: space-between;
            gap: 1vw;
            width: 100%;
            box-sizing: border-box;
            padding: 1vw;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        input, button {
            width: calc((100% - (4 * 1vw)) / 4);
            padding: 1vw;
            margin: 0;
            border: 2px solid #ccc;
            border-radius: 8px;
            font-size: 1rem;
            box-sizing: border-box;
        }
        button {
            background-color: #4CAF50;
            color: white;
            cursor: pointer;
            border: none;
        }
        button:hover {
            background-color: #45a049;
        }
        #heap-visual {
            width: 100%;
            height: 500px;
            margin-bottom: 20px;
        }
        .node {
            fill: #4CAF50;
            stroke: #2E7D32;
            stroke-width: 2;
            transition: all 0.3s;
            fill: white;
        }
        .node-text {
            fill: white;
            text-anchor: middle;
            dominant-baseline: central;
            font-size: 14px;
            pointer-events: none;
            fill: black;
            font-size: 1rem;
        }
        .node.highlight {
            fill: #FFC107;
            stroke: #FFA000;
        }
        .edge {
            stroke: #2E7D32;
            stroke-width: 2;
        }
        @media (max-width: 600px) {
            input, button {
                font-size: 3vw;
                padding: 2vw;
                width: calc((100% - (4 * 2vw)) / 4);
            }
        }
    </style>

        <h1>Heap Simulator</h1>
        <p>Learn and interact with a Max Heap data structure through this interactive visualization.</p>
        <div class="container">
            <div class="controls">
                <input type="number" id="insert-value" placeholder="Enter a value" aria-label="Value input">
                <button onclick="insertValue()">Insert</button>
                <button onclick="extractMax()">Extract Max</button>
                <button onclick="generateRandom()">Generate</button>
            </div>
            <svg id="heap-visual" aria-label="Heap Visualization"></svg>
        </div>
    <script src="https://d3js.org/d3.v7.min.js"></script>
   
<script>
class MaxHeap {
    constructor() {
        this.heap = [];
    }

    parent(i) { return Math.floor((i - 1) / 2); }
    leftChild(i) { return 2 * i + 1; }
    rightChild(i) { return 2 * i + 2; }

    async swap(i, j) {
        await highlightNodes([i, j]);
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
        await updateVisualization();
        await sleep(500);
    }

    async insert(value) {
        this.heap.push(value);
        await this.heapifyUp(this.heap.length - 1);
    }

    async heapifyUp(i) {
        while (i > 0 && this.heap[this.parent(i)] < this.heap[i]) {
            await this.swap(i, this.parent(i));
            i = this.parent(i);
        }
    }

    async extractMax() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();

        const max = this.heap[0];
        this.heap[0] = this.heap.pop();
        await this.heapifyDown(0);
        return max;
    }

    async heapifyDown(i) {
        let maxIndex = i;
        const left = this.leftChild(i);
        const right = this.rightChild(i);

        if (left < this.heap.length && this.heap[left] > this.heap[maxIndex]) {
            maxIndex = left;
        }
        if (right < this.heap.length && this.heap[right] > this.heap[maxIndex]) {
            maxIndex = right;
        }

        if (i !== maxIndex) {
            await this.swap(i, maxIndex);
            await this.heapifyDown(maxIndex);
        }
    }
}

const radius = 25;
let heap = new MaxHeap();

const svg = d3.select("#heap-visual");

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function highlightNodes(indices) {
    d3.selectAll(".node").classed("highlight", false);
    indices.forEach(i => {
        d3.select(`#node-${i}`).classed("highlight", true);
    });
    await sleep(500);
}

function calculateNodePosition(index) {
    const level = Math.floor(Math.log2(index + 1));
    const position = index - Math.pow(2, level) + 1;
    const levelWidth = Math.pow(2, level);
    const x = (position + 0.9) * (Math.min(window.innerWidth * 0.9, 800) / (levelWidth + 1));
    const y = (level + 1) * 80;
    return { x, y };
}

async function updateVisualization() {
    svg.selectAll("*").remove();

    // Draw edges first
    for (let i = 0; i < heap.heap.length; i++) {
        const leftChild = heap.leftChild(i);
        const rightChild = heap.rightChild(i);
        const parent = calculateNodePosition(i);

        if (leftChild < heap.heap.length) {
            const child = calculateNodePosition(leftChild);
            svg.append("line")
                .attr("class", "edge")
                .attr("x1", parent.x)
                .attr("y1", parent.y)
                .attr("x2", child.x)
                .attr("y2", child.y);
        }
        if (rightChild < heap.heap.length) {
            const child = calculateNodePosition(rightChild);
            svg.append("line")
                .attr("class", "edge")
                .attr("x1", parent.x)
                .attr("y1", parent.y)
                .attr("x2", child.x)
                .attr("y2", child.y);
        }
    }

    // Draw nodes
    for (let i = 0; i < heap.heap.length; i++) {
        const { x, y } = calculateNodePosition(i);
        
        const g = svg.append("g")
            .attr("transform", `translate(${x},${y})`);
        
        g.append("circle")
            .attr("class", "node")
            .attr("id", `node-${i}`)
            .attr("r", radius);
        
        g.append("text")
            .attr("class", "node-text")
            .text(heap.heap[i]);
    }
}

async function insertValue() {
    const input = document.getElementById("insert-value");
    const value = parseInt(input.value);
    if (!isNaN(value)) {
        await heap.insert(value);
        await updateVisualization();
        input.value = "";
    }
}

async function extractMax() {
    await heap.extractMax();
    await updateVisualization();
}

async function generateRandom() {
    heap = new MaxHeap();
    for (let i = 0; i < 15; i++) {
        await heap.insert(Math.floor(Math.random() * 100));
    }
    await updateVisualization();
}

function resizeSVG() {
        const maxWidth = 800; // SVG için maksimum genişlik
        const width = Math.min(window.innerWidth * 0.9, maxWidth); // Ekranın %90'ı veya maksimum genişlik
        const height = Math.min(window.innerHeight * 0.6, 500); // Ekranın %60'ı veya maksimum yükseklik
        
        // SVG boyutlarını güncelle
        svg.attr("width", width).attr("height", height);
    }

    // Pencere boyutu değiştiğinde yeniden boyutlandır
    window.addEventListener("resize", resizeSVG);

    // İlk yüklemede boyutlandır
    resizeSVG();

updateVisualization();
</script>