export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { name, phone, date, timeSlot } = req.body;
    
    if (!name || !phone || !date || !timeSlot) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    
    // Check if valid date
    if (date !== '2026-08-22' && date !== '2026-08-23') {
        return res.status(400).json({ error: 'Appointments only available on Aug 22 or 23, 2026' });
    }

    try {
        // Forward data to Google Sheets via Apps Script Web App
        const appsScriptUrl = 'https://script.google.com/macros/s/AKfycbyBD8TdMWxsCk0xqlSBSJFWbi-iwB_5qchyKiwELpOKFb1viN9SO6vpi5UN0bor7SGmXQ/exec';
        
        const response = await fetch(appsScriptUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, phone, date, timeSlot })
        });
        
        const text = await response.text();
        console.log('Google Sheets Update Response:', text);

        return res.status(200).json({ message: 'Appointment booked successfully!' });
    } catch (err) {
        console.error('Failed to update Google Sheets', err);
        return res.status(500).json({ error: 'Failed to process booking. Please try again.' });
    }
}
