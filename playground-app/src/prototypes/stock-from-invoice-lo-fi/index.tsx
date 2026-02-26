import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './stock-from-invoice-lo-fi.css';

type View = 'upload' | 'table' | 'pushed';

export interface StockRow {
  id: string;
  productName: string;
  sku: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  supplier: string;
}

function rowTotal(row: StockRow): number {
  return row.quantity * row.unitPrice;
}

export interface UploadEntry {
  id: string;
  pushedAt: number;
  rows: StockRow[];
}

/** Mock parsed rows from "invoice" — editable in table view */
const MOCK_PARSED_ROWS: StockRow[] = [
  { id: '1', productName: 'Coca Cola 330ml Can', sku: 'CC-330-24', quantity: 24, unit: 'cases', unitPrice: 12.5, supplier: 'Beverage Distributors Inc' },
  { id: '2', productName: 'Lays Chips Original 50g', sku: 'LC-50-12', quantity: 12, unit: 'boxes', unitPrice: 8.25, supplier: 'Snack Wholesale Co' },
  { id: '3', productName: 'Bottled Water 500ml', sku: 'BW-500-48', quantity: 48, unit: 'cases', unitPrice: 6, supplier: 'Beverage Distributors Inc' },
  { id: '4', productName: 'Chocolate Bar Variety Pack', sku: 'CB-VAR-20', quantity: 10, unit: 'boxes', unitPrice: 15.75, supplier: 'Candy Suppliers Ltd' },
];

/**
 * ROLLER — Stock from Invoice (Lo-Fi).
 * Stock arrives → upload invoice photo → ROLLER shows table → user adjusts → push → revert.
 */
export function StockFromInvoiceLoFi() {
  const [view, setView] = useState<View>('upload');
  const [rows, setRows] = useState<StockRow[]>(() => [...MOCK_PARSED_ROWS]);
  const [uploadHistory, setUploadHistory] = useState<UploadEntry[]>([]);

  const handleUpload = useCallback(() => {
    setRows([...MOCK_PARSED_ROWS]);
    setView('table');
  }, []);

  const handlePush = useCallback(() => {
    const entry: UploadEntry = {
      id: `upload-${Date.now()}`,
      pushedAt: Date.now(),
      rows: rows.map((r) => ({ ...r, id: `${r.id}-${Date.now()}` })),
    };
    setUploadHistory((prev) => [entry, ...prev]);
    setView('pushed');
  }, [rows]);

  const handleRevertUpload = useCallback((entryId: string) => {
    setUploadHistory((prev) => prev.filter((e) => e.id !== entryId));
  }, []);

  const handleCancelTable = useCallback(() => {
    setView('upload');
    setRows([...MOCK_PARSED_ROWS]);
  }, []);

  const updateRow = useCallback((id: string, field: keyof StockRow, value: string | number) => {
    setRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [field]: value } : r))
    );
  }, []);

  const removeRow = useCallback((id: string) => {
    setRows((prev) => prev.filter((r) => r.id !== id));
  }, []);

  const addRow = useCallback(() => {
    setRows((prev) => [
      ...prev,
      {
        id: `new-${Date.now()}`,
        productName: '',
        sku: '',
        quantity: 1,
        unit: 'units',
        unitPrice: 0,
        supplier: '',
      },
    ]);
  }, []);

  return (
    <div className="stock-invoice-lofi lo-fi-scope">
      <header className="stock-invoice-lofi__header">
        <Link to="/" className="stock-invoice-lofi__back">
          ← Back to Directory
        </Link>
        <span className="stock-invoice-lofi__title" style={{ margin: 0 }}>
          ROLLER — Stock from Invoice
        </span>
      </header>

      <main className="stock-invoice-lofi__main">
        {view === 'upload' && (
          <UploadView onProcess={handleUpload} />
        )}
        {view === 'table' && (
          <TableView
            rows={rows}
            onUpdateRow={updateRow}
            onRemoveRow={removeRow}
            onAddRow={addRow}
            onPush={handlePush}
            onCancel={handleCancelTable}
          />
        )}
        {view === 'pushed' && (
          <PushedView
            uploadHistory={uploadHistory}
            onRevert={handleRevertUpload}
            onBackToUpload={() => setView('upload')}
          />
        )}
      </main>
    </div>
  );
}

