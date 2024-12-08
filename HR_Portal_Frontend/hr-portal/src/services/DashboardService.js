import { useCallback } from "react";
import useAuth0Api from "../api";

export const useDashboardService = () => {
  const api = useAuth0Api();

  const fetchDashboardMetrics = useCallback(async () => {
    try {
      const totalEmployeesResponse = await api.get("/employees?page=1");
      const totalDepartmentsResponse = await api.get("/departments?page=1");
      const salaryDataResponse = await api.get("/salaries?page=1");
      // const thirtyDaysAgo = new Date();
      // thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      // const recentHiresResponse = await api.get(`/employees?hired_after=${thirtyDaysAgo.toISOString().split("T")[0]}`);

      const fiveYearsAgo = new Date();
      fiveYearsAgo.setFullYear(fiveYearsAgo.getFullYear() - 5);
      const recentHiresResponse = await api.get(
        `/employees?hired_after=${fiveYearsAgo.toISOString().split("T")[0]}`
      );

      const departmentDistributionResponse = await api.get(
        "/departments?count_employees=true"
      );
      const genderDistributionResponse = await api.get(
        "/employees/gender_distribution"
      );

      const totalEmployees = totalEmployeesResponse.data.pagination.total_items;
      const totalDepartments =
        totalDepartmentsResponse.data.pagination.total_items;
      const averageSalary =
        salaryDataResponse.data.data.reduce(
          (acc, item) => acc + item.salary,
          0
        ) / salaryDataResponse.data.data.length;
      const recentHires = recentHiresResponse.data.pagination.total_items;
      const departmentDistribution = departmentDistributionResponse.data;
      const genderDistribution = genderDistributionResponse.data;

      return {
        totalEmployees,
        totalDepartments,
        averageSalary,
        recentHires,
        departmentDistribution,
        genderDistribution,
      };
    } catch (error) {
      console.error("Error fetching dashboard metrics:", error);
      throw error;
    }
  }, [api]);

  const fetchSalaryGrowthData = useCallback(async () => {
    try {
      const response = await api.get("/salary_growth");
      return response.data;
    } catch (error) {
      console.error("Error fetching salary growth data:", error);
      throw error;
    }
  }, [api]);

  const fetchDepartmentDistributionData = useCallback(async () => {
    try {
      const response = await api.get("/departments?count_employees=true");
      return response.data;
    } catch (error) {
      console.error("Error fetching department distribution data:", error);
      throw error;
    }
  }, [api]);

  return {
    fetchDashboardMetrics,
    fetchSalaryGrowthData,
    fetchDepartmentDistributionData,
  };
};

export default useDashboardService;
