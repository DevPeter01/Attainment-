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

        // Phase D: Student Calculation (Dynamic COs)
        const coIds = Object.keys(redMaxMap);
        coIds.forEach(coId => {
            const coKey = `co${coId}`;

            // Context-Bound Max Marks
            const ciaMax = redMaxMap[coId]?.cia || 0;
            const assessmentMax = redMaxMap[coId]?.assessment || 0;

            // Student Marks
            const studentCIA = ciaStudent.marks[coKey] || 0;
            const studentAssessment = aSt.marks[coKey] || 0;

            // Apply Formula: ciaPart = (studentCIA / ciaMax) * 60
            const ciaPart = ciaMax > 0 ? (studentCIA / ciaMax) * 60 : 0;

            // Apply Formula: assessmentPart = (studentAssessment / assessmentMax) * 40
            const assessmentPart = assessmentMax > 0 ? (studentAssessment / assessmentMax) * 40 : 0;

            // Apply Formula: finalCO = ciaPart + assessmentPart
            const finalCO = ciaPart + assessmentPart;

            // Round final to 2 decimals for internal storage
            results.coTotals[coKey] = parseFloat(finalCO.toFixed(2));
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
