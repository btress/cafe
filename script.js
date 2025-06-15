let products = [
    { id: 'CF001', name: 'Cà phê Arabica', category: 'Cafe', unit: 'kg', supplier: 'NCC001' },
    { id: 'CF002', name: 'Cà phê Robusta', category: 'Cafe', unit: 'kg', supplier: 'NCC001' },
    { id: 'TR001', name: 'Trà xanh Thái Nguyên', category: 'Trà', unit: 'kg', supplier: 'NCC002' },
    { id: 'BK001', name: 'Bánh croissant', category: 'Bánh ngọt', unit: 'cái', supplier: 'NCC003' },
    { id: 'SU001', name: 'Đường trắng', category: 'Nguyên liệu', unit: 'kg', supplier: 'NCC004' }
];

let suppliers = [
    { id: 'NCC001', name: 'Công ty Cà phê Highlands', contact: 'Nguyễn Văn A', phone: '0123456789', email: 'nva@highlands.vn', address: 'Hà Nội' },
    { id: 'NCC002', name: 'Trà Thái Nguyên', contact: 'Trần Thị B', phone: '0987654321', email: 'ttb@trathan.vn', address: 'Thái Nguyên' },
    { id: 'NCC003', name: 'Bánh ABC', contact: 'Lê Văn C', phone: '0369852147', email: 'lvc@banhabc.vn', address: 'TP.HCM' },
    { id: 'NCC004', name: 'Nguyên liệu XYZ', contact: 'Phạm Thị D', phone: '0258147369', email: 'ptd@nlxyz.vn', address: 'Đà Nẵng' }
];

let inventory = [
    { productId: 'CF001', currentStock: 50, minStock: 10, maxStock: 100, expiryDate: '2025-12-31', location: 'Kho A-01', lastUpdated: '2025-06-10' },
    { productId: 'CF002', currentStock: 25, minStock: 15, maxStock: 80, expiryDate: '2025-11-30', location: 'Kho A-02', lastUpdated: '2025-06-10' },
    { productId: 'TR001', currentStock: 8, minStock: 10, maxStock: 50, expiryDate: '2025-08-15', location: 'Kho B-01', lastUpdated: '2025-06-10' },
    { productId: 'BK001', currentStock: 200, minStock: 50, maxStock: 300, expiryDate: '2025-06-20', location: 'Kho C-01', lastUpdated: '2025-06-10' },
    { productId: 'SU001', currentStock: 45, minStock: 20, maxStock: 100, expiryDate: '2025-12-31', location: 'Kho D-01', lastUpdated: '2025-06-10' }
];

let stockIn = [
    { receiptId: 'PN001', date: '2025-06-01', productId: 'CF001', quantity: 50, price: 180000, supplier: 'NCC001', notes: 'Hàng tươi từ Đắk Lắk' },
    { receiptId: 'PN002', date: '2025-06-03', productId: 'TR001', quantity: 10, price: 300000, supplier: 'NCC002', notes: 'Trà cao cấp' },
    { receiptId: 'PN003', date: '2025-06-05', productId: 'BK001', quantity: 100, price: 8000, supplier: 'NCC003', notes: 'Bánh tươi hàng ngày' }
];

let stockOut = [
    { issueId: 'PX001', date: '2025-06-02', productId: 'CF001', quantity: 10, reason: 'Bán hàng', issuedBy: 'Nhân viên A', notes: 'Bán buổi sáng' },
    { issueId: 'PX002', date: '2025-06-04', productId: 'TR001', quantity: 2, reason: 'Hư hỏng', issuedBy: 'Nhân viên B', notes: 'Bao bị rách' },
    { issueId: 'PX003', date: '2025-06-06', productId: 'BK001', quantity: 20, reason: 'Bán hàng', issuedBy: 'Nhân viên C', notes: 'Khách đặt tiệc' }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function () {
    loadSupplierOptions();
    loadProductOptions();
    renderAllTables();
    updateDashboard();
    updateReports();
});

// Navigation functions
function showSheet(sheetId) {
    // Hide all sheets
    const sheets = document.querySelectorAll('.sheet');
    sheets.forEach(sheet => sheet.classList.remove('active'));

    // Hide all tabs active state
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => tab.classList.remove('active'));

    // Show selected sheet
    document.getElementById(sheetId).classList.add('active');

    // Show selected tab as active
    event.target.classList.add('active');

    // Update data when switching to certain sheets
    if (sheetId === 'dashboard') {
        updateDashboard();
    } else if (sheetId === 'reports') {
        updateReports();
    }
}

