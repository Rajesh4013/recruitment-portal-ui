import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Autocomplete, TextField, Chip } from "@mui/material";
import { resourceService } from '@/services/resourceService';

const jobTypes = [
    { value: 'full-time', label: 'Full Time' },
    { value: 'part-time', label: 'Part Time' },
    { value: 'contract', label: 'Contract' },
    { value: 'internship', label: 'Internship' },
    { value: 'consultant', label: 'Consultant' }
];

const skillOptions = [
  { value: 'javascript', label: 'JavaScript', category: 'Frontend' },
  { value: 'typescript', label: 'TypeScript', category: 'Frontend' },
  { value: 'react', label: 'React', category: 'Frontend' },
  { value: 'angular', label: 'Angular', category: 'Frontend' },
  { value: 'vue', label: 'Vue.js', category: 'Frontend' },
  { value: 'nodejs', label: 'Node.js', category: 'Backend' },
  { value: 'python', label: 'Python', category: 'Backend' },
  { value: 'java', label: 'Java', category: 'Backend' },
  { value: 'csharp', label: 'C#', category: 'Backend' },
  { value: 'cpp', label: 'C++', category: 'Backend' }
].sort((a, b) => a.category.localeCompare(b.category) || a.label.localeCompare(b.label));

const educationOptions = [
  { value: 'intermediate', label: 'Intermediate/Diploma' },
  { value: 'undergraduate', label: 'Undergraduate' },
  { value: 'graduate', label: 'Graduate' },
  { value: 'postgraduate', label: 'Post Graduate' },
  { value: 'phd', label: 'PhD/Doctorate' },
  { value: 'other', label: 'Other' }
];

const departmentOptions = [
  { value: 'engineering', label: 'Engineering' },
  { value: 'product', label: 'Product Development' },
  { value: 'design', label: 'Design' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'sales', label: 'Sales' },
  { value: 'hr', label: 'Human Resources' },
  { value: 'finance', label: 'Finance' },
  { value: 'operations', label: 'Operations' },
  { value: 'it', label: 'Information Technology' },
  { value: 'other', label: 'Other' }
];

const priorityOptions = [
  { value: 'critical', label: 'Critical' },
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' }
];

const noticePeriodOptions = [
  { value: 'immediate', label: 'Immediate' },
  { value: '15days', label: '15 Days' },
  { value: '30days', label: '30 Days' },
  { value: '45days', label: '45 Days' },
  { value: '60days', label: '60 Days' },
  { value: '90days', label: '90 Days' }
];

const panelMembers = [
  { value: 'emp001', label: 'John Smith', department: 'Engineering' },
  { value: 'emp002', label: 'Sarah Johnson', department: 'Engineering' },
  { value: 'emp003', label: 'Michael Brown', department: 'Product' },
  { value: 'emp004', label: 'Emily Davis', department: 'Design' },
  { value: 'emp005', label: 'David Wilson', department: 'Engineering' },
  { value: 'emp006', label: 'Lisa Anderson', department: 'HR' },
  { value: 'emp007', label: 'Robert Taylor', department: 'Engineering' },
  { value: 'emp008', label: 'Jennifer Martin', department: 'Product' }
];

const timeSlots = [
  // Morning slots
  { value: '09:00', label: '09:00 AM', period: 'Morning' },
  { value: '09:30', label: '09:30 AM', period: 'Morning' },
  { value: '10:00', label: '10:00 AM', period: 'Morning' },
  { value: '10:30', label: '10:30 AM', period: 'Morning' },
  { value: '11:00', label: '11:00 AM', period: 'Morning' },
  { value: '11:30', label: '11:30 AM', period: 'Morning' },
  // Afternoon slots
  { value: '14:00', label: '02:00 PM', period: 'Afternoon' },
  { value: '14:30', label: '02:30 PM', period: 'Afternoon' },
  { value: '15:00', label: '03:00 PM', period: 'Afternoon' },
  { value: '15:30', label: '03:30 PM', period: 'Afternoon' },
  { value: '16:00', label: '04:00 PM', period: 'Afternoon' },
  { value: '16:30', label: '04:30 PM', period: 'Afternoon' }
];

