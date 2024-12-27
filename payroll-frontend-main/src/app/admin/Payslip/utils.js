// src/app/components/utils.js
import dayjs from 'dayjs';
import { toWords } from 'number-to-words';

export const departmentIdMap = {
    IT: 1,
    HR: 2,
    Finance: 3,
    Marketing: 4,
    Operations: 5,
};

export const jobIdMap = {
    Developer: 1,
    Manager: 2,
    Designer: 3,
    Analyst: 4,
    Engineer: 5,
};

export const API_BASE_URL = '/api';

export const formatJoiningDate = (dateString) => {
    const date = dayjs(dateString);
    if (!date.isValid()) return '';
    const day = date.date().toString().padStart(2, '0');
    const month = date.format('MMM');
    const year = date.format('YY');
    return `${day}-${month}-${year}`;
};

export const getDepartmentName = (id) => {
    return Object.keys(departmentIdMap).find(key => departmentIdMap[key] === parseInt(id)) || '';
};

export const getPositionName = (id) => {
    return Object.keys(jobIdMap).find(key => jobIdMap[key] === parseInt(id)) || '';
};

export const numberToWords = (netAmount) => {
    return toWords(netAmount).toUpperCase();
};