// Modal functions
function showModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

function hideModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Search function
function searchTable(tableId, searchValue) {
    const table = document.getElementById(tableId);
    const tbody = table.querySelector('tbody');
    const rows = tbody.querySelectorAll('tr');

    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        if (text.includes(searchValue.toLowerCase())) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

// Load options for dropdowns
function loadSupplierOptions() {
    const selects = document.querySelectorAll('select[name="supplier"], select[name="editSupplier"], select[name="reportSupplier"]');
    selects.forEach(select => {
        select.innerHTML = '<option value="">Chọn NCC</option>';
        suppliers.forEach(supplier => {
            const option = document.createElement('option');
            option.value = supplier.id;
            option.textContent = supplier.name;
            select.appendChild(option);
        });
    });
}

function loadProductOptions() {
    const selects = document.querySelectorAll('select[name="productId"], select[name="editProductId"], select[name="inventoryProduct"], select[name="reportProduct"]');
    selects.forEach(select => {
        select.innerHTML = '<option value="">Chọn sản phẩm</option>';
        products.forEach(product => {
            const option = document.createElement('option');
            option.value = product.id;
            option.textContent = `${product.id} - ${product.name}`;
            select.appendChild(option);
        });
    });
}

// Render table functions
function renderProductsTable() {
    const tbody = document.querySelector('#products-table tbody');
    tbody.innerHTML = '';

    products.forEach(product => {
        const supplier = suppliers.find(s => s.id === product.supplier);
        const row = document.createElement('tr');
        row.innerHTML = `
                    <td>${product.id}</td>
                    <td>${product.name}</td>
                    <td>${product.category}</td>
                    <td>${product.unit}</td>
                    <td>${supplier ? supplier.name : 'N/A'}</td>
                    <td>
                        <button class="btn btn-warning btn-sm" onclick="editProduct('${product.id}')">Sửa</button>
                        <button class="btn btn-danger btn-sm" onclick="deleteProduct('${product.id}')">Xóa</button>
                        </td>
                        `;
        tbody.appendChild(row);
        // <td>${formatCurrency(product.costPrice)}</td>
        // <td>${formatCurrency(product.salePrice)}</td>
    });
}

function renderInventoryTable() {
    const tbody = document.querySelector('#inventory-table tbody');
    tbody.innerHTML = '';

    inventory.forEach(item => {
        const product = products.find(p => p.id === item.productId);
        const row = document.createElement('tr');

        // Check status
        let statusClass = '';
        let statusText = 'Bình thường';

        if (item.currentStock <= item.minStock) {
            statusClass = 'status-low';
            statusText = 'Tồn kho thấp';
        }

        if (item.expiryDate) {
            const today = new Date();
            const expiry = new Date(item.expiryDate);
            const daysDiff = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));

            if (daysDiff < 0) {
                statusClass = 'status-expired';
                statusText = 'Đã hết hạn';
            } else if (daysDiff <= 7) {
                statusClass = 'status-warning';
                statusText = 'Sắp hết hạn';
            }
        }

        row.className = statusClass;
        row.innerHTML = `
                    <td>${item.productId}</td>
                    <td>${product ? product.name : 'N/A'}</td>
                    <td>${item.currentStock}</td>
                    <td>${item.minStock}</td>
                    <td>${item.maxStock}</td>
                    <td>${item.expiryDate || 'N/A'}</td>
                    <td>${item.location}</td>
                    <td>${statusText}</td>
                    <td>
                        <button class="btn btn-warning btn-sm" onclick="editInventory('${item.productId}')">Sửa</button>
                    </td>
                `;
        tbody.appendChild(row);
    });
}

function renderStockInTable() {
    const tbody = document.querySelector('#stock-in-table tbody');
    tbody.innerHTML = '';

    stockIn.forEach(item => {
        const product = products.find(p => p.id === item.productId);
        const supplier = suppliers.find(s => s.id === item.supplier);
        const total = item.quantity * item.price;

        const row = document.createElement('tr');
        row.innerHTML = `
                    <td>${item.receiptId}</td>
                    <td>${item.date}</td>
                    <td>${product ? product.name : 'N/A'}</td>
                    <td>${item.quantity}</td>
                    <td>${formatCurrency(item.price)}</td>
                    <td>${formatCurrency(total)}</td>
                    <td>${supplier ? supplier.name : 'N/A'}</td>
                    <td>${item.notes || ''}</td>
                    <td>
                        <button class="btn btn-warning btn-sm" onclick="editStockIn('${item.receiptId}')">Sửa</button>
                        <button class="btn btn-danger btn-sm" onclick="deleteStockIn('${item.receiptId}')">Xóa</button>
                    </td>
                `;
        tbody.appendChild(row);
    });
}

