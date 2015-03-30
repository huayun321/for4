$( document ).ready(function() {
    var canvas = new fabric.Canvas('canvas');

    /*
     * tool bar
     * */
    $('#toolbar > button').click(function (e) {
        var btn_id = e.target.id;
        //active
        $('#toolbar > button').removeClass('disabled');
        $('#' + btn_id).addClass('disabled');

        //drawingmode
        canvas.isDrawingMode = false;


    });

    $('#text-add').click(function () {
        var text = $('#text-content').val();
        var color = $('#text-color').val();
        var t = new fabric.Text(text, {
            fill: color
        });
        canvas.add(t);
    });


    //stamp
    $("input[name='shape']").change(function (e) {
        var shape = $(e.target).val();
        console.log(shape);
        switch (shape) {
            case 'circle':

                $('#input2').prop('disabled', true);
                break;
            case 'ellipse':

                $('#input2').prop('disabled', false);
                break;
            case 'rect':

                $('#input2').prop('disabled', false);
                break;
            case 'heart':
                $('#input2').prop('disabled', true);
                break;

        }

    });
    $('#add-shape-to').click(function(e) {
        e.preventDefault();
        var shape = $('input[name=shape]:checked').val();

        switch (shape) {
            case 'circle':
                var r = (parseInt($('#input1').val(), 10) || 1) * 11.8 / 2;
                var x = (parseInt($('#inputx').val(), 10) || 1) * 11.8;
                var y = (parseInt($('#inputy').val(), 10) || 1) * 11.8;
                var circle = new fabric.Circle({
                    radius: r, fill: '#cccccc', left: x, top: y, opacity: 0.5
                });


                canvas.add(circle);
                break;
            case 'ellipse':
                var h = (parseInt($('#input1').val(), 10) || 1) * 11.8 / 2;
                var w = (parseInt($('#input2').val(), 10) || 1) * 11.8 / 2;
                var x = (parseInt($('#inputx').val(), 10) || 1) * 11.8;
                var y = (parseInt($('#inputy').val(), 10) || 1) * 11.8;
                var ellipse = new fabric.Ellipse({
                   rx: w, ry:h, fill: '#cccccc', left: x, top: y, opacity: 0.5
                });
                canvas.add(ellipse);
                break;
            case 'rect':
                var h = (parseInt($('#input1').val(), 10) || 1) * 11.8;
                var w = (parseInt($('#input2').val(), 10) || 1) * 11.8;
                var x = (parseInt($('#inputx').val(), 10) || 1) * 11.8;
                var y = (parseInt($('#inputy').val(), 10) || 1) * 11.8;
                var rect = new fabric.Rect({
                    width: w, height:h, fill: '#cccccc', left: x, top: y, opacity: 0.5
                });
                canvas.add(rect);
                break;
            case 'heart':
                var h = (parseInt($('#input1').val(), 10) || 1) * 11.8;
                var w = (parseInt($('#input2').val(), 10) || 1) * 11.8;
                var x = (parseInt($('#inputx').val(), 10) || 1) * 11.8;
                var y = (parseInt($('#inputy').val(), 10) || 1) * 11.8;
                var svg_path = '/templates/svg/heart.svg';
                fabric.loadSVGFromURL(svg_path, function (objects, options) {
                    var obj = fabric.util.groupSVGElements(objects, options);
                    obj.scaleToHeight(h);
                    obj.left = x;
                    obj.top = y;
                    obj.opacity = 0.5;
                    canvas.add(obj);

                });
                break;
        }
    });


/*
* sidebar
* */
    $('#tool-sidebar').click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });
    $('#tool-save').click(function() {
        //var json = JSON.stringify(canvas);
        //alert(json);
        //console.log(JSON.stringify(canvas));
        $('#myModal').modal();
    });
    $('#tool-clear').click(function() {
        canvas.clear();
    });
    //save template
    $('#crop').click(function() {
        $('#myModal').modal('hide');
        var name = $("#templateName").val();
        //var desc = $("#templateDesc").val();
        var json = JSON.stringify(canvas)
        //alert(json);
        //window.location.replace(png);
        var url = "/admin/templates/add";
        var posting = $.post( url, { size: name, obj: json } );
        //Put the results in a div
        posting.done(function( data ) {
            window.location.replace("/admin/templates/list");
        });

    });



    function browser_check() {
        if (window.File && window.FileReader && window.FileList &&
            window.Blob) {
            //All the File APIs are supported.
        } else {
            alert('当前网页浏览器版本过低，请下载新版浏览器。建议使用新版google浏览器或火狐浏览器。');
        }
    }
    browser_check();


    $('#bg-color').change(function () {
        var color = $('#bg-color').val();
        canvas.setBackgroundColor(color, canvas.renderAll.bind(canvas));
    });

});