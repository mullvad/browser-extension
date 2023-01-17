<template>
  <svg
    width="24"
    height="24"
    stroke="#ffffff"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g class="spinner">
      <circle cx="12" cy="12" r="9.5" fill="none" stroke-width="2"></circle>
    </g>
  </svg>
</template>

<style>
.spinner {
  transform-origin: center;
  animation: spinner-a 5s linear infinite;
}

.spinner circle {
  stroke-linecap: round;
  animation: spinner-b 3s ease-in-out infinite;
}

@keyframes spinner-a {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes spinner-b {
  0% {
    stroke-dasharray: 0 150;
    stroke-dashoffset: 0;
  }

  47.5% {
    stroke-dasharray: 42 150;
    stroke-dashoffset: -16;
  }

  95%,
  100% {
    stroke-dasharray: 42 150;
    stroke-dashoffset: -59;
  }
}
</style>
