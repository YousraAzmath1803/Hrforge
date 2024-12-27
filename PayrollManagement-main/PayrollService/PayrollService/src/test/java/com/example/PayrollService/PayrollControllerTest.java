package com.example.PayrollService;

import com.example.PayrollService.controller.PayrollController;
import com.example.PayrollService.model.Payroll;
import com.example.PayrollService.model.SalaryDetails;
import com.example.PayrollService.service.PayrollService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Collections;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyDouble;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(PayrollController.class)
public class PayrollControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Mock
    private PayrollService payrollService;

    @InjectMocks
    private PayrollController payrollController;

    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        objectMapper = new ObjectMapper();
    }

    @Test
    void testCreatePayroll() throws Exception {
        Payroll payroll = new Payroll(1, 20.0, 40, 800.0, 80.0, 40.0, 49.6, 11.6, 50.0, 60.0, 291.2, 508.8);
        when(payrollService.createPayroll(any(Payroll.class))).thenReturn(payroll);

        mockMvc.perform(post("/api/payroll")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(payroll)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.employeeId").value(1))
                .andExpect(jsonPath("$.grossPay").value(800.0));
    }

    @Test
    void testGetPayrollById() throws Exception {
        Payroll payroll = new Payroll(1, 20.0, 40, 800.0, 80.0, 40.0, 49.6, 11.6, 50.0, 60.0, 291.2, 508.8);
        when(payrollService.getPayrollById(anyLong())).thenReturn(Optional.of(payroll));

        mockMvc.perform(get("/api/payroll/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.employeeId").value(1))
                .andExpect(jsonPath("$.grossPay").value(800.0));
    }

    @Test
    void testGetPayrollByIdNotFound() throws Exception {
        when(payrollService.getPayrollById(anyLong())).thenReturn(Optional.empty());

        mockMvc.perform(get("/api/payroll/1"))
                .andExpect(status().isNotFound());
    }

    @Test
    void testGetAllPayrolls() throws Exception {
        Payroll payroll = new Payroll(1, 20.0, 40, 800.0, 80.0, 40.0, 49.6, 11.6, 50.0, 60.0, 291.2, 508.8);
        when(payrollService.getAllPayrolls()).thenReturn(Collections.singletonList(payroll));

        mockMvc.perform(get("/api/payroll"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].employeeId").value(1))
                .andExpect(jsonPath("$[0].grossPay").value(800.0));
    }

    @Test
    void testUpdatePayroll() throws Exception {
        Payroll payroll = new Payroll(1, 20.0, 40, 800.0, 80.0, 40.0, 49.6, 11.6, 50.0, 60.0, 291.2, 508.8);
        when(payrollService.updatePayroll(anyLong(), any(Payroll.class))).thenReturn(payroll);

        mockMvc.perform(put("/api/payroll/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(payroll)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.employeeId").value(1))
                .andExpect(jsonPath("$.grossPay").value(800.0));
    }

    @Test
    void testUpdatePayrollNotFound() throws Exception {
        Payroll payroll = new Payroll(1, 20.0, 40, 800.0, 80.0, 40.0, 49.6, 11.6, 50.0, 60.0, 291.2, 508.8);
        when(payrollService.updatePayroll(anyLong(), any(Payroll.class))).thenReturn(null);

        mockMvc.perform(put("/api/payroll/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(payroll)))
                .andExpect(status().isNotFound());
    }

    @Test
    void testDeletePayroll() throws Exception {
        when(payrollService.deletePayroll(anyLong())).thenReturn(true);

        mockMvc.perform(delete("/api/payroll/1"))
                .andExpect(status().isNoContent());
    }

    @Test
    void testDeletePayrollNotFound() throws Exception {
        when(payrollService.deletePayroll(anyLong())).thenReturn(false);

        mockMvc.perform(delete("/api/payroll/1"))
                .andExpect(status().isNotFound());
    }

    @Test
    void testCalculateSalary() throws Exception {
        SalaryDetails salaryDetails = new SalaryDetails(800.0, 80.0, 40.0, 49.6, 11.6, 50.0, 60.0, 291.2, 508.8);
        when(payrollService.calculateSalary(anyDouble(), anyDouble())).thenReturn(salaryDetails);

        mockMvc.perform(get("/api/payroll/calculate")
                        .param("hourlyRate", "20")
                        .param("hoursWorked", "40"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.grossPay").value(800.0));
    }

    @Test
    void testCalculateSalaryBadRequest() throws Exception {
        mockMvc.perform(get("/api/payroll/calculate")
                        .param("hourlyRate", "-20")
                        .param("hoursWorked", "40"))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("Hourly rate and hours worked must be non-negative."));
    }
}
