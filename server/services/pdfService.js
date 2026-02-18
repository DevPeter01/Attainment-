import puppeteer from "puppeteer-core";
import { AppError } from '../middleware/errorHandler.js';

export const generatePDF = async (workbook, data) => {
  try {
    const coSheet = workbook.getWorksheet('CO');
    const matrixSheet = workbook.getWorksheet('MATRIX');

    if (!coSheet) throw new AppError('CO worksheet not found', 500);

    // Extract metadata from CO sheet or data
    const courseCode = data?.metadata?.courseCode || coSheet.getCell('B6').value || 'N/A';
    const courseName = data?.metadata?.courseName || coSheet.getCell('B7').value || 'N/A';
    const strength = data?.students?.length || coSheet.getCell('B8').value || 0;

    // Discover CO columns - get all unique COs from student data
    const coIds = data?.students?.[0]?.marks 
      ? Object.keys(data.students[0].marks).map(key => key.replace('co', '')).sort((a, b) => parseInt(a) - parseInt(b))
      : [];
    
    const cos = coIds.map(id => ({ label: `CO${id}`, id: id }));

    // Build students array with actual calculated values from data
    const students = [];
    
    if (data && data.students) {
      // Use pre-calculated data from processExcelFile
      data.students.forEach((student, idx) => {
        const studentData = {
          sno: idx + 1,
          regNo: student.rollNo || '',
          name: student.name || '',
          coResults: []
        };

        coIds.forEach(id => {
          const coKey = `co${id}`;
          const ciaMarks = student.marks?.[coKey] || 0;
          const assMarks = student.assessmentMarks?.[coKey] || 0;
          
          // Calculate FINAL % using the same formula as Excel: (60*CIA/CIAMax)+(40*ASS/ASSMax)
          const ciaMax = data.redMaxMap?.[id]?.cia || 1;
          const assMax = data.redMaxMap?.[id]?.assessment || 1;
          const finalPercent = Math.round((60 * ciaMarks / ciaMax) + (40 * assMarks / assMax));
          
          // Calculate status based on FINAL %
          const status = finalPercent > 65 ? 'Y' : 'N';

          studentData.coResults.push({
            cia: ciaMarks,
            ass: assMarks,
            final: finalPercent,
            status: status
          });
        });

        students.push(studentData);
      });
    } else {
      // Fallback: Extract from worksheet (legacy)
      for (let r = 13; r <= coSheet.rowCount; r++) {
        const row = coSheet.getRow(r);
        const name = row.getCell(3).value;
        if (!name || name === 'Total Y') break;

        const studentData = {
          sno: row.getCell(1).value,
          regNo: row.getCell(2).value,
          name: name,
          coResults: []
        };

        const startColIndex = 4;
        const colsPerCO = 8;

        cos.forEach((co, idx) => {
          const baseColIdx = startColIndex + (idx * colsPerCO);
          
          const getCellValue = (colIdx) => {
            const cell = row.getCell(colIdx);
            if (!cell) return null;
            
            if (cell.formula || cell.type === 6) {
              return cell.result !== undefined ? cell.result : cell.value;
            }
            
            if (cell.value && typeof cell.value === 'object' && 'result' in cell.value) {
              return cell.value.result;
            }
            
            return cell.value;
          };

          studentData.coResults.push({
            cia: getCellValue(baseColIdx) || 0,
            ass: getCellValue(baseColIdx + 3) || 0,
            final: getCellValue(baseColIdx + 6) || 0,
            status: getCellValue(baseColIdx + 7) || 'N'
          });
        });

        students.push(studentData);
      }
    }

    // Extract Matrix data
    const matrixData = [];
    if (matrixSheet) {
      const rows = [11, 12, 13, 14, 16, 18]; // CIA, Ass, Sem, Direct, Indirect, Overall
      const labels = [
        'CIA Attainment (0-3)',
        'Assessment Attainment (0-3)',
        'End Semester Attainment (0-3)',
        'OVERALL DIRECT ATTAINMENT',
        'Indirect Method (Exit Survey)',
        'OVERALL ATTAINMENT (80/20)'
      ];

      rows.forEach((rowNum, i) => {
        const row = matrixSheet.getRow(rowNum);
        const dataRow = { label: labels[i], values: [] };
        for (let c = 2; c <= matrixSheet.columnCount; c++) {
          const cell = row.getCell(c);
          let val = cell.result !== undefined ? cell.result : cell.value;

          if (val !== null && val !== undefined && typeof val !== 'object') {
            dataRow.values.push(val);
          } else if (val && val.formula) {
            dataRow.values.push(cell.result || '0.00');
          } else {
            dataRow.values.push(0);
          }
        }
        matrixData.push(dataRow);
      });
    }

    const html = `
    <html>
    <head>
        <style>
            @page { size: A3 landscape; margin: 1cm; }
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; font-size: 10px; margin: 0; }
            .container { padding: 20px; }
            .header { text-align: center; margin-bottom: 20px; border-bottom: 2px solid #002060; padding-bottom: 10px; }
            .header h1 { color: #002060; margin: 0; font-size: 20px; }
            .header h2 { margin: 5px 0; font-size: 14px; color: #555; }
            
            .meta-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 20px; background: #f9f9f9; padding: 10px; border-radius: 5px; }
            .meta-item b { color: #002060; }

            table { width: 100%; border-collapse: collapse; margin-bottom: 30px; table-layout: fixed; }
            th, td { border: 1px solid #ddd; padding: 5px; text-align: center; overflow: hidden; text-overflow: ellipsis; }
            th { background: #002060; color: white; font-weight: bold; font-size: 9px; }
            .sub-header { background: #f2f2f2; font-weight: bold; color: #333; }
            .co-title { background: #002060; color: white; }
            
            .name-col { text-align: left; width: 150px; }
            .sno-col { width: 30px; }
            .reg-col { width: 100px; }

            .attainment-matrix { margin-top: 40px; page-break-before: always; }
            .attainment-matrix h2 { color: #002060; border-left: 5px solid #002060; padding-left: 10px; }
            .matrix-table td:first-child { text-align: left; font-weight: bold; background: #f2f2f2; width: 250px; }
            .overall-attainment { background: #FF8C00 !important; color: white !important; }

            .final-box { margin-top: 20px; padding: 15px; border: 3px thick #002060; text-align: center; font-size: 16px; font-weight: bold; background: #fffde7; border: 2px solid #002060; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>HINDUSTHAN INSTITUTE OF TECHNOLOGY</h1>
                <h2>Course Outcome Assessment Report (Upgraded CO/MATRIX)</h2>
            </div>

            <div class="meta-grid">
                <div class="meta-item"><b>Course:</b> ${courseCode}</div>
                <div class="meta-item"><b>Name:</b> ${courseName}</div>
                <div class="meta-item"><b>Total Students:</b> ${strength}</div>
            </div>

            <table>
                <thead>
                    <tr>
                        <th rowspan="2" class="sno-col">S.No</th>
                        <th rowspan="2" class="reg-col">Register No</th>
                        <th rowspan="2" class="name-col">Name</th>
                        ${cos.map(co => `<th colspan="4" class="co-title">${co.label}</th>`).join('')}
                    </tr>
                    <tr class="sub-header">
                        ${cos.map(() => `
                            <td>CIA</td>
                            <td>ASS</td>
                            <td>FINAL %</td>
                            <td>STS</td>
                        `).join('')}
                    </tr>
                </thead>
                <tbody>
                    ${students.map(s => `
                        <tr>
                            <td>${s.sno}</td>
                            <td>${s.regNo}</td>
                            <td class="name-col">${s.name}</td>
                            ${s.coResults.map(res => `
                                <td>${res.cia}</td>
                                <td>${res.ass}</td>
                                <td>${res.final}</td>
                                <td>${res.status}</td>
                            `).join('')}
                        </tr>
                    `).join('')}
                </tbody>
            </table>

            <div class="attainment-matrix">
                <h2>Attainment Matrix (Dynamic Computation)</h2>
                <table class="matrix-table">
                    <thead>
                        <tr>
                            <th>Method / COs</th>
                            ${cos.map(co => `<th>${co.label}</th>`).join('')}
                        </tr>
                    </thead>
                    <tbody>
                        ${matrixData.map(row => `
                            <tr class="${row.label.includes('OVERALL ATTAINMENT') ? 'overall-attainment' : ''}">
                                <td>${row.label}</td>
                                ${row.values.map(v => `<td>${typeof v === 'number' ? v.toFixed(2) : v}</td>`).join('')}
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>

            <div class="final-box">
                Overall CO Attainment successfully calculated using Institutional separate CIA & Assessment logic.
            </div>
        </div>
    </body>
    </html>`;

    const browser = await puppeteer.launch({
      executablePath: process.env.CHROME_PATH || null,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });
    const pdf = await page.pdf({ format: 'A3', landscape: true, printBackground: true });
    await browser.close();

    return pdf;
  } catch (error) {
    console.error('PDF Generation Error:', error);
    throw new AppError('Failed to generate PDF report: ' + error.message, 500);
  }
};