// Design system tokens
const tokens = {
    colors: {
        primary: {
            50: '#f0f9ff',
            100: '#e0f2fe',
            200: '#bae6fd',
            300: '#7dd3fc',
            400: '#38bdf8',
            500: '#0ea5e9',
            600: '#0284c7',
            700: '#0369a1'
        },
        slate: {
            50: '#f8fafc',
            100: '#f1f5f9',
            200: '#e2e8f0',
            300: '#cbd5e1',
            400: '#94a3b8',
            500: '#64748b',
            600: '#475569',
            700: '#334155',
            800: '#1e293b',
            900: '#0f172a'
        }
    },
    spacing: {
        input: {
            x: '1rem',
            y: '0.625rem'
        }
    }
};

// Form style system
const styles = {
    input: `
        w-full px-4 py-2.5 rounded-lg
        border border-slate-200
        bg-white/80 backdrop-blur-sm
        focus:border-sky-500 focus:ring-2 focus:ring-sky-100
        hover:border-sky-400
        transition-all duration-200
        placeholder:text-slate-400 text-slate-700
    `,
    textarea: `
        w-full h-32 px-4 py-3 rounded-lg
        border border-slate-200
        bg-white/80 backdrop-blur-sm
        focus:border-sky-500 focus:ring-2 focus:ring-sky-100
        hover:border-sky-400
        transition-all duration-200
        placeholder:text-slate-400 text-slate-700
        resize-none
    `,
    select: `
        w-full px-4 py-2.5 rounded-lg
        border border-slate-200
        bg-white/80 backdrop-blur-sm
        focus:border-sky-500 focus:ring-2 focus:ring-sky-100
        hover:border-sky-400
        transition-all duration-200
        text-slate-700 cursor-pointer
        appearance-none bg-no-repeat bg-right
        bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"%3e%3cpolyline points="6 9 12 15 18 9"/%3e%3c/svg%3e')]
        bg-[length:1.25em_1.25em]
        pr-10
    `,
    section: `
        bg-white/80 backdrop-blur-sm p-8 rounded-xl
        border border-slate-200/80
        shadow-sm hover:shadow-md
        transition-all duration-300
        hover:border-sky-100
    `,
    sectionHeader: `
        flex items-center text-lg font-semibold
        text-slate-800 mb-6 pb-3
        border-b border-slate-200
    `,
    sectionNumber: `
        bg-gradient-to-br from-sky-100 to-indigo-100
        text-sky-600 font-bold
        w-8 h-8 flex items-center justify-center
        rounded-lg mr-3
        shadow-sm
    `,
    formGrid: "grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8",
    label: "block text-sm font-medium text-slate-700 mb-1.5",
    requiredLabel: "block text-sm font-medium text-slate-700 mb-1.5 after:content-['*'] after:ml-1 after:text-red-500",
    chip: `
        bg-gradient-to-r from-sky-50 to-indigo-50
        text-sky-700
        px-3 py-1.5 rounded-full text-sm font-medium
        flex items-center gap-1.5
        hover:from-sky-100 hover:to-indigo-100
        transition-all duration-200
        group shadow-sm
    `,
    chipButton: `
        hover:bg-sky-200/50 rounded-full p-1
        transition-colors duration-200
        opacity-75 hover:opacity-100
        group-hover:opacity-100
    `,
    button: {
        base: "px-6 py-2.5 rounded-lg font-medium transition-all duration-200 disabled:opacity-50",
        primary: `
            bg-gradient-to-r from-sky-500 to-indigo-500
            hover:from-sky-600 hover:to-indigo-600
            text-white shadow-sm hover:shadow
            focus:ring-2 focus:ring-sky-500/20 focus:ring-offset-2
        `,
        secondary: `
            border border-slate-200
            hover:bg-slate-50 text-slate-700
            hover:border-slate-300
            focus:ring-2 focus:ring-slate-500/20 focus:ring-offset-2
        `
    }
};