function UploadView({ onProcess }: { onProcess: () => void }) {
  return (
    <>
      <h1 className="stock-invoice-lofi__page-title">ROLLER Stock Management</h1>
      <p className="stock-invoice-lofi__page-subtitle">
        Upload invoice photos to add stock
      </p>

      <div className="stock-invoice-lofi__content-card wire-card">
        <h2 className="stock-invoice-lofi__section-title">Upload Invoice Photo</h2>

        <div className="stock-invoice-lofi__upload-zone-wrap">
          <button
            type="button"
            className="stock-invoice-lofi__upload-zone"
            onClick={onProcess}
            aria-label="Upload invoice (mock: click to process)"
          >
            <span className="stock-invoice-lofi__upload-icon" aria-hidden>↑</span>
            <span className="stock-invoice-lofi__upload-label">
              Drop invoice image here
            </span>
            <span className="stock-invoice-lofi__upload-hint">
              or click to browse files
            </span>
          </button>
        </div>

        <section className="stock-invoice-lofi__tips" aria-label="Tips for best results">
          <p className="stock-invoice-lofi__tips-heading">Tips for best results:</p>
          <ul className="stock-invoice-lofi__tips-list">
            <li>Ensure the invoice is well-lit and in focus</li>
            <li>Capture the entire invoice in the frame</li>
            <li>Supported formats: JPG, PNG, HEIC</li>
          </ul>
        </section>
      </div>
    </>
  );
}

function formatCurrency(n: number): string {
  return new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' }).format(n);
}

