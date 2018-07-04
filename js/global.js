(function(){
    "use strict";

    var dropZone = document.getElementById('drop-zone');
    var barFill = document.getElementById('bar-fill');
    var barFillText = document.getElementById('bar-fill-text');
    var uploadsFinished = document.getElementById('uploads-finished');
    var processor = 'upload.php';

    var startUpload = function(files){
        barFill.style.width = 0;
        
        app.uploader({
            files: files,
            progressBar: barFill,
            pregressText: barFillText,
            processor: processor,

            finished: function(data){
                var currFile;
                var x;
                var uploadedElement;
                var uploadedAnchor;
                var uploadedStatus;

                for(x = 0; x < data.length; ++x){
                    currFile = data[x];

                    uploadedElement = document.createElement('div');
                    uploadedElement.className = 'upload-console-upload';

                    uploadedAnchor = document.createElement('a');
                    uploadedAnchor.textContent = currFile.name;

                    uploadedStatus = document.createElement('span');

                    if(currFile.uploaded){
                        uploadedAnchor.href = currFile.destFolder + currFile.newFile;
                        uploadedStatus.textContent = 'Uploaded';
                        uploadedStatus.className = 'successUpload';
                    } else {
                        uploadedStatus.textContent = 'Failed';
                        uploadedStatus.className = 'failedUpload';
                    }

                    
                    uploadedElement.appendChild(uploadedAnchor);
                    uploadedElement.appendChild(uploadedStatus);

                    uploadsFinished.appendChild(uploadedElement);
                }

                uploadsFinished.className = '';
            },

            error: function(){
                console.log('there was some error');
            }
        });
    };

    // Standard form upload
    document.getElementById('standard-upload').addEventListener('click', function(e){
        var standardUploadFiles = document.getElementById('standard-upload-file').files;
        e.preventDefault();

        startUpload(standardUploadFiles);
    });


    // Drop functionality
    dropZone.ondrop = function(e){
        e.preventDefault();
        this.className = 'upload-console-drop';

        startUpload(e.dataTransfer.files);
    };

    dropZone.ondragover = function(){
        this.className = 'upload-console-drop drop';
        return false;
    };

    dropZone.ondragleave = function(){
        this.className = 'upload-console-drop';
        return false;
    };
}());