const ResourceForm = () => {
    const [formData, setFormData] = useState({
        requestTitle: '',
        requestedBy: {
            empId: '',
            empName: ''
        },
        jobType: ''
    });
    const [experience, setExperience] = useState<number>(0);
    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
    const [selectedRequiredSkills, setSelectedRequiredSkills] = useState<string[]>([]);
    const [selectedEducation, setSelectedEducation] = useState<string>('');
    const [otherEducation, setOtherEducation] = useState<string>('');
    const [selectedDepartment, setSelectedDepartment] = useState<string>('');
    const [otherDepartment, setOtherDepartment] = useState<string>('');
    const [selectedPriority, setSelectedPriority] = useState<string>('');
    const [selectedNoticePeriod, setSelectedNoticePeriod] = useState<string>('');
    const [selectedLevel1Panel, setSelectedLevel1Panel] = useState<string>('');
    const [selectedLevel2Panel, setSelectedLevel2Panel] = useState<string>('');
    const [selectedLevel1Slot, setSelectedLevel1Slot] = useState<string>('');
    const [selectedLevel2Slot, setSelectedLevel2Slot] = useState<string>('');

    const [open, setOpen] = useState(false);

    // Calculate max skills based on experience
    const getMaxSkills = (years: number) => {
        if (years < 2) return 4;
        if (years < 4) return 6;
        if (years < 6) return 8;
        return 10;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent as keyof typeof prev],
                    [child]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleJobTypeChange = (value: string) => {
        setFormData(prev => ({
            ...prev,
            jobType: value
        }));
    };

    const handleExperienceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value) || 0;
        setExperience(value);
        
        // If current selected skills exceed new max, trim the excess
        const maxSkills = getMaxSkills(value);
        if (selectedRequiredSkills.length > maxSkills) {
            setSelectedRequiredSkills(prev => prev.slice(0, maxSkills));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const submitData = {
            ...formData,
            department: selectedDepartment === 'other' ? otherDepartment : selectedDepartment,
            role: e.currentTarget.querySelector<HTMLInputElement>('input[placeholder="Enter role name"]')?.value || '',
            openPositions: parseInt(e.currentTarget.querySelector<HTMLInputElement>('input[type="number"][defaultValue="1"]')?.value || '1'),
            priority: selectedPriority,
            location: e.currentTarget.querySelector<HTMLInputElement>('input[placeholder="Enter location"]')?.value || '',
            noticePeriod: selectedNoticePeriod,
            experience: experience,
            education: selectedEducation === 'other' ? otherEducation : selectedEducation,
            requiredSkills: selectedRequiredSkills,
            preferredSkills: selectedSkills,
            responsibilities: e.currentTarget.querySelector<HTMLTextAreaElement>('textarea[placeholder="Enter responsibilities"]')?.value || '',
            certifications: e.currentTarget.querySelector<HTMLTextAreaElement>('textarea[placeholder="Enter required certifications..."]')?.value || '',
            interviews: {
                level1: {
                    panel: selectedLevel1Panel,
                    timeSlot: selectedLevel1Slot
                },
                level2: {
                    panel: selectedLevel2Panel,
                    timeSlot: selectedLevel2Slot
                }
            },
            additionalReasons: e.currentTarget.querySelector<HTMLTextAreaElement>('textarea[placeholder="Enter additional reasons for hiring"]')?.value || ''
        };

        try {
            const result = await resourceService.submitResourceRequest(submitData);
            if (result.success) {
                console.log(result.message);
                // You could add a toast notification here
            } else {
                console.error(result.message);
                // You could add a toast notification here
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle error (show toast notification, etc.)
        }
    };

    const handleSkillChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        if (!selectedSkills.includes(value)) {
            setSelectedSkills([...selectedSkills, value]);
        }
    };

    const handleRequiredSkillChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        const maxSkills = getMaxSkills(experience);

        if (!selectedRequiredSkills.includes(value) && selectedRequiredSkills.length < maxSkills) {
            setSelectedRequiredSkills([...selectedRequiredSkills, value]);
        }
    };

    const removeSkill = (skillToRemove: string) => {
        setSelectedSkills(selectedSkills.filter(skill => skill !== skillToRemove));
    };

    const removeRequiredSkill = (skillToRemove: string) => {
        setSelectedRequiredSkills(selectedRequiredSkills.filter(skill => skill !== skillToRemove));
    };

    const handleEducationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedEducation(event.target.value);
        if (event.target.value !== 'other') {
            setOtherEducation('');
        }
    };

    const handleOtherEducationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOtherEducation(event.target.value);
    };

    const handleDepartmentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedDepartment(event.target.value);
        if (event.target.value !== 'other') {
            setOtherDepartment('');
        }
    };

    const handleOtherDepartmentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOtherDepartment(event.target.value);
    };

    const handlePriorityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedPriority(event.target.value);
    };

    const handleNoticePeriodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedNoticePeriod(event.target.value);
    };

    const handleLevel1PanelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedLevel1Panel(event.target.value);
    };

    const handleLevel2PanelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedLevel2Panel(event.target.value);
    };

    const handleLevel1SlotChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedLevel1Slot(event.target.value);
    };

    const handleLevel2SlotChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedLevel2Slot(event.target.value);
    };

    return (
        <div className="min-h-full bg-gradient-to-br from-slate-50 via-white to-indigo-50/20 p-4 md:p-6">
            <div className="max-w-6xl mx-auto">
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Title Section */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm p-8 border border-slate-200/80">
                        <div className="flex items-center mb-8 bg-gradient-to-r from-slate-50 to-indigo-50/50 p-4 rounded-lg border border-slate-200/80">
                            <input
                                type="text"
                                name="requestTitle"
                                value={formData.requestTitle}
                                onChange={handleInputChange}
                                className="text-lg text-slate-700 bg-transparent border-b-2 border-transparent hover:border-sky-500 focus:border-sky-600 focus:outline-none px-2 flex-1 transition-all duration-200"
                                placeholder="Enter request title"
                                required
                            />
                        </div>

                        <div className="space-y-8">
                            {/* Basic Information Section */}
                            <div className={styles.section}>
                                <h3 className={styles.sectionHeader}>
                                    <span className={styles.sectionNumber}>1</span>
                                    Basic Information
                                </h3>
                                <div className={styles.formGrid}>
                                    {/* Requested by */}
                                    <div>
                                        <label className={styles.requiredLabel}>Requested by</label>
                                        <div className="flex gap-2">
                                            <Input 
                                                type="text" 
                                                name="requestedBy.empId"
                                                value={formData.requestedBy.empId}
                                                onChange={handleInputChange}
                                                className={styles.input}
                                                placeholder="Emp ID"
                                                required
                                            />
                                            <Input 
                                                type="text" 
                                                name="requestedBy.empName"
                                                value={formData.requestedBy.empName}
                                                onChange={handleInputChange}
                                                className={styles.input}
                                                placeholder="Employee Name"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Department */}
                                    <div>
                                        <label className={styles.label}>Department</label>
                                        <div className="space-y-2">
                                            <select
                                                className={styles.select}
                                                value={selectedDepartment}
                                                onChange={handleDepartmentChange}
                                            >
                                                <option value="" disabled>Select department...</option>
                                                {departmentOptions.map(option => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </select>
                                            {selectedDepartment === 'other' && (
                                                <Input
                                                    type="text"
                                                    placeholder="Please specify department"
                                                    value={otherDepartment}
                                                    onChange={handleOtherDepartmentChange}
                                                    className={styles.input}
                                                />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Position Details Section */}
                            <div className={styles.section}>
                                <h3 className={styles.sectionHeader}>
                                    <span className={styles.sectionNumber}>2</span>
                                    Position Details
                                </h3>
                                <div className={styles.formGrid}>
                                    {/* Role */}
                                    <div>
                                        <label className={styles.label}>Role</label>
                                        <Input 
                                            type="text" 
                                            className={styles.input}
                                            placeholder="Enter role name" 
                                        />
                                    </div>

                                    {/* Job Type */}
                                    <div>
                                        <label className={styles.requiredLabel}>Job Type</label>
                                        <Select 
                                            value={formData.jobType} 
                                            onValueChange={handleJobTypeChange}
                                        >
                                            <SelectTrigger className="w-full input-animation h-9 bg-white/50">
                                                <SelectValue placeholder="Select job type" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-white/90 backdrop-blur-xl border border-slate-200/80">
                                                {jobTypes.map(type => (
                                                    <SelectItem
                                                        key={type.value}
                                                        value={type.value}
                                                        className="hover:bg-sky-50"
                                                    >
                                                        {type.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {/* Open Positions */}
                                    <div>
                                        <label className={styles.label}>Open Positions</label>
                                        <Input 
                                            type="number" 
                                            className={styles.input}
                                            defaultValue={1} 
                                            min={1} 
                                        />
                                    </div>

                                    {/* Location */}
                                    <div>
                                        <label className={styles.label}>Location</label>
                                        <Input 
                                            type="text" 
                                            className={styles.input}
                                            placeholder="Enter location" 
                                        />
                                    </div>

                                    {/* Priority */}
                                    <div>
                                        <label className={styles.label}>Priority</label>
                                        <select
                                            className={styles.select}
                                            value={selectedPriority}
                                            onChange={handlePriorityChange}
                                        >
                                            <option value="" disabled>Select priority...</option>
                                            {priorityOptions.map(option => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Notice Period */}
                                    <div>
                                        <label className={styles.label}>Notice Period</label>
                                        <select
                                            className={styles.select}
                                            value={selectedNoticePeriod}
                                            onChange={handleNoticePeriodChange}
                                        >
                                            <option value="" disabled>Select notice period...</option>
                                            {noticePeriodOptions.map(option => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Requirements Section */}
                            <div className={styles.section}>
                                <h3 className={styles.sectionHeader}>
                                    <span className={styles.sectionNumber}>3</span>
                                    Requirements
                                </h3>
                                <div className={styles.formGrid}>
                                    {/* Experience */}
                                    <div>
                                        <label className={styles.label}>Years of Experience</label>
                                        <Input 
                                            type="number" 
                                            className={styles.input}
                                            value={experience}
                                            onChange={handleExperienceChange}
                                            min={0}
                                            max={20}
                                        />
                                    </div>

                                    {/* Required Skills */}
                                    <div>
                                        <label className={styles.label}>
                                            Required Skills (Max: {getMaxSkills(experience)})
                                        </label>
                                        <div className="space-y-3">
                                            <select
                                                className={styles.select}
                                                onChange={handleRequiredSkillChange}
                                                value=""
                                            >
                                                <option value="" disabled>Select required skills...</option>
                                                {Object.entries(
                                                    skillOptions.reduce((acc, skill) => {
                                                        (acc[skill.category] = acc[skill.category] || []).push(skill);
                                                        return acc;
                                                    }, {} as Record<string, typeof skillOptions>)
                                                ).map(([category, skills]) => (
                                                    <optgroup key={category} label={category}>
                                                        {skills.map(skill => (
                                                            <option 
                                                                key={skill.value} 
                                                                value={skill.value}
                                                                disabled={selectedRequiredSkills.includes(skill.value)}
                                                            >
                                                                {skill.label}
                                                            </option>
                                                        ))}
                                                    </optgroup>
                                                ))}
                                            </select>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedRequiredSkills.map(skill => {
                                                    const skillObj = skillOptions.find(s => s.value === skill);
                                                    return (
                                                        <div key={skill} className={styles.chip}>
                                                            {skillObj?.label}
                                                            <button
                                                                type="button"
                                                                onClick={() => removeRequiredSkill(skill)}
                                                                className={styles.chipButton}
                                                            >
                                                                <X className="h-3 w-3" />
                                                            </button>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Preferred Skills */}
                                    <div>
                                        <label className={styles.label}>
                                            Preferred Technical and Professional Expertise
                                        </label>
                                        <div className="space-y-3">
                                            <select
                                                className={styles.select}
                                                onChange={handleSkillChange}
                                                value=""
                                            >
                                                <option value="" disabled>Select skills...</option>
                                                {Object.entries(
                                                    skillOptions.reduce((acc, skill) => {
                                                        (acc[skill.category] = acc[skill.category] || []).push(skill);
                                                        return acc;
                                                    }, {} as Record<string, typeof skillOptions>)
                                                ).map(([category, skills]) => (
                                                    <optgroup key={category} label={category}>
                                                        {skills.map(skill => (
                                                            <option 
                                                                key={skill.value} 
                                                                value={skill.value}
                                                                disabled={selectedSkills.includes(skill.value)}
                                                            >
                                                                {skill.label}
                                                            </option>
                                                        ))}
                                                    </optgroup>
                                                ))}
                                            </select>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedSkills.map(skill => {
                                                    const skillObj = skillOptions.find(s => s.value === skill);
                                                    return (
                                                        <div key={skill} className={styles.chip}>
                                                            {skillObj?.label}
                                                            <button
                                                                type="button"
                                                                onClick={() => removeSkill(skill)}
                                                                className={styles.chipButton}
                                                            >
                                                                <X className="h-3 w-3" />
                                                            </button>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Education */}
                                    <div>
                                        <label className={styles.label}>Education</label>
                                        <div className="space-y-2">
                                            <select
                                                className={styles.select}
                                                value={selectedEducation}
                                                onChange={handleEducationChange}
                                            >
                                                <option value="" disabled>Select education qualification...</option>
                                                {educationOptions.map(option => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </select>

                                            {selectedEducation === 'other' && (
                                                <Input
                                                    type="text"
                                                    placeholder="Please specify education"
                                                    value={otherEducation}
                                                    onChange={handleOtherEducationChange}
                                                    className={styles.input}
                                                />
                                            )}
                                        </div>
                                    </div>

                                    {/* Responsibilities */}
                                    <div className="col-span-full">
                                        <label className={styles.label}>Responsibilities</label>
                                        <Textarea 
                                            placeholder="Enter responsibilities" 
                                            className={styles.textarea}
                                        />
                                    </div>

                                    {/* Certifications */}
                                    <div className="col-span-full">
                                        <label className={styles.label}>Required Certifications</label>
                                        <Textarea 
                                            placeholder="Enter required certifications..." 
                                            className={styles.textarea}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Interview Panel Section */}
                            <div className={styles.section}>
                                <h3 className={styles.sectionHeader}>
                                    <span className={styles.sectionNumber}>4</span>
                                    Interview Panel
                                </h3>
                                <div className={styles.formGrid}>
                                    {/* Level 1 Panel */}
                                    <div>
                                        <label className={styles.label}>Level 1 Panel</label>
                                        <select
                                            className={styles.select}
                                            value={selectedLevel1Panel}
                                            onChange={handleLevel1PanelChange}
                                        >
                                            <option value="" disabled>Select panel member...</option>
                                            {Object.entries(
                                                panelMembers.reduce((acc, member) => {
                                                    (acc[member.department] = acc[member.department] || []).push(member);
                                                    return acc;
                                                }, {} as Record<string, typeof panelMembers>)
                                            ).map(([department, members]) => (
                                                <optgroup key={department} label={department}>
                                                    {members.map(member => (
                                                        <option 
                                                            key={member.value} 
                                                            value={member.value}
                                                            disabled={member.value === selectedLevel2Panel}
                                                        >
                                                            {member.label}
                                                        </option>
                                                    ))}
                                                </optgroup>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Level 1 Time Slot */}
                                    <div>
                                        <label className={styles.label}>Interview Slots</label>
                                        <select
                                            className={styles.select}
                                            value={selectedLevel1Slot}
                                            onChange={handleLevel1SlotChange}
                                        >
                                            <option value="" disabled>Select time slot...</option>
                                            {Object.entries(
                                                timeSlots.reduce((acc, slot) => {
                                                    (acc[slot.period] = acc[slot.period] || []).push(slot);
                                                    return acc;
                                                }, {} as Record<string, typeof timeSlots>)
                                            ).map(([period, slots]) => (
                                                <optgroup key={period} label={period}>
                                                    {slots.map(slot => (
                                                        <option 
                                                            key={slot.value} 
                                                            value={slot.value}
                                                            disabled={slot.value === selectedLevel2Slot}
                                                        >
                                                            {slot.label}
                                                        </option>
                                                    ))}
                                                </optgroup>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Level 2 Panel */}
                                    <div>
                                        <label className={styles.label}>Level 2 Panel</label>
                                        <select
                                            className={styles.select}
                                            value={selectedLevel2Panel}
                                            onChange={handleLevel2PanelChange}
                                        >
                                            <option value="" disabled>Select panel member...</option>
                                            {Object.entries(
                                                panelMembers.reduce((acc, member) => {
                                                    (acc[member.department] = acc[member.department] || []).push(member);
                                                    return acc;
                                                }, {} as Record<string, typeof panelMembers>)
                                            ).map(([department, members]) => (
                                                <optgroup key={department} label={department}>
                                                    {members.map(member => (
                                                        <option 
                                                            key={member.value} 
                                                            value={member.value}
                                                            disabled={member.value === selectedLevel1Panel}
                                                        >
                                                            {member.label}
                                                        </option>
                                                    ))}
                                                </optgroup>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Level 2 Time Slot */}
                                    <div>
                                        <label className={styles.label}>Interview Slots</label>
                                        <select
                                            className={styles.select}
                                            value={selectedLevel2Slot}
                                            onChange={handleLevel2SlotChange}
                                        >
                                            <option value="" disabled>Select time slot...</option>
                                            {Object.entries(
                                                timeSlots.reduce((acc, slot) => {
                                                    (acc[slot.period] = acc[slot.period] || []).push(slot);
                                                    return acc;
                                                }, {} as Record<string, typeof timeSlots>)
                                            ).map(([period, slots]) => (
                                                <optgroup key={period} label={period}>
                                                    {slots.map(slot => (
                                                        <option 
                                                            key={slot.value} 
                                                            value={slot.value}
                                                            disabled={slot.value === selectedLevel1Slot}
                                                        >
                                                            {slot.label}
                                                        </option>
                                                    ))}
                                                </optgroup>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Additional Information Section */}
                            <div className={styles.section}>
                                <h3 className={styles.sectionHeader}>
                                    <span className={styles.sectionNumber}>5</span>
                                    Additional Information
                                </h3>
                                <div>
                                    <label className={styles.label}>Additional reasons for hiring</label>
                                    <Textarea 
                                        placeholder="Enter additional reasons for hiring" 
                                        className={styles.textarea}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Form Actions */}
                        <div className="flex justify-end gap-4 pt-8 mt-8 border-t border-slate-200">
                            <Button 
                                variant="outline" 
                                type="button"
                                className={`${styles.button.base} ${styles.button.secondary}`}
                            >
                                Cancel
                            </Button>
                            <Button 
                                type="submit"
                                className={`${styles.button.base} ${styles.button.primary}`}
                            >
                                Submit Request
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ResourceForm; 