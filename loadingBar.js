class LoadingBar extends HTMLElement
{
  constructor()
  {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = `
      <link rel="stylesheet" href="loadingBar.css">
      <div class="loading-bar">
        <div></div>
        <div></div>
        <div></div>
      </div>
    `;
  }
}

customElements.define('loading-bar', LoadingBar);
