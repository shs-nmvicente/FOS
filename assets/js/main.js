/**
* Template Name: Yummy
* Template URL: https://bootstrapmade.com/yummy-bootstrap-restaurant-website-template/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  /**
   * Filter menu items based on the search input
   */
  document.addEventListener('DOMContentLoaded', function() {
    const menuSearchInput = document.getElementById('menuSearchInput');
    const menuItems = document.querySelectorAll('.menu-item');
    const cartCount = document.getElementById('cart-count');
    const cartQuantities = document.getElementById('cart-quantities');
    const cartTotal = document.getElementById('cart-total');
    const cart = [];

    menuSearchInput.addEventListener('input', function() {
      const searchTerm = menuSearchInput.value.toLowerCase();
      menuItems.forEach(item => {
        const itemName = item.querySelector('h4').textContent.toLowerCase();
        if (itemName.includes(searchTerm)) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });

    document.querySelectorAll('.add-to-cart').forEach(button => {
      button.addEventListener('click', function() {
        const itemName = this.getAttribute('data-name');
        const itemPrice = parseFloat(this.getAttribute('data-price'));
        const existingItem = cart.find(item => item.name === itemName);

        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          cart.push({ name: itemName, price: itemPrice, quantity: 1 });
        }

        updateCartCount();
        saveCart();
      });
    });

    function updateCartCount() {
      const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
      cartCount.textContent = totalItems;
      cartQuantities.textContent = totalItems;
      const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
      cartTotal.textContent = `$${totalPrice.toFixed(2)}`;
    }

    function saveCart() {
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartCount();
    }

    function loadCart() {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        cart.push(...JSON.parse(savedCart));
        updateCartCount();
      }
    }

    loadCart();

    // Handle image click to show overlay
    document.querySelectorAll('.menu-img-clickable').forEach(img => {
      img.addEventListener('click', function() {
        const overlay = document.getElementById('image-overlay');
        const overlayImg = document.getElementById('overlay-img');
        overlayImg.src = this.src;
        overlay.style.display = 'flex';
      });
    });

    // Handle close button click to hide overlay
    document.querySelector('.image-overlay .close-btn').addEventListener('click', function() {
      document.getElementById('image-overlay').style.display = 'none';
    });

    const optionsModal = new bootstrap.Modal(document.getElementById('optionsModal'));
    let currentItem = null;

    document.querySelectorAll('.add-to-cart').forEach(button => {
      button.addEventListener('click', function() {
        currentItem = {
          name: this.getAttribute('data-name'),
          price: parseFloat(this.getAttribute('data-price')),
          quantity: 1
        };
        optionsModal.show();
      });
    });

    document.getElementById('addToCartBtn').addEventListener('click', function() {
      const sauceChoice = document.getElementById('sauceChoice').value;
      const shopChoice = document.getElementById('shopChoice').value;
      const addOnChoice = document.getElementById('addOnChoice').value;

      currentItem.sauce = sauceChoice;
      currentItem.shop = shopChoice;
      currentItem.addOn = addOnChoice;

      const existingItem = cart.find(item => item.name === currentItem.name && item.sauce === sauceChoice && item.shop === shopChoice && item.addOn === addOnChoice);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push(currentItem);
      }

      updateCartCount();
      saveCart();
      optionsModal.hide();
    });

    document.getElementById('closeModalBtn').addEventListener('click', function() {
      optionsModal.hide();
    });

    // Close modal on close button click
    document.querySelector('.modal .close').addEventListener('click', function() {
      optionsModal.hide();
    });

  });

  document.addEventListener('DOMContentLoaded', function() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartSubtotal = document.getElementById('cart-subtotal');
    const cartTotal = document.getElementById('cart-total');
    const emptyCartMessage = document.getElementById('empty-cart-message');
    const cartCount = document.getElementById('cart-count');
    const cartQuantities = document.getElementById('cart-quantities');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    function updateCartDisplay() {
      cartItemsContainer.innerHTML = '';
      let subtotal = 0;

      if (cart.length === 0) {
        emptyCartMessage.style.display = 'block';
      } else {
        emptyCartMessage.style.display = 'none';
      }

      cart.forEach(item => {
        if (item.quantity > 0) {
          const itemTotal = item.price * item.quantity;
          subtotal += itemTotal;

          const itemElement = document.createElement('div');
          itemElement.classList.add('product');
          itemElement.innerHTML = `
            <div class="row">
              <div class="col-md-3">
                <img class="img-fluid mx-auto d-block image" src="assets/img/image.jpg">
              </div>
              <div class="col-md-8">
                <div class="info">
                  <div class="row">
                    <div class="col-md-5 product-name">
                      <div class="product-name">
                        <a href="#">${item.name}</a>
                        <div class="product-info">
                          <div>Price: <span class="value">$${item.price.toFixed(2)}</span></div>
                          <div>Sauce: <span class="value">${item.sauce}</span></div>
                          <div>Shop: <span class="value">${item.shop}</span></div>
                          <div>Add-Ons: <span class="value">${item.addons.join(', ')}</span></div>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-4 quantity">
                      <label for="quantity">Quantity:</label>
                      <input id="quantity" type="number" value="${item.quantity}" class="form-control quantity-input" data-name="${item.name}" data-sauce="${item.sauce}" data-shop="${item.shop}" data-addons="${item.addons.join(',')}">
                    </div>
                    <div class="col-md-3 price">
                      <span>$${itemTotal.toFixed(2)}</span>
                    </div>
                    <div class="col-md-1 remove">
                      <button class="btn btn-danger btn-sm remove-item" data-name="${item.name}" data-sauce="${item.sauce}" data-shop="${item.shop}" data-addons="${item.addons.join(',')}">Remove</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          `;
          cartItemsContainer.appendChild(itemElement);
        }
      });

      cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
      cartTotal.textContent = `$${subtotal.toFixed(2)}`;
      updateCartCount();
    }

    function updateCartCount() {
      const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
      cartCount.textContent = totalItems;
      cartQuantities.textContent = totalItems;
      const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
      cartTotal.textContent = `$${totalPrice.toFixed(2)}`;
    }

    cartItemsContainer.addEventListener('input', function(event) {
      if (event.target.classList.contains('quantity-input')) {
        const itemName = event.target.getAttribute('data-name');
        const itemSauce = event.target.getAttribute('data-sauce');
        const itemShop = event.target.getAttribute('data-shop');
        const itemAddons = event.target.getAttribute('data-addons').split(',');
        const newQuantity = parseInt(event.target.value);
        const item = cart.find(item => item.name === itemName && item.sauce === itemSauce && item.shop === itemShop && JSON.stringify(item.addons) === JSON.stringify(itemAddons));

        if (item) {
          item.quantity = newQuantity;
          if (item.quantity === 0) {
            const index = cart.indexOf(item);
            cart.splice(index, 1);
          }
          localStorage.setItem('cart', JSON.stringify(cart));
          updateCartDisplay();
        }
      }
    });

    cartItemsContainer.addEventListener('click', function(event) {
      if (event.target.classList.contains('remove-item')) {
        const itemName = event.target.getAttribute('data-name');
        const itemSauce = event.target.getAttribute('data-sauce');
        const itemShop = event.target.getAttribute('data-shop');
        const itemAddons = event.target.getAttribute('data-addons').split(',');
        const item = cart.find(item => item.name === itemName && item.sauce === itemSauce && item.shop === itemShop && JSON.stringify(item.addons) === JSON.stringify(itemAddons));

        if (item) {
          const index = cart.indexOf(item);
          cart.splice(index, 1);
          localStorage.setItem('cart', JSON.stringify(cart));
          updateCartDisplay();
        }
      }
    });

    updateCartDisplay();
  });

  document.addEventListener('DOMContentLoaded', function() {
    const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));

    document.querySelectorAll('.open-login-modal').forEach(button => {
      button.addEventListener('click', function() {
        loginModal.show();
      });
    });
  });

})();