function renderStockOutTable() {
    const tbody = document.querySelector('#stock-out-table tbody');
    tbody.innerHTML = '';

    stockOut.forEach(item => {
        const product = products.find(p => p.id === item.productId);

        const row = document.createElement('tr');
        row.innerHTML = `
                    <td>${item.issueId}</td>
                    <td>${item.date}</td>
                    <td>${product ? product.name : 'N/A'}</td>
                    <td>${item.quantity}</td>
                    <td>${item.reason}</td>
                    <td>${item.issuedBy}</td>
                    <td>${item.notes || ''}</td>
                    <td>
                        <button class="btn btn-warning btn-sm" onclick="editStockOut('${item.issueId}')">Sửa</button>
                        <button class="btn btn-danger btn-sm" onclick="deleteStockOut('${item.issueId}')">Xóa</button>
                    </td>
                `;
        tbody.appendChild(row);
    });
}

function renderSuppliersTable() {
    const tbody = document.querySelector('#suppliers-table tbody');
    tbody.innerHTML = '';

    suppliers.forEach(supplier => {
        const row = document.createElement('tr');
        row.innerHTML = `
                    <td>${supplier.id}</td>
                    <td>${supplier.name}</td>
                    <td>${supplier.contact}</td>
                    <td>${supplier.phone}</td>
                    <td>${supplier.email || ''}</td>
                    <td>${supplier.address || ''}</td>
                    <td>
                        <button class="btn btn-warning btn-sm" onclick="editSupplier('${supplier.id}')">Sửa</button>
                        <button class="btn btn-danger btn-sm" onclick="deleteSupplier('${supplier.id}')">Xóa</button>
                    </td>
                `;
        tbody.appendChild(row);
    });
}

function renderReportTable(filter = {}) {
    const tbody = document.querySelector('#report-table tbody');
    tbody.innerHTML = '';

    // Filter data if needed
    let filteredStockIn = [...stockIn];
    let filteredStockOut = [...stockOut];

    if (filter.fromDate) {
        filteredStockIn = filteredStockIn.filter(item => new Date(item.date) >= new Date(filter.fromDate));
        filteredStockOut = filteredStockOut.filter(item => new Date(item.date) >= new Date(filter.fromDate));
    }

    if (filter.toDate) {
        filteredStockIn = filteredStockIn.filter(item => new Date(item.date) <= new Date(filter.toDate));
        filteredStockOut = filteredStockOut.filter(item => new Date(item.date) <= new Date(filter.toDate));
    }

    if (filter.productId) {
        filteredStockIn = filteredStockIn.filter(item => item.productId === filter.productId);
        filteredStockOut = filteredStockOut.filter(item => item.productId === filter.productId);
    }

    if (filter.supplierId) {
        filteredStockIn = filteredStockIn.filter(item => item.supplier === filter.supplierId);
    }

    // Calculate report data
    products.forEach(product => {
        // Check if we should include this product based on filters
        if (filter.productId && product.id !== filter.productId) return;

        const stockInForProduct = filteredStockIn.filter(item => item.productId === product.id);
        const stockOutForProduct = filteredStockOut.filter(item => item.productId === product.id);

        const totalIn = stockInForProduct.reduce((sum, item) => sum + item.quantity, 0);
        const totalOut = stockOutForProduct.reduce((sum, item) => sum + item.quantity, 0);

        const invItem = inventory.find(i => i.productId === product.id);
        const currentStock = invItem ? invItem.currentStock : 0;

        // For demo purposes, we'll assume beginning stock is current stock + out - in
        const beginningStock = currentStock + totalOut - totalIn;
        const inventoryValue = currentStock * product.costPrice;

        const row = document.createElement('tr');
        row.innerHTML = `
                    <td>${product.name}</td>
                    <td>${beginningStock}</td>
                    <td>${totalIn}</td>
                    <td>${totalOut}</td>
                    <td>${currentStock}</td>
                    <td>${formatCurrency(inventoryValue)}</td>
                `;
        tbody.appendChild(row);
    });
}

function renderAllTables() {
    renderProductsTable();
    renderInventoryTable();
    renderStockInTable();
    renderStockOutTable();
    renderSuppliersTable();
    renderReportTable();
}

