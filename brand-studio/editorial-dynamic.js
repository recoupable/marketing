function createPatternControls({ selector, label, zip }) {
  let size = 'large';
  return {
    areThumbnails: () => size === 'thumbnail',
    init(onChange) {
      const root = document.querySelector(selector);
      root.innerHTML = `<div class="experiments-toolbar">
        <div class="experiments-size" role="group" aria-label="${label}">
          <button type="button" data-dynamic-size="thumbnail" aria-pressed="${size === 'thumbnail'}">Thumbnail size</button>
          <button type="button" data-dynamic-size="large" aria-pressed="${size === 'large'}">Large previews</button>
        </div>
        <a class="experiments-download" href="${zip}" download>Download set ↓</a>
      </div>`;
      root.addEventListener('click', event => {
        const button = event.target.closest('[data-dynamic-size]');
        if (!button || !['thumbnail', 'large'].includes(button.dataset.dynamicSize)) return;
        size = button.dataset.dynamicSize;
        root.querySelectorAll('[data-dynamic-size]').forEach(item => item.setAttribute('aria-pressed', String(item.dataset.dynamicSize === size)));
        onChange();
      });
    },
  };
}

const dynamic = createPatternControls({ selector: '#editorial-dynamic-controls', label: 'Dynamic pattern preview size', zip: 'assets/editorial-14/recoup-dynamic-patterns.zip' });
const fullCanvas = createPatternControls({ selector: '#editorial-full-canvas-controls', label: 'Full canvas pattern preview size', zip: 'assets/editorial-15/recoup-full-canvas-patterns.zip' });

export const initEditorialDynamic = dynamic.init;
export const editorialDynamicAreThumbnails = dynamic.areThumbnails;
export const initEditorialFullCanvas = fullCanvas.init;
export const editorialFullCanvasAreThumbnails = fullCanvas.areThumbnails;
