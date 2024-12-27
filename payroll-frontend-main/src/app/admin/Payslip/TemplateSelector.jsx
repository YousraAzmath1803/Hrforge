'use client'
import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Grid, Button, Card, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const TemplateSelector = ({ open, selectedTemplate, handleTemplateChange, handleGeneratePDF, handleClose }) => {
    const templates = [
        { id: 'template1', label: 'Template 1', description: 'Modern Layout with clean design.' },
        { id: 'template2', label: 'Template 2', description: 'Classic style with more detail.' },
        { id: 'template3', label: 'Template 3', description: 'Minimalist design with focus on simplicity.' }
    ];

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
            <DialogTitle>Select Payslip Template</DialogTitle>
            <DialogContent>
                <Grid container spacing={3}>
                    {templates.map((template) => (
                        <Grid item xs={12} md={4} key={template.id}>
                            <Card
                                onClick={() => handleTemplateChange({ target: { value: template.id } })}
                                sx={{
                                    height: '200px', // Set fixed height
                                    width: '100%', // Full width of the grid column
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    border: selectedTemplate === template.id ? '2px solid #1976d2' : '1px solid #ddd',
                                    boxShadow: selectedTemplate === template.id ? '0 0 10px rgba(0,0,0,0.3)' : '0 0 5px rgba(0,0,0,0.1)',
                                    transition: 'all 0.3s',
                                    position: 'relative',
                                    '&:hover': {
                                        boxShadow: '0 0 12px rgba(0,0,0,0.3)',
                                    }
                                }}
                            >
                                {selectedTemplate === template.id && (
                                    <CheckCircleIcon
                                        sx={{
                                            position: 'absolute',
                                            top: 10,
                                            right: 10,
                                            color: '#1976d2',
                                            fontSize: '28px',
                                        }}
                                    />
                                )}
                                <Typography variant="h6" sx={{ marginBottom: '8px' }}>
                                    {template.label}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {template.description}
                                </Typography>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} variant="outlined">Cancel</Button>
                <Button onClick={handleGeneratePDF} variant="contained" color="primary">
                    Generate PDF
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default TemplateSelector;
