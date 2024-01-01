export default function decorate(block) {
  const allPossibleTables = ['or-options'];
  const tables = block.querySelectorAll('table');
  const parentBlock = block.closest('.section');
  const metaData = parentBlock.dataset;
  const {
    type, video, imageCover, titleColor,
  } = metaData;
  const bannerItems = [...block.children];

  if (titleColor) block.querySelector('h1').style.color = titleColor;

  if (type === 'carousel') {
    block.innerHTML = `
  <div id="myCarousel" class="carousel slide" data-bs-ride="carousel">
    <ol class="carousel-indicators">
      ${bannerItems.length && bannerItems.map((_, index) => `
        <li data-bs-target="#myCarousel" data-bs-slide-to="${index}" ${index === 0 ? 'class="active"' : ''}></li>
      `).join('')}
    </ol>
    <div class="carousel-inner">
      ${bannerItems.length && bannerItems.map((slide, index) => {
    const [content, image] = [...slide.children];
    return `<div class="carousel-item ${index === 0 ? 'active' : ''}">
      <img src="${image.querySelector('img').getAttribute('src').split('?')[0]}" class="d-block w-100" alt="Slide">
      <div class="carousel-caption d-block rows col-5 col-md-5">
        ${content.innerHTML}
      </div>
    </div>`;
  }).join('')}
    </div>
  </div>`;
  } else {
    block.classList.add('ps-0', 'ps-md-5', 'py-md-5', 'py-3');

    const [contentLeft, contentRight, contentImage] = bannerItems;
    if (imageCover === 'background') {
      block.style.background = `url(${contentImage.querySelector('img').getAttribute('src').split('?')[0]}) no-repeat top / cover transparent`;
    }

    let leftContentClasses = ' col-sm-5 col-lg-5';
    if (type && type === 'half') {
      leftContentClasses = ' col-sm-6 col-lg-6';
    } else if (type && type === 'bigger') {
      leftContentClasses = ' col-sm-7 col-lg-7';
    }

    let rightContentClasses = ' col-sm-7 col-lg-7';
    if (type && type === 'half') {
      rightContentClasses = ' col-sm-6 col-lg-6';
    } else if (type && type === 'bigger') {
      rightContentClasses = ' col-sm-5 col-lg-5';
    }

    // searchng for tables:
    tables.forEach((table) => {
      const firstRow = table.querySelector('tr:first-child');
      const firstRowContent = firstRow.innerText.trim();

      if (allPossibleTables.includes(firstRowContent)) {
        table.classList.add(firstRowContent);
        firstRow.style.display = 'none';
      }
    });

    block.innerHTML = `
    <div class="container-fluid">
        <div class="row d-flex justify-content-center align-items-center">
          <div class="col-xs-11 col-sm-11${leftContentClasses} ps-4">
            ${contentLeft.innerHTML}
          </div>

          <div class="col-xs-11 col-sm-11${rightContentClasses} text-right img-box">
            ${video ? `<video controls>
              <source src="${video}" type="application/x-mpegURL">
              Your browser does not support the video tag.
            </video>` : ''}
            ${contentRight && contentRight.innerHTML !== '' && contentRight.innerHTML}
          </div>
        </div>
    </div>`;
  }
}
