import { loadFragment } from '../fragment/fragment.js';
import { getLocalizedResourceUrl } from '../../scripts/utils.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  block.textContent = '';

  // load footer fragment
  const footerPath = getLocalizedResourceUrl('footer');
  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  const footer = document.createElement('div');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  // create language selector
  const languageSelector = footer.querySelector('ul:last-of-type');
  const selectElement = document.createElement('select');
  languageSelector.querySelectorAll('li').forEach((li) => {
    const optionElement = document.createElement('option');

    optionElement.value = li.textContent.trim().toLowerCase();
    optionElement.innerHTML = `<strong>${li.textContent.trim()}</strong>`;

    selectElement.add(optionElement);
  });

  languageSelector.parentNode.replaceChild(selectElement, languageSelector);

  selectElement.addEventListener('change', () => {
    // const selectedValue = this.value;
  });

  block.append(footer);
}
