// Create an array to hold on to the shapes currently drawn
window.drawio = {
    // All shapes currently on the canvas
    shapes: [],
    selectedShape: 'rectangle', // Rectangle chosen by default
    canvas: document.getElementById('my-canvas'),
    ctx: document.getElementById('my-canvas').getContext('2d'),
    selectedElement: null,
    availableShapes: {
        RECTANGLE: 'rectangle'
    }
};

$(function() {
    //Document is loaded and parsed

    function drawCanvas() {
        if (drawio.selectedElement) {
            drawio.selectedElement.render();
        }
        for (let i = 0; i < drawio.shapes.length; i++) {
            drawio.shapes[i].render();
        }
    };

    $('.icon').on('click', function () {
        $('icon').removeClass('selected');
        $(this).addClass('selected');
        drawio.selectedShape = $(this).data('shape');
    });

    // MouseDown
    $('#my-canvas').on('mousedown', function (mouseEvent) {
        switch (drawio.selectedShape) {
            case drawio.availableShapes.RECTANGLE:
                drawio.selectedElement = new Rectangle({ x: mouseEvent.offsetX, y: mouseEvent.offsetY }, 0, 0);
                break;
        }
    });

    // MouseMove
    $('#my-canvas').on('mousemove', function (mouseEvent) {
        if (drawio.selectedElement) {
            drawio.ctx.clearRect(0, 0, drawio.canvas.width, drawio.canvas.height);
            drawio.selectedElement.resize(mouseEvent.offsetX, mouseEvent.offsetY);
            drawCanvas();
        }
    });

    // MouseUp
    $('#my-canvas').on('mouseup', function () {
        drawio.shapes.push(drawio.selectedElement);
        console.log(drawio.shapes)
        drawio.selectedElement = null;
    })
});