// Add functions
function addProduct(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const product = {
        id: formData.get('productId'),
        name: formData.get('productName'),
        category: formData.get('category'),
        unit: formData.get('unit'),
        costPrice: parseFloat(formData.get('costPrice')),
        salePrice: parseFloat(formData.get('salePrice')),
        supplier: formData.get('supplier')
    };

    // Check if product ID already exists
    if (products.find(p => p.id === product.id)) {
        alert('Mã sản phẩm đã tồn tại!');
        return;
    }

    products.push(product);

    // Add to inventory with default values
    inventory.push({
        productId: product.id,
        currentStock: 0,
        minStock: 10,
        maxStock: 100,
        expiryDate: null,
        location: 'Chưa phân bổ',
        lastUpdated: new Date().toISOString().split('T')[0]
    });

    renderAllTables();
    loadProductOptions();
    updateDashboard();
    hideModal('add-product-modal');
    event.target.reset();
    alert('Thêm sản phẩm thành công!');
}

function addStockIn(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const stockInItem = {
        receiptId: formData.get('receiptId'),
        date: new Date().toISOString().split('T')[0],
        productId: formData.get('productId'),
        quantity: parseInt(formData.get('quantity')),
        price: parseFloat(formData.get('price')),
        supplier: formData.get('supplier'),
        notes: formData.get('notes')
    };

    // Check if receipt ID already exists
    if (stockIn.find(s => s.receiptId === stockInItem.receiptId)) {
        alert('Mã phiếu nhập đã tồn tại!');
        return;
    }

    stockIn.push(stockInItem);

    // Update inventory
    const invItem = inventory.find(i => i.productId === stockInItem.productId);
    if (invItem) {
        invItem.currentStock += stockInItem.quantity;
        invItem.lastUpdated = new Date().toISOString().split('T')[0];

        if (formData.get('expiryDate')) {
            invItem.expiryDate = formData.get('expiryDate');
        }
    }

    renderAllTables();
    updateDashboard();
    hideModal('add-stock-in-modal');
    event.target.reset();
    alert('Nhập kho thành công!');
}

function addStockOut(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const stockOutItem = {
        issueId: formData.get('issueId'),
        date: new Date().toISOString().split('T')[0],
        productId: formData.get('productId'),
        quantity: parseInt(formData.get('quantity')),
        reason: formData.get('reason'),
        issuedBy: formData.get('issuedBy'),
        notes: formData.get('notes')
    };

    // Check if issue ID already exists
    if (stockOut.find(s => s.issueId === stockOutItem.issueId)) {
        alert('Mã phiếu xuất đã tồn tại!');
        return;
    }

    // Check inventory availability
    const invItem = inventory.find(i => i.productId === stockOutItem.productId);
    if (!invItem || invItem.currentStock < stockOutItem.quantity) {
        alert('Không đủ hàng trong kho!');
        return;
    }

    stockOut.push(stockOutItem);

    // Update inventory
    invItem.currentStock -= stockOutItem.quantity;
    invItem.lastUpdated = new Date().toISOString().split('T')[0];

    renderAllTables();
    updateDashboard();
    hideModal('add-stock-out-modal');
    event.target.reset();
    alert('Xuất kho thành công!');
}

function addSupplier(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const supplier = {
        id: formData.get('supplierId'),
        name: formData.get('companyName'),
        contact: formData.get('contactPerson'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        address: formData.get('address')
    };

    // Check if supplier ID already exists
    if (suppliers.find(s => s.id === supplier.id)) {
        alert('Mã nhà cung cấp đã tồn tại!');
        return;
    }

    suppliers.push(supplier);
    renderSuppliersTable();
    loadSupplierOptions();
    hideModal('add-supplier-modal');
    event.target.reset();
    alert('Thêm nhà cung cấp thành công!');
}

// Edit functions
function editProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) {
        alert('Không tìm thấy sản phẩm!');
        return;
    }

    // Fill the form
    const form = document.querySelector('#edit-product-modal form');
    form.querySelector('input[name="editProductId"]').value = product.id;
    form.querySelector('input[name="editProductName"]').value = product.name;
    form.querySelector('select[name="editCategory"]').value = product.category;
    form.querySelector('select[name="editUnit"]').value = product.unit;
    // form.querySelector('input[name="editCostPrice"]').value = product.costPrice;
    // form.querySelector('input[name="editSalePrice"]').value = product.salePrice;

    // Load supplier options and select current supplier
    const supplierSelect = form.querySelector('select[name="editSupplier"]');
    supplierSelect.innerHTML = '<option value="">Chọn NCC</option>';
    suppliers.forEach(supplier => {
        const option = document.createElement('option');
        option.value = supplier.id;
        option.textContent = supplier.name;
        supplierSelect.appendChild(option);
    });
    supplierSelect.value = product.supplier;

    showModal('edit-product-modal');
}

