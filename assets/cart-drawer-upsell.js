document.addEventListener('DOMContentLoaded', function () {
  const cartDrawerUpsell = document.querySelector('.cart-drawer-upsell');

  if (cartDrawerUpsell) {
    const swiper = new Swiper('.swiper-container', {
      slidesPerView: 1,
      spaceBetween: 10,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });

    cartDrawerUpsell.addEventListener('change', function(event) {
      if (event.target.matches('.single-option-selector')) {
        const form = event.target.closest('form');
        const productContainer = event.target.closest('.grid-product');
        const productId = productContainer.dataset.productId;
        const variantIdInput = form.querySelector('input[name="id"]');
        
        // This is a simplified approach. A robust solution would use the product JSON
        // to map selected options to a variant ID. For now, we'll assume the first
        // matching variant is the correct one.
        const selectedOptions = Array.from(form.querySelectorAll('.single-option-selector')).map(selector => selector.value);
        
        // You would typically have product data available here to find the matching variant
        // For this example, we'll have to rely on a more complex implementation or a page reload.
      }
    });

    cartDrawerUpsell.addEventListener('submit', function (event) {
      if (event.target.matches('form[action*="/cart/add"]')) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);

        fetch(theme.routes.cartAdd, {
          method: 'POST',
          body: formData,
        })
          .then(response => response.json())
          .then(data => {
            // This is a simplified cart update. A full implementation would
            // re-render the cart contents with JavaScript.
            // For now, we'll just update the count and subtotal.
            fetch(theme.routes.cartPage)
              .then(response => response.text())
              .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const newCartCount = doc.querySelector('.cart-count-bubble').textContent;
                const newSubtotal = doc.querySelector('[data-subtotal]').innerHTML;
                
                document.querySelector('.cart-count-bubble').textContent = newCartCount;
                document.querySelector('[data-subtotal]').innerHTML = newSubtotal;

                // We also need to re-render the cart items
                // This is complex and theme-specific. A page reload is a fallback.
                location.reload();
              });
          })
          .catch(error => {
            console.error('Error:', error);
          });
      }
    });
  }
});
