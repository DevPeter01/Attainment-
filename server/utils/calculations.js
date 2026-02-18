/**
 * Normalize cell value to number (same logic as dataExtractor)
 * @param {any} value - Raw value
 * @returns {number} - Normalized number
 */
const normalizeValue = (value) => {
    if (value == null) return 0;
    if (typeof value === 'object' && 'result' in value) return normalizeValue(value.result);
    if (typeof value === 'string') {
        const cleaned = value.trim().replace(/%/g, '').replace(/,/g, '');
        if (cleaned === '') return 0;
        const num = Number(cleaned);
        return isNaN(num) ? 0 : num;
    }
    if (typeof value === 'number') return isNaN(value) ? 0 : value;
    return 0;
};

export const calculateCOAttainment = (ciaStudents, assessmentStudents, redMaxMap) => {
    const assessmentMap = new Map();
    assessmentStudents.forEach(student => {
        assessmentMap.set(student.rollNo, student);
    });

    console.log('🧮 [Math] Phased Calculation: 60/40 weighted split...');

    return ciaStudents.map(ciaStudent => {
        const aSt = assessmentMap.get(ciaStudent.rollNo) || { marks: {} };
        const results = {
            rollNo: ciaStudent.rollNo,
            name: ciaStudent.name,
            marks: ciaStudent.marks,
            assessmentMarks: aSt.marks,
            coTotals: {}
        };

        // Phase D: Student Calculation (Dynamic COs) - PRODUCTION-SAFE
        const coIds = Object.keys(redMaxMap);
        coIds.forEach(coId => {
            const coKey = `co${coId}`;

            // Context-Bound Max Marks (NORMALIZED)
            const ciaMax = normalizeValue(redMaxMap[coId]?.cia) || 0;
            const assessmentMax = normalizeValue(redMaxMap[coId]?.assessment) || 0;

            // Student Marks (NORMALIZED)
            const studentCIA = normalizeValue(ciaStudent.marks[coKey]);
            const studentAssessment = normalizeValue(aSt.marks[coKey]);

            // Production Debug Logging (TEMPORARY)
            if (process.env.NODE_ENV === 'production' || process.env.DEBUG_CALC) {
                console.log(`🧮 [${ciaStudent.rollNo}] CO${coId}: CIA=${studentCIA}/${ciaMax}, Ass=${studentAssessment}/${assessmentMax}`);
            }

            // Apply Formula: ciaPart = (studentCIA / ciaMax) * 60
            const ciaPart = ciaMax > 0 ? (studentCIA / ciaMax) * 60 : 0;

            // Apply Formula: assessmentPart = (studentAssessment / assessmentMax) * 40
            const assessmentPart = assessmentMax > 0 ? (studentAssessment / assessmentMax) * 40 : 0;

            // Apply Formula: finalCO = ciaPart + assessmentPart
            const finalCO = ciaPart + assessmentPart;

            // Round final to 2 decimals for internal storage
            results.coTotals[coKey] = parseFloat(finalCO.toFixed(2));
            
            // Production Debug Logging
            if (process.env.NODE_ENV === 'production' || process.env.DEBUG_CALC) {
                console.log(`   → ciaPart=${ciaPart.toFixed(2)}, assPart=${assessmentPart.toFixed(2)}, final=${results.coTotals[coKey]}`);
            }
        });

        return results;
    });
};


/**
 * Calculate attainment level based on percentage
 * @param {number} percentage - Percentage score
 * @returns {number} - Attainment level (0-3)
 */
export const calculateAttainmentLevel = (percentage) => {
    if (percentage > 70) return 3;
    if (percentage > 65) return 2;
    if (percentage > 60) return 1;
    return 0;
};

/**
 * Calculate class-level attainment statistics
 * Placeholder - actual calculations done by Excel formulas
 * @param {Array} students - Array of students with marks
 * @returns {Object} - Class attainment statistics (placeholder)
 */
export const calculateClassAttainment = (students) => {
    const result = {};
    for (let i = 1; i <= 5; i++) {
        result[`co${i}`] = {
            studentsAbove60: 0,
            percentageAbove60: 0,
            attainmentLevel: 0
        };
    }
    return result;
};
