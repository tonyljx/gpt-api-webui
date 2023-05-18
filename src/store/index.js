import {reactive} from "vue";

export const store = reactive({
    fileName: null,
    setFileName(filename){
        this.fileName = filename
    }
})