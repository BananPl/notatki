$(document).ready(function () {
  // Stan koszyka – przechowywanie wybranych kursów
  let cart = [];

  // ==========================================
  // ETAP 4, 5, 6: Filtrowanie i Wyszukiwanie
  // ==========================================
  function filterCourses() {
    const searchText = $('#search-input').val().toLowerCase().trim();
    const selectedCategory = $('#category-filters .active').data('category');

    $('.course-card-wrapper').each(function () {
      const card = $(this);
      const title = (card.data('nazwa') || '').toLowerCase();
      const category = card.data('kategoria');

      // Warunek wyszukiwania po frazie
      const matchesSearch = title.includes(searchText);

      // Warunek filtrowania po kategorii
      const matchesCategory = (selectedCategory === 'all' || category === selectedCategory);

      // Pokazywanie / ukrywanie kart
      if (matchesSearch && matchesCategory) {
        card.show();
      } else {
        card.hide();
      }
    });
  }

  // Zdarzenie wpisywania w wyszukiwarkę (na żywo)
  $('#search-input').on('input', function () {
    filterCourses();
  });

  // Zdarzenie kliknięcia w przyciski kategorii
  $('#category-filters button').on('click', function () {
    $('#category-filters button').removeClass('active');
    $(this).addClass('active');
    filterCourses();
  });

  // ==========================================
  // ETAP 7: Sortowanie po cenie
  // ==========================================
  $('#sort-select').on('change', function () {
    const sortOrder = $(this).val();
    if (sortOrder === 'default') return;

    // Pobranie kart jako zwykłej tablicy
    const cards = $('.course-card-wrapper').get();

    // Natywne sortowanie JS
    cards.sort(function (a, b) {
      const priceA = parseFloat($(a).data('price'));
      const priceB = parseFloat($(b).data('price'));

      if (sortOrder === 'asc') {
        return priceA - priceB;
      } else {
        return priceB - priceA;
      }
    });

    // Ponowne dołączenie elementów do kontenera w nowej kolejności
    $.each(cards, function (index, card) {
      $('#courses-container').append(card);
    });
  });

  // ==========================================
  // ETAP 8: Wspólny Modal Szczegółów
  // ==========================================
  $(document).on('click', '.btn-details', function () {
    const cardWrapper = $(this).closest('.course-card-wrapper');

    const title = cardWrapper.data('nazwa');
    const category = cardWrapper.data('kategoria');
    const price = cardWrapper.data('price');
    const description = cardWrapper.data('opis');

    // Uzupełnienie danych w modalu
    $('#modal-course-title').text(title);
    $('#modal-course-category').text(category);
    $('#modal-course-price').text(price + ' zł');
    $('#modal-course-description').text(description);

    // Wyświetlenie modalu
    const courseModal = new bootstrap.Modal(document.getElementById('courseModal'));
    courseModal.show();
  });

  // ==========================================
  // ETAP 9: Obsługa Koszyka i Powiadomień
  // ==========================================
  $(document).on('click', '.btn-add-cart', function () {
    const cardWrapper = $(this).closest('.course-card-wrapper');
    const title = cardWrapper.data('nazwa');
    const price = parseFloat(cardWrapper.data('price'));

    // Dodanie do tablicy koszyka
    cart.push({ title: title, price: price });

    // Aktualizacja interfejsu
    updateCartUI();

    // Wyświetlenie powiadomienia Toast
    const toastElement = document.getElementById('addToast');
    const toast = bootstrap.Toast.getOrCreateInstance(toastElement);
    toast.show();
  });

  function updateCartUI() {
    // Aktualizacja licznika w odznace (badge)
    $('#cart-badge').text(cart.length);

    // Czyszczenie i generowanie listy w modalu koszyka
    const cartList = $('#cart-list');
    cartList.empty();

    let total = 0;

    if (cart.length === 0) {
      cartList.append('<li class="list-group-item text-muted text-center">Koszyk jest pusty</li>');
    } else {
      $.each(cart, function (index, item) {
        total += item.price;
        cartList.append(`
          <li class="list-group-item d-flex justify-content-between align-items-center">
            ${item.title}
            <span class="badge bg-primary rounded-pill">${item.price} zł</span>
          </li>
        `);
      });
    }

    // Aktualizacja sumy łącznej
    $('#cart-total').text(total + ' zł');
  }
});