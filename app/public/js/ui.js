document.addEventListener('DOMContentLoaded', function () {
  const btnAdd = document.getElementById('btn-add');
  const modalEl = document.getElementById('productModal');
  const productForm = document.getElementById('product-form');
  const modal = new bootstrap.Modal(modalEl);

  const viewModalEl = document.getElementById('viewModal');
  const viewModal = new bootstrap.Modal(viewModalEl);

  function resetForm() {
    productForm.reset();
    document.getElementById('product-id').value = '';
    document.getElementById('img-preview').src = '/images/placeholder-80.png';
  }

  function openModalForAdd() {
    document.getElementById('modalTitle').textContent = 'Add Product';
    resetForm();
    modal.show();
  }

  function openModalForEdit(row) {
    document.getElementById('modalTitle').textContent = 'Edit Product';

    document.getElementById('product-id').value = row.dataset.id;
    document.getElementById('name').value = row.dataset.name || '';
    document.getElementById('price').value = row.dataset.price || '';
    document.getElementById('color').value = row.dataset.color || '';
    document.getElementById('description').value = row.dataset.description || '';

    const existingImage = row.dataset.image || '';
    document.getElementById('img-preview').src =
      existingImage && existingImage.length
        ? existingImage
        : '/images/placeholder-80.png';

    modal.show();
  }

  function openModalForView(row) {
    const existingImage = row.dataset.image || '';

    document.getElementById('view-image').src =
      existingImage && existingImage.length
        ? existingImage
        : '/images/placeholder-80.png';

    document.getElementById('view-name').textContent = row.dataset.name || '';
    document.getElementById('view-price').textContent = row.dataset.price || '';
    document.getElementById('view-color').textContent = row.dataset.color || '';
    document.getElementById('view-description').textContent = row.dataset.description || '';

    viewModal.show();
  }

  btnAdd.addEventListener('click', openModalForAdd);

  document.getElementById('product-table').addEventListener('click', function (e) {
    const tr = e.target.closest('tr');
    if (!tr) return;

    if (e.target.classList.contains('btn-view')) {
      openModalForView(tr);
      return;
    }

    if (e.target.classList.contains('btn-edit')) {
      openModalForEdit(tr);
      return;
    }

    if (e.target.classList.contains('btn-delete')) {
      const id = tr.dataset.id;
      if (!confirm('Delete this product?')) return;

      fetch(`/products/${id}`, { method: 'DELETE' })
        .then(async (r) => {
          if (r.ok) {
            location.reload();
            return;
          }
          const j = await r.json().catch(() => ({}));
          alert(j.message || 'Delete failed');
        })
        .catch(() => alert('Delete failed'));
    }
  });

  productForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const id = document.getElementById('product-id').value;
    const name = document.getElementById('name').value.trim();
    const price = Number(document.getElementById('price').value);
    const color = document.getElementById('color').value.trim();
    const description = document.getElementById('description').value.trim();
    const file = document.getElementById('imageFile').files[0];

    if (!name || !color || Number.isNaN(price)) {
      alert('Please provide valid name, price and color');
      return;
    }

    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Only image files are allowed');
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        alert('Image must be 2MB or smaller');
        return;
      }
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('color', color);
    formData.append('description', description);

    if (file) {
      formData.append('imageFile', file);
    }

    const method = id ? 'PATCH' : 'POST';
    const url = id ? `/products/${id}` : '/products';

    fetch(url, { method, body: formData })
      .then(async (r) => {
        if (r.ok) {
          location.reload();
          return;
        }

        const j = await r.json().catch(() => ({}));
        if (j && j.errors) {
          alert(j.errors.map((e) => e.msg).join('\n'));
        } else {
          alert(j.message || 'Save failed');
        }
      })
      .catch(() => alert('Save failed'));
  });

  const imageFileInput = document.getElementById('imageFile');
  imageFileInput.addEventListener('change', function (e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Only image files are allowed');
      imageFileInput.value = '';
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert('Image must be 2MB or smaller');
      imageFileInput.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = function (ev) {
      document.getElementById('img-preview').src = ev.target.result;
    };
    reader.readAsDataURL(file);
  });
});