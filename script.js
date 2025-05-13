    const canvas = document.getElementById('board');
    const ctx = canvas.getContext('2d');
    let drawing = false;
    let tool = 'pen';
    let color = document.getElementById('colorPicker').value;

    const textInput = document.getElementById('textInput');

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('click', handleText);

    function setTool(selectedTool) {
      tool = selectedTool;
    }

    document.getElementById('colorPicker').addEventListener('change', (e) => {
      color = e.target.value;
    });

    function startDrawing(e) {
      if (tool === 'pen' || tool === 'eraser') {
        drawing = true;
        ctx.beginPath();
        ctx.moveTo(e.offsetX, e.offsetY);
      }
    }

    function stopDrawing() {
      drawing = false;
    }

    function draw(e) {
      if (!drawing) return;
      ctx.strokeStyle = tool === 'pen' ? color : '#ffffff';
      ctx.lineWidth = tool === 'pen' ? 2 : 10;
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();
    }

    function handleText(e) {
      if (tool !== 'text') return;
      const x = e.offsetX;
      const y = e.offsetY;
      textInput.style.left = x + 'px';
      textInput.style.top = y + 'px';
      textInput.style.display = 'block';
      textInput.focus();

      textInput.onkeydown = function (event) {
        if (event.key === 'Enter') {
          const text = textInput.value;
          ctx.font = '16px sans-serif';
          ctx.fillStyle = color;
          ctx.fillText(text, x, y);
          textInput.value = '';
          textInput.style.display = 'none';
        }
      };
    }

    function clearBoard() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
/* saving */
    function saveBoard() {
      const link = document.createElement('a');
      link.download = 'whiteboard.png';
      link.href = canvas.toDataURL();
      link.click();
    }

    // Preview Hover Feature (New 2025 UX Enhancement)
    canvas.addEventListener('mousemove', (e) => {
      if (tool === 'text') {
        canvas.style.cursor = 'text';
      } else {
        canvas.style.cursor = 'crosshair';
      }
    });