function TableView({
  rows,
  onUpdateRow,
  onRemoveRow,
  onAddRow,
  onPush,
  onCancel,
}: {
  rows: StockRow[];
  onUpdateRow: (id: string, field: keyof StockRow, value: string | number) => void;
  onRemoveRow: (id: string) => void;
  onAddRow: () => void;
  onPush: () => void;
  onCancel: () => void;
}) {
  const totalOrderValue = rows.reduce((sum, r) => sum + rowTotal(r), 0);

  return (
    <>
      <div className="stock-invoice-lofi__table-header">
        <button
          type="button"
          className="stock-invoice-lofi__back-to-upload"
          onClick={onCancel}
        >
          ← Back to Upload
        </button>
        <div className="stock-invoice-lofi__table-header-right">
          <span className="stock-invoice-lofi__item-count" title="Number of line items">
            {rows.length} item{rows.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>
      <h1 className="stock-invoice-lofi__title">Review Stock Items</h1>
      <p className="stock-invoice-lofi__annot">
        Verify and adjust the extracted information before pushing to ROLLER.
      </p>
      <div className="wire-card">
        <div className="stock-invoice-lofi__table-wrap">
          <table className="stock-invoice-lofi__table">
            <thead>
              <tr>
                <th>Product name</th>
                <th>SKU</th>
                <th>Quantity</th>
                <th>Unit</th>
                <th>Unit price</th>
                <th>Supplier</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  <td>
                    <input
                      type="text"
                      className="wire-input"
                      value={row.productName}
                      onChange={(e) => onUpdateRow(row.id, 'productName', e.target.value)}
                      aria-label={`Product name for row ${row.id}`}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="wire-input"
                      value={row.sku}
                      onChange={(e) => onUpdateRow(row.id, 'sku', e.target.value)}
                      aria-label={`SKU for row ${row.id}`}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      className="wire-input"
                      min={0}
                      value={row.quantity}
                      onChange={(e) =>
                        onUpdateRow(row.id, 'quantity', parseInt(e.target.value, 10) || 0)
                      }
                      aria-label={`Quantity for row ${row.id}`}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="wire-input"
                      value={row.unit}
                      onChange={(e) => onUpdateRow(row.id, 'unit', e.target.value)}
                      aria-label={`Unit for row ${row.id}`}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      className="wire-input"
                      min={0}
                      step={0.01}
                      value={row.unitPrice}
                      onChange={(e) =>
                        onUpdateRow(row.id, 'unitPrice', parseFloat(e.target.value) || 0)
                      }
                      aria-label={`Unit price for row ${row.id}`}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="wire-input"
                      value={row.supplier}
                      onChange={(e) => onUpdateRow(row.id, 'supplier', e.target.value)}
                      aria-label={`Supplier for row ${row.id}`}
                    />
                  </td>
                  <td className="stock-invoice-lofi__total-cell">
                    {formatCurrency(rowTotal(row))}
                  </td>
                  <td className="stock-invoice-lofi__actions-cell">
                    <button
                      type="button"
                      className="wire-btn stock-invoice-lofi__action-btn"
                      aria-label={`Edit ${row.productName || 'row'}`}
                    >
                      ✎ Edit
                    </button>
                    <button
                      type="button"
                      className="wire-btn stock-invoice-lofi__action-btn stock-invoice-lofi__delete-btn"
                      onClick={() => onRemoveRow(row.id)}
                      aria-label={`Delete ${row.productName || 'row'}`}
                    >
                      🗑 Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          type="button"
          className="wire-btn stock-invoice-lofi__add-row"
          onClick={onAddRow}
        >
          + Add Row
        </button>
        {rows.length === 0 && (
          <p className="stock-invoice-lofi__annot" style={{ marginTop: '0.5rem' }}>
            No items. Go back and upload again or add a row above.
          </p>
        )}
        <div className="stock-invoice-lofi__footer">
          <div className="stock-invoice-lofi__total-order">
            <span className="stock-invoice-lofi__total-order-label">Total Order Value</span>
            <span className="stock-invoice-lofi__total-order-value">
              {formatCurrency(totalOrderValue)}
            </span>
          </div>
          <div className="stock-invoice-lofi__actions">
            <button type="button" className="wire-btn" onClick={onCancel}>
              Cancel
            </button>
            <button
              type="button"
              className="wire-btn stock-invoice-lofi__push-btn"
              onClick={onPush}
            >
              Push to ROLLER
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function formatHistoryDate(ts: number): string {
  return new Intl.DateTimeFormat('en-AU', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(ts);
}

function PushedView({
  uploadHistory,
  onRevert,
  onBackToUpload,
}: {
  uploadHistory: UploadEntry[];
  onRevert: (entryId: string) => void;
  onBackToUpload: () => void;
}) {
  return (
    <>
      <div className="stock-invoice-lofi__table-header">
        <button
          type="button"
          className="stock-invoice-lofi__back-to-upload"
          onClick={onBackToUpload}
        >
          ← Back to Upload
        </button>
      </div>
      <h1 className="stock-invoice-lofi__title">Upload history</h1>
      <p className="stock-invoice-lofi__annot">
        Recent stock uploads pushed to ROLLER. Revert an upload to remove that batch from stock.
      </p>
      {uploadHistory.length === 0 ? (
        <div className="wire-card">
          <p className="stock-invoice-lofi__section-body" style={{ margin: 0 }}>
            No uploads yet. Push stock from the review table to see them here.
          </p>
          <button
            type="button"
            className="wire-btn wire-btn--primary"
            style={{ marginTop: '1rem' }}
            onClick={onBackToUpload}
          >
            Go to Upload
          </button>
        </div>
      ) : (
        <ul className="stock-invoice-lofi__history-list">
          {uploadHistory.map((entry) => {
            const itemCount = entry.rows.length;
            const totalValue = entry.rows.reduce((sum, r) => sum + rowTotal(r), 0);
            return (
              <li key={entry.id} className="stock-invoice-lofi__history-item">
                <div className="stock-invoice-lofi__history-item-body">
                  <span className="stock-invoice-lofi__history-item-date">
                    {formatHistoryDate(entry.pushedAt)}
                  </span>
                  <span className="stock-invoice-lofi__history-item-meta">
                    {itemCount} item{itemCount !== 1 ? 's' : ''} · {formatCurrency(totalValue)}
                  </span>
                </div>
                <button
                  type="button"
                  className="wire-btn stock-invoice-lofi__revert-btn"
                  onClick={() => onRevert(entry.id)}
                  aria-label={`Revert upload from ${formatHistoryDate(entry.pushedAt)}`}
                >
                  Revert
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