function updateProduct(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const productId = formData.get('editProductId');

    const updatedProduct = {
        id: productId,
        name: formData.get('editProductName'),
        category: formData.get('editCategory'),
        unit: formData.get('editUnit'),
        costPrice: parseFloat(formData.get('editCostPrice')),
        salePrice: parseFloat(formData.get('editSalePrice')),
        supplier: formData.get('editSupplier')
    };

    // Update product
    const index = products.findIndex(p => p.id === productId);
    if (index !== -1) {
        products[index] = updatedProduct;
    }

    renderAllTables();
    loadProductOptions();
    hideModal('edit-product-modal');
    alert('Cập nhật sản phẩm thành công!');
}

function editInventory(productId) {
    const invItem = inventory.find(i => i.productId === productId);
    if (!invItem) {
        alert('Không tìm thấy tồn kho cho sản phẩm này!');
        return;
    }

    // Fill the form
    const form = document.querySelector('#update-inventory-modal form');
    form.querySelector('input[name="inventoryProductId"]').value = invItem.productId;

    // Load product options and select current product
    const productSelect = form.querySelector('select[name="inventoryProduct"]');
    productSelect.innerHTML = '<option value="">Chọn sản phẩm</option>';
    products.forEach(product => {
        const option = document.createElement('option');
        option.value = product.id;
        option.textContent = `${product.id} - ${product.name}`;
        productSelect.appendChild(option);
    });
    productSelect.value = invItem.productId;

    // Fill other fields
    form.querySelector('input[name="currentStock"]').value = invItem.currentStock;
    form.querySelector('input[name="minStock"]').value = invItem.minStock;
    form.querySelector('input[name="maxStock"]').value = invItem.maxStock;
    form.querySelector('input[name="expiryDate"]').value = invItem.expiryDate || '';
    form.querySelector('input[name="location"]').value = invItem.location || '';

    showModal('update-inventory-modal');
}

function updateInventoryItem(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const productId = formData.get('inventoryProductId');

    const updatedInventory = {
        productId: productId,
        currentStock: parseInt(formData.get('currentStock')),
        minStock: parseInt(formData.get('minStock')),
        maxStock: parseInt(formData.get('maxStock')),
        expiryDate: formData.get('expiryDate') || null,
        location: formData.get('location') || 'Chưa phân bổ',
        lastUpdated: new Date().toISOString().split('T')[0]
    };

    // Update inventory
    const index = inventory.findIndex(i => i.productId === productId);
    if (index !== -1) {
        inventory[index] = updatedInventory;
    }

    renderAllTables();
    updateDashboard();
    hideModal('update-inventory-modal');
    alert('Cập nhật tồn kho thành công!');
}

function editStockIn(receiptId) {
    const stockInItem = stockIn.find(s => s.receiptId === receiptId);
    if (!stockInItem) {
        alert('Không tìm thấy phiếu nhập kho!');
        return;
    }

    // Fill the form
    const form = document.querySelector('#edit-stock-in-modal form');
    form.querySelector('input[name="editReceiptId"]').value = stockInItem.receiptId;

    // Load product options and select current product
    const productSelect = form.querySelector('select[name="editProductId"]');
    productSelect.innerHTML = '<option value="">Chọn sản phẩm</option>';
    products.forEach(product => {
        const option = document.createElement('option');
        option.value = product.id;
        option.textContent = `${product.id} - ${product.name}`;
        productSelect.appendChild(option);
    });
    productSelect.value = stockInItem.productId;

    // Load supplier options and select current supplier
    const supplierSelect = form.querySelector('select[name="editSupplier"]');
    supplierSelect.innerHTML = '<option value="">Chọn NCC</option>';
    suppliers.forEach(supplier => {
        const option = document.createElement('option');
        option.value = supplier.id;
        option.textContent = supplier.name;
        supplierSelect.appendChild(option);
    });
    supplierSelect.value = stockInItem.supplier;

    // Fill other fields
    form.querySelector('input[name="editQuantity"]').value = stockInItem.quantity;
    form.querySelector('input[name="editPrice"]').value = stockInItem.price;
    form.querySelector('input[name="editExpiryDate"]').value = stockInItem.expiryDate || '';
    form.querySelector('textarea[name="editNotes"]').value = stockInItem.notes || '';

    showModal('edit-stock-in-modal');
}

