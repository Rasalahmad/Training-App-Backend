import { StudentRegistration } from '../studentRegistration/studentRegistration.model.js';
import { Teacher } from '../teacher/teacher.model.js';
import { currencyFormatter } from '../../../utils/index.js';

const getDashboardData = async () => {
  try {
    const totalStudent = await StudentRegistration.countDocuments();
    const totalTeacher = await Teacher.countDocuments();
    const pipeline = [
      {
        $group: {
          _id: null,
          totalPaidAmount: { $sum: '$paid' },
        },
      },
    ];

    const result = await StudentRegistration.aggregate(pipeline);

    let totalPaidAmount = 0;
    if (result && result.length > 0) {
      totalPaidAmount = currencyFormatter(result[0].totalPaidAmount);
    }

    return { totalStudent, totalTeacher, totalPaidAmount };
  } catch (error) {
    console.error('Error:', error.message);
  }
};

export const StatisticService = { getDashboardData };
