import { Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import Projects from '@/pages/Projects';
import ProjectDetail from '@/pages/ProjectDetail';
import Patreon from '@/pages/Patreon';
import About from '@/pages/About';
import Zine from '@/pages/Zine';
import PostPage from '@/pages/PostPage';
import Contact from '@/pages/Contact';
import PressKit from '@/pages/PressKit';
import Invest from '@/pages/Invest';
import NotFound from '@/pages/NotFound';

// Admin pages
import AdminLogin from '@/pages/admin/AdminLogin';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminProjects from '@/pages/admin/AdminProjects';
import AdminPosts from '@/pages/admin/AdminPosts';
import AdminContacts from '@/pages/admin/AdminContacts';
import AdminSubscribers from '@/pages/admin/AdminSubscribers';

export default function App() {
  return (
    <Routes>
      {/* Public site */}
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="projects" element={<Projects />} />
        <Route path="projects/:slug" element={<ProjectDetail />} />
        <Route path="support" element={<Patreon />} />
        <Route path="about" element={<About />} />
        <Route path="zine" element={<Zine />} />
        <Route path="zine/:slug" element={<PostPage />} />
        <Route path="contact" element={<Contact />} />
        <Route path="press" element={<PressKit />} />
        <Route path="invest" element={<Invest />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Admin */}
      <Route path="admin/login" element={<AdminLogin />} />
      <Route path="admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="projects" element={<AdminProjects />} />
        <Route path="posts" element={<AdminPosts />} />
        <Route path="contacts" element={<AdminContacts />} />
        <Route path="subscribers" element={<AdminSubscribers />} />
      </Route>
    </Routes>
  );
}
