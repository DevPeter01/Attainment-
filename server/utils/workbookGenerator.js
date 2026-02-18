import ExcelJS from 'exceljs';

/**
 * Create CO workbook matching EXACT institutional template format
 * Dynamically generated based on detected Course Outcomes (COs)
 */
export const createCOWorkbook = (data) => {
    const { students, metadata, ciaMaxMarks, assessmentMaxMarks, exitData, semesterData } = data;

    // Phase 1: Dynamic Structure Discovery
    const coIds = Object.keys(ciaMaxMarks).sort((a, b) => parseInt(a) - parseInt(b));
    const totalCOs = coIds.length;

    const startColIndex = 4; // Column D
    const colsPerCO = 8; // CIA, CIA %, CIA Status, Assessment, Ass %, Ass Status, FINAL %, Status
    const totalCols = 3 + (totalCOs * colsPerCO);

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('CO');

    // Helper to convert column index to Excel letter
    const getColLetter = (index) => {
        let letter = '';
        while (index > 0) {
            let temp = (index - 1) % 26;
            letter = String.fromCharCode(65 + temp) + letter;
            index = (index - temp - 1) / 26;
        }
        return letter;
    };

    const lastColLetter = getColLetter(totalCols);

    // ========== HEADER TITLES (Rows 1-4) ==========
    const headerTitles = [
        { text: 'HINDUSTHAN INSTITUTE OF TECHNOLOGY', size: 12, bold: true },
        { text: 'COIMBATORE-32', size: 11, bold: false },
        { text: 'DEPARTMENT OF COMPUTER SCIENCE AND ENGINEERING', size: 11, bold: true },
        { text: metadata.assessmentTitle || 'COURSE OUTCOME ASSESSMENT  2022 - 2023 (ODD)', size: 11, bold: true }
    ];

    headerTitles.forEach((header, i) => {
        const rowNum = i + 1;
        worksheet.mergeCells(`A${rowNum}:${lastColLetter}${rowNum}`);
        const cell = worksheet.getCell(`A${rowNum}`);
        cell.value = header.text;
        cell.font = { bold: header.bold, size: header.size };
        cell.alignment = { horizontal: 'center', vertical: 'middle' };
    });

    // ========== METADATA (Rows 6-8) ==========
    worksheet.getCell('A6').value = 'Course:';
    worksheet.getCell('B6').value = metadata.courseCode || '22CS401';
    worksheet.getCell('A7').value = 'COURSE NAME:';
    worksheet.getCell('B7').value = metadata.courseName || 'DATA STRUCTURES';
    worksheet.getCell('A8').value = 'Total Students:';
    worksheet.getCell('B8').value = students.length;

    worksheet.getCell('A9').value = 'Percentage of Students above target level';
    worksheet.getCell('A10').value = 'Attainment Level';

    // ========== DYNAMIC HEADERS (Row 10 & 11) ==========
    const fixedTitles = ['S.NO', 'REGISTER', 'NAME'];
    ['A', 'B', 'C'].forEach((col, idx) => {
        worksheet.mergeCells(`${col}10:${col}11`);
        const cell = worksheet.getCell(`${col}10`);
        cell.value = fixedTitles[idx];
        cell.font = { bold: true, size: 10, color: { argb: 'FFFFFFFF' } };
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF002060' } };
        cell.alignment = { horizontal: 'center', vertical: 'middle' };
        cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    });

    coIds.forEach((id, idx) => {
        const baseColIdx = startColIndex + (idx * colsPerCO);
        const startL = getColLetter(baseColIdx);
        const endL = getColLetter(baseColIdx + colsPerCO - 1);

        worksheet.mergeCells(`${startL}10:${endL}10`);
        const groupCell = worksheet.getCell(`${startL}10`);
        groupCell.value = `CO${id}`;
        groupCell.font = { bold: true, size: 10, color: { argb: 'FFFFFFFF' } };
        groupCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF002060' } };
        groupCell.alignment = { horizontal: 'center', vertical: 'middle' };
        groupCell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

        const subHeaders = ['CIA', 'CIA %', 'CIA Status', 'Assessment', 'Ass %', 'Ass Status', 'FINAL %', 'Status'];
        subHeaders.forEach((sh, shIdx) => {
            const colIdx = baseColIdx + shIdx;
            const l = getColLetter(colIdx);
            const cell = worksheet.getCell(`${l}11`);
            cell.value = sh;
            cell.font = { bold: true, size: 10, color: { argb: 'FFFFFFFF' } };
            cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF002060' } };
            cell.alignment = { horizontal: 'center', vertical: 'middle' };
            cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

            // Visibility: User's reference image shows them, so we make them visible.
            worksheet.getColumn(colIdx).hidden = false;
        });

        // Max Marks per CO
        const ciaMaxL = getColLetter(baseColIdx);
        const assMaxL = getColLetter(baseColIdx + 3);
        worksheet.getCell(`${ciaMaxL}12`).value = ciaMaxMarks[id] || 0;
        worksheet.getCell(`${assMaxL}12`).value = assessmentMaxMarks[id] || 0;

        for (let i = 0; i < colsPerCO; i++) {
            const l = getColLetter(baseColIdx + i);
            const cell = worksheet.getCell(`${l}12`);
            if (i === 0 || i === 3) cell.font = { bold: true, color: { argb: 'FFFF0000' } };
            cell.alignment = { horizontal: 'center', vertical: 'middle' };
            cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        }
    });

    worksheet.getCell('C12').value = 'Max Marks';
    worksheet.getCell('C12').font = { italic: true, size: 9 };
    worksheet.getCell('C12').alignment = { horizontal: 'right', vertical: 'middle' };
    ['A', 'B', 'C'].forEach(col => {
        worksheet.getCell(`${col}12`).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    });

    // ========== STUDENT DATA (Rows 13+) ==========
    students.forEach((student, sIdx) => {
        const rowNum = 13 + sIdx;
        const row = worksheet.getRow(rowNum);

        row.getCell(1).value = sIdx + 1;
        row.getCell(2).value = student.rollNo;
        row.getCell(3).value = student.name;

        coIds.forEach((id, idx) => {
            const baseColIdx = startColIndex + (idx * colsPerCO);
            const ciaL = getColLetter(baseColIdx);
            const ciaPercL = getColLetter(baseColIdx + 1);
            const ciaStatL = getColLetter(baseColIdx + 2);
            const assL = getColLetter(baseColIdx + 3);
            const assPercL = getColLetter(baseColIdx + 4);
            const assStatL = getColLetter(baseColIdx + 5);
            const finalL = getColLetter(baseColIdx + 6);
            const statusL = getColLetter(baseColIdx + 7);

            const coKey = `co${id}`;
            row.getCell(baseColIdx).value = student.marks[coKey] || 0;
            row.getCell(baseColIdx + 3).value = student.assessmentMarks?.[coKey] || 0;

            // Step 1: CIA Percentage (Rounded to Integer)
            worksheet.getCell(`${ciaPercL}${rowNum}`).value = {
                formula: `=ROUND(${ciaL}${rowNum}/$${ciaL}$12*100, 0)`,
                result: 0
            };
            // Step 2: CIA Status
            worksheet.getCell(`${ciaStatL}${rowNum}`).value = {
                formula: `=IF(${ciaPercL}${rowNum}>65,"Y","N")`,
                result: 'N'
            };

            // Step 4: Assessment Percentage (Rounded to Integer)
            worksheet.getCell(`${assPercL}${rowNum}`).value = {
                formula: `=ROUND(${assL}${rowNum}/$${assL}$12*100, 0)`,
                result: 0
            };
            // Step 5: Assessment Status
            worksheet.getCell(`${assStatL}${rowNum}`).value = {
                formula: `=IF(${assPercL}${rowNum}>65,"Y","N")`,
                result: 'N'
            };

            // Step 7: Existing 60/40 FINAL % (Rounded to Integer)
            worksheet.getCell(`${finalL}${rowNum}`).value = {
                formula: `=ROUND((60*${ciaL}${rowNum}/$${ciaL}$12)+(40*${assL}${rowNum}/$${assL}$12),0)`,
                result: 0
            };
            // Final Status
            worksheet.getCell(`${statusL}${rowNum}`).value = {
                formula: `=IF(${finalL}${rowNum}>65,"Y","N")`,
                result: 'N'
            };
        });

        for (let i = 1; i <= totalCols; i++) {
            const cell = row.getCell(i);
            cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            cell.font = { size: 10 };
            cell.alignment = { horizontal: i === 3 ? 'left' : 'center', vertical: 'middle' };
        }
    });

    // ========== SUMMARY & ATTAINMENT ROWS (Bottom of CO Sheet) ==========
    const lastStudentRow = 13 + students.length - 1;
    const nameRange = `$C$13:$C$${lastStudentRow}`;

    // Labels in Column C
    worksheet.getCell(`C${lastStudentRow + 1}`).value = 'Total Y (Final)';
    worksheet.getCell(`C${lastStudentRow + 2}`).value = 'Percentage (Final)';
    worksheet.getCell(`C${lastStudentRow + 3}`).value = 'Final Attainment Level';
    worksheet.getCell(`C${lastStudentRow + 4}`).value = 'CIA Attainment Level';
    worksheet.getCell(`C${lastStudentRow + 5}`).value = 'Assessment Attainment Level';

    for (let r = 1; r <= 5; r++) {
        const cell = worksheet.getCell(`C${lastStudentRow + r}`);
        cell.font = { bold: true, size: 10 };
        cell.alignment = { horizontal: 'right', vertical: 'middle' };
        cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    }

    coIds.forEach((id, idx) => {
        const baseColIdx = startColIndex + (idx * colsPerCO);
        const ciaStatL = getColLetter(baseColIdx + 2);
        const assStatL = getColLetter(baseColIdx + 5);
        const statusL = getColLetter(baseColIdx + 7);

        const row1 = lastStudentRow + 1;
        const row2 = lastStudentRow + 2;
        const row3 = lastStudentRow + 3;
        const row4 = lastStudentRow + 4;
        const row5 = lastStudentRow + 5;

        // Level formula helper
        const getLvlFormula = (percRef) => `IF(${percRef}>70,3,IF(${percRef}>65,2,IF(${percRef}>60,1,0)))`;

        // 1. FINAL Attainment
        worksheet.getCell(`${statusL}${row1}`).value = { formula: `=COUNTIF(${statusL}13:${statusL}${lastStudentRow},"Y")`, result: 0 };
        worksheet.getCell(`${statusL}${row2}`).value = { formula: `=ROUND((${statusL}${row1}/COUNTA(${nameRange}))*100, 0)`, result: 0 };
        worksheet.getCell(`${statusL}${row2}`).numFmt = '0';
        worksheet.getCell(`${statusL}${row3}`).value = { formula: `=${getLvlFormula(`${statusL}${row2}`)}`, result: 0 };

        // 2. CIA Attainment Logic
        const ciaYRange = `${ciaStatL}13:${ciaStatL}${lastStudentRow}`;
        const ciaPercForm = `ROUND((COUNTIF(${ciaYRange},"Y")/COUNTA(${nameRange}))*100, 0)`;
        worksheet.getCell(`${statusL}${row4}`).value = {
            formula: `=IF(${ciaPercForm}>70,3,IF(${ciaPercForm}>65,2,IF(${ciaPercForm}>60,1,0)))`,
            result: 0
        };

        // 3. Assessment Attainment Logic
        const assYRange = `${assStatL}13:${assStatL}${lastStudentRow}`;
        const assPercForm = `ROUND((COUNTIF(${assYRange},"Y")/COUNTA(${nameRange}))*100, 0)`;
        worksheet.getCell(`${statusL}${row5}`).value = {
            formula: `=IF(${assPercForm}>70,3,IF(${assPercForm}>65,2,IF(${assPercForm}>60,1,0)))`,
            result: 0
        };

        for (let r = 1; r <= 5; r++) {
            const cell = worksheet.getCell(`${statusL}${lastStudentRow + r}`);
            cell.font = { bold: true };
            cell.alignment = { horizontal: 'center', vertical: 'middle' };
            cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        }
    });

    ['A', 'B'].forEach(col => {
        for (let r = 1; r <= 5; r++) {
            worksheet.getCell(`${col}${lastStudentRow + r}`).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        }
    });

    // ========== PRE-CALCULATE MATRIX DATA (JS Math for Summary Statement) ==========
    // PRODUCTION-SAFE: Normalize all values before calculations
    const normalizeValue = (v) => {
        if (v == null) return 0;
        if (typeof v === 'number') return isNaN(v) ? 0 : v;
        if (typeof v === 'string') {
            const cleaned = v.trim().replace(/%/g, '').replace(/,/g, '');
            const num = Number(cleaned);
            return isNaN(num) ? 0 : num;
        }
        return 0;
    };

    const totalStudents = students.length || 1;
    const matrixStats = coIds.map((id, idx) => {
        const coKey = `co${id}`;
        const ciaMax = normalizeValue(ciaMaxMarks[id]) || 1;
        const assMax = normalizeValue(assessmentMaxMarks[id]) || 1;

        const getLvl = (p) => p > 70 ? 3 : p > 65 ? 2 : p > 60 ? 1 : 0;

        // CIA Level (Integer) - NORMALIZED
        const ciaAbove = students.filter(s => {
            const mark = normalizeValue(s.marks[coKey]);
            const percentage = Math.round((mark / ciaMax) * 100);
            return percentage > 65;
        }).length;
        const ciaPerc = Math.round((ciaAbove / totalStudents) * 100);
        const ciaLvl = getLvl(ciaPerc);

        // Assessment Level (Integer) - NORMALIZED
        const assAbove = students.filter(s => {
            const mark = normalizeValue(s.assessmentMarks?.[coKey]);
            const percentage = Math.round((mark / assMax) * 100);
            return percentage > 65;
        }).length;
        const assPerc = Math.round((assAbove / totalStudents) * 100);
        const assLvl = getLvl(assPerc);

        // Semester Level (External - Integer) - NORMALIZED
        const semLvl = Math.round(normalizeValue(semesterData[idx]?.value) || 3.0);

        // Exit Survey Level (External - DECIMAL) - NORMALIZED
        const exitLvl = normalizeValue(exitData[idx]?.value) || 2.0;

        // Average of levels (Direct Method is Integer)
        const odLvl = Math.round((ciaLvl + assLvl + semLvl) / 3);

        // Overall Attainment (80/20 - DECIMAL since Exit is Decimal)
        const oaLvl = (odLvl * 0.8) + (exitLvl * 0.2);

        return { ciaLvl, assLvl, semLvl, exitLvl, odLvl, oaLvl };
    });

    const finalAvg = matrixStats.length > 0 ? matrixStats.reduce((sum, s) => sum + s.oaLvl, 0) / matrixStats.length : 0;

    // ========== MATRIX SHEET ==========
    const matrixSheet = workbook.addWorksheet('MATRIX');
    const mLastColL = getColLetter(totalCOs + 1);

    // --- PHASE 1: TITLES & METADATA ---
    headerTitles.slice(0, 2).forEach((header, i) => {
        const rowNum = i + 1;
        matrixSheet.mergeCells(`A${rowNum}:${mLastColL}${rowNum}`);
        const cell = matrixSheet.getCell(`A${rowNum}`);
        cell.value = header.text;
        cell.font = { bold: header.bold, size: header.size };
        cell.alignment = { horizontal: 'center', vertical: 'middle' };
    });

    const borderThin = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    const setMeta = (row, label, val) => {
        matrixSheet.getCell(`A${row}`).value = label;
        matrixSheet.getCell(`A${row}`).font = { bold: true };
        const vCell = matrixSheet.getCell(`B${row}`);
        vCell.value = val;
        matrixSheet.mergeCells(`B${row}:${mLastColL}${row}`);
        vCell.alignment = { horizontal: 'center' };
        for (let i = 1; i <= totalCOs + 1; i++) matrixSheet.getCell(`${getColLetter(i)}${row}`).border = borderThin;
    };

    setMeta(3, 'Academic year', metadata.academicYear || '2023 - 2024 (ODD)');
    setMeta(4, 'Course Code', metadata.courseCode);
    setMeta(5, 'Course Name', metadata.courseName);
    setMeta(6, 'Class', metadata.className || 'II YEAR');
    setMeta(7, 'Semester', metadata.semester || 'III');

    matrixSheet.mergeCells(`A8:${mLastColL}8`); // Gap

    // Row 9: Column Headers
    const mHRow = matrixSheet.getRow(9);
    mHRow.getCell(1).value = 'Component';
    mHRow.getCell(1).font = { bold: true };
    mHRow.getCell(1).border = borderThin;
    coIds.forEach((id, idx) => {
        const cell = mHRow.getCell(idx + 2);
        cell.value = `CO${id}`;
        cell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF002060' } };
        cell.alignment = { horizontal: 'center', vertical: 'middle' };
        cell.border = borderThin;
    });

    // Section Header: DIRECT METHOD
    matrixSheet.mergeCells(`A10:${mLastColL}10`);
    const directHeader = matrixSheet.getCell('A10');
    directHeader.value = 'DIRECT METHOD';
    directHeader.font = { bold: true, underline: true };
    directHeader.alignment = { horizontal: 'center', vertical: 'middle' };
    directHeader.border = borderThin;

    // Direct Method Data
    const rowLabels = [
        { label: 'CIA', key: 'ciaLvl', row: 11, fmt: '0' },
        { label: 'ASSESSMENT COMPONENTS', key: 'assLvl', row: 12, fmt: '0' },
        { label: 'End Semester Examinations (External)', key: 'semLvl', row: 13, fmt: '0' },
        { label: 'OVERALL DIRECT ATTAINMENT', key: 'odLvl', row: 14, fmt: '0', beige: true }
    ];

    rowLabels.forEach(config => {
        const r = matrixSheet.getRow(config.row);
        r.getCell(1).value = config.label;
        r.getCell(1).font = { bold: true };
        r.getCell(1).border = borderThin;
        if (config.beige) r.getCell(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF5F5DC' } };
        else r.getCell(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE9E9E9' } };
        r.getCell(1).alignment = { horizontal: 'center', vertical: 'middle' };

        coIds.forEach((id, idx) => {
            const cell = r.getCell(idx + 2);
            const mColL = getColLetter(idx + 2);
            const coBaseIdx = startColIndex + (idx * colsPerCO);
            const statusL = getColLetter(coBaseIdx + 7);
            const stat = matrixStats[idx];

            if (config.key === 'ciaLvl') {
                cell.value = { formula: `'CO'!${statusL}${lastStudentRow + 4}`, result: stat.ciaLvl };
            } else if (config.key === 'assLvl') {
                cell.value = { formula: `'CO'!${statusL}${lastStudentRow + 5}`, result: stat.assLvl };
            } else if (config.key === 'semLvl') {
                cell.value = Math.round(stat.semLvl);
            } else if (config.key === 'odLvl') {
                cell.value = { formula: `=ROUND(AVERAGE(${mColL}11, ${mColL}12, ${mColL}13), 0)`, result: stat.odLvl };
            }

            cell.numFmt = config.fmt;
            cell.alignment = { horizontal: 'center', vertical: 'middle' };
            cell.border = borderThin;
            if (config.beige) cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF5F5DC' } };
        });
    });

    // Indirect Method
    matrixSheet.mergeCells(`A15:${mLastColL}15`);
    const indirectHeader = matrixSheet.getCell('A15');
    indirectHeader.value = 'Indirect Method';
    indirectHeader.font = { bold: true, underline: true };
    indirectHeader.alignment = { horizontal: 'center', vertical: 'middle' };
    indirectHeader.border = borderThin;

    const iRow = matrixSheet.getRow(16);
    iRow.getCell(1).value = 'Course Exit Survey';
    iRow.getCell(1).font = { bold: true };
    iRow.getCell(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE9E9E9' } };
    iRow.getCell(1).border = borderThin;
    iRow.getCell(1).alignment = { horizontal: 'center', vertical: 'middle' };
    coIds.forEach((id, idx) => {
        const cell = iRow.getCell(idx + 2);
        const stat = matrixStats[idx];
        cell.value = stat.exitLvl;
        cell.numFmt = '0.00';
        cell.alignment = { horizontal: 'center', vertical: 'middle' };
        cell.border = borderThin;
    });

    // Overall Attainment
    matrixSheet.mergeCells(`A17:${mLastColL}17`);
    const oaHeader = matrixSheet.getCell('A17');
    oaHeader.value = 'OVERALL ATTAINMENT (80 % Direct & 20% Indirect)';
    oaHeader.font = { bold: true, underline: true };
    oaHeader.alignment = { horizontal: 'center', vertical: 'middle' };
    oaHeader.border = borderThin;

    const oaRow = matrixSheet.getRow(18);
    oaRow.getCell(1).value = 'OVERALL ATTAINMENT';
    oaRow.getCell(1).font = { bold: true };
    oaRow.getCell(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF8C00' } };
    oaRow.getCell(1).border = borderThin;
    oaRow.getCell(1).alignment = { horizontal: 'center', vertical: 'middle' };
    coIds.forEach((id, idx) => {
        const cell = oaRow.getCell(idx + 2);
        const mColL = getColLetter(idx + 2);
        const stat = matrixStats[idx];
        cell.value = { formula: `=(${mColL}14*0.8)+(${mColL}16*0.2)`, result: stat.oaLvl };
        cell.numFmt = '0.00';
        cell.font = { bold: true };
        cell.alignment = { horizontal: 'center', vertical: 'middle' };
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF8C00' } };
        cell.border = borderThin;
    });

    // Final Statement
    matrixSheet.mergeCells(`B20:${mLastColL}21`);
    const finalBox = matrixSheet.getCell('B20');
    finalBox.value = `Overall CO Attainment for ${metadata.courseCode || 'Course Code'} - ${metadata.courseName || 'Course Name'} = ${finalAvg.toFixed(2)}`;
    finalBox.font = { bold: true, size: 11 };
    finalBox.alignment = { horizontal: 'center', vertical: 'middle' };
    finalBox.border = { top: { style: 'thick' }, left: { style: 'thick' }, bottom: { style: 'thick' }, right: { style: 'thick' } };

    // Column Widths
    worksheet.getColumn('A').width = 6;
    worksheet.getColumn('B').width = 18;
    worksheet.getColumn('C').width = 28;
    matrixSheet.getColumn(1).width = 40;
    for (let i = 2; i <= totalCOs + 1; i++) { matrixSheet.getColumn(i).width = 12; }

    return workbook;
};
