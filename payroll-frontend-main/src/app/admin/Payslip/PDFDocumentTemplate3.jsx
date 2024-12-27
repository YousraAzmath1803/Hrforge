// PDFDocumentTemplate3.jsx
'use client'
import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { getDepartmentName, getPositionName, numberToWords } from './utils';

const PDFDocumentTemplate3 = ({ formData, totalEarnings, totalDeductions }) => {
    const styles = StyleSheet.create({
        page: {
            padding: 20,
            fontSize: 10,
            fontFamily: "Helvetica",
        },
        header: {
            textAlign: "center",
            marginBottom: 15,
            color: formData.headerColor,
        },
        logo: {
            width: 40,
            height: 40,
            marginBottom: 8,
            marginLeft: "auto",
            marginRight: "auto",
        },
        companyName: {
            fontSize: 14,
            fontWeight: "bold",
            marginBottom: 4,
        },
        companyAddress: {
            fontSize: 9,
            marginBottom: 8,
            width: "80%",
            textAlign: "center",
            marginLeft: "auto",
            marginRight: "auto",
        },
        sectionTitle: {
            fontSize: 12,
            fontWeight: "bold",
            marginBottom: 8,
            textAlign: "center",
        },
        netPay: {
            fontSize: 10,
            fontWeight: "bold",
            textAlign: "center",
            marginTop: 15,
        },
        netPayInWords: {
            fontSize: 10,
            fontWeight: "bold",
            textAlign: "center",
            marginTop: 5,
        },
        note: {
            fontSize: 9,
            textAlign: "center",
            marginTop: "auto",
        },
        table: {
            display: 'flex',
            width: 'auto',
            borderStyle: 'solid',
            borderWidth: 1,
            borderColor: '#bfbfbf',
            borderRightWidth: 0,
            borderBottomWidth: 0,
        },
        tableRow: {
            flexDirection: 'row',
        },
        tableCol: {
            width: '25%',
            borderStyle: 'solid',
            borderWidth: 1,
            borderColor: '#bfbfbf',
            borderLeftWidth: 0,
            borderTopWidth: 0,
            padding: 5,
            textAlign: 'center',
        },
        tableColHeader: {
            width: '25%',
            padding: 5,
            textAlign: 'center',
            backgroundColor: '#1DBE9D',
            fontWeight: 'bold',
            color: 'white',
        },
        tableCell: {
            margin: 'auto',
            marginTop: 5,
            fontSize: 10,
        },
        employeeDetailsTable: {
            marginBottom: 20,
        },
        employeeDetailsRow: {
            flexDirection: 'row',
        },
        employeeDetailsCol: {
            width: '50%',
            borderStyle: 'solid',
            borderWidth: 1,
            borderColor: '#bfbfbf',
            borderLeftWidth: 0,
            borderTopWidth: 0,
            padding: 5,
            textAlign: 'center',
        },
        employeeDetailsColHeader: {
            width: '50%',
            padding: 5,
            textAlign: 'center',
            backgroundColor: '#1DBE9D',
            fontWeight: 'bold',
        },
    });

    const logoUrl = formData.logo;
    const netAmount = Math.round(totalEarnings - totalDeductions);
    const netAmountInWords = numberToWords(netAmount).toUpperCase();

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    {logoUrl && <Image src={logoUrl} style={styles.logo} />}
                    <Text style={styles.companyName}>{formData.companyName}</Text>
                    <Text style={styles.companyAddress}>{formData.companyAddress}</Text>
                    <Text style={styles.sectionTitle}>
                        Payslip Month of {formData.formattedMonthYear}
                    </Text>
                </View>

                <View style={[styles.table, styles.employeeDetailsTable]}>
                    <View style={styles.employeeDetailsRow}>
                        <Text style={{ ...styles.employeeDetailsColHeader, marginRight: -1 }}>Detail</Text>
                        <Text style={{ ...styles.employeeDetailsColHeader, marginRight: -1 }}>Value</Text>
                        <Text style={{ ...styles.employeeDetailsColHeader, marginRight: -1 }}>Detail</Text>
                        <Text style={styles.employeeDetailsColHeader}>Value</Text>
                    </View>
                    <View style={styles.employeeDetailsRow}>
                        <Text style={styles.employeeDetailsCol}>Employee Name</Text>
                        <Text style={styles.employeeDetailsCol}>{formData.name}</Text>
                        <Text style={styles.employeeDetailsCol}>Pan Card Num</Text>
                        <Text style={styles.employeeDetailsCol}>{formData.panNumber}</Text>
                    </View>
                    <View style={styles.employeeDetailsRow}>
                        <Text style={styles.employeeDetailsCol}>Employee ID</Text>
                        <Text style={styles.employeeDetailsCol}>{formData.employeeId}</Text>
                        <Text style={styles.employeeDetailsCol}>Bank Account No</Text>
                        <Text style={styles.employeeDetailsCol}>{formData.bankAccount}</Text>
                    </View>
                    <View style={styles.employeeDetailsRow}>
                        <Text style={styles.employeeDetailsCol}>Designation</Text>
                        <Text style={styles.employeeDetailsCol}>{formData.position}</Text>
                        <Text style={styles.employeeDetailsCol}>No. of paid / Total days</Text>
                        <Text style={styles.employeeDetailsCol}>{parseInt(formData.totalDays) - parseInt(formData.lop)}/{formData.totalDays}</Text>
                    </View>
                    <View style={styles.employeeDetailsRow}>
                        <Text style={styles.employeeDetailsCol}>Department</Text>
                        <Text style={styles.employeeDetailsCol}>{formData.department}</Text>
                        <Text style={styles.employeeDetailsCol}>Lop Days</Text>
                        <Text style={styles.employeeDetailsCol}>{formData.lop}</Text>
                    </View>
                    <View style={styles.employeeDetailsRow}>
                        <Text style={styles.employeeDetailsCol}>Date of Joining</Text>
                        <Text style={styles.employeeDetailsCol}>{formData.dateOfJoining}</Text>
                        <Text style={styles.employeeDetailsCol}>EPF UAN Number</Text>
                        <Text style={styles.employeeDetailsCol}>{formData.uanNumber}</Text>
                    </View>
                </View>

                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <Text style={{ ...styles.tableColHeader, marginRight: -1 }}>Earnings</Text>
                        <Text style={styles.tableColHeader}>Amount</Text>
                        <Text style={{ ...styles.tableColHeader, marginRight: -1 }}>Deductions</Text>
                        <Text style={styles.tableColHeader}>Amount</Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableCol}>Basic Salary</Text>
                        <Text style={styles.tableCol}>{Math.round(formData.basicSalary)}</Text>
                        <Text style={styles.tableCol}>Provident Fund</Text>
                        <Text style={styles.tableCol}>{Math.round(formData.providentFund)}</Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableCol}>Housing Allowance</Text>
                        <Text style={styles.tableCol}>{Math.round(formData.hra)}</Text>
                        <Text style={styles.tableCol}>Professional Tax</Text>
                        <Text style={styles.tableCol}>{Math.round(formData.professionalTax)}</Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableCol}>Medical Reimbursement</Text>
                        <Text style={styles.tableCol}>{Math.round(formData.medicalAllowance)}</Text>
                        <Text style={styles.tableCol}>ESI</Text>
                        <Text style={styles.tableCol}>{Math.round(formData.esi)}</Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableCol}>Transport Allowances</Text>
                        <Text style={styles.tableCol}>{Math.round(formData.transportAllowance)}</Text>
                        <Text style={styles.tableCol}>TDS</Text>
                        <Text style={styles.tableCol}>{Math.round(formData.tds)}</Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableCol}>Special Allowances</Text>
                        <Text style={styles.tableCol}>{Math.round(formData.otherAllowances)}</Text>
                        <Text style={styles.tableCol}>Other Deductions</Text>
                        <Text style={styles.tableCol}>{Math.round(formData.otherDeductions)}</Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableCol}>Total Earnings</Text>
                        <Text style={styles.tableCol}>{Math.round(totalEarnings)}</Text>
                        <Text style={styles.tableCol}>Total Deductions</Text>
                        <Text style={styles.tableCol}>{Math.round(totalDeductions)}</Text>
                    </View>
                </View>

                <Text style={styles.netPay}>Net Pay: {Math.round(netAmount)}</Text>
                <Text style={styles.netPayInWords}>Net Pay in Words: {netAmountInWords}</Text>
                <Text style={styles.note}>
                    This is a computer-generated payslip. No signature is required.
                </Text>
            </Page>
        </Document>
    );
};

export default PDFDocumentTemplate3;