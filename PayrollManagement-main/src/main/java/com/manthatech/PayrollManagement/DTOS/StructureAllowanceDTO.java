package com.manthatech.PayrollManagement.DTOS;

import lombok.Getter;
import lombok.Setter;
import java.math.BigDecimal;

@Getter
@Setter
public class StructureAllowanceDTO {
    private Long id;
    private Long allowanceId;
    private BigDecimal amount;
}
