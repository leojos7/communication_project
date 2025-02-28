function saveFile(descriptionInput) {
  let uploads = loadFilesFromLocalStorage();
  let file = {
    id: Date.now(),
    description: descriptionInput,
    filename: fileInput.files[0].name,
    uploadedUser: sessionStorage.getItem("email"),
  };
  uploads.push(file);
  localStorage.setItem("uploads", JSON.stringify(uploads));
}

function updateFile(documentId) {
  let descriptionValue = document.getElementById("description").value;

  if (descriptionValue === "") {
    alert("Please enter description");
    return false;
  }

  let filenameValue = document.getElementById("filename").value;

  if (filenameValue === "") {
    alert("Please enter filename");
    return false;
  }

  let files = loadFilesFromLocalStorage();
  let file = findDocumentbyId(files, documentId);

  if (file) {
    let newFile = {
      id: file.id,
      description: descriptionValue,
      filename: filenameValue,
      uploadedUser: file.uploadedUser,
    };
    Object.assign(file, newFile);
    localStorage.setItem("uploads", JSON.stringify(files));
  } else {
    alert("document not found");
  }
  return true;
}

function deleteFile() {
  let documentId = getUserIdFromURL();
  if (documentId) {
    let confirmDelete = confirm(
      "Are you sure you want to delete this document?"
    );
    if (confirmDelete) {
      let documentList = loadFilesFromLocalStorage();
      let updatedDocumentList = documentList.filter(
        (document) => document.id != documentId
      );
      localStorage.setItem("uploads", JSON.stringify(updatedDocumentList));
    }
    redirect("Documentlist.html");
  }
}

function uploadFile() {
  let fileInput = document.getElementById("fileInput");
  let descriptionInput = document.getElementById("descriptionInput").value;

  if (fileInput.files.length > 0 && descriptionInput.trim() !== "") {
    saveFile(descriptionInput);
    closeUploadModal();
    setTimeout(() => {
      location.reload();
    }, 300);
  } else {
    alert("Please select a file and enter a description.");
  }
}

function loadFiles() {
  let uploads = loadFilesFromLocalStorage();
  let tableBody = document
    .getElementById("myUploadsTable")
    .querySelector("tbody");
  tableBody.innerHTML = "";

  uploads.forEach((upload) => {
    if (upload.uploadedUser !== sessionStorage.getItem("email")) {
      return;
    }
    let row = `<tr>
                      <td>${upload.description}</td>
                      <td>${upload.filename}</td>
                      <td>
                        <a href="EditDocument.html?id=${upload.id}">Edit</a> | 
                          <a href="DeleteUpload.html?id=${upload.id}">Delete</a>
                      </td>
                   </tr>`;
    tableBody.innerHTML += row;
  });

  tableBody.innerHTML += `<tr>
                                  <td colspan="3" style="text-align:center;">
                                    <button id="uploadBtn" onclick="showUploadModal()">Upload</button>
                                  </td>
                                </tr>`;
}

function loadFileForEditPage() {
  let documents = loadFilesFromLocalStorage();
  let documentId = getUserIdFromURL();
  let file = findDocumentbyId(documents, documentId);
  if (file) {
    document.getElementById("description").value = file.description;
    document.getElementById("filename").value = file.filename;
  }
}
