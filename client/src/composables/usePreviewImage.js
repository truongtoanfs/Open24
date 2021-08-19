export default function previewImage(event) {
    const files = event.target.files;
    const fileList = [];
    for(let i = 0; i < files.length; i++) {
        fileList.push(files[i]);
    }
    return fileList.map(file => URL.createObjectURL(file));
}