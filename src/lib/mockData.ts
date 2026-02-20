export interface Lead {
    id: string;
    name: string;
    email: string;
    phone: string;
    status: string;
    origin: string;
    city?: string;
    neighborhood?: string;
    interest?: string;
    created_at: string;
    next_follow_up?: string;
    next_action_type?: string;
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
    description: string;
    completed: boolean;
    due_date?: string;
    created_at: string;
}

export interface Development {
    id: string;
    name: string;
    neighborhood: string;
    city: string;
    units: number;
    status: string;
    org_slug: string;
}

export const MOCK_LEADS: Lead[] = [
    {
        id: '1',
        name: 'Ricardo Santos',
        email: 'ricardo@exemplo.com',
        phone: '(11) 98765-4321',
        status: 'Novo',
        origin: 'Meta Ads',
        city: 'São Paulo',
        neighborhood: 'Moema',
        interest: 'Residencial Guanaco',
        created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
        next_follow_up: new Date(Date.now() + 3600000 * 2).toISOString(),
        next_action_type: 'Visita'
    },
    {
        id: '2',
        name: 'Juliana Lima',
        email: 'juliana@email.com',
        phone: '(11) 91234-5678',
        status: 'Em Contato',
        origin: 'Google Search',
        city: 'Curitiba',
        neighborhood: 'Batel',
        interest: 'Cobertura Central',
        created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
        next_follow_up: new Date(Date.now() + 86400000).toISOString(),
        next_action_type: 'Call'
    },
    {
        id: '3',
        name: 'Marcos Oliveira',
        email: 'marcos@test.com',
        phone: '(11) 99999-0000',
        status: 'Visita',
        origin: 'Indicação',
        city: 'Campinas',
        neighborhood: 'Cambuí',
        interest: 'Casa de Condomínio',
        created_at: new Date(Date.now() - 86400000 * 10).toISOString()
    },
    {
        id: '4',
        name: 'Ana Paula Rodrigues',
        email: 'ana.paula@dominio.com',
        phone: '(21) 97777-6666',
        status: 'Negociação',
        origin: 'Instagram',
        city: 'Rio de Janeiro',
        neighborhood: 'Barra da Tijuca',
        interest: 'Residencial Guanaco',
        created_at: new Date(Date.now() - 86400000 * 1).toISOString()
    }
];

export const MOCK_ACTIVITIES: Activity[] = [
    {
        id: 'a1',
        lead_id: '1',
        type: 'nota',
        description: 'Cliente demonstrou interesse na unidade de 3 dormitórios.',
        created_at: new Date(Date.now() - 3600000).toISOString()
    },
    {
        id: 'a2',
        lead_id: '1',
        type: 'status',
        description: 'Status alterado de Aguardando para Novo.',
        created_at: new Date(Date.now() - 7200000).toISOString()
    }
];

export const MOCK_TASKS: Task[] = [
    {
        id: '1',
        lead_id: '1',
        description: 'Enviar catálogo em PDF',
        completed: false,
        created_at: new Date().toISOString()
    },
    {
        id: '2',
        lead_id: '1',
        description: 'Confirmar horário da visita',
        completed: true,
        created_at: new Date().toISOString()
    }
];

export const MOCK_DEVELOPMENTS: Development[] = [
    {
        id: 'd1',
        name: 'Residencial Guanaco',
        neighborhood: 'Moema',
        city: 'São Paulo',
        units: 48,
        status: 'Lançamento',
        org_slug: 'test-org'
    },
    {
        id: 'd2',
        name: 'Edifício Batel Prime',
        neighborhood: 'Batel',
        city: 'Curitiba',
        units: 24,
        status: 'Em Obras',
        org_slug: 'test-org'
    }
];

export const MOCK_STATS = [
    { label: 'Leads Ativos', value: '120', trend: '+12%', isUp: true },
    { label: 'Receita Est.', value: 'R$ 96.7K', trend: '+8%', isUp: true },
    { label: 'Imóveis Ativos', value: '23', trend: '-2%', isUp: false },
    { label: 'Fechamentos', value: '42', trend: null, isUp: true },
];
