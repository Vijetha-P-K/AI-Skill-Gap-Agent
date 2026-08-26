import Navbar from '../components/layout/Navbar.jsx';
import Footer from '../components/layout/Footer.jsx';

export default function MainLayout({ children }) {
  return (
    <div className="page">
      <Navbar />
      <main className="container" style={{ paddingTop: 36, paddingBottom: 36 }}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
