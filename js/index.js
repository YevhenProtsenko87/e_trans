const map = L.map('map').setView([50.50953, 30.43249], 17);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

L.marker([50.4946, 30.4250])
  .addTo(map)
  .bindPopup('E-trans')
  .openPopup();

  const disableScroll = () => {
    document.body.scrollPosition = window.scrollY;
    document.body.style.cssText = `
    overflow: hidden;
    position: fixed;
    top: -${document.body.scrollPosition}px;
    left: 0;
    height: 100wh;
    widht: 100wv;
    padding-right: ${window.innerWidth - document.body.offsetWidth}px;
    `;
  }

  const enabletScrol = () => {
    document.body.style.cssText = '';
    window.scroll({top: document.body.scrollPosition});
  }

  const createElem = (tag, attr) => {
    const elem = document.createElement(tag);
    return Object.assign(elem, { ...attr });
  };

  const createModal = (title, description) => {
    const overlayElem = createElem('div', {className: 'modal'});
    const modalElem = createElem('div', {className: 'modal__block'});
    const modalContainerElem = createElem('div', {
      className: 'modal__container',
    });

    const titleElem = createElem('h2', {
      className: 'modal__title',
      textContent: `Заказать ${title}`,
    });

    const descriptionElem = createElem('p', {
      className: 'modal__description',
      textContent: description,
    });

    const formElem = createElem('form', {
      className: 'modal__fotm',
      method: 'post',
      action: 'https://jsonplaceholder.typicode.com/posts',
      id: 'order',
    });

    const nameLabelElem = createElem('label', {className: 'modal__lebel'});
    const nameSpanlElem = createElem('span', {
      className: 'modal__text',
      textContent: 'Имя',
    });
    const nameInputElem = createElem('input', {
      className: 'modal__input',
      placeholder: 'Введите ваше имя',
      name: 'name',
      required: true,
    });

    const phoneLabelElem = createElem('label', {className: 'modal__lebel'});
    const phoneSpanlElem = createElem('span', {
      className: 'modal__text',
      textContent: 'Телефон',
    });
    const phoneInputElem = createElem('input', {
      className: 'modal__input',
      placeholder: 'Введите ваш телефон',
      name: 'phone',
      required: true,
    });

    const hideInput = createElem('input', {
      type: 'hidden',
      name: 'product',
      value: title,
    });

    const btnSubmit = createElem('button', {
      className: 'modal__btn',
      textContent: 'Заказать',
      type: 'submit'
    });
    btnSubmit.setAttribute('form', 'order');

    const closeModalBtn = createElem('button', {
      className : 'modal__close',
      innerHTML: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.75 2.0125L15.9875 0.25L9 7.2375L2.0125 0.25L0.25 2.0125L7.2375 9L0.25 15.9875L2.0125 17.75L9 10.7625L15.9875 17.75L17.75 15.9875L10.7625 9L17.75 2.0125Z" fill="#18171A"/>
      </svg>`,
    });

    overlayElem.addEventListener('click', event => {
      const target = event.target;
      if (target === overlayElem || target.closest('.modal__close')) {
        overlayElem.remove();
        enabletScrol();
      }
    });

    nameLabelElem.append(nameSpanlElem, nameInputElem);
    phoneLabelElem.append(phoneSpanlElem, phoneInputElem);
    formElem.append(nameLabelElem, phoneLabelElem, hideInput);

    modalContainerElem.append(
      titleElem,
      descriptionElem,
      formElem,
      btnSubmit,
      closeModalBtn,
      );
    modalElem.append(modalContainerElem);
    overlayElem.append(modalElem);
    disableScroll();
    document.body.append(overlayElem);
  };

  const productTitle = document.querySelectorAll('.product__title');
  const productDescription = document.querySelectorAll('.product__description');
  const productBtn = document.querySelectorAll('.product__btn');

  for (let i = 0; i < productBtn.length; i++) {
    productBtn[i].addEventListener('click', () => {
      const title = productTitle[i].textContent;
      const description = productDescription[i].textContent;
      createModal(title, description);
    });
  }