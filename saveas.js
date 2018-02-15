function download(content, filename, contentType)
{
    if(!contentType) contentType = 'application/octet-stream';
        var a = document.createElement('a');
        var blob = new Blob([JSON.stringify(content)], {'type':contentType});
        a.href = window.URL.createObjectURL(blob);
        a.download = filename;
        a.click();
}

function upload($input, callback) 
{
    $input[0].onchange = function(evt) {
        if(!window.FileReader) return; // Browser is not compatible    
        var reader = new FileReader();    
        reader.onload = function(evt) {
            if(evt.target.readyState != 2) return;
            if(evt.target.error) {
                alert('Error while reading file');
                return;
            }    
            filecontent = evt.target.result;    
            callback(evt.target.result);
        };    
        reader.readAsText(evt.target.files[0]);
    };        
}