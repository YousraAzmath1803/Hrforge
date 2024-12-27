// PDFDocumentTemplate1.jsx
'use client'
import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';
import { getDepartmentName, getPositionName, numberToWords } from './utils';

// Register the Calibri font
Font.register({
    family: "Calibri",
    src: "/fonts/Calibri-Bold.ttf",
  });

const PDFDocumentTemplate1 = ({ formData, totalEarnings, totalDeductions }) => {
    const styles = StyleSheet.create({
        page: {
          paddingTop: 50,
          paddingRight: 100,
          paddingBottom: 100,
          paddingLeft: 70,
          fontSize: 12, // Changed font size to 12
          fontFamily: "Calibri",
          fontWeight: "bold", // Made font bold
        },
        header: {
          fontSize: 8.5, // Changed font size to 12
          marginTop: 9,
          textAlign: "center",
          marginBottom: -10,
          marginLeft: 5,
          color: "#000", // Changed color to dark black
          fontFamily: "Calibri",
          fontWeight: "bold", // Made font bold
        },
        subHeader: {
          fontSize: 10.5,
          marginTop: 11,
          marginBottom: 10,
          marginLeft: 7,
          textAlign: "center",
          color: "#000", // Changed color to dark black
          fontWeight: "bold", // Made font bold
        },
        logo: {
          width: 33, // Increased width
          height: 30, // Maintained the height similar to width
          marginRight: 343, // Moved to left
          marginTop: 11,
        },
        companyName: {
          fontSize: 17.4,
          color: "#0070C0",
          textAlign: "center",
          marginTop: -22,
          marginLeft: 10,
          marginRight: 0,
          fontFamily: "Calibri",
          fontWeight: "bold",
        },
        companyInfo: {
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 20,
        },
        companyDetails: {
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        },
    
        summaryColumn: {
          flex: 1,
          marginTop: 10,
          marginRight: -40,
          marginBottom: 25, // Increased margin bottom for more gap
        },
        summaryRow: {
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 15,
        },
        summaryLabel: {
          fontSize: 10,
          color: "#000",
          flexBasis: "45%",
          textAlign: "left",
          paddingLeft: 18,
          fontWeight: "bold",
          fontFamily: "Calibri",
        },
        summarySeparator: {
          fontSize: 10,
          color: "#000",
          textAlign: "left",
          marginLeft: 20,
          fontWeight: "bold",
          fontFamily: "Calibri",
        },
        summaryValue: {
          fontSize: 10,
          color: "#000",
          flexBasis: "80%",
          textAlign: "center",
          marginLeft: -30,
          fontWeight: "bold",
          fontFamily: "Calibri",
          flexWrap: "wrap", // Allow wrapping
        },
    
        summaryRowWide: {
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 15, // Increased margin bottom for more gap
          width: "100%",
          flexWrap: "nowrap",
        },
        netPayContainer: {
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          textAlign: "left",
          marginRight: 40,
          marginTop: -10,
        },
        netPayAmount: {
          fontSize: 10, // Changed font size to 12
          color: "#000", // Changed color to dark black
          marginLeft: 35, // Adjusted to move net amount a bit to the right
          fontWeight: "bold", // Made font bold
          fontFamily: "Calibri",
        },
        netPayLabel: {
          fontSize: 10, // Changed font size to 12
          color: "#000", // Changed color to dark black
          marginRight: 35, // Adjust padding to decrease space between label and amount
          marginLeft: 14, // Add padding to the left
          fontWeight: "bold", // Made font bold
          fontFamily: "Calibri",
        },
        wordsContainer: {
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          marginTop: 10,
          marginLeft: 10,
        },
        wordsLabel: {
          fontSize: 10, // Changed font size to 12
          color: "#000", // Changed color to dark black
          marginRight: 7, // Adjust padding to decrease space between label and amount
          marginLeft: 4,
          fontWeight: "bold", // Made font bold
          fontFamily: "Calibri",
        },
        wordsAmount: {
          fontSize: 10, // Changed font size to 12
          color: "#000", // Changed color to dark black
          fontWeight: "bold", // Made font bold
          fontFamily: "Calibri",
        },
    
        daysInfo: {
          fontSize: 12, // Changed font size to 12
          color: "#000", // Changed color to dark black
          textAlign: "left",
          fontWeight: "bold", // Made font bold
          fontFamily: "Calibri",
        },
        daysInfoRow: {
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 5,
        },
        tableContainer: {
          flexDirection: "row",
          marginBottom: 20,
          marginTop: -55,
        },
        table: {
          width: "100%",
          borderWidth: 1,
          borderColor: "#000",
          borderRadius: 0,
          overflow: "hidden",
          marginBottom: 20,
        },
        tableHeader: {
          flexDirection: "row",
          backgroundColor: "#A6A6A6",
          borderBottomWidth: 1,
          borderBottomColor: "#000",
          paddingHorizontal: 10,
        },
        tableHeaderCell: {
          fontSize: 10,
          fontWeight: "bold",
          flex: 1,
          textAlign: "left",
          fontFamily: "Calibri",
        },
        tableRow: {
          flexDirection: "row",
          paddingHorizontal: 10,
          alignItems: "center",
        },
        tableCell: {
          fontSize: 10,
          textAlign: "left",
          fontWeight: "bold",
          paddingHorizontal: 2,
          overflow: "hidden",
          flex: 2,
          fontFamily: "Calibri",
          marginLeft: 6,
          marginRight: -9,
          marginTop: 2,
        },
        tableCells: {
          fontSize: 10,
          textAlign: "left",
          fontWeight: "bold",
          marginLeft: -25,
          flex: 2,
          fontFamily: "Calibri",
        },
        tableCellAmount: {
          fontSize: 10,
          textAlign: "right",
          fontWeight: "bold",
          marginRight: 40,
          flex: 1,
          fontFamily: "Calibri",
        },
        tableCellAmounts: {
          fontSize: 10,
          textAlign: "right",
          fontWeight: "bold",
          marginRight: -9,
          flex: 1,
          fontFamily: "Calibri",
          bottom: -4,
          marginTop: -10,
        },
        toalCellAmount: {
          fontSize: 9,
          textAlign: "right",
          fontWeight: "bold",
          marginRight: -9,
          flex: 1,
          fontFamily: "Calibri",
          bottom: -4,
          marginTop: -2,
        },
        totalRow: {
          flexDirection: "row",
        },
        totalCell: {
          fontSize: 10,
          textAlign: "left",
          fontWeight: "bold",
          marginTop: 10,
          fontFamily: "Calibri",
          marginLeft: 8,
          marginBottom: -7,
        },
        note: {
          fontSize: 8.5,
          textAlign: "left",
          marginTop: 20,
          color: "#000",
          marginLeft: 14,
          fontFamily: "Calibri",
        },
        verticalLine: {
          borderLeftColor: "#000",
          borderLeftWidth: 1,
          marginTop: -150,
          height: "162%",
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: -985,
        },
    
        employeeSummary: {
          flexDirection: "row",
          flexWrap: "wrap",
          marginBottom: 50,
          marginTop: -25,
        },
        row: {
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 5,
        },
        column: {
          display: "flex",
          flexDirection: "row",
          width: "50%",
          marginLeft: "5%",
        },
        label: {
          width: "40%", // Increase width to prevent truncation
          textAlign: "left",
          fontSize: 10,
          whiteSpace: "nowrap", // Keep the text in a single line
          marginBottom: 5,
          marginTop: 3,
        },
        labels: {
          width: "35%", // Increase width to prevent truncation
          textAlign: "left",
          fontSize: 10,
          whiteSpace: "nowrap", // Keep the text in a single line
          marginBottom: 5,
          marginTop: 3,
          marginLeft: -10, // Move to left
        },
        colon: {
          fontSize: 10,
          color: "#000",
          textAlign: "left",
          marginLeft: 18,
          fontWeight: "bold",
          fontFamily: "Calibri",
          marginTop: 3,
        },
        value: {
          width: "40%",
          textAlign: "center",
          fontSize: 10,
          overflowWrap: "break-word",
          marginTop: 3,
          marginLeft: 10, // Moved a little bit to the right
        },
        nameValue: {
          width: "40%",
          textAlign: "center",
          fontSize: 10,
          overflowWrap: "break-word",
          marginTop: 3,
          marginLeft: 10,
        },
        longName: {
          width: "40%",
          textAlign: "center",
          fontSize: 10,
          whiteSpace: "nowrap",
          marginTop: -2,
          marginLeft: 10,
        },
      });

    const logoUrl = formData.logo;
    const netAmount = Math.round(totalEarnings - totalDeductions);
    const netAmountInWords = numberToWords(netAmount);

    const formatValue = (value) => parseFloat(value).toFixed(2);

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.companyInfo}>
                    {logoUrl && <Image src={logoUrl} style={styles.logo} />}
                </View>
                <View style={styles.companyName}>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Text style={styles.companyName}>{formData.companyName}</Text>
                    </View>
                </View>
                <View style={styles.companyInfo}>
                    <View style={styles.companyDetails}>
                        <Text style={styles.header}>{formData.companyAddress.substring(0, 95)}</Text>
                        <Text style={styles.header}>{formData.companyAddress.substring(95)}</Text>
                        <Text style={styles.subHeader}>Payslip For the month of {formData.formattedMonthYear}</Text>
                    </View>
                </View>


                <View style={styles.employeeSummary}>
                    {/* First Row */}
                    <View style={styles.row}>
                        <View style={styles.column}>
                            <Text style={styles.label}>Employee No</Text>
                            <Text style={styles.colon}>:</Text>
                            <Text style={styles.value}>{formData.employeeId}</Text>
                        </View>
                        <View style={styles.column}>
                            <Text style={styles.labels}>Employee Name</Text>
                            <Text style={styles.colon}>:</Text>
                            <Text style={formData.name.length > 20 ? styles.longName : styles.nameValue}>
                                {formData.name}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.row}>
                        <View style={styles.column}>
                            <Text style={styles.label}>Department</Text>
                            <Text style={styles.colon}>:</Text>
                            <Text style={styles.value}>{formData.department}</Text>
                        </View>
                        <View style={styles.column}>
                            <Text style={styles.labels}>Date Of Joining</Text>
                            <Text style={styles.colon}>:</Text>
                            <Text style={styles.value}>{formData.formattedJoiningDate}</Text>
                        </View>
                    </View>

                    <View style={styles.row}>
                        <View style={styles.column}>
                            <Text style={styles.label}>Designation</Text>
                            <Text style={styles.colon}>:</Text>
                            <Text style={styles.value}>{formData.position}</Text>
                        </View>
                        <View style={styles.column}>
                            <Text style={{ ...styles.labels, marginTop: -5 }}>No. of Paid Days/Total Days</Text>
                            <Text style={styles.colon}>:</Text>
                            <Text style={styles.value}>{parseInt(formData.totalDays) - parseInt(formData.lop)}/{formData.totalDays}</Text>
                        </View>
                    </View>

                    <View style={styles.row}>
                        <View style={styles.column}>
                            <Text style={styles.label}>Account Number</Text>
                            <Text style={styles.colon}>:</Text>
                            <Text style={styles.value}>{formData.bankAccount}</Text>
                        </View>
                        <View style={styles.column}>
                            <Text style={styles.labels}>LOP Days</Text>
                            <Text style={styles.colon}>:</Text>
                            <Text style={styles.value}>{formData.lop}</Text>
                        </View>
                    </View>

                    <View style={styles.row}>
                        <View style={styles.column}>
                            <Text style={styles.label}>PAN Number</Text>
                            <Text style={styles.colon}>:</Text>
                            <Text style={styles.value}>{formData.panNumber}</Text>
                        </View>
                        <View style={styles.column}>
                            <Text style={styles.labels}>EPF UAN Number</Text>
                            <Text style={styles.colon}>:</Text>
                            <Text style={styles.value}>{formData.uanNumber}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.tableContainer}>
                    <View style={styles.table}>
                        <View style={styles.tableHeader}>
                            <Text style={{ ...styles.tableHeaderCell, marginLeft: 80 }}>Earnings</Text>
                            <Text style={{ ...styles.tableHeaderCell, marginLeft: 90 }}>Deductions</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableCell}>Basic Salary</Text>
                            <Text style={styles.tableCellAmount}>{Math.round(formatValue(formData.basicSalary))}</Text>
                            <Text style={styles.tableCells}>Provident Fund</Text>
                            <Text style={styles.tableCellAmounts}>{Math.round(formatValue(formData.providentFund))}</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableCell}>Housing Allowance</Text>
                            <Text style={styles.tableCellAmount}>{Math.round(formatValue(formData.hra))}</Text>
                            <Text style={styles.tableCells}>Professional Tax</Text>
                            <Text style={styles.tableCellAmounts}>{Math.round(formatValue(formData.professionalTax))}</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableCell}>Medical Reimbursement</Text>
                            <Text style={styles.tableCellAmount}>{Math.round(formatValue(formData.medicalAllowance))}</Text>
                            <Text style={styles.tableCells}>ESI</Text>
                            <Text style={styles.tableCellAmounts}>{Math.round(formatValue(formData.esi))}</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableCell}>Transport Allowances</Text>
                            <Text style={styles.tableCellAmount}>{Math.round(formatValue(formData.transportAllowance))}</Text>
                            <Text style={styles.tableCells}>TDS</Text>
                            <Text style={styles.tableCellAmounts}>{Math.round(formatValue(formData.tds))}</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableCell}>Special Allowances</Text>
                            <Text style={styles.tableCellAmount}>{Math.round(formatValue(formData.otherAllowances))}</Text>
                            <Text style={styles.tableCells}>Other Deductions</Text>
                            <Text style={styles.tableCellAmounts}>{Math.round(formatValue(formData.otherDeductions))}</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.totalCell}>Total Earnings</Text>
                            </View>
                            <View style={{ flex: 1, marginLeft: 4 }}>
                                <Text style={styles.toalCellAmount}>{Math.round(formatValue(totalEarnings))}</Text>
                            </View>
                            <View style={{ flex: 1, marginLeft: 15, marginRight: 11 }}>
                                <Text style={styles.totalCell}>Total Deductions</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.toalCellAmount}>{Math.round(formatValue(totalDeductions))}</Text>
                            </View>
                        </View>



                        <View style={styles.verticalLine} />
                    </View>
                </View>

                <View style={styles.netPayContainer}>
                    <Text style={styles.netPayLabel}>Net Amount</Text>
                    <Text style={styles.netPayLabel}>:</Text>
                    <Text style={styles.netPayAmount}>{Math.round(formatValue(netAmount))}</Text>
                </View>
                <View style={styles.wordsContainer}>
                    <Text style={styles.wordsLabel}>Net Amount in words</Text>
                    <Text style={styles.wordsLabel}>:</Text>
                    <Text style={styles.wordsAmount}>({netAmountInWords} Only)</Text>
                </View>

                <Text style={styles.note}>
                    THIS IS A SYSTEM GENERATED PAY SLIP, DOES NOT REQUIRE ANY SIGNATURE AND/OR COMPANY SEAL
                </Text>
            </Page>
        </Document>
    );
};

export default PDFDocumentTemplate1;