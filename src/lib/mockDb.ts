// Mock database for standalone version
// NOTE: This will reset whenever the serverless function restarts on Vercel.
// For a persistent demo without Supabase, a more advanced mock or local storage (client-side) would be needed.

export interface Lead {
    id: string;
    org_id: string;
    name: string;
    email?: string;
    phone?: string;
    status: string;
    origin: string;
    interest?: string;
    neighborhood?: string;
    city?: string;
    created_at: string;
    next_action_type?: string;
    next_follow_up?: string;
}

export interface Activity {
    id: string;
    lead_id: string;
    type: string;
    description: string;
    created_at: string;
}

export interface Task {
    id: string;
    lead_id: string;
    title: string;
    due_date: string;
    status: 'pending' | 'completed';
    created_at: string;
}

// Global variable survives within the same execution context instance
let leads: Lead[] = [
    {
        id: '1',
        org_id: 'test-org-id',
        name: 'José da Silva',
        email: 'jose@email.com',
        phone: '(11) 99999-9999',
        status: 'novo',
        origin: 'Meta Ads',
        interest: 'Apartamento 2 quartos',
        neighborhood: 'Moema',
        city: 'São Paulo',
        created_at: new Date().toISOString(),
        next_action_type: 'Ligar',
        next_follow_up: new Date(Date.now() + 86400000).toISOString()
    },
    {
        id: '2',
        org_id: 'test-org-id',
        name: 'Maria Oliveira',
        email: 'maria@email.com',
        phone: '(11) 88888-8888',
        status: 'visita',
        origin: 'Manual',
        interest: 'Casa de Condomínio',
        neighborhood: 'Alphaville',
        city: 'Barueri',
        created_at: new Date().toISOString(),
        next_action_type: 'Agendar Visita',
        next_follow_up: new Date(Date.now() + 172800000).toISOString()
    }
];

let activities: Activity[] = [
    {
        id: 'a1',
        lead_id: '1',
        type: 'system',
        description: 'Lead capturado via Meta Ads',
        created_at: new Date().toISOString()
    }
];

let tasks: Task[] = [];

export const mockDb = {
    getLeads: () => leads,
    getLeadById: (id: string) => leads.find(l => l.id === id),
    addLead: (lead: Omit<Lead, 'id' | 'created_at'>) => {
        const newLead = {
            ...lead,
            id: Math.random().toString(36).substr(2, 9),
            created_at: new Date().toISOString()
        };
        leads.push(newLead);
        return newLead;
    },
    updateLead: (id: string, updates: Partial<Lead>) => {
        const index = leads.findIndex(l => l.id === id);
        if (index !== -1) {
            leads[index] = { ...leads[index], ...updates };
            return leads[index];
        }
        return null;
    },
    getActivities: (leadId: string) => activities.filter(a => a.lead_id === leadId),
    addActivity: (activity: Omit<Activity, 'id' | 'created_at'>) => {
        const newActivity = {
            ...activity,
            id: Math.random().toString(36).substr(2, 9),
            created_at: new Date().toISOString()
        };
        activities.push(newActivity);
        return newActivity;
    },
    getTasks: (leadId: string) => tasks.filter(t => t.lead_id === leadId),
    addTask: (task: Omit<Task, 'id' | 'created_at'>) => {
        const newTask = {
            ...task,
            id: Math.random().toString(36).substr(2, 9),
            created_at: new Date().toISOString()
        };
        tasks.push(newTask as Task);
        return newTask;
    }
};