function updateStockIn(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const receiptId = formData.get('editReceiptId');

    const updatedStockIn = {
        receiptId: receiptId,
        date: new Date().toISOString().split('T')[0],
        productId: formData.get('editProductId'),
        quantity: parseInt(formData.get('editQuantity')),
        price: parseFloat(formData.get('editPrice')),
        supplier: formData.get('editSupplier'),
        notes: formData.get('editNotes')
    };

    // Update stock in
    const index = stockIn.findIndex(s => s.receiptId === receiptId);
    if (index !== -1) {
        // Calculate difference to update inventory
        const oldQuantity = stockIn[index].quantity;
        const newQuantity = updatedStockIn.quantity;
        const diff = newQuantity - oldQuantity;

        stockIn[index] = updatedStockIn;

        // Update inventory
        const invItem = inventory.find(i => i.productId === updatedStockIn.productId);
        if (invItem) {
            invItem.currentStock += diff;
            invItem.lastUpdated = new Date().toISOString().split('T')[0];

            if (formData.get('editExpiryDate')) {
                invItem.expiryDate = formData.get('editExpiryDate');
            }
        }
    }

    renderAllTables();
    updateDashboard();
    hideModal('edit-stock-in-modal');
    alert('Cập nhật phiếu nhập kho thành công!');
}

function editStockOut(issueId) {
    const stockOutItem = stockOut.find(s => s.issueId === issueId);
    if (!stockOutItem) {
        alert('Không tìm thấy phiếu xuất kho!');
        return;
    }

    // Fill the form
    const form = document.querySelector('#edit-stock-out-modal form');
    form.querySelector('input[name="editIssueId"]').value = stockOutItem.issueId;

    // Load product options and select current product
    const productSelect = form.querySelector('select[name="editProductId"]');
    productSelect.innerHTML = '<option value="">Chọn sản phẩm</option>';
    products.forEach(product => {
        const option = document.createElement('option');
        option.value = product.id;
        option.textContent = `${product.id} - ${product.name}`;
        productSelect.appendChild(option);
    });
    productSelect.value = stockOutItem.productId;

    // Fill other fields
    form.querySelector('input[name="editQuantity"]').value = stockOutItem.quantity;
    form.querySelector('select[name="editReason"]').value = stockOutItem.reason;
    form.querySelector('input[name="editIssuedBy"]').value = stockOutItem.issuedBy;
    form.querySelector('textarea[name="editNotes"]').value = stockOutItem.notes || '';

    showModal('edit-stock-out-modal');
}

function updateStockOut(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const issueId = formData.get('editIssueId');

    const updatedStockOut = {
        issueId: issueId,
        date: new Date().toISOString().split('T')[0],
        productId: formData.get('editProductId'),
        quantity: parseInt(formData.get('editQuantity')),
        reason: formData.get('editReason'),
        issuedBy: formData.get('editIssuedBy'),
        notes: formData.get('editNotes')
    };

    // Update stock out
    const index = stockOut.findIndex(s => s.issueId === issueId);
    if (index !== -1) {
        // Calculate difference to update inventory
        const oldQuantity = stockOut[index].quantity;
        const newQuantity = updatedStockOut.quantity;
        const diff = newQuantity - oldQuantity;

        stockOut[index] = updatedStockOut;

        // Update inventory
        const invItem = inventory.find(i => i.productId === updatedStockOut.productId);
        if (invItem) {
            invItem.currentStock -= diff; // Subtract the difference
            invItem.lastUpdated = new Date().toISOString().split('T')[0];
        }
    }

    renderAllTables();
    updateDashboard();
    hideModal('edit-stock-out-modal');
    alert('Cập nhật phiếu xuất kho thành công!');
}

function editSupplier(supplierId) {
    const supplier = suppliers.find(s => s.id === supplierId);
    if (!supplier) {
        alert('Không tìm thấy nhà cung cấp!');
        return;
    }

    // Fill the form
    const form = document.querySelector('#edit-supplier-modal form');
    form.querySelector('input[name="editSupplierId"]').value = supplier.id;
    form.querySelector('input[name="editCompanyName"]').value = supplier.name;
    form.querySelector('input[name="editContactPerson"]').value = supplier.contact;
    form.querySelector('input[name="editPhone"]').value = supplier.phone;
    form.querySelector('input[name="editEmail"]').value = supplier.email || '';
    form.querySelector('textarea[name="editAddress"]').value = supplier.address || '';

    showModal('edit-supplier-modal');
}

