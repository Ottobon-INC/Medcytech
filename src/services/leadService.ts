import { supabase } from '../lib/supabaseClient';

export interface Lead {
    id?: string;
    created_at?: string;
    name: string;
    email: string;
    phone?: string;
    message?: string;
    organization?: string;
    role?: 'Investor' | 'Clinic Owner' | 'Partner';
}

export const submitLead = async (leadData: Lead, googleSheetsData?: any) => {
    try {
        // 1. Submit to Google Sheets if Webhook is configured
        const googleSheetsUrl = import.meta.env.VITE_GOOGLE_SHEETS_WEBHOOK;
        if (googleSheetsUrl) {
            try {
                await fetch(googleSheetsUrl, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: {
                        'Content-Type': 'text/plain',
                    },
                    body: JSON.stringify(googleSheetsData || leadData),
                });
            } catch (sheetError) {
                console.error("Error submitting to Google Sheets:", sheetError);
            }
        }

        // 2. Submit to Supabase
        if (!import.meta.env.VITE_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL === 'https://dummy.supabase.co') {
            console.warn("MOCK SUBMISSION: Supabase keys are not set. Lead data:", leadData);
            await new Promise(resolve => setTimeout(resolve, 800));
            return { data: [leadData], error: null };
        }

        const { data, error } = await supabase
            .from('leads')
            .insert([leadData])
            .select();

        if (error) throw error;
        return { data, error: null };
    } catch (error: any) {
        console.error('Error submitting lead:', error.message);
        return { data: null, error };
    }
};
