import ExcelJS from 'exceljs';
import { AppError } from '../middleware/errorHandler.js';

// --- SAFE HELPERS ---
const getActualCell = (c) => { if (!c) return null; return c.isMerged ? (c.master || c) : c; };
const getNumeric = (c) => {
    const ac = getActualCell(c);
    if (!ac) return null;
    const rv = ac.result ?? ac.value;
    if (typeof rv === 'number') return rv;
    if (rv === null || rv === undefined || (typeof rv === 'string' && rv.trim() === '')) return null;
    const n = Number(rv); return !isNaN(n) ? n : null;
};
const getVal = (c) => { const ac = getActualCell(c); return ac ? (ac.result ?? ac.value ?? null) : null; };
const isRed = (c) => {
    const ac = getActualCell(c);
    const color = ac?.font?.color?.argb;
    if (!color) return false;
    const normalizedColor = color.toString().toUpperCase();
    return normalizedColor === "FFFF0000" || normalizedColor === "FF0000";
};
const norm = (t) => t ? t.toString().normalize("NFKD").replace(/[^a-zA-Z0-9]/g, '').toLowerCase() : '';
const matchH = (v, patterns) => patterns.some(p => norm(v).includes(norm(p)));

/**
 * GENERIC PHASED EXTRACTOR
 * Returns { students, coMaxMarks: { 1: val, 2: val... } }
 */
const extractBaseData = (sheet, sheetType, label) => {
    const coCols = {}; // Phase A: { 1: col, 2: col... }
    const redMax = {}; // Phase B
    let headerRow = 0, regCol = 2, nameCol = 3;

    // Phase A: Structure Discovery
    let startRow = 1;
    if (sheetType === 'Assessment') {
        sheet.eachRow({ includeEmpty: false }, (r, n) => {
            if (!startRow || startRow === 1) {
                if (matchH(getVal(r.getCell(1)), ['comp3', 'component3'])) startRow = n;
            }
        });
    }

    sheet.eachRow({ includeEmpty: false }, (row, rowNum) => {
        if (headerRow || rowNum < startRow || rowNum > startRow + 50) return;
        let found = false;
        row.eachCell({ includeEmpty: false }, (cell, colNum) => {
            const v = getVal(cell);
            if (!v) return;
            const m = v.toString().trim().toUpperCase().match(/^CO([1-5])$/);
            if (m) {
                coCols[parseInt(m[1])] = colNum;
                found = true;
            }
            if (matchH(v, ['register', 'regno', 'roll'])) regCol = colNum;
            if (matchH(v, ['name', 'student'])) nameCol = colNum;
        });
        if (found) headerRow = rowNum;
    });

    if (!headerRow) throw new AppError(`${sheetType}: CO headers not discovered.`, 422);

    // Phase B: Context-Bound Red Scan
    Object.keys(coCols).forEach(id => {
        const colNum = coCols[id];
        // Scan rows 1 to headerRow + 5 to find the red-colored max marks (typically in the header area)
        for (let r = 1; r <= Math.min(headerRow + 5, sheet.rowCount); r++) {
            const cell = sheet.getRow(r).getCell(colNum);
            const n = getNumeric(cell);
            if (n !== null && n > 0 && isRed(cell)) {
                redMax[id] = n;
                break;
            }
        }
    });

    // Phase C: Validation Gate (Per Sheet)
    Object.keys(coCols).forEach(id => {
        if (!redMax[id]) {
            console.warn(`⚠️ ${sheetType}: Red max mark not found for CO${id} in column ${coCols[id]}. Initializing to 0.`);
            redMax[id] = 0; // Fallback to avoid immediate crash if one CO is missing red mark
        }
    });

    // Phase D: Extraction
    const students = [];
    sheet.eachRow({ includeEmpty: false }, (row, rowNum) => {
        if (rowNum <= headerRow) return;
        const nv = getVal(row.getCell(nameCol));
        if (!nv || norm(nv) === '' || matchH(nv, ['total', 'average', 'max', 'names', 'register'])) return;

        const s = {
            rollNo: getVal(row.getCell(regCol))?.toString()?.trim() || `S${rowNum}`,
            name: nv.toString().trim(),
            marks: {}
        };
        Object.keys(coCols).forEach(id => {
            s.marks[`co${id}`] = getNumeric(row.getCell(coCols[id])) || 0;
        });
        students.push(s);
    });

    return { students, coMaxMarks: redMax };
};

export const extractCIAData = (sheet) => extractBaseData(sheet, 'CIA', 'CIA');
export const extractAssessmentData = (sheet) => extractBaseData(sheet, 'Assessment', 'Assessment');

/**
 * Extracts red numeric values from a sheet by searching for "Attainment" label
 */
export const extractRedAttainmentData = (sheet) => {
    const data = [];
    if (!sheet) return data;

    console.log(`🔎 Scanning sheet: "${sheet.name}" for attainment data...`);

    // Search for rows that mention attainment anywhere in the row
    sheet.eachRow({ includeEmpty: false }, (row, rowNum) => {
        let isAttainmentRow = false;
        row.eachCell({ includeEmpty: false }, (cell) => {
            const val = getVal(cell);
            if (val && norm(val).includes('attainment')) {
                isAttainmentRow = true;
            }
        });

        if (isAttainmentRow) {
            console.log(`🎯 Found attainment row at ${sheet.name}!${rowNum}`);
            row.eachCell({ includeEmpty: false }, (cell) => {
                const n = getNumeric(cell);
                // Check color - log if we found a numeric but not red
                if (n !== null) {
                    const red = isRed(cell);
                    if (red) {
                        console.log(`   ✅ Extracted RED value: ${n} at ${cell.address}`);
                        data.push({
                            value: n,
                            address: cell.address,
                            sheetName: sheet.name,
                            rowNum: rowNum
                        });
                    } else {
                        const color = cell.font?.color?.argb || 'NONE';
                        console.log(`   ⏩ Skipping non-red numeric: ${n} at ${cell.address} (Color: ${color})`);
                    }
                }
            });
        }
    });

    if (data.length === 0) {
        console.warn(`⚠️ No red attainment marks found in sheet "${sheet.name}". Ensure values are RED font.`);
    }

    return data;
};
