// State management
let isSelected = false;
let selectionCoordinates = null;

// Get button references
const selectButton = document.getElementById('select-button');
const playPauseButton = document.getElementById('play-pause-button');
const nextButton = document.getElementById('next-button');

// Handle Select/Clear Selection button click
selectButton.addEventListener('click', () => {
  if (!isSelected) {
    // Start selection
    window.electronAPI.startSelection();
  } else {
    // Clear selection
    window.electronAPI.clearSelection();
  }
});

// Listen for selection stored event from main process
window.electronAPI.onSelectionStored((coordinates) => {
  isSelected = true;
  selectionCoordinates = coordinates;
  selectButton.textContent = 'clear selection';

  console.log('Selection stored:', coordinates);
  // TODO: Enable play/pause and next buttons once selection is made
});

// Listen for selection cleared event from main process
window.electronAPI.onSelectionCleared(() => {
  isSelected = false;
  selectionCoordinates = null;
  selectButton.textContent = 'select';

  console.log('Selection cleared');
  // TODO: Disable play/pause and next buttons when no selection
});

// Placeholder handlers for other buttons (to be implemented later)
playPauseButton.addEventListener('click', () => {
  console.log('Play/Pause clicked');
  // TODO: Implement play/pause functionality
});

nextButton.addEventListener('click', () => {
  console.log('Next clicked');
  // TODO: Implement next functionality
});

// ESC key handler to clear selection
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && isSelected) {
    window.electronAPI.clearSelection();
  }
});