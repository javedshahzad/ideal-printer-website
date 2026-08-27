(() => {
  const catalog = window.IP_CATALOG;
  if (!catalog) return;
  const bySlug = Object.fromEntries(catalog.products.map((p) => [p.slug, p]));

  document.querySelectorAll('[data-name-for]').forEach((el) => {
    const p = bySlug[el.getAttribute('data-name-for')];
    if (p) el.textContent = p.name;
  });

  document.querySelectorAll('[data-product-link]').forEach((el) => {
    const p = bySlug[el.getAttribute('data-product-link')];
    if (!p) return;
    const title = el.querySelector('.product-card-title');
    if (title && !title.getAttribute('data-name-for')) title.textContent = p.name;
    if (el.classList.contains('product-chip')) el.textContent = p.name;
  });
})();
