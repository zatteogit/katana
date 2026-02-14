/**
 * GOLDEN BASELINE — NON MODIFICARE MAI
 * Katana v3.0 Stable — style.css
 * Freeze: 2026-02-14
 */
export const BASELINE_STYLE_CSS = `/* ==========================================================================
   KATANA STYLESHEET
   --------------------------------------------------------------------------
   1. Design Tokens & Variables
   2. Base Styles & Typography
   3. Layout & Navigation
   4. Configuration Card & Inputs
   5. Asset Cards & Workspace
   6. Buttons & Interactive
   7. SVG Color Picker Tools
   8. Modal Editor (CropperJS Overrides)
   9. Utilities & Responsive
   ========================================================================== */

/* ==========================================================================
   1. DESIGN TOKENS & VARIABLES
   Definizione palette colori e valori riutilizzabili.
   ========================================================================== */
:root {
    /* PALETTE */
    --primary: #1a1a1a;
    --primary-hover: #000000;
    --accent: #e63946;
    --guide-color: #00e5ff;

    /* UI COLORS */
    --surface: #ffffff;
    --surface-dim: #f4f4f4;
    --text-main: #111111;
    --text-sub: #555555;
    --text-muted: #888888;
    --border-color: #e0e0e0;

    /* GEOMETRY & EFFECTS */
    --radius-base: 0px; /* Brutalist design choice */
    --radius-preview-btn: 50px;
    --shadow-solid: 6px 6px 0px rgba(0, 0, 0, 0.08); /* Ombra solida stile retrò */
    --shadow-focus: 3px 3px 0 var(--accent);
}

/* ==========================================================================
   2. BASE STYLES & TYPOGRAPHY
   ========================================================================== */
body {
    background-color: #ffffff;
    /* BACKGROUND: Griglia tecnica leggera generata via CSS gradient */
    background-image: linear-gradient(#f4f4f4 1px, transparent 1px),
        linear-gradient(90deg, #f4f4f4 1px, transparent 1px);
    background-size: 40px 40px;
    background-position: -1px -1px;

    font-family: "Inter", sans-serif;
    color: var(--text-main);
    padding-bottom: 120px;
    -webkit-font-smoothing: antialiased; /* Font rendering migliorato su Mac */
}

/* Typography Overrides */
h4,
.h4 {
    font-size: 1.1rem !important;
    font-weight: 800;
    letter-spacing: -0.5px;
    text-transform: uppercase;
}
h5,
.h5 {
    font-size: 0.9rem !important;
    font-weight: 700;
    letter-spacing: 0.5px;
    text-transform: uppercase;
}

/* Material Symbols setup */
.icon {
    font-family: "Material Symbols Outlined";
    font-weight: normal;
    font-style: normal;
    font-size: 20px;
    line-height: 1;
    display: inline-block;
    white-space: nowrap;
    vertical-align: middle;
    user-select: none;
}

.text-on-grid {
    line-height: 40px;
    margin-bottom: 40px !important;
}

/* ==========================================================================
   3. LAYOUT & NAVIGATION
   ========================================================================== */
.navbar-custom {
    background: rgba(255, 255, 255, 0.95);
    border-bottom: 2px solid var(--primary);
    padding: 16px 0;
    margin-bottom: 40px;
    position: sticky;
    top: 0;
    z-index: 1000;
    box-shadow: none;
}

.brand-logo {
    font-weight: 900;
    color: var(--primary);
    font-size: 1.5rem;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 16px;
    letter-spacing: 2px;
    text-transform: uppercase;
}
.brand-logo svg {
    fill: currentColor;
}

.version-pill {
    background: var(--primary);
    color: white;
    padding: 4px 8px;
    border-radius: var(--radius-base);
    font-size: 0.7rem;
    font-family: monospace;
    font-weight: 700;
}

.container-grid {
    width: 100%;
    padding-right: 20px;
    padding-left: 20px;
    margin-right: auto;
    margin-left: auto;
}

/* ==========================================================================
   4. CONFIGURATION CARD & INPUTS
   ========================================================================== */
.config-card {
    background: var(--surface);
    border: 1px solid var(--primary);
    padding: 40px;
    margin-bottom: 24px;
    box-shadow: var(--shadow-solid);
}

.input-group-custom {
    background: white;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-base);
    display: flex;
    align-items: center;
    padding: 4px 8px;
    transition: all 0.1s ease;
    min-height: 48px;
}
.input-group-custom:focus-within {
    border-color: var(--primary);
    box-shadow: var(--shadow-focus);
}
.form-control:focus,
.form-select:focus {
    border-color: var(--primary) !important;
    box-shadow: none !important;
}

.input-icon {
    padding: 0 12px;
    color: var(--text-main);
    flex-shrink: 0;
}

.input-group-custom .form-control,
.input-group-custom .form-select {
    border: none;
    background: transparent;
    padding: 12px 4px;
    font-weight: 500;
    color: var(--text-main);
    box-shadow: none;
    font-family: monospace;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.input-label-sm {
    font-size: 0.7rem;
    font-weight: 700;
    color: var(--text-main);
    text-transform: uppercase;
    margin-left: 0;
    margin-bottom: 8px;
    display: block;
    letter-spacing: 1px;
}

.spec-chip {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: var(--surface-dim);
    border: 1px solid var(--border-color);
    padding: 6px 12px;
    border-radius: var(--radius-base);
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--text-main);
}
.spec-chip .icon {
    font-size: 16px;
    color: var(--primary);
}

/* ==========================================================================
   5. ASSET CARDS & WORKSPACE
   ========================================================================== */
.asset-card {
    background: var(--surface);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-base);
    overflow: hidden;
    transition: all 0.2s;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
}
.asset-card:hover {
    border-color: var(--primary);
    box-shadow: var(--shadow-solid);
    transform: translate(-2px, -2px);
}

.card-header-custom {
    padding: 12px 20px;
    border-bottom: 1px solid var(--border-color);
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fafafa;
}
.card-header-custom .icon {
    color: var(--text-main) !important;
}

.card-label {
    font-size: 0.7rem;
    font-weight: 800;
    text-transform: uppercase;
    color: var(--text-main);
    letter-spacing: 1px;
}

.workspace-area {
    background-color: #fcfcfc;
    background-image: radial-gradient(#d0d0d0 1px, transparent 1px);
    background-size: 20px 20px;
    height: 260px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: relative;
    padding: 24px;
    border-bottom: 1px solid var(--border-color);
}
.workspace-area canvas {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    max-width: 100%;
    max-height: 100%;
    background: white;
    transition: all 0.3s ease;
}
.workspace-area .canvas-preview.is-circle canvas {
    filter: drop-shadow(0 4px 4px rgba(0, 0, 0, 0.15));
}
.workspace-area .canvas-preview {
    display: flex;
    align-items: center;
    justify-content: center;
}

.drop-zone {
    background-color: white;
    border: 2px dashed #ccc;
    border-radius: var(--radius-base);
    padding: 60px 20px;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s ease;
}
.drop-zone:hover {
    border-color: var(--accent);
    background-color: #fffafa;
}
.drop-icon-wrapper {
    width: 48px;
    height: 48px;
    border: 2px solid var(--text-main);
    border-radius: var(--radius-base);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 20px;
    transition: all 0.2s;
}
.drop-zone:hover .drop-icon-wrapper {
    background: var(--accent);
    border-color: var(--accent);
    color: white;
    transform: rotate(90deg);
}

/* ==========================================================================
   6. BUTTONS & INTERACTIVE
   ========================================================================== */
.card-body-custom {
    padding: 20px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 16px;
    background: white;
}

.btn-pill-primary {
    background-color: var(--accent);
    color: white;
    border: none;
    padding: 14px 32px;
    border-radius: var(--radius-base);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 0.9rem;
    transition: all 0.2s;
    display: inline-flex;
    align-items: center;
    gap: 10px;
}
.btn-pill-primary:hover {
    background-color: black;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.btn-action {
    width: 100%;
    background: white;
    color: var(--text-main);
    border: 1px solid var(--border-color);
    padding: 10px 16px;
    border-radius: var(--radius-base);
    font-weight: 700;
    text-transform: uppercase;
    font-size: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: all 0.2s;
    flex: 1;
}
.btn-action:hover {
    background: var(--primary);
    color: white;
    border-color: var(--primary);
}

.btn-ghost {
    background: #f0f0f0;
    color: var(--text-main);
    border: 1px solid transparent;
    padding: 8px 16px;
    border-radius: var(--radius-base);
    font-weight: 600;
    font-size: 0.85rem;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all 0.2s;
    text-transform: uppercase;
}
.btn-ghost:hover {
    background: #e0e0e0;
    color: black;
}

.btn-toggle {
    flex: 1;
    padding: 8px;
    border-radius: var(--radius-base);
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    border: 1px solid var(--border-color);
    background: white;
    color: var(--text-sub);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    transition: all 0.2s;
}
.btn-toggle:hover {
    border-color: var(--primary);
    color: var(--primary);
}
.btn-toggle.active {
    background: var(--primary);
    color: white;
    border-color: var(--primary);
}

.icon-edit-slug {
    font-size: 20px;
    color: var(--text-main);
    cursor: pointer;
    opacity: 0.5;
    transition: all 0.2s;
    margin-left: 12px;
    vertical-align: middle;
    display: inline-block;
    transform: translateY(-2px);
}
.icon-edit-slug:hover {
    opacity: 1;
    color: var(--accent);
    transform: translateY(-2px) scale(1.1);
}

.meta-box {
    background: var(--surface-dim);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-base);
    padding: 12px;
    display: flex;
    flex-wrap: wrap;
    gap: 12px 8px;
}

.meta-item {
    display: flex;
    flex-direction: column;
    flex: 1 0 40%;
    min-width: 100px;
}

.meta-label {
    font-size: 0.6rem;
    font-weight: 800;
    color: #888;
    text-transform: uppercase;
    margin-bottom: 4px;
    display: block;
}

.meta-value,
.meta-highlight {
    font-size: 0.8rem;
    font-family: monospace;
    font-weight: 700;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.meta-value {
    color: var(--text-main);
}
.meta-highlight {
    color: var(--accent);
}

.filename-pill {
    font-family: "Consolas", monospace;
    font-size: 0.7rem;
    color: var(--text-sub);
    background: white;
    padding: 8px;
    border-radius: var(--radius-base);
    border: 1px solid var(--border-color);
    margin-top: 8px;
    word-break: break-all;
    text-align: center;
}

/* ==========================================================================
   7. SVG COLOR PICKER TOOLS
   ========================================================================== */
.svg-preview {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8px;
}
.text-preview {
    font-weight: 800;
    font-size: 1.5rem;
    line-height: 1;
}
.cta-preview {
    font-size: 16px;
    font-weight: 600;
    text-transform: uppercase;
    height: 52px;
    padding: 0 24px;
    border-radius: var(--radius-preview-btn);
    border: 1px solid transparent;
    display: inline-flex;
    align-items: center;
    justify-content: center;
}
.color-row {
    display: flex;
    gap: 12px;
    justify-content: center;
    align-items: flex-start;
    margin: 16px 0;
    min-height: 85px;
}
.color-slot {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    width: 70px;
    position: relative;
}
.color-dot {
    width: 42px;
    height: 42px;
    border-radius: var(--radius-base);
    border: 1px solid #ccc;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: transform 0.2s;
}
.color-dot:hover {
    transform: scale(1.1);
    border-color: var(--primary);
    z-index: 2;
}
.color-dot input[type="color"] {
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    cursor: pointer;
    opacity: 0;
}
.hex-input {
    width: 100%;
    border: 1px solid #ccc;
    border-radius: var(--radius-base);
    font-size: 0.75rem;
    font-family: "Consolas", monospace;
    text-align: center;
    text-transform: uppercase;
    color: var(--text-main);
    padding: 6px 0;
    background: white;
}
.hex-input:focus {
    outline: 2px solid var(--primary);
    border-color: var(--primary);
}
.slot-placeholder {
    width: 42px;
    height: 42px;
    border-radius: var(--radius-base);
    border: 1px dashed #999;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #999;
    cursor: pointer;
    background: #f4f4f4;
    transition: all 0.2s;
}
.slot-placeholder:hover {
    border-color: var(--primary);
    color: var(--primary);
    background: white;
}
.slot-label {
    font-size: 0.65rem;
    font-weight: 700;
    color: #999;
    text-transform: uppercase;
    height: 24px;
    display: flex;
    align-items: center;
}
.btn-remove-slot {
    position: absolute;
    top: -6px;
    right: -6px;
    width: 16px;
    height: 16px;
    background: var(--accent);
    color: white;
    border-radius: var(--radius-base);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 12px;
    box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);
    transition: transform 0.2s;
    z-index: 5;
}
.btn-remove-slot:hover {
    background: black;
    transform: scale(1.1);
}
.btn-fix-floating {
    position: absolute;
    bottom: 16px;
    right: 16px;
    background: var(--accent);
    color: white;
    border: none;
    padding: 8px 12px;
    border-radius: var(--radius-base);
    font-size: 0.75rem;
    font-weight: 700;
    box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    gap: 6px;
    z-index: 10;
    cursor: pointer;
    text-transform: uppercase;
}
.btn-fix-floating:hover {
    transform: translate(-1px, -1px);
    box-shadow: 5px 5px 0 rgba(0, 0, 0, 0.2);
    background: #d00000;
}

.psd-toggle-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-top: 12px;
    min-height: 32px;
    position: relative;
}
.psd-toggle-row .form-check-label {
    font-size: 11px !important;
    letter-spacing: 0.6px;
}
.psd-toggle-row .form-check-input {
    width: 2.8em;
    height: 1.4em;
}
#psdStatus {
    position: absolute;
    left: 50%;
    top: 100%;
    transform: translateX(-50%);
    margin-top: 4px;
    white-space: nowrap;
}

/* ==========================================================================
   8. MODAL EDITOR (CropperJS Integration)
   ========================================================================== */
.modal-content {
    border-radius: var(--radius-base);
    border: 1px solid var(--primary);
    overflow: hidden;
    box-shadow: 20px 20px 0 rgba(0, 0, 0, 0.15);
    display: flex;
    flex-direction: column;
    max-height: 90vh;
}
.modal-header {
    padding: 16px 24px;
    border-bottom: 1px solid #ccc;
    background: white;
    position: relative;
    z-index: 1060;
}
.modal-body {
    padding: 0;
    background: #222;
    height: 70vh;
    min-height: 500px;
    position: relative;
    overflow: hidden;
}
.modal-footer {
    padding: 16px 24px;
    border-top: 1px solid #ccc;
    background: white;
    position: relative;
    z-index: 1060;
}
.modal-footer #modalCircleGroup.form-check {
    margin: 0 1rem;
    align-self: center;
}
.img-container {
    width: 100%;
    height: 100%;
    display: block;
}
.img-container img {
    display: block;
    max-width: 100%;
}
.cropper-view-box {
    outline: 1px solid #ffffff;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.5);
    background-color: transparent;
}
.cropper-modal {
    opacity: 0.85;
    background-color: #111;
}
.cropper-point {
    background-color: var(--accent);
    width: 8px;
    height: 8px;
    opacity: 1;
    border-radius: var(--radius-base);
}

.cropper-dashed,
.cropper-center {
    display: none !important;
}

/* --------------------------------------------------------------------------
   OVERLAY ZONES
   -------------------------------------------------------------------------- */
.modal-focus-overlay {
    position: absolute;
    pointer-events: none;
    z-index: 50;
    border: 2px solid rgba(34, 197, 94, 0.85);
    background: rgba(34, 197, 94, 0.08);
    box-sizing: border-box;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding: 4px;
}

.modal-oz-overlay {
    position: absolute;
    pointer-events: none;
    z-index: 49;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    padding: 4px;
    box-sizing: border-box;
}

.modal-oz-text {
    border: 2px dashed rgba(245, 158, 11, 0.90);
    background: rgba(245, 158, 11, 0.15);
}

.modal-oz-badge {
    border: 2px dashed rgba(239, 68, 68, 0.90);
    background: rgba(239, 68, 68, 0.15);
}

.modal-oz-label,
.modal-focus-overlay > span {
    font-size: 9px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.6px;
    color: #fff;
    white-space: nowrap;
    padding: 2px 6px;
    border-radius: 3px;
    line-height: 1;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
}
.modal-focus-overlay > span {
    background: rgba(34, 197, 94, 0.55);
}
.modal-oz-text .modal-oz-label {
    background: rgba(245, 158, 11, 0.65);
}
.modal-oz-badge .modal-oz-label {
    background: rgba(239, 68, 68, 0.65);
}

.circle-guide-overlay {
    position: absolute;
    inset: 0;
    border: 1px dashed var(--guide-color);
    border-radius: 50%;
    box-shadow: 0 0 0 2000px rgba(0, 0, 0, 0.7);
    pointer-events: none;
    z-index: 51;
}

.hint-square {
    width: 12px;
    height: 12px;
    border: 2px solid rgba(34, 197, 94, 0.85);
    background: rgba(34, 197, 94, 0.15);
    display: inline-block;
    margin-right: 2px;
    border-radius: 2px;
}
.hint-oz-text {
    width: 12px;
    height: 12px;
    border: 2px dashed rgba(245, 158, 11, 0.90);
    background: rgba(245, 158, 11, 0.18);
    display: inline-block;
    margin-right: 2px;
    border-radius: 2px;
}
.hint-oz-badge {
    width: 12px;
    height: 12px;
    border: 2px dashed rgba(239, 68, 68, 0.90);
    background: rgba(239, 68, 68, 0.18);
    display: inline-block;
    margin-right: 2px;
    border-radius: 2px;
}
.magenta-dot {
    width: 12px;
    height: 12px;
    background-color: var(--guide-color);
    border: 1px solid #008c9e;
    border-radius: 50%;
    display: inline-block;
}

.custom-switch-layout {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 0 !important;
    margin: 0 !important;
}
.custom-switch-layout .form-check-input {
    margin-left: 0 !important;
    cursor: pointer;
    width: 3.5em;
    height: 1.75em;
    border-radius: 0 !important;
    background-color: #e0e0e0;
    border: 1px solid #666;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3crect x='-2' y='-2' width='4' height='4' fill='%23666'/%3e%3c/svg%3e");
}
.custom-switch-layout .form-check-input:checked {
    background-color: var(--primary);
    border-color: var(--primary);
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3crect x='-2' y='-2' width='4' height='4' fill='%23fff'/%3e%3c/svg%3e");
}
.custom-switch-layout .form-check-input:focus {
    border-color: var(--primary);
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
}

/* ==========================================================================
   9. UTILITIES & RESPONSIVE
   ========================================================================== */
#loadingOverlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.98);
    z-index: 9999;
    display: none;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
#safariAlert {
    display: none;
    background: #1a1a1a;
    color: white;
    padding: 12px;
    text-align: center;
    font-weight: 600;
    border-bottom: 1px solid #333;
    font-size: 0.85rem;
    font-family: monospace;
}

.form-range::-webkit-slider-thumb {
    background: var(--primary);
}
.form-range::-webkit-slider-thumb:active {
    background: var(--accent);
}

#modalZoomGroup .icon {
    user-select: none;
    transition: color 0.2s;
}
#modalZoomGroup .icon:hover {
    color: var(--primary) !important;
}
.border-start {
    border-left: 1px solid #ccc !important;
}

/* RESPONSIVE QUERIES */
@media (min-width: 768px) {
    .container-grid {
        padding-right: 40px;
        padding-left: 40px;
        max-width: 100%;
    }
}
@media (min-width: 992px) {
    .row.g-4 {
        --bs-gutter-x: 40px;
        --bs-gutter-y: 40px;
    }
}
@media (max-width: 768px) {
    .modal-header,
    .modal-footer {
        padding: 10px 16px !important;
    }
    .modal-body {
        height: 65vh !important;
        min-height: auto !important;
        max-height: none !important;
    }
    .d-flex.flex-column.flex-md-row > div {
        width: 100%;
    }
    .modal-footer .btn {
        padding: 12px 0;
    }
}

`;
