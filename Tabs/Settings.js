$(function() {
 
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
    
    $('#load_file_button').click(function() {
        $('#load_file').click();
    });

    $('#save_file_button').on('click', function() {
        download(Gloomhaven.data, Gloomhaven.data.Name + '.txt');
    });

    upload($('#load_file'), function(data) {
        Gloomhaven.LoadData(JSON.parse(data));
    });

    $('#clear').on('click', function() {
        if (confirm("Are you sure you want to clear all data?")) {
            localStorage.clear();
            window.location.reload();        
        }
    });

    $('#player_name').on('keyup', function(e) {
        if (e.originalEvent.keyCode == 13) {
            AddPlayer();
            $(this).val('').focus();
        }
    });
});