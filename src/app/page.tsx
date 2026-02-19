import { redirect } from 'next/navigation';

export default function Home() {
    // Simple redirect to the test organization for demo purposes
    redirect('/o/test-org');
}
