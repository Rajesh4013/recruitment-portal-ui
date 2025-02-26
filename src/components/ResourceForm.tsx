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

// Add this CSS class to style all placeholders
const inputClass = "w-full placeholder:text-gray-500";
const textareaClass = "h-24 placeholder:text-gray-500";
const selectClass = "w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-500";

const ResourceForm = () => {
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
        
        const formData = {
            requestTitle: e.currentTarget.querySelector<HTMLInputElement>('input[placeholder="Enter request title"]')?.value || '',
            requestedBy: {
                empId: e.currentTarget.querySelector<HTMLInputElement>('input[placeholder="Emp ID"]')?.value || '',
                empName: e.currentTarget.querySelector<HTMLInputElement>('input[placeholder="Employee Name"]')?.value || ''
            },
            department: selectedDepartment === 'other' ? otherDepartment : selectedDepartment,
            role: e.currentTarget.querySelector<HTMLInputElement>('input[placeholder="Enter role name"]')?.value || '',
            jobType: e.currentTarget.querySelector<HTMLSelectElement>('select[placeholder="Select job type"]')?.value || '',
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
            const result = await resourceService.submitResourceRequest(formData);
            if (result.success) {
                // Show success message
                console.log(result.message);
                // You could add a toast notification here
            } else {
                // Show error message
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
        <div className="h-full overflow-auto p-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Resource Request Form</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        {/* Left Column - Basic Information */}
                        <div className="space-y-4">
                            {/* 1. Request Title */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Request Title</label>
                                <Input 
                                    type="text" 
                                    className={inputClass}
                                    placeholder="Enter request title" 
                                />
                            </div>

                            {/* 2. Requested by */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Requested by</label>
                                <div className="flex gap-2">
                                    <Input 
                                        type="text" 
                                        className={inputClass}
                                        placeholder="Emp ID" 
                                    />
                                    <Input 
                                        type="text" 
                                        className={inputClass}
                                        placeholder="Employee Name" 
                                    />
                                </div>
                            </div>

                            {/* 3. Department */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                                <div className="space-y-2">
                                    <select
                                        className={selectClass}
                                        value={selectedDepartment}
                                        onChange={handleDepartmentChange}
                                    >
                                        <option value="" disabled>Select department...</option>
                                        {departmentOptions.map(option => (
                                            <option 
                                                key={option.value} 
                                                value={option.value}
                                            >
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
                                            className={inputClass}
                                        />
                                    )}
                                </div>
                            </div>

                            {/* 4. Role */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                                <Input 
                                    type="text" 
                                    className={inputClass}
                                    placeholder="Enter role name" 
                                />
                            </div>

                            {/* 5. Job Type */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Job Type</label>
                                <Select>
                                    <SelectTrigger className="w-full input-animation h-9 bg-white/50">
                                        <SelectValue placeholder="Select job type" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white/90 backdrop-blur-xl border border-white/30">
                                        {jobTypes.map(type => (
                                            <SelectItem
                                                key={type.value}
                                                value={type.value}
                                                className="hover:bg-blue-50"
                                            >
                                                {type.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* 6. Open Positions */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Open Positions</label>
                                <Input 
                                    type="number" 
                                    className={inputClass}
                                    defaultValue={1} 
                                    min={1} 
                                />
                            </div>

                            {/* 7. Priority */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                                <select
                                    className={selectClass}
                                    value={selectedPriority}
                                    onChange={handlePriorityChange}
                                >
                                    <option value="" disabled>Select priority...</option>
                                    {priorityOptions.map(option => (
                                        <option 
                                            key={option.value} 
                                            value={option.value}
                                        >
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* 8. Location */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                <Input 
                                    type="text" 
                                    className={inputClass}
                                    placeholder="Enter location" 
                                />
                            </div>

                            {/* 9. Notice Period */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Notice Period</label>
                                <select
                                    className={selectClass}
                                    value={selectedNoticePeriod}
                                    onChange={handleNoticePeriodChange}
                                >
                                    <option value="" disabled>Select notice period...</option>
                                    {noticePeriodOptions.map(option => (
                                        <option 
                                            key={option.value} 
                                            value={option.value}
                                        >
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Right Column - Requirements & Interview Details */}
                        <div className="space-y-4">
                            {/* 1. Experience */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
                                <Input 
                                    type="number" 
                                    className={inputClass}
                                    value={experience}
                                    onChange={handleExperienceChange}
                                    min={0}
                                />
                            </div>

                            {/* 2. Required Technical Skills */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Required Technical and Professional Expertise
                                    <span className="text-sm text-gray-500 ml-2">
                                        (Max {getMaxSkills(experience)} skills)
                                    </span>
                                </label>
                                <select
                                    className={selectClass}
                                    onChange={handleRequiredSkillChange}
                                    value=""
                                    disabled={selectedRequiredSkills.length >= getMaxSkills(experience)}
                                >
                                    <option value="" disabled>
                                        {selectedRequiredSkills.length >= getMaxSkills(experience) 
                                            ? `Maximum ${getMaxSkills(experience)} skills allowed`
                                            : "Select required skills..."}
                                    </option>
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

                                {selectedRequiredSkills.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {selectedRequiredSkills.map(skill => {
                                            const skillData = skillOptions.find(s => s.value === skill);
                                            return (
                                                <span
                                                    key={skill}
                                                    className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm flex items-center gap-1"
                                                >
                                                    {skillData?.label}
                                                    <button
                                                        type="button"
                                                        onClick={() => removeRequiredSkill(skill)}
                                                        className="hover:bg-blue-200 rounded-full p-0.5"
                                                    >
                                                        <X className="h-3 w-3" />
                                                    </button>
                                                </span>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>

                            {/* 3. Preferred Technical Skills */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Preferred Technical and Professional Expertise
                                </label>
                                <select
                                    className={selectClass}
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

                                {selectedSkills.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {selectedSkills.map(skill => {
                                            const skillData = skillOptions.find(s => s.value === skill);
                                            return (
                                                <span
                                                    key={skill}
                                                    className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm flex items-center gap-1"
                                                >
                                                    {skillData?.label}
                                                    <button
                                                        type="button"
                                                        onClick={() => removeSkill(skill)}
                                                        className="hover:bg-blue-200 rounded-full p-0.5"
                                                    >
                                                        <X className="h-3 w-3" />
                                                    </button>
                                                </span>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>

                            {/* 4. Education */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Education</label>
                                <div className="space-y-2">
                                    <select
                                        className={selectClass}
                                        value={selectedEducation}
                                        onChange={handleEducationChange}
                                    >
                                        <option value="" disabled>Select education qualification...</option>
                                        {educationOptions.map(option => (
                                            <option 
                                                key={option.value} 
                                                value={option.value}
                                            >
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
                                            className={inputClass}
                                        />
                                    )}
                                </div>
                            </div>

                            {/* 5. Responsibilities */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Responsibilities</label>
                                <Textarea 
                                    placeholder="Enter responsibilities" 
                                    className={textareaClass}
                                />
                            </div>

                            {/* 6. Certifications */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Certifications</label>
                                <Textarea 
                                    placeholder="Enter required certifications..." 
                                    className={textareaClass}
                                />
                            </div>

                            {/* 7. Interview Panels */}
                            <div className="space-y-4">
                                {/* Level 1 Panel */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Level 1 Panel</label>
                                        <select
                                            className={selectClass}
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
                                                        >
                                                            {member.label}
                                                        </option>
                                                    ))}
                                                </optgroup>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Interview Slots</label>
                                        <select
                                            className={selectClass}
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
                                </div>

                                {/* Level 2 Panel */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Level 2 Panel</label>
                                        <select
                                            className={selectClass}
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
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Interview Slots</label>
                                        <select
                                            className={selectClass}
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

                            {/* 8. Additional Reasons */}
                           
                        </div>
                         <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Additional reasons for hiring</label>
                        <Textarea 
                            placeholder="Enter additional reasons for hiring" 
                            className={textareaClass}
                        />
                    </div>
                    </div>

                    {/* Form Actions */}
                    <div className="flex justify-end gap-4">
                        <Button variant="outline" type="button">Cancel</Button>
                        <Button type="submit">Submit</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ResourceForm; 