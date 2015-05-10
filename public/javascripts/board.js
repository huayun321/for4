$( document ).ready(function() {
    var user_id = '';

    //initial canvas and crop canvas and some global var
    var canvas = new fabric.Canvas('canvas');
    canvas.setBackgroundColor('white', canvas.renderAll.bind(canvas));
    var m_canvas = new fabric.Canvas('modal-canvas');
    var stamp = null;

    //initial canvas from template.json
    canvas.loadFromJSON(json, canvas.renderAll.bind(canvas));
    canvas.getObjects().map(function(o) {
        o.set('lockMovementY', true);
        o.set('lockMovementX', true);
        o.set('hasControls', false);
        return;
    });


    //socket.io thing
    //$(function() {
    //    var socket = io.connect('http://localhost:3000/user');
    //
    //    socket.on("connect",function() {
    //        console.log("on connect");
    //    });
    //
    //    socket.on('progress', function(data) {
    //        $('.bar').css('width', data+'%');
    //        if(data == 100) {
    //            $('#upload_over').removeClass('disabled');
    //            $('#upload_cancel').removeClass('disabled');
    //        }
    //    });
    //
        function dataURItoBlob(dataURI) {
            // convert base64/URLEncoded data component to raw binary data held in a string
            var byteString;
            if (dataURI.split(',')[0].indexOf('base64') >= 0)
                byteString = atob(dataURI.split(',')[1]);
            else
                byteString = unescape(dataURI.split(',')[1]);

            // separate out the mime component
            var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

            // write the bytes of the string to a typed array
            var ia = new Uint8Array(byteString.length);
            for (var i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }

            return new Blob([ia], {type:mimeString});
        }
    //
        $('#upload').click(function() {
            var png = canvas.toDataURL();
            var blob = dataURItoBlob(png);
            blob.type = 'image/png';
            blob.name = 'hello.png';
            //console.log('upload');
            //var canvas_el = $('canvas');
            //var canvas1 = document.createElement('canvas');
            //if (canvas1.toBlob) {
            //    canvas1.toBlob(
            //        function (blob) {
            //            // Do something with the blob object,
            //            // e.g. creating a multipart form for file uploads:
            //            //var formData = new FormData();
            //            //formData.append('file', blob, fileName);
            //            /* ... */
            //            console.log('appended');
            //var activeUploads = $('#fileupload').fileupload('active');
            //console.log(activeUploads);
            $('#fileupload').fileupload('add', {files: blob});
            //        },
            //        'image/jpeg'
            //    );
            //}
        });
    //
    //});
    ////    Change this to the location of your server-side upload handler:
    var url = window.location.hostname === 'localhost' ?
        '//localhost:3000/upload/rubies' : 'upload/rubies/';
    var sendData= true;
    $('#fileupload').fileupload({
        url: url,
        dataType : 'json',
        //autoUpload : false,
        add : function(e,data){
            console.log('====add');
            console.log(data.files[0].name);
//            $("#myForm button").on("click",function(e){
////
//                e.preventDefault();
//                if(sendData){
//                    $("fileupload").attr('action', 'upload/posts');
                    data.formData = $("#fileupload").serializeArray();
//                    sendData = false;
            console.log(data.formData);
//                }
//                $("#myForm button").addClass('disabled');
                data.submit();
//
//            });
        },
        progressall: function (e, data) {
            console.log(data.loaded);
            //var progress = parseInt(data.loaded / data.total * 100, 10);
            //$('#progress .progress-bar').css(
            //    'width',
            //    progress + '%'
            //);
        },

        done: function(e,data){
            console.log('done');
            //sendData = true;
            //var category = $('#category').val();
            //var url = window.location.hostname === 'localhost' ?
            //'//localhost:3000/bbs/list/'+ category : 'bbs/list/'+ category;
            //window.location.replace(url);
        }
    })

    //on click save
    $('#save').click(function() {
        //user_id = $('#user_id').val();
        //$('#upload_form').modal('setting', 'closable', false)
        //                 .modal('show');
        //$('#upload_over').addClass('disabled');
        //$('.bar').css('width', 0+'%');
        $('#save_modal').modal('show');
    });

    //on click crop
    $('#crop').click(function() {
        stamp.opacity = 0;
        //crop
        var dataUrl = null;
        dataUrl = m_canvas.toDataURL({
            top: stamp.top,
            left: stamp.left,
            width: stamp.width * stamp.scaleX,
            height: stamp.height *  stamp.scaleY
        });

        stamp = canvas.getActiveObject();

        fabric.Image.fromURL(dataUrl, function(iimg) {
            console.log('load img');
            iimg.top =  stamp.top;
            iimg.left = stamp.left;

            stamp.opacity =1;
            var stam_png = stamp.toDataURL();
            fabric.Image.fromURL(stam_png, function(mimg) {
                console.log('load mask');
                iimg.filters.push( new fabric.Image.filters.Mask( { 'mask': mimg, channel:3} ) );

                iimg.applyFilters(canvas.renderAll.bind(canvas));
                iimg.lockMovementY = true;
                iimg.lockMovementX = true;
                iimg.hasControls = false;
                canvas.add(iimg);
                canvas.remove(stamp);

            });
        });

        $('#my_modal').modal('hide');
        m_canvas.clear();
    });

    //on click imgbox img
    //$('#imgbox > img').click(function(e) {
    function handle_img_click(e) {
        var img_src = e.target.src || $(e.target).children().first().attr('src');
        //stamp = canvas.getActiveObject();
        console.log("===========e.target.src" + e.target.src);
        console.log("===========img click");
//        function handle_img_click(e) {
        if(!canvas.getActiveObject()) {
            return alert('请先在画板中选择一个图案，再点击图片剪切。');
        };
        stamp = fabric.util.object.clone(canvas.getActiveObject());
        stamp.hasControls = false;
        stamp.opacity = 1;
        stamp.lockMovementY = false;
        stamp.lockMovementX = false;

//        load img
        fabric.Image.fromURL(img_src, function (oimg) {
            if (oimg.width > 750) {
                oimg.height = oimg.height * (750 / oimg.width);
                oimg.width = 750;
            }
            m_canvas.centerObject(oimg);
            m_canvas.add(oimg);
            oimg.setCoords();



            m_canvas.centerObject(stamp);
            m_canvas.add(stamp).setActiveObject(stamp);
            stamp.setCoords();
        });
        $('#my_modal').modal('show');



    };



    /*
    *  browser upload img
    * */
    function browser_check() {
        if (window.File && window.FileReader && window.FileList &&
            window.Blob) {
            //All the File APIs are supported.
        } else {
            alert('当前网页浏览器版本过低，请下载新版浏览器。建议使用新版google浏览器或火狐浏览器。');
        }
    }
    browser_check();


    function handleFileSelect(evt) {
        var files = evt.target.files;

        //loop throuth the FileList and render image files as thumbnails.
        for (var i = 0, f; f = files[i]; i++) {

            //only process image files.
            if (!f.type.match('image.*')) {
                continue;
            }

            var reader = new FileReader();

            //closure to capture the file information.
            reader.onload = (function(theFile) {
                return function (e) {
                    //Render thumbnail.
                    var thumb = ['<a ><img width="150" class="img-thumbnail"  src="',
                        e.target.result,
                        '" title="', escape(theFile.name),
                        '"/></a>'].join('');
                    $('#img_box').append($(thumb).click(function(e){handle_img_click(e)}));
                };
            })(f);

            //read in the image file as a data URL.
            reader.readAsDataURL(f);
        }
    }

    document.getElementById('files').addEventListener('change',
        handleFileSelect, false);


    $('#img-add').click(function() {
        $('#files').click();
        return false;
    });

});
