import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import LandingPage from './components/LandingPage';
import DashboardLayout from './components/layout/DashboardLayout';
import DashboardHome from './components/dashboard/DashboardHome';
import InternshipsPage from './components/internships/InternshipsPage';
import CompaniesDirectory from './components/companies/CompaniesDirectory';
import InterviewInvites from './components/interviews/InterviewInvites';
import ProfilePage from './components/profile/ProfilePage';
import FeedbacksPage from './components/feedbacks/FeedbacksPage';
import ReportsPage from './components/reports/ReportsPage';
import JobDescription from './components/JobDescription';
import Companies from './components/admin/Companies';
import CompanyCreate from './components/admin/CompanyCreate';
import CompanySetup from './components/admin/CompanySetup';
import AdminJobs from './components/admin/AdminJobs';
import PostJob from './components/admin/PostJob';
import Applicants from './components/admin/Applicants';
import ProtectedRoute from './components/admin/ProtectedRoute';

const appRouter = createBrowserRouter([
    {
        path: '/',
        element: <LandingPage />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/signup',
        element: <Signup />
    },
    {
        element: <DashboardLayout />,
        children: [
            { path: '/dashboard', element: <DashboardHome /> },
            { path: '/internships', element: <InternshipsPage /> },
            { path: '/companies', element: <CompaniesDirectory /> },
            { path: '/interviews', element: <InterviewInvites /> },
            { path: '/profile', element: <ProfilePage /> },
            { path: '/feedbacks', element: <FeedbacksPage /> },
            { path: '/reports', element: <ReportsPage /> },
            { path: '/jobs', element: <InternshipsPage /> },
            { path: '/description/:id', element: <JobDescription /> },
            { path: '/hackathons', element: <ComingSoon title="Hackathons" /> },
            { path: '/events', element: <ComingSoon title="Events" /> },
            { path: '/help', element: <ComingSoon title="Help Desk" /> },
        ]
    },
    {
        path: '/admin/companies',
        element: <ProtectedRoute><Companies /></ProtectedRoute>
    },
    {
        path: '/admin/companies/create',
        element: <ProtectedRoute><CompanyCreate /></ProtectedRoute>
    },
    {
        path: '/admin/companies/:id',
        element: <ProtectedRoute><CompanySetup /></ProtectedRoute>
    },
    {
        path: '/admin/jobs',
        element: <ProtectedRoute><AdminJobs /></ProtectedRoute>
    },
    {
        path: '/admin/jobs/create',
        element: <ProtectedRoute><PostJob /></ProtectedRoute>
    },
    {
        path: '/admin/jobs/:id/applicants',
        element: <ProtectedRoute><Applicants /></ProtectedRoute>
    },
]);

function ComingSoon({ title }) {
    return (
        <div className="flex items-center justify-center h-[60vh]">
            <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🚀</span>
                </div>
                <h2 className="text-xl font-bold text-foreground mb-2">{title}</h2>
                <p className="text-sm text-muted-foreground">Coming soon! We're building something amazing.</p>
            </div>
        </div>
    );
}

function App() {
    return (
        <div>
            <RouterProvider router={appRouter} />
        </div>
    );
}

export default App;
