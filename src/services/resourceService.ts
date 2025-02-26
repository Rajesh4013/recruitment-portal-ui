// Types for our form data
export interface ResourceFormData {
    requestTitle: string;
    requestedBy: {
        empId: string;
        empName: string;
    };
    department: string;
    role: string;
    jobType: string;
    openPositions: number;
    priority: string;
    location: string;
    noticePeriod: string;
    experience: number;
    education: string;
    requiredSkills: string[];
    preferredSkills: string[];
    responsibilities: string;
    certifications: string;
    interviews: {
        level1: {
            panel: string;
            timeSlot: string;
        };
        level2: {
            panel: string;
            timeSlot: string;
        };
    };
    additionalReasons: string;
}

class ResourceService {
    async submitResourceRequest(formData: ResourceFormData): Promise<{ success: boolean; message: string }> {
        try {
            // Log the data (replace with actual API call)
            console.log('Submitting Resource Request:', formData);

            // Validate required fields
            this.validateFormData(formData);

            // Here you would typically make an API call
            // For now, we'll simulate an API call
            await this.mockApiCall(formData);

            return {
                success: true,
                message: 'Resource request submitted successfully'
            };
        } catch (error) {
            console.error('Error submitting resource request:', error);
            return {
                success: false,
                message: error instanceof Error ? error.message : 'Failed to submit resource request'
            };
        }
    }

    private validateFormData(data: ResourceFormData): void {
        const requiredFields = [
            'requestTitle',
            'requestedBy.empId',
            'requestedBy.empName',
            'department',
            'role',
            'jobType',
            'priority',
            'experience',
            'education'
        ];

        const missingFields = requiredFields.filter(field => {
            const value = field.includes('.')
                ? field.split('.').reduce((obj, key) => obj?.[key], data)
                : data[field as keyof ResourceFormData];
            return !value;
        });

        if (missingFields.length > 0) {
            throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
        }

        // Validate required skills based on experience
        const maxSkills = this.getMaxSkills(data.experience);
        if (data.requiredSkills.length > maxSkills) {
            throw new Error(`Maximum ${maxSkills} required skills allowed for ${data.experience} years of experience`);
        }
    }

    private getMaxSkills(years: number): number {
        if (years < 2) return 4;
        if (years < 4) return 6;
        if (years < 6) return 8;
        return 10;
    }

    private async mockApiCall(data: ResourceFormData): Promise<void> {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Simulate API validation
        if (data.requiredSkills.length === 0) {
            throw new Error('At least one required skill must be specified');
        }
    }
}

export const resourceService = new ResourceService(); 