var app = app || {};

(function(o){
    "use strict";

    // Private methods
    var ajax, getFormData, setProgress;

    ajax = function(data){
        var xhttp = new XMLHttpRequest();
        var uploaded;

        xhttp.onreadystatechange = function() {
            if (this.readyState == 4) {
                if(this.status == 200){

                    uploaded = JSON.parse(this.response);
                    
                    if(typeof o.options.finished === 'function'){
                        o.options.finished(uploaded);
                    }

                } else {
                    if(typeof o.options.error === 'function'){
                        o.options.error();
                    }
                }
            }
        };

        xhttp.upload.addEventListener('progress', function(e){
            var percent;

            if(e.lengthComputable === true){
                percent = Math.round((e.loaded / e.total) * 100);
                setProgress(percent);
            }
        });

        xhttp.open("POST", o.options.processor, true);
        xhttp.send(data);
    };

    getFormData = function(source){
        var data = new FormData();
        var i;        

        for(i = 0; i < source.length; ++i){            
            data.append('files[]', source[i]);
        }

        return data;
    };

    setProgress = function(percent){
        if(o.options.progressBar !== undefined){
            o.options.progressBar.style.width = percent ? percent + '%' : 0;
        }

        if(o.options.pregressText !== undefined){
            o.options.pregressText.textContent = percent ? percent + '%' : '';
        }
    };

    o.uploader = function(options){
        o.options = options;        

        if(options.files !== undefined){
            var formData = getFormData(options.files);
            ajax(formData);
        }
    };


}(app));