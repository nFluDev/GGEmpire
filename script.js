const dragLayer = document.getElementById('drag-layer');

function setDragMode(state) {
    if (state) {
        dragLayer.classList.add('active');
        console.log('-> Drag mode activated via menu.');
    } else {
        dragLayer.classList.remove('active');
        console.log('-> Drag mode deactivated via menu.');
    }
}

window.electronAPI.onToggleMoveMode((_, state) => {
    setDragMode(state);
});