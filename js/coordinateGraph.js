"use strict";

let message = "";
let clickedPoints = [];
let hasUserInputR;
let r;

function isPointInsideArea(x, y, R) {
    let validator = new inputValidator();
    validator.validate(x, y, R);
    message = validator.getMessage();
    return validator.getResponseCode() === 1;
}

function isRadiusAcceptable(R) {
    let validator = new inputValidator();
    validator.validateR(R);
    message = validator.getMessage();
    return validator.getResponseCode() === 1;
}

document.addEventListener("DOMContentLoaded", () => {
    function updateDateTime() {
        const now = new Date();
        document.getElementById("date").innerText = now.toDateString();
        document.getElementById("time").innerText = now.toTimeString().substring(0, 8);
    }

    updateDateTime();
    setInterval(updateDateTime, 1000);
});

window.onload = function () {
    setCanvasDPI();
    drawGraph(3);
}

const canvas = document.getElementById("graphCanvas");
const ctx = canvas.getContext("2d");

let dynamicScalingFactor;

function setCanvasDPI() {
    let dpi = window.devicePixelRatio;
    let canvasElement = document.getElementById('graphCanvas');
    let style = {
        height() {
            return +getComputedStyle(canvasElement).getPropertyValue('height').slice(0, -2);
        },
        width() {
            return +getComputedStyle(canvasElement).getPropertyValue('width').slice(0, -2);
        }
    };

    canvasElement.setAttribute('width', style.width() * dpi);
    canvasElement.setAttribute('height', style.height() * dpi);
}

function drawGraph(R) {
    let width = canvas.width;
    let height = canvas.height;

    let baseScaling = width / 6;
    dynamicScalingFactor = baseScaling / R;
    let yAxisOffset = 15;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    ctx.font = "15px Arial";

    // Draw x and y axes
    ctx.strokeStyle = "gray";
    ctx.lineWidth = 1;
    ctx.beginPath();
    drawAxis(ctx, width / 4, height / 2, 3 * width / 4, height / 2);  // X-axis
    drawAxis(ctx, width / 2, 3 * height / 4, width / 2, height / 4); // Y-axis
    ctx.stroke();

    // Drawing the areas

    // Triangle (lower left)
    ctx.fillStyle = "#0000FF10"; // blue with 10% opacity
    ctx.beginPath();
    ctx.moveTo(width / 2, height / 2);
    ctx.lineTo(width / 2, height / 2 + R * dynamicScalingFactor);
    ctx.lineTo(width / 2 - R * dynamicScalingFactor, height / 2);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "#0000FF";
    ctx.stroke();

    // Rectangle (lower right)
    ctx.fillStyle = "#FFFF0010"; // yellow with 10% opacity
    ctx.fillRect(width / 2, height / 2, R / 2 * dynamicScalingFactor, R * dynamicScalingFactor);
    ctx.strokeStyle = "#FFFF00";
    ctx.strokeRect(width / 2, height / 2, R / 2 * dynamicScalingFactor, R * dynamicScalingFactor);

    // Semi-circle (upper left)
    ctx.fillStyle = "#39FF1410"; // green with 10% opacity
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, R * dynamicScalingFactor, Math.PI, 1.5 * Math.PI);
    ctx.lineTo(width / 2, height / 2);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "#39FF14";
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, R * dynamicScalingFactor, Math.PI, 1.5 * Math.PI);
    ctx.stroke();

    // Draw labels
    ctx.fillStyle = "white";
    const labelR = hasUserInputR ? R.toString() : "R";
    const labelRHalf = hasUserInputR ? (R / 2).toString() : "R/2";

    // X-axis labels
    ctx.fillText(labelR, width / 2 + R * dynamicScalingFactor, height / 2 + 30);
    ctx.fillText(labelRHalf, width / 2 + (R / 2) * dynamicScalingFactor, height / 2 + 30);
    ctx.fillText('-' + labelR, width / 2 - R * dynamicScalingFactor, height / 2 + 30);
    ctx.fillText('-' + labelRHalf, width / 2 - (R / 2) * dynamicScalingFactor, height / 2 + 30);

    // Y-axis labels
    ctx.fillText(labelR, width / 2 + yAxisOffset, height / 2 - R * dynamicScalingFactor);
    ctx.fillText(labelRHalf, width / 2 + yAxisOffset, height / 2 - (R / 2) * dynamicScalingFactor);
    ctx.fillText('-' + labelR, width / 2 + yAxisOffset, height / 2 + R * dynamicScalingFactor);
    ctx.fillText('-' + labelRHalf, width / 2 + yAxisOffset, height / 2 + (R / 2) * dynamicScalingFactor);

    // Draw ticks
    ctx.fillStyle = "white";
    // X-axis tics
    const tickLength = 10; // Length of the tick marks
    for (let tickValue = -R; tickValue <= R; tickValue += R / 2) {
        const xTickPosition = width / 2 + tickValue * dynamicScalingFactor;
        ctx.beginPath();
        ctx.moveTo(xTickPosition, height / 2 - tickLength / 2);
        ctx.lineTo(xTickPosition, height / 2 + tickLength / 2);
        ctx.stroke();
    }

    // Y-axis tics
    for (let tickValue = -R; tickValue <= R; tickValue += R / 2) {
        const yTickPosition = height / 2 - tickValue * dynamicScalingFactor;
        ctx.beginPath();
        ctx.moveTo(width / 2 - tickLength / 2, yTickPosition);
        ctx.lineTo(width / 2 + tickLength / 2, yTickPosition);
        ctx.stroke();
    }
    if (hasUserInputR) {
        // console.log("drawing points");
        drawAllPoints();
    }
}

