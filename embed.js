/**
 * Rosie Chat Widget Embed Script
 *
 * Usage: Add this script tag to any website:
 * <script src="https://detaildynamics.vercel.app/embed.js"></script>
 */

(function() {
  // Prevent double-loading
  if (window.RosieChatWidgetLoaded) {
    console.warn('Rosie Chat Widget already loaded');
    return;
  }
  window.RosieChatWidgetLoaded = true;

  // Create iframe for the widget
  const iframe = document.createElement('iframe');
  iframe.src = 'https://detaildynamics.vercel.app/widget.html';
  iframe.style.cssText = `
    position: fixed;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    border: none;
    pointer-events: none;
    z-index: 999999;
  `;

  // Allow pointer events only on the widget area
  iframe.setAttribute('allow', 'microphone');
  iframe.setAttribute('title', 'Rosie Chat Widget');

  // Add to page when DOM is ready
  function addWidget() {
    document.body.appendChild(iframe);

    // Enable pointer events on the iframe
    iframe.style.pointerEvents = 'auto';
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addWidget);
  } else {
    addWidget();
  }
})();
