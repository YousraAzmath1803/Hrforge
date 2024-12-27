// PDFDocumentTemplate2.jsx
'use client'
import React from 'react';
import { Document, Page, Text, View, Image } from '@react-pdf/renderer';
import { getDepartmentName, getPositionName, numberToWords } from './utils';

const PDFDocumentTemplate2 = ({ formData, totalEarnings, totalDeductions }) => {
    const styles = {
        page: {
            padding: 30,
            fontSize: 12,
            fontFamily: 'Helvetica',
        },
        header: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 20,
        },
        title: {
            fontSize: 24,
            fontWeight: 'bold',
            color: '#124E66',
            textAlign: 'center',
            marginBottom: 10,
        },
        subtitle: {
            fontSize: 14,
            marginBottom: 5,
            textAlign: 'center',
        },
        section: {
            marginBottom: 20,
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
            width: '50%',
            borderStyle: 'solid',
            borderWidth: 1,
            borderColor: '#bfbfbf',
            borderLeftWidth: 0,
            borderTopWidth: 0,
            padding: 5,
            textAlign: 'left',
        },
        tableColHeader: {
            width: '50%',
            borderStyle: 'solid',
            borderWidth: 1,
            borderColor: '#bfbfbf',
            borderLeftWidth: 0,
            borderTopWidth: 0,
            padding: 5,
            textAlign: 'left',
        },
        tableCell: {
            margin: 'auto',
            marginTop: 5,
            fontSize: 10,
        },
        note: {
            fontSize: 10,
            textAlign: 'center',
            marginTop: 20,
            color: 'gray',
        },
        logo: {
            width: 50,
            height: 50,
        },
        address: {
            textAlign: 'center',
            fontSize: 14,
            fontWeight: 'bold',
        },
        earningsDeductionsContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        earningsDeductionsSection: {
            width: '48%',
        },
    };

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    {formData.logo && <Image style={styles.logo} src={formData.logo} />}
                    <View style={[styles.address, { alignItems: 'flex-end' }]}>
                        <Text style={{ fontSize: 18, color: '#3480eb', fontWeight: 'bold', textAlign: 'center' }}>{formData.companyName}</Text>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                            <Text style={[styles.gridItem, { fontSize: 6, color: 'black' }]}>{formData.companyAddressLine1}</Text>
                            <Text style={[styles.gridItem, { fontSize: 6, color: 'black' }]}>{formData.companyAddressLine2}</Text>
                            <Text style={[styles.gridItem, { fontSize: 6, color: 'black' }]}>{formData.companyAddress}</Text>
                        </View>
                    </View>
                </View>
                <Text style={styles.title}>Payslip - {formData.formattedMonthYear}</Text>

                <View style={styles.section}>
                    <Text style={[styles.subtitle, { backgroundColor: '#3480eb', color: 'white', padding: 3 }]}>Employee Details</Text>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableColHeader}>Employee Name</Text>
                            <Text style={styles.tableCol}>{formData.name}</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableColHeader}>Employee ID</Text>
                            <Text style={styles.tableCol}>{formData.employeeId}</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableColHeader}>Date of Joining</Text>
                            <Text style={[styles.tableCol, { minWidth: 100 }]}>{formData.dateOfJoining || 'N/A'}</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableColHeader}>Department</Text>
                            <Text style={styles.tableCol}>{formData.department}</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableColHeader}>Designation</Text>
                            <Text style={styles.tableCol}>{formData.position}</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableColHeader}>Pay Period</Text>
                            <Text style={styles.tableCol}>{parseInt(formData.totalDays) - parseInt(formData.lop)}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.earningsDeductionsContainer}>
                    <View style={styles.earningsDeductionsSection}>
                        <Text style={[styles.subtitle, { backgroundColor: '#3480eb', color: 'white', padding: 3 }]}>Earnings</Text>
                        <View style={styles.table}>
                            <View style={styles.tableRow}>
                                <Text style={styles.tableColHeader}>Basic Salary</Text>
                                <Text style={styles.tableCol}>{Math.round(formData.basicSalary)}</Text>
                            </View>
                            <View style={styles.tableRow}>
                                <Text style={styles.tableColHeader}>HRA</Text>
                                <Text style={styles.tableCol}>{Math.round(formData.hra)}</Text>
                            </View>
                            <View style={styles.tableRow}>
                                <Text style={styles.tableColHeader}>Medical Allowance</Text>
                                <Text style={styles.tableCol}>{Math.round(formData.medicalAllowance)}</Text>
                            </View>
                            <View style={styles.tableRow}>
                                <Text style={styles.tableColHeader}>Transport Allowance</Text>
                                <Text style={styles.tableCol}>{Math.round(formData.transportAllowance)}</Text>
                            </View>
                            <View style={styles.tableRow}>
                                <Text style={styles.tableColHeader}>Other Allowances</Text>
                                <Text style={styles.tableCol}>{Math.round(formData.otherAllowances)}</Text>
                            </View>
                            <View style={styles.tableRow}>
                                <Text style={styles.tableColHeader}>Total Earnings</Text>
                                <Text style={styles.tableCol}>{Math.round(totalEarnings)}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.earningsDeductionsSection}>
                        <Text style={[styles.subtitle, { backgroundColor: '#3480eb', color: 'white', padding: 3 }]}>Deductions</Text>
                        <View style={styles.table}>
                            <View style={styles.tableRow}>
                                <Text style={styles.tableColHeader}>Provident Fund</Text>
                                <Text style={styles.tableCol}>{Math.round(formData.providentFund)}</Text>
                            </View>
                            <View style={styles.tableRow}>
                                <Text style={styles.tableColHeader}>Professional Tax</Text>
                                <Text style={styles.tableCol}>{Math.round(formData.professionalTax)}</Text>
                            </View>
                            <View style={styles.tableRow}>
                                <Text style={styles.tableColHeader}>ESI</Text>
                                <Text style={styles.tableCol}>{Math.round(formData.esi)}</Text>
                            </View>
                            <View style={styles.tableRow}>
                                <Text style={styles.tableColHeader}>TDS</Text>
                                <Text style={styles.tableCol}>{Math.round(formData.tds)}</Text>
                            </View>
                            <View style={styles.tableRow}>
                                <Text style={styles.tableColHeader}>Other Deductions</Text>
                                <Text style={styles.tableCol}>{Math.round(formData.otherDeductions)}</Text>
                            </View>
                            <View style={styles.tableRow}>
                                <Text style={styles.tableColHeader}>Total Deductions</Text>
                                <Text style={styles.tableCol}>{Math.round(totalDeductions)}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={[styles.section, { alignItems: 'center', marginTop: 20 }]}>
                    <Text style={styles.subtitle}>Net Pay: {Math.round(totalEarnings - totalDeductions)}</Text>
                    <Text style={styles.subtitle}>Net Pay : {numberToWords(Math.round(totalEarnings - totalDeductions))}</Text>
                </View>

                <View style={{ position: 'absolute', bottom: 0, width: '100%', alignItems: 'center', paddingBottom: 10 }}>
                    <Text style={styles.note}>
                        This is a computer-generated document. No signature is required.
                    </Text>
                </View>
            </Page>
        </Document>
    );
};

export default PDFDocumentTemplate2;