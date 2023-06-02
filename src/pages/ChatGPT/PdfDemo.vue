<template>
  <div class="pdf">
    <div ref="container" id="pdfContainer">
      <div id="viewer" class="pdfViewer"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
// import * as pdfjsLib from "pdfjs-dist/build/pdf";
// console.log(pdfjsLib)
// const pdfjsVersion = ''
// onMounted(async () => {
//   let pdfjs = await import('pdfjs-dist/build/pdf.js');
//   let pdfjsWorker = await import('pdfjs-dist/build/pdf.worker.js');
//   let pdfjsViewer = await import('pdfjs-dist/web/pdf_viewer.js');
//   // pdfjs.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.7.570/pdf.worker.min.js';
//   pdfjs.GlobalWorkerOptions.workerSrc = 'https://unpkg.com/pdfjs-dist@3.7.107/build/pdf.worker.min.js';


//   let pdfcontainer = document.getElementById("pdfContainer");
//   let pdfViewer = new pdfjsViewer.PDFViewer({
//     container: pdfcontainer,
//     renderer: {
//       type: String,
//       default: 'canvas'
//     },
//     eventBus: new pdfjsViewer.EventBus(),
//   });
//   // let loadingTask = await pdfjs.getDocument({
//   //   cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.1.266/cmaps/',
//   //   cMapPacked: true,
//   //   url: "https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf",
//   // });

//   let loadingTask = await pdfjs.getDocument({
//     cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.1.266/cmaps/',
//     cMapPacked: true,
//     url: "https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf",
//   });

//   let pdf = await loadingTask.promise;
//   pdfViewer.setDocument(pdf);

// });

</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
}

.container {
  max-width: 80rem;
  height: 100vh;

}

#pdfContainer {
  position: absolute;
  /* overflow: scroll; */
}

.pdfViewer {
  /* overflow: scroll; */
}

.pdf {
  margin: 2.4rem 4.8rem;
  overflow: scroll;
  height: 60vh;
  width: 50%;

}
</style>