function updateSupplier(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const supplierId = formData.get('editSupplierId');

    const updatedSupplier = {
        id: supplierId,
        name: formData.get('editCompanyName'),
        contact: formData.get('editContactPerson'),
        phone: formData.get('editPhone'),
        email: formData.get('editEmail'),
        address: formData.get('editAddress')
    };

    // Update supplier
    const index = suppliers.findIndex(s => s.id === supplierId);
    if (index !== -1) {
        suppliers[index] = updatedSupplier;
    }

    // Update supplier name in related products
    products.forEach(product => {
        if (product.supplier === supplierId) {
            product.supplierName = updatedSupplier.name;
        }
    });

    renderAllTables();
    loadSupplierOptions();
    hideModal('edit-supplier-modal');
    alert('Cập nhật nhà cung cấp thành công!');
}

// Delete functions
function deleteProduct(productId) {
    if (confirm(`Bạn có chắc chắn muốn xóa sản phẩm ${productId}?`)) {
        // Check if product exists in inventory with stock
        const invItem = inventory.find(i => i.productId === productId);
        if (invItem && invItem.currentStock > 0) {
            alert('Không thể xóa sản phẩm vì vẫn còn tồn kho!');
            return;
        }

        // Check if product is referenced in stock in/out
        const hasStockIn = stockIn.some(s => s.productId === productId);
        const hasStockOut = stockOut.some(s => s.productId === productId);

        if (hasStockIn || hasStockOut) {
            alert('Không thể xóa sản phẩm vì có liên quan đến phiếu nhập/xuất kho!');
            return;
        }

        products = products.filter(p => p.id !== productId);
        inventory = inventory.filter(i => i.productId !== productId);
        renderAllTables();
        loadProductOptions();
        updateDashboard();
        alert('Xóa sản phẩm thành công!');
    }
}

function deleteStockIn(receiptId) {
    if (confirm(`Bạn có chắc chắn muốn xóa phiếu nhập ${receiptId}?`)) {
        const stockInItem = stockIn.find(s => s.receiptId === receiptId);
        if (stockInItem) {
            // Update inventory (subtract the quantity)
            const invItem = inventory.find(i => i.productId === stockInItem.productId);
            if (invItem) {
                invItem.currentStock -= stockInItem.quantity;
            }

            // Delete stock in
            stockIn = stockIn.filter(s => s.receiptId !== receiptId);

            renderAllTables();
            updateDashboard();
            alert('Xóa phiếu nhập thành công!');
        }
    }
}

function deleteStockOut(issueId) {
    if (confirm(`Bạn có chắc chắn muốn xóa phiếu xuất ${issueId}?`)) {
        const stockOutItem = stockOut.find(s => s.issueId === issueId);
        if (stockOutItem) {
            // Update inventory (add back the quantity)
            const invItem = inventory.find(i => i.productId === stockOutItem.productId);
            if (invItem) {
                invItem.currentStock += stockOutItem.quantity;
            }

            // Delete stock out
            stockOut = stockOut.filter(s => s.issueId !== issueId);

            renderAllTables();
            updateDashboard();
            alert('Xóa phiếu xuất thành công!');
        }
    }
}

function deleteSupplier(supplierId) {
    if (confirm(`Bạn có chắc chắn muốn xóa nhà cung cấp ${supplierId}?`)) {
        // Check if supplier is referenced in products
        const hasProducts = products.some(p => p.supplier === supplierId);
        const hasStockIn = stockIn.some(s => s.supplier === supplierId);

        if (hasProducts || hasStockIn) {
            alert('Không thể xóa nhà cung cấp vì có sản phẩm hoặc phiếu nhập liên quan!');
            return;
        }

        suppliers = suppliers.filter(s => s.id !== supplierId);
        renderSuppliersTable();
        loadSupplierOptions();
        alert('Xóa nhà cung cấp thành công!');
    }
}

