<template>
  <h1 class="  text-center text-2xl">PDF.js 'Hello, world!' example</h1>
  <canvas id="the-canvas"></canvas>
</template>


<script setup>

import * as pdfjs from 'pdfjs-dist/build/pdf'
// import * as pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry'

pdfjs.GlobalWorkerOptions.workerSrc = 'https://unpkg.com/pdfjs-dist@3.7.107/build/pdf.worker.min.js';

// pdf.js 的 demo
// Asynchronous download of PDF
var loadingTask = pdfjs.getDocument('./meituan_course.pdf');
loadingTask.promise.then(function (pdf) {
  console.log('PDF loaded');
  // Fetch the first page
  var pageNumber = 2;
  pdf.getPage(pageNumber).then(function (page) {
    console.log('Page loaded');
    var scale = 1.25;
    var viewport = page.getViewport({ scale: scale });

    // Prepare canvas using PDF page dimensions
    var canvas = document.getElementById('the-canvas');
    var context = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    // Render PDF page into canvas context
    var renderContext = {
      canvasContext: context,
      viewport: viewport
    };
    var renderTask = page.render(renderContext);
    renderTask.promise.then(function () {
      console.log('Page rendered');
    });
  });
}, function (reason) {
  // PDF loading error
  console.error(reason);
});


</script>


<style scoped>
#the-canvas {
  border: 1px solid black;
  direction: ltr;
  max-width: 60rem;
  margin: 0 auto;
}
</style>


