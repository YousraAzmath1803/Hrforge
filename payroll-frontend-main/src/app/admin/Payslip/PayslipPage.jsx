// src/app/components/PayslipPage.jsx
'use client'
import React, { useState } from 'react';
import { Container, Paper } from '@mui/material';
import { pdf } from '@react-pdf/renderer';
import PayslipForm from './PayslipForm';
import PDFDocumentTemplate1 from './PDFDocumentTemplate1';
import PDFDocumentTemplate2 from './PDFDocumentTemplate2';
import PDFDocumentTemplate3 from './PDFDocumentTemplate3';
import TemplateSelector from './TemplateSelector';

const PayslipPage = () => {
    const [pdfUrl, setPdfUrl] = useState(null);
    const [open, setOpen] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState('template1');
    const [formData, setFormData] = useState(null);

    const handleFormSubmit = (data) => {
        setFormData(data);
        setOpen(true);
    };

    const handleTemplateChange = (event) => {
        setSelectedTemplate(event.target.value);
    };

    const handleGeneratePDF = async () => {
        let doc;
        switch (selectedTemplate) {
            case 'template1':
                doc = <PDFDocumentTemplate1 formData={formData} totalEarnings={parseFloat(formData.totalEarnings)} totalDeductions={parseFloat(formData.totalDeductions)} />;
                break;
            case 'template2':
                doc = <PDFDocumentTemplate2 formData={formData} totalEarnings={parseFloat(formData.totalEarnings)} totalDeductions={parseFloat(formData.totalDeductions)} />;
                break;
            case 'template3':
                doc = <PDFDocumentTemplate3 formData={formData} totalEarnings={parseFloat(formData.totalEarnings)} totalDeductions={parseFloat(formData.totalDeductions)} />;
                break;
            default:
                doc = <PDFDocumentTemplate1 formData={formData} totalEarnings={parseFloat(formData.totalEarnings)} totalDeductions={parseFloat(formData.totalDeductions)} />;
        }

        const asPdf = pdf();
        asPdf.updateContainer(doc);
        const blob = await asPdf.toBlob();
        const url = URL.createObjectURL(blob);
        setPdfUrl(url);
        window.open(url, '_blank');
        setOpen(false);
    };

    return (
        <Container component="main" maxWidth="md">
            <Paper sx={{ p: 4, mt: 4 }}>
                <PayslipForm onSubmit={handleFormSubmit} />
            </Paper>
            <TemplateSelector
                open={open}
                selectedTemplate={selectedTemplate}
                handleTemplateChange={handleTemplateChange}
                handleGeneratePDF={handleGeneratePDF}
                handleClose={() => setOpen(false)}
            />
        </Container>
    );
};

export default PayslipPage;