// Dashboard functions
function updateDashboard() {
    // Total products
    document.getElementById('total-products').textContent = products.length;

    // Total inventory value
    let totalValue = 0;
    inventory.forEach(item => {
        const product = products.find(p => p.id === item.productId);
        if (product) {
            totalValue += item.currentStock * product.costPrice;
        }
    });
    document.getElementById('total-value').textContent = formatCurrency(totalValue);

    // Low stock items
    const lowStockItems = inventory.filter(item => item.currentStock <= item.minStock);
    document.getElementById('low-stock').textContent = lowStockItems.length;

    // Expiring soon
    const today = new Date();
    const expiringSoon = inventory.filter(item => {
        if (!item.expiryDate) return false;
        const expiry = new Date(item.expiryDate);
        const daysDiff = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
        return daysDiff >= 0 && daysDiff <= 7;
    });
    document.getElementById('expiring-soon').textContent = expiringSoon.length;

    // Show alerts
    showAlerts(lowStockItems, expiringSoon);
}

function showAlerts(lowStockItems, expiringSoon) {
    const alertsDiv = document.getElementById('alerts');
    const alertsList = document.getElementById('alert-list');

    if (lowStockItems.length === 0 && expiringSoon.length === 0) {
        alertsDiv.style.display = 'none';
        return;
    }

    alertsList.innerHTML = '';

    lowStockItems.forEach(item => {
        const product = products.find(p => p.id === item.productId);
        const li = document.createElement('li');
        li.textContent = `${product ? product.name : item.productId}: Tồn kho thấp (${item.currentStock}/${item.minStock})`;
        alertsList.appendChild(li);
    });

    expiringSoon.forEach(item => {
        const product = products.find(p => p.id === item.productId);
        const li = document.createElement('li');
        li.textContent = `${product ? product.name : item.productId}: Sắp hết hạn (${item.expiryDate})`;
        alertsList.appendChild(li);
    });

    alertsDiv.style.display = 'block';
}

// Reports functions
function updateReports() {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    // Monthly stock in
    const monthlyStockIn = stockIn.filter(item => {
        const itemDate = new Date(item.date);
        return itemDate.getMonth() === currentMonth && itemDate.getFullYear() === currentYear;
    });
    document.getElementById('monthly-stock-in').textContent = monthlyStockIn.length;

    // Monthly stock out
    const monthlyStockOut = stockOut.filter(item => {
        const itemDate = new Date(item.date);
        return itemDate.getMonth() === currentMonth && itemDate.getFullYear() === currentYear;
    });
    document.getElementById('monthly-stock-out').textContent = monthlyStockOut.length;

    // Top product (most stock out)
    const productCounts = {};
    stockOut.forEach(item => {
        productCounts[item.productId] = (productCounts[item.productId] || 0) + item.quantity;
    });

    const topProductId = Object.keys(productCounts).reduce((a, b) =>
        productCounts[a] > productCounts[b] ? a : b, Object.keys(productCounts)[0]);

    const topProduct = products.find(p => p.id === topProductId);
    document.getElementById('top-product').textContent = topProduct ? topProduct.name : '-';

    // Top supplier
    const supplierCounts = {};
    stockIn.forEach(item => {
        supplierCounts[item.supplier] = (supplierCounts[item.supplier] || 0) + 1;
    });

    const topSupplierId = Object.keys(supplierCounts).reduce((a, b) =>
        supplierCounts[a] > supplierCounts[b] ? a : b, Object.keys(supplierCounts)[0]);

    const topSupplier = suppliers.find(s => s.id === topSupplierId);
    document.getElementById('top-supplier').textContent = topSupplier ? topSupplier.name : '-';

    // Render report table
    renderReportTable();
}

function filterReport(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const filter = {
        fromDate: formData.get('fromDate'),
        toDate: formData.get('toDate'),
        productId: formData.get('reportProduct'),
        supplierId: formData.get('reportSupplier')
    };

    renderReportTable(filter);
    hideModal('filter-report-modal');
}

// Utility functions
function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(amount);
}

function showLowStock() {
    const lowStockItems = inventory.filter(item => item.currentStock <= item.minStock);
    if (lowStockItems.length === 0) {
        alert('Không có sản phẩm nào có tồn kho thấp!');
        return;
    }

    let message = 'Các sản phẩm có tồn kho thấp:\n\n';
    lowStockItems.forEach(item => {
        const product = products.find(p => p.id === item.productId);
        message += `- ${product ? product.name : item.productId}: ${item.currentStock}/${item.minStock}\n`;
    });

    alert(message);
}

function exportExcel() {
    alert('Chức năng xuất Excel sẽ được phát triển trong phiên bản tiếp theo!');
}

function generateReport() {
    alert('Chức năng tạo báo cáo chi tiết sẽ được phát triển trong phiên bản tiếp theo!');
}

// Close modal when clicking outside
window.onclick = function (event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}