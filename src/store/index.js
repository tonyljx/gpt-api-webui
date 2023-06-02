import { reactive } from "vue";

export const store = reactive({
    fileName: null,
    setFileName(filename) {
        this.fileName = filename
    },
    fileUrl: null,
    setFileUrl(fileUrl) {
        this.fileUrl = fileUrl
    },
})