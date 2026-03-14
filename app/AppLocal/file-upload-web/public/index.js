// index.js
const dropzone = document.getElementById('dropzone');
const fileInput = document.getElementById('fileInput');
const fileList = document.getElementById('fileList');

// Trigger file input on click
dropzone.addEventListener('click', () => fileInput.click());

// Handle file selection
fileInput.addEventListener('change', (e) => {
    processFiles(e.target.files);
});

// Drag and Drop Logic
dropzone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropzone.style.borderColor = "#1d4ed8";
    dropzone.style.backgroundColor = "#dbeafe";
});

dropzone.addEventListener('dragleave', () => {
    dropzone.style.borderColor = "#3b82f6";
    dropzone.style.backgroundColor = "#f8fbff";
});

dropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropzone.style.borderColor = "#3b82f6";
    dropzone.style.backgroundColor = "#f8fbff";
    processFiles(e.dataTransfer.files);
});

function processFiles(files) {
    const selectedFiles = Array.from(files);
    
    selectedFiles.forEach(file => {
        if (!file.type.startsWith('image/')) {
            alert(`File "${file.name}" is not a valid image!`);
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            addFileToList(event.target.result, file.name);
        };
        reader.readAsDataURL(file);
    });
}

function addFileToList(imgData, name) {
    const timestamp = new Date().toLocaleDateString('en-GB'); // Format: DD/MM/YYYY
    const uniqueId = 'item-' + Date.now() + Math.floor(Math.random() * 100);

    const li = document.createElement('li');
    li.id = uniqueId;
    li.className = "flex items-center justify-between p-4 bg-gray-50 border rounded-lg hover:bg-white transition shadow-sm";

    li.innerHTML = `
        <div class="flex items-center gap-4 flex-1">
            <img src="${imgData}" class="w-14 h-14 object-cover rounded shadow-sm border bg-white">
            <div class="flex flex-col w-full max-w-xs">
                <input type="text" value="${name}" 
                    class="bg-transparent border-b border-transparent focus:border-blue-500 focus:outline-none font-semibold text-gray-800 px-1"
                    title="Click to rename">
                <span class="text-xs text-blue-500 uppercase font-bold mt-1">Ready to save</span>
            </div>
        </div>
        <div class="flex items-center gap-8">
            <span class="text-sm font-medium text-gray-400">${timestamp}</span>
            <button onclick="deleteItem('${uniqueId}')" class="text-gray-400 hover:text-red-600 transition p-2">
                <i class="fas fa-trash-alt text-lg"></i>
            </button>
        </div>
    `;
    fileList.appendChild(li);
}

function deleteItem(id) {
    if (confirm("Are you sure you want to remove this file?")) {
        const el = document.getElementById(id);
        el.style.opacity = '0';
        setTimeout(() => el.remove(), 200);
    }
}

function saveChanges() {
    const fileCount = fileList.children.length;
    if (fileCount === 0) {
        alert("No files to save.");
    } else {
        alert(`Success! ${fileCount} file(s) updated in the database.`);
    }
}