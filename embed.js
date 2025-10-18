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
    bottom: 20px;
    right: 20px;
    width: 80px;
    height: 80px;
    border: none;
    pointer-events: auto;
    z-index: 999999;
    transition: width 0.3s ease, height 0.3s ease;
  `;

  // Allow pointer events only on the widget area
  iframe.setAttribute('allow', 'microphone');
  iframe.setAttribute('title', 'Rosie Chat Widget');

  // Listen for messages from the widget to resize the iframe
  window.addEventListener('message', function(event) {
    // Verify the message is from our widget
    if (event.origin !== 'https://detaildynamics.vercel.app') return;

    if (event.data.type === 'rosie-widget-opened') {
      // Widget opened - expand to full size
      iframe.style.width = '400px';
      iframe.style.height = '600px';
      iframe.style.bottom = '0';
      iframe.style.right = '0';
    } else if (event.data.type === 'rosie-widget-closed') {
      // Widget closed - shrink to button size
      iframe.style.width = '80px';
      iframe.style.height = '80px';
      iframe.style.bottom = '20px';
      iframe.style.right = '20px';
    }
  });

  // Add to page when DOM is ready
  function addWidget() {
    document.body.appendChild(iframe);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addWidget);
  } else {
    addWidget();
  